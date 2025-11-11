import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#151D34',
  },
  header: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingHorizontal: 16,
    backgroundColor: '#262D40',
    borderBottomWidth: 0.2,
    borderBottomColor: "#FFFFFF",
  },

  headerTitle: {
    fontSize: 20,
    fontFamily: 'Raleway_700Bold',
    color: '#FFF',
    flex: 1,
    marginLeft: 15,
    marginBottom: 19,
  },
  
  backButton: {
    position: 'absolute',
    left: 16,
    top: '50%',
    transform: [{ translateY: -12 }],
    zIndex: 1,
      marginTop:20,
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
    width: width * 0.3,
    height: width * 0.3,
    borderRadius: width * 0.15,
    marginTop:20,
    marginBottom: -40,
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
