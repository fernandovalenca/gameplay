import React from 'react';
import { View } from 'react-native';

import { styles } from './styles';

interface Props {
  isCentralized?: boolean;
}

export function ListDivider({ isCentralized }: Props) {
  return (
    <View
      style={[
        styles.container,
        isCentralized
          ? { marginBottom: 10, marginTop: 10 }
          : { marginBottom: 31 },
      ]}
    />
  );
}
