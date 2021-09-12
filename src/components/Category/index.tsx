import React, { FunctionComponent } from 'react';
import { View, Text } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import { styles } from './styles';
import { theme } from '../../global/styles/theme';

interface CategoryProps extends RectButtonProps {
  title: string;
  icon: FunctionComponent<SvgProps>;
  hasCheckBox?: boolean;
  isChecked?: boolean;
}

export function Category({
  title,
  icon: Icon,
  hasCheckBox = false,
  isChecked = false,
  ...rest
}: CategoryProps) {
  const { secondary40, secondary50, secondary70, secondary80 } = theme.colors;

  return (
    <RectButton {...rest}>
      <LinearGradient
        style={styles.container}
        colors={[secondary70, secondary50]}
      >
        <LinearGradient
          style={[styles.content, { opacity: isChecked ? 1 : 0.5 }]}
          colors={[isChecked ? secondary80 : secondary50, secondary40]}
        >
          {hasCheckBox && (
            <View style={isChecked ? styles.checked : styles.check} />
          )}

          <Icon width={48} height={48} />
          <Text style={styles.title}>{title}</Text>
        </LinearGradient>
      </LinearGradient>
    </RectButton>
  );
}
