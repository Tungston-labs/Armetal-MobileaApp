import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#151D34',
  },
  header: {
    height: 110,
    borderBottomWidth: 0.5,
    borderBottomColor: '#FFFF',
    backgroundColor: '#262D40',
    position: 'relative',

  },
  backButton: {
    position: 'absolute',
    left: 16,
    top: '50%',
    transform: [{ translateY: -12 }],
     marginTop:25,
  },
  headerTitle: {
    fontSize: 20,
    color: '#FFFF',
    fontFamily: 'Raleway_700Bold', 
    marginTop: 65,
    marginLeft: 48,
   
  },
  
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 10,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#172554',
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 42,
    borderWidth: 0.5,          
    borderColor: 'grey',     
  },
  
  searchInput: {
    marginLeft: 6,
    color: '#FFFF',
    flex: 1,
    
  },
  dropdownBox: {
    height: 42,
    backgroundColor: '#172554',
    borderRadius: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,         
    borderColor: 'grey',
  },
  dropdownText: {
    color: '#FFFF',
    marginRight: 5,
  },
  searchIconBox: {
    width: 42,
    height: 42,
    backgroundColor: '#3352BA',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
 card: {
  backgroundColor: '#172554',
  borderRadius: 12,
  padding: 16,
  marginBottom: 12,
  // marginHorizontal: ,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
},


  monthText: {
    color: '#FFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  yearText: {
    color: '#FFFFFF',
    fontSize: 14,
    marginTop: 4,
  },
});

