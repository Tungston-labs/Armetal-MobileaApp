import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141d40',
  },

  // Updated header with taller height and spacing
  topHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#262D40",
    height: 100,
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
    paddingBottom: 80, // space for bottom navbar
  },

  // Updated card layout with rounded corners and clean border
  card: {
    backgroundColor: '#172554',
    borderRadius: 10,
    padding: 16,
    borderWidth: 0.2,
    borderColor: '#FFFF',
  },

  // Badge for rejected/pending/approved status
  statusBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#183259',
    borderWidth: 1,
    borderColor: '#FF2304',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginBottom: 8,
    backgroundColor: "#183259",
  },
  statusText: {
    color: '#FF2304',
    fontSize: 16,
    paddingHorizontal: 12,
  },

  // Row layout for From / To / Time
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  // Each column for From / To / Time
  column: {
    flex: 1,
    alignItems: 'flex-start',
    paddingHorizontal: 4,
  },

  label: {
    color: '#575F7D',
    fontSize: 13,
    // marginBottom: 4,
    fontFamily: 'Montserrat_400Regular',
  },

  value: {
    color: '#FFFF',
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Montserrat_700Bold',
  },

  // For Leave Type and Reason sections
  section: {
    // marginTop: 12,
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
    color: '#FFFF',
    fontSize: 14,
    marginTop: 4,
    lineHeight: 20,
    fontFamily: 'Montserrat_400Regular',
  },
});
