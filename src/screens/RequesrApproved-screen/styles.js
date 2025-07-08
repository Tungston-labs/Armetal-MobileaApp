import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a122a',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0d1a3d',
    paddingHorizontal: 16,
    paddingVertical: 14,
    justifyContent: 'space-between',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginLeft: 8,
  },
  separator: {
    height: 1,
    backgroundColor: '#222',
  },
  content: {
    padding: 16,
  },
  card: {
    backgroundColor: '#121c3d',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2a3555',
  },
  statusBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'transparent',
    borderColor: '#33cc99',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  statusText: {
    color: '#33cc99',
    fontSize: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  column: {
    flex: 1,
    alignItems: 'flex-start',
    marginHorizontal: 4,
  },
  label: {
    color: '#889',
    fontSize: 14,
    marginBottom: 4,
  },
  value: {
    color: '#fff',
    fontSize: 16,
  },
  section: {
    marginBottom: 16,
  },
});
