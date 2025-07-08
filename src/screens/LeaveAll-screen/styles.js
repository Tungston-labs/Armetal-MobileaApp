import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#151D34',
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 10,
    alignItems: 'center',
  },
  time: {
    color: '#FFFF',
    marginRight: 10,
    fontSize: 16,
  },
  batteryIcon: {
    marginLeft: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 10,
  },
  title: {
    color: '#FFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  dateHeader: {
    color: '#FFFF',
    fontSize: 15,
    marginLeft: 16,
    marginBottom: 6,
    fontWeight: 'bold',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  card: {
    backgroundColor: '#172554',
    borderRadius: 8,
    marginBottom: 16,
    padding: 16,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 12,
  },
  statusApproved: {
    borderColor: '#00d47f',
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
  statusRejected: {
    borderColor: '#f44336',
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
  statusPending: {
    borderColor: '#ff9800',
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
  statusText: {
    color: '#FFFF',
    fontSize: 14,
  },
  cardContent: {
    marginTop: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    color: '#aaa',
    fontSize: 14,
  },
  value: {
    color: '#fff',
    fontSize: 14,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 90,
    backgroundColor: '#3352BA',
    width: 50,
    height: 50,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
});
