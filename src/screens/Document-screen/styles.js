import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111a2e',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: '#1b253b',
    borderBottomWidth: 1,
    borderBottomColor: '#2c3650',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 12,
  },
  content: {
    padding: 16,
  },
  card: {
    backgroundColor: '#2a2f45',
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden',
  
  },
  cardImage: {
    width: '100%',
    height: 140,
    borderRadius: 12,
    height:180,

  },
  fieldContainer: {
    marginBottom: 18,
  },
  label: {
    color: '#c4c8e3',
    fontSize: 14,
    marginBottom: 6,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1c2340',
    borderRadius: 8,
  },
  input: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: '#ffffff',
    fontSize: 15,
  },
  iconButton: {
    padding: 10,
  },
});
