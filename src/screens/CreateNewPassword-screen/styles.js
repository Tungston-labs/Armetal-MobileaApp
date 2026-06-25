import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#151D34',
    paddingHorizontal: 20,
  },

 header: {
  flexDirection: 'row',
  alignItems: 'center',
  paddingTop: 8,
  paddingBottom: 12,
},

backButton: {
  width: 38,
  height: 38,
  borderRadius: 19,
  backgroundColor: 'rgba(255, 255, 255, 0.08)',
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: -4,
  marginTop:30,
},
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    // paddingTop: 24,
    paddingBottom: 80,
  },

  title: {
    fontSize: 24,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
    fontFamily: 'Raleway_700Bold',
    letterSpacing: 0.2,
  },

  subtitle: {
    fontSize: 14,
    color: '#B8BDD1',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 20,
    fontFamily: 'Raleway_500Medium',
    paddingHorizontal: 12,
  },

  label: {
    fontSize: 13,
    color: '#B8BDD1',
    marginBottom: 8,
    fontFamily: 'Raleway_500Medium',
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === 'ios' ? 14 : 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },

  input: {
    flex: 1,
    fontSize: 15,
    color: '#151D34',
    fontFamily: 'Raleway_500Medium',
  },

  eyeIcon: {
    padding: 2,
  },

  button: {
    backgroundColor: '#3352BA',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 16,
    shadowColor: '#3352BA',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Raleway_700Bold',
    letterSpacing: 0.2,
  },
});