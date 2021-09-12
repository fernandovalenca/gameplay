import React, { ReactNode } from 'react';
import { View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BorderlessButton } from 'react-native-gesture-handler';

import { theme } from '../../global/styles/theme';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/core';

interface Props {
  title: string;
  action?: ReactNode;
}

export function Header({ title, action }: Props) {
  const { secondary100, secondary40, heading } = theme.colors;
  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <LinearGradient
      style={styles.container}
      colors={[secondary100, secondary40]}
    >
      <BorderlessButton style={styles.back} onPress={handleGoBack}>
        <Feather name='arrow-left' size={24} color={heading} />
      </BorderlessButton>
      <Text style={styles.title}>{title}</Text>
      {action && <View style={styles.action}>{action}</View>}
    </LinearGradient>
  );
}
