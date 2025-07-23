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
      marginTop:35,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '600',
    marginLeft: 14,
    marginTop:30,
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
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#172554',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#0B122A',
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: '#FFFFFF',
    fontSize: 16,
  },
  iconButton: {
    backgroundColor: '#172554',
    padding: 12,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderLeftWidth: 1,
    borderLeftColor: '#0C122A',
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
