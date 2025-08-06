import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111a2e',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 90,
    paddingHorizontal: 16,
    backgroundColor: '#262D40',
    borderBottomWidth: 0.2,
    borderBottomColor: '#FFFFFF',
  },
  backButton: {
    padding: 8,
    marginTop: 35,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '600',
    marginLeft: 14,
    marginTop: 30,
  },
  content: {
    padding: 16,
  },
  card: {
    backgroundColor: '#58204B',
    borderRadius: 16,
    marginBottom: 24,
    overflow: 'hidden',
  },
  cardImage: {
    width: '120%',
    height: 200,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    color: '#FFFFFF',
    fontSize: 15,
    marginBottom: 8,
  },
  inputRow: {
    position: 'relative', // To position icon inside
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 11,
    color: '#8B92A9',
    fontSize: 16,
    backgroundColor: '#172554',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#0C132A',
  },
  inputWithIcon: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 11,
    paddingRight: 40, // Space for icon
    color: '#8B92A9',
    fontSize: 16,
    backgroundColor: '#172554',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#0C132A',
  },
  inputIcon: {
    position: 'absolute',
    right: 12,
    top: '50%',
    transform: [{ translateY: -10 }], // Center vertically
  },
  cardNumberText: {
    position: 'absolute',
    bottom: 12,
    right: 16,
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
    backgroundColor: 'rgba(77, 75, 75, 0.3)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
});
