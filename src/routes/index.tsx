import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { useAuth } from '../hooks/auth';

import { SignIn } from '../screens';
import { AppRoutes } from './app.routes';

export function Routes() {
  const { user } = useAuth();

  user.id = '1';
  user.firstName = 'Fernando';

  return (
    <NavigationContainer>
      {user.id ? <AppRoutes /> : <SignIn />}
    </NavigationContainer>
  );
}
