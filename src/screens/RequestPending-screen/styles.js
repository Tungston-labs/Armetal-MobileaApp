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
    paddingBottom: 100, // for bottom navbar space
  },
  card: {
    backgroundColor: '#1c2551',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    borderColor: '#2d3454',
    borderWidth: 1,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ff9800',
    marginBottom: 16,
  },
  statusText: {
    color: '#ff9800',
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
    color: '#aaa',
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
    color: '#aaa',
    fontSize: 14,
    marginBottom: 4,
  },
  sectionValue: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
  },
  reasonText: {
    color: '#ccc',
    fontSize: 14,
    marginTop: 4,
    lineHeight: 20,
  },
  cancelButton: {
    marginTop: 20,
    alignSelf: 'center',
    borderColor: '#f44336',
    borderWidth: 1,
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 40,
  },
  cancelButtonText: {
    color: '#f44336',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
