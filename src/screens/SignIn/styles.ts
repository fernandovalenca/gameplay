import { StyleSheet } from 'react-native';

import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
  },
  content: {
    marginTop: -40,
    paddingHorizontal: 50,
  },
  title: {
    color: theme.colors.heading,
    textAlign: 'center',
    fontSize: 40,
    lineHeight: 40,
    marginBottom: 16,
    fontFamily: theme.fonts.title700,
  },
  subtitle: {
    color: theme.colors.heading,
    fontSize: 15,
    lineHeight: 25,
    textAlign: 'center',
    marginBottom: 64,
  },
});
