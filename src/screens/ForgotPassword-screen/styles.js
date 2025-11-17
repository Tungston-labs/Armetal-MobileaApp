// styles.js
import { StyleSheet, Platform, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

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
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: height * 0.25,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFF',
    textAlign: 'center',
    marginBottom: 10,
    fontFamily:'Raleway',
  },

  subtitle: {
    fontSize: 14,
    color: '#FFFF',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 20,
  },

  label: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 8,
    marginLeft:35,
  },

  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginHorizontal:35,
    paddingVertical: Platform.OS === 'ios' ? 14 : 10,
    fontSize: 14,
    color: '#000',
    marginBottom: 25,
  },

  button: {
    backgroundColor: '#3352BA',
    borderRadius: 10,
    marginHorizontal:35,
    paddingVertical: 15,
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
