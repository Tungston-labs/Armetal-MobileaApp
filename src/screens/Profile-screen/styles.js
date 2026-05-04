import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#151D34',
  },
  header: {
    height: 110,
    justifyContent: 'center',
    backgroundColor: '#262D40',
    borderBottomWidth: 0.5,
    borderBottomColor: '#FFFF',
    position: 'relative',
   
  },
  
  backButton: {
    position: 'absolute',
    left: 16,
    top: '50%',
    transform: [{ translateY: -12 }],
    zIndex: 1,
      marginTop:20,
  },
  headerTitle: {
    fontSize: 20,
    color: '#FFFF',
    fontWeight: 'bold',
    marginTop:40,
    marginLeft:58,

    
   
  },
  content: {
    paddingHorizontal: 18,
    paddingTop: 30,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 90,
  },
  profileImage: {
    width: width * 0.7,
    height: width * 0.7,
    marginTop:20,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#172554',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
  },

  optionText: {
    color: '#FFFF',
    marginLeft: 15,
    fontSize: 16,
    fontWeight: '500',
    
  },
});
