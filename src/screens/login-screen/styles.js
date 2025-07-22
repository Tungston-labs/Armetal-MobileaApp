import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#151D34',
    alignItems: 'center',
    paddingTop: 100,
    paddingHorizontal: 20,
  },

  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40, // spacing between logo and form
  },

  logo: {
    width:250,
    height: 152,
    resizeMode: 'contain',
  },

  formContainer: {
    backgroundColor: '#262D40',
    borderRadius: 14,
    width: 340,
    minHeight: 512,
    paddingTop: 50,
    paddingBottom: 60,
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
    backgroundColor: '#3352BA',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },

  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

    forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: 15,
  },

  forgotPasswordText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },

// inputContainer: {
//   position: "relative",
//   width: "100%",
//   marginBottom: 16,
// },

// input: {
//   height: 48,
//   borderWidth: 1,
//   borderColor: "#ccc",
//   borderRadius: 8,
//   paddingHorizontal: 16,
//   paddingRight: 40, // space for the eye icon
//   fontSize: 16,
// },

eyeIcon: {
  position: "absolute",
  right: 12,
  top: 14,
},

});
