import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
  container: {
    width: 48,
    height: 48,
    backgroundColor: theme.colors.secondary40,
    borderRadius: 8,
    marginRight: 4,
    textAlign: 'center',
    fontFamily: theme.fonts.text400,
    fontSize: 13,
    color: theme.colors.heading,
    borderWidth: 1,
    borderColor: theme.colors.secondary50,
  },
});
