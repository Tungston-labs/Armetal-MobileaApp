import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141d40',
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#1c2551',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  content: {
    padding: 16,
    paddingBottom: 80,  // leaves room for BottomNavbar
  },
  card: {
    backgroundColor: '#172253',
    borderRadius: 10,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2a375f',
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f44336',
    marginBottom: 16,
  },
  statusText: {
    color: '#f44336',
    fontSize: 14,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  column: {
    flex: 1,
    alignItems: 'center',
  },
  label: {
    color: '#888ca8',
    fontSize: 13,
    marginBottom: 4,
  },
  value: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  section: {
    marginTop: 12,
  },
  sectionLabel: {
    color: '#888ca8',
    fontSize: 14,
    marginBottom: 4,
  },
  sectionValue: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
  },
  reasonText: {
    color: '#c0c3d6',
    fontSize: 14,
    marginTop: 4,
    lineHeight: 20,
  },
});
