import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: getStatusBarHeight(),
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontFamily: theme.fonts.title700,
    fontSize: 20,
    color: theme.colors.heading,
    marginTop: 10,
  },
  back: {
    position: 'absolute',
    top: getStatusBarHeight() + 10,
    left: 24,
  },
  action: {
    position: 'absolute',
    top: getStatusBarHeight() + 10,
    right: 24,
  },
});
