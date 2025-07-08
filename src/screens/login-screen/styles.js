import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#151D34',
    alignItems: 'center',
    paddingTop: 100, // creates space for logo
    paddingHorizontal: 20,
  },

  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40, // spacing between logo and form
  },

  logo: {
    width: 243,
    height: 112,
    resizeMode: 'contain',
  },

  formContainer: {
    backgroundColor: '#262D40',
    borderRadius: 14,
    width: 340,
    minHeight: 512,
    paddingTop: 27,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 20,
  },

  label: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 5,
  },

  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    color: '#000',
  },

  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  rememberMeText: {
    marginLeft: 8,
    color: '#fff',
  },

  loginButton: {
    backgroundColor: '#3456e2',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },

  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
