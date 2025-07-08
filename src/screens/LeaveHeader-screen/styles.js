import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    backgroundColor: '#262D40',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
  counters: {
    flexDirection: 'row',
    marginTop: 4,
  },
  counterText: {
    color: '#8F8F8F',
    marginRight: 16,
    fontSize: 14,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
  },
  tabSelected: {
    color: '#FFFFFF',
    fontSize: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#FFFFFF',
    paddingBottom: 4,
  },
});


