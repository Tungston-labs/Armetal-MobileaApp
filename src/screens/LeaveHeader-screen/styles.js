import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 28,
    paddingBottom: 8,
    backgroundColor: '#262D40',
  
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 25,
    fontFamily: 'Raleway_700Bold',
    marginTop:20,
  },
  counters: {
    flexDirection: 'row',
    marginTop: 5,
  },
  counterText: {
    color: '#8F8F8F',
    marginRight: 35,
    fontSize: 14,
    fontFamily: 'Raleway_700Bold',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginTop:20,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    backgroundColor: '#262D40',
  },
  tabButton: {
    paddingVertical: 12,
  },
  tab: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Raleway_400Regular',
  },
  tabSelected: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Raleway_700Bold',
    borderBottomWidth: 2,
    borderBottomColor: '#FFFFFF',
    paddingBottom: 4,
  },
});


