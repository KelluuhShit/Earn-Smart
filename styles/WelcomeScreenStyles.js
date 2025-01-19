// styles/WelcomeScreenStyles.js
import { StyleSheet } from 'react-native';
import { colors } from '../utils/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: colors.secondary,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: colors.accent,
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  buttonText: {
    color: colors.background,
    fontSize: 16,
  },
});