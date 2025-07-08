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
    paddingTop: 50,           // Increased top padding
    paddingBottom: 20,        // Increased bottom padding for height
    backgroundColor: '#262D40',
    justifyContent: 'space-between',
  },

  backButton: {
    padding: 4,
  },
headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  headerTitle: {
    fontSize: 18,
    color: "#FFFF",
    fontWeight: "bold",
    marginLeft: 12,
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  content: {
    padding: 16,
    paddingBottom: 100, // for bottom navbar space
  },

  card: {
    backgroundColor: "#172554",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#FFFF",
  },

  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FF6A3D',
    marginBottom: 16,
  },

  statusText: {
    color: '#FF6A3D',
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
    alignItems: 'flex-start', // left align text
    paddingHorizontal: 4,
  },

  label: {
    color: '#575F7D',
    fontSize: 13,
    marginBottom: 4,
  },

  value: {
    color: '#FFFF',
    fontSize: 14,
    fontWeight: '500',
  },

  section: {
    marginTop: 12,
  },

  sectionLabel: {
    color: '#575F7D',
    fontSize: 14,
    marginBottom: 4,
  },

  sectionValue: {
    color: '#FFFF',
    fontSize: 15,
    fontWeight: '500',
  },

  reasonText: {
    color: '#FFFFFF',
    fontSize: 14,
    marginTop: 4,
    lineHeight: 20,
  },

  cancelButton: {
    marginTop: 30,
    alignSelf: 'center',
    borderColor: '#FF2304',
    borderWidth: 1,
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 60, // Increased width
    backgroundColor: '#2F1E2E', // Optional: subtle background to match your image
  },

  cancelButtonText: {
    color: '#FF2304',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '60%',
    
  },
});
