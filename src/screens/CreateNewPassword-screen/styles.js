import { StyleSheet, Platform, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    paddingHorizontal: 20,
  },

  header: {
    height: 50,
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? 10 : 0,
    marginTop:50,

  },

  content: {
    paddingTop: height * 0.15,
    paddingBottom: 30,
    marginTop:-20,
  
  },

  title: {
    fontSize: 23,
    color: '#FFFF',
    textAlign: 'center',
    marginBottom: 6,
    fontFamily: 'Raleway_700Bold', // <-- add this

    
  },

  subtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 20,
    fontFamily: 'Raleway_700', // <-- add this

    
  },

  label: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 8,
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === 'ios' ? 12 : 8,
    marginBottom: 25,
  },

  input: {
    flex: 1,
    fontSize: 14,
    color: 'black',
  },

  button: {
    backgroundColor: '#3352BA',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Raleway_700Bold', // <-- add this

  },
});
