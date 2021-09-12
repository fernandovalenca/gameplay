import React, {
  useState,
  createContext,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import * as AuthSession from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { api } from '../services/api';
import { COLLECTION_USER } from '../configs/database';

const { CDN_IMAGE } = process.env;
const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;
const { RESPONSE_TYPE } = process.env;
const { SCOPE } = process.env;

export interface User {
  id: string;
  username: string;
  firstName: string;
  avatar: string;
  email: string;
  token: string;
}

interface AuthContextData {
  user: User;
  loading: boolean;
  signIn: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthorizationResponse {
  type: 'cancel' | 'dismiss' | 'locked' | 'success' | 'error';
  params: {
    access_token: string;
    error?: string;
  };
}

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const [loading, setLoading] = useState(false);

  async function signIn() {
    try {
      setLoading(true);

      const authUrl = `${api.defaults.baseURL}/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const { type, params } = (await AuthSession.startAsync({
        authUrl,
      })) as AuthorizationResponse;

      if (type === 'success' && !params.error) {
        api.defaults.headers.authorization = `Bearer ${params.access_token}`;

        const userInfo = await api.get<User>('/users/@me');
        const firstName = userInfo.data.username.split(' ')[0];

        userInfo.data.avatar = `${CDN_IMAGE}/avatar/${userInfo.data.id}/${userInfo.data.avatar}.png`;

        const userData = {
          ...userInfo.data,
          firstName,
          token: params.access_token,
        };

        await AsyncStorage.setItem(COLLECTION_USER, JSON.stringify(userData));

        setUser(userData);
      }
    } catch {
      throw new Error('Não foi possível autenticar');
    } finally {
      setLoading(false);
    }
  }

  async function loadUserStorageDate() {
    const storage = await AsyncStorage.getItem(COLLECTION_USER);

    if (storage) {
      const userLogged = JSON.parse(storage) as User;

      api.defaults.headers.authorization = `Bearer ${userLogged.token}`;
      setUser(userLogged);
    }
  }

  useEffect(() => {
    loadUserStorageDate();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
