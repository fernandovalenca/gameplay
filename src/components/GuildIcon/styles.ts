import { StyleSheet } from 'react-native';

import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
  container: {
    width: 62,
    height: 66,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: theme.colors.discord,
    overflow: 'hidden',
  },
  image: {
    width: 62,
    height: 66,
  },
});
