import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#151D34',
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#262D40',
    alignItems: 'center',
  },
  statusTime: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  statusIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIcon: {
    marginRight: 10,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
  counterRow: {
    flexDirection: 'row',
    marginTop: 4,
  },
  counterText: {
    color: '#8F8F8F',
    fontSize: 12,
    marginRight: 16,
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
    borderBottomColor: '#FFFFFF',
    paddingVertical: 10,
  },
  tab: {
    color: '#888',
    fontSize: 14,
  },
  tabSelected: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    borderBottomWidth: 2,
    borderBottomColor: '#FFFFFF',
    paddingBottom: 4,
  },

  dateHeader: {
    color: '#FFFFFF',
    fontSize: 16,
    margin: 16,
    fontWeight: '600',
  },
  listContent: {
    paddingBottom: 100,
  },
  card: {
    backgroundColor: '#172554',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 16,
    borderWidth: 0.5,
    borderColor: '#FFFFFF',
  },
  statusContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#183259',
    borderWidth: 1,
    borderColor: '#26B887',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginBottom: 8,
  },
  statusText: {
    color: '#26B887',
    fontSize: 12,
    fontWeight: '600',
  },
  cardContent: {
    marginTop: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
  },
  label: {
    color: '#FFFFFF',
    fontSize: 13,
  },
  value: {
    color: '#FFFFFF',
    fontSize: 13,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 80,
    backgroundColor: '#3352BA',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },

  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: '#1E293B',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 0.5,
    borderTopColor: '#334155',
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  navItemActive: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3b82f6',
    padding: 8,
    borderRadius: 20,
  },
});
