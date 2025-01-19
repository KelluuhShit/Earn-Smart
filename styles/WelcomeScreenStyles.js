import { StyleSheet } from 'react-native';
import { colors } from '../utils/theme';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'Quicksand-Bold',
  },
  description: {
    fontSize: 12,
    color: colors.secondary,
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Quicksand',
    fontWeight: 'bold',
    padding: 10,
  },
  button: {
    backgroundColor: colors.secondary,
    padding: 12,
    borderRadius: 50,
    marginVertical: 10,
    width: '90%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    position: 'absolute',
    bottom: 30,
  },
  buttonText: {
    color: colors.background,
    fontSize: 18,
    fontFamily: 'Quicksand-Bold',
  },
  starttxt: {
    paddingVertical: 4,
    backgroundColor: colors.accent,
    paddingHorizontal: 30,
    color: colors.background,
    borderRadius: 30,
    marginBottom: 20,
    marginTop: 20,
    fontFamily: 'Quicksand-Bold',
    borderWidth: 1,
    borderColor: colors.accent,
  },
  FirstImage: {
    width: '100%',
    height: 400,
    marginBottom: 20,
  },
  progressBarContainer: {
    flexDirection: 'row',
    justifyContent:'center',
    alignItems:'center',
    gap:20,
    width: '80%',
    marginBottom: 20,
  },
  progressBar: {
    marginTop: 50,
  },
  progressBarColor: colors.accent,
  btnContainer:{
    justifyContent:'center',
    alignItems:'center'
  }
});