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
    fontFamily:'Quicksand-Bold',
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
    padding: 10,
    borderRadius: 2,
    marginVertical: 10,
    width: '90%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    position: 'absolute',
    bottom: 100,
    elevation: 10, // Add elevation for Android
    shadowColor: '#000', // Add shadow properties for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  buttonText: {
    color: colors.background,
    fontSize: 15,
    fontFamily: 'Quicksand-Bold',
  },
  loginContainer: {
    padding: 12,
    borderRadius: 50,
    marginVertical: 10,
    width: '90%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    position: 'absolute',
    bottom: 50,
  },
  loginText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Quicksand',
    marginTop: 10,
    textAlign: 'center',
    
  },
  starttxt: {
    paddingVertical: 4,
    backgroundColor: colors.accent,
    paddingHorizontal: 30,
    color: colors.background,
    borderRadius: 2,
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
  },
});