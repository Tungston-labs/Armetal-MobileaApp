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
    borderWidth: 1,
    borderColor: '#ff9800',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    marginBottom: 8,
    backgroundColor: "#4C354F",
  },
  statusText: {
    color: '#ff9800',
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
    marginTop: 20,
    borderColor: "#FF2304",
    borderWidth: 1.5,
    borderRadius: 33,
    paddingVertical: 5,
    paddingHorizontal: 50,  // ✅ controls width nicely
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4B322E",
    alignSelf: "center",    // ✅ centers the button
  },
  cancelButtonText: {
    color: "#FF2304",
    fontSize: 15,
    fontFamily: 'Montserrat_400Regular',
  },
    
});
