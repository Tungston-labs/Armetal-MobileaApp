import { StyleSheet } from 'react-native';

export default StyleSheet.create({
header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 38,
    paddingBottom: 8,
    backgroundColor: '#262D40',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 25,
    fontFamily: 'Raleway_700Bold',
    marginTop: 20,
  },

headerTitle: {
  color: '#FFFFFF',
  fontSize: 22,
  fontFamily: 'Raleway_700Bold',

},
  counters: {
    flexDirection: 'row',
      backgroundColor: '#262D40',
  },
  counterText: {
    color: '#8F8F8F',
    marginRight: 35,
    fontSize: 14,
    fontFamily: 'Montserrat_400Regular',
    marginTop: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: -50,
    marginBottom: 20,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 0.5,
    borderBottomColor: '#FFFFFF',
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


