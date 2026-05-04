// styles.js
import { StyleSheet, Platform, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#151D34',
    paddingHorizontal: 20,
  },
innerContainer: {
  width: '100%',
  maxWidth: 350,
  paddingHorizontal: 10,
},

  header: {
    height: 50,
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? 10 : 0,
  },

  content: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingTop: height * 0.05,
    paddingBottom: 40,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F5F5F5',
    textAlign: 'center',
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 14,
    color: '#F5F5F5',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 20,
  },

  label: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 8,
  },

  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === 'ios' ? 14 : 12,
    fontSize: 14,
    color: 'black',
    marginBottom: 25,
  },

  button: {
    backgroundColor: '#3352BA',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
