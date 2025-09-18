// styles.js
import { StyleSheet, Platform, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#151D34',
    paddingHorizontal: 20,
  },

  header: {
    height: 60,
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? 20 : 15,
    paddingBottom: 10,
  },

  content: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    paddingTop: height * 0.25,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 30,
  },

  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },

  otpInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 7,
    width: 8,
    height: 50,
    textAlign: 'center',
    fontSize: 18,
    color: '#030303',
  },

  button: {
    backgroundColor: '#3352BA',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
  },

  buttonText: {
    color: '#FFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },

  resendText: {
    color: '#FFFF',
    textAlign: 'center',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});
