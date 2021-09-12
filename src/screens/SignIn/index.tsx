import React from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';

import { ButtonIcon, Background } from '../../components/';
import { useAuth } from '../../hooks/auth';

import { styles } from './styles';
import { theme } from '../../global/styles/theme';

import IllustrationImg from '../../assets/illustration.png';

export function SignIn() {
  const { user, loading, signIn } = useAuth();

  async function handleSignIn() {
    try {
      await signIn();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Background>
      <View style={styles.container}>
        <Image source={IllustrationImg} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.title}>
            Conecte-se {`\n`}e organize suas {`\n`}
            jogatinas
          </Text>
          <Text style={styles.subtitle}>
            Crie grupos para jogar seus games {`\n`}
            favoritos com seus amigos
          </Text>
          {loading ? (
            <ActivityIndicator color={theme.colors.primary} />
          ) : (
            <ButtonIcon title='Entrar com Discord' onPress={handleSignIn} />
          )}
        </View>
      </View>
    </Background>
  );
}