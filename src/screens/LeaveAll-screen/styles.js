import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#151D34',
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
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 10,
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
    borderWidth: 0.3,
    borderColor: '#FFFFFF',
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
    backgroundColor: 'rgba(0, 212, 127, 0.1)',
  },
  statusRejected: {
    borderColor: '#f44336',
    borderWidth: 1,
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
  },
  statusPending: {
    borderColor: '#ff9800',
    borderWidth: 1,
    backgroundColor: 'rgba(255, 152, 0, 0.1)',
  },
  statusText: {
    color: '#26B887',
    fontSize: 16,
    paddingHorizontal: 10,
  },
  cardContent: {
    marginTop: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between', // spreads From | To | Time evenly
    marginVertical: 4,
  },
  label: {
    color: '#B8B7BB',
    fontFamily: 'Montserrat_400Regular',
    fontSize: 13,
  },
  value: {
    color: '#FFFFFF',
    fontSize: 13,
    fontFamily: 'Montserrat_700Bold',
    marginTop: 2, // ensures value sits just below the label
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 100,
    backgroundColor: '#7490F3',
    width: 50,
    height: 50,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  bottomNavbarContainer: {
    position: "absolute",
    bottom: 5,
    left: 3,
    right: 3,
  },
});
