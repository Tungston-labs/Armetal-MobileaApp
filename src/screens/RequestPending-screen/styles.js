import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141d40',
  },
  topHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#262D40",
    height:100,
    borderBottomWidth: 0.5,
    borderBottomColor: '#FFFF',
  },
  backButton: {
    padding: 4,
    marginTop: 25,
    
  },
headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  headerTitle: {
    fontSize: 18,
    color: "#FFFF",
    fontWeight: "bold",
    marginRight: 130,
    marginTop: 25,
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
    borderWidth: 0.2,
    borderColor: "#FFFF",
  },

  statusBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#183259',
    borderWidth: 1,
    borderColor: '#FF6A3D',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginBottom: 8,
    backgroundColor: "#183259",
  },
  statusText: {
    color: '#FF6A3D',
    fontSize: 16,
    paddingHorizontal:12,
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
    fontFamily: 'Montserrat_400Regular',
  },

  value: {
    color: '#FFFF',
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Montserrat_700Bold',
  },

  section: {
    marginTop: 12,
  },

  sectionLabel: {
    color: '#575F7D',
    fontSize: 14,
    marginBottom: 4,
    fontFamily: 'Montserrat_400Regular',
  },

  sectionValue: {
    color: '#FFFF',
    fontSize: 15,
    fontWeight: '500',
    fontFamily: 'Montserrat_400Regular',
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
