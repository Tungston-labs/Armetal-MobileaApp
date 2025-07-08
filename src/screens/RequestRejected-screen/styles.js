import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141d40',
  },

  // Updated header with taller height and spacing
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#262D40',
    justifyContent: 'space-between',
  },

  backButton: {
    padding: 4,
  },

  headerTitle: {
    color: '#FFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
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
    borderWidth: 1,
    borderColor: '#FFFF',
  },

  // Badge for rejected/pending/approved status
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FF2304',
    marginBottom: 16,
  },

  statusText: {
    color: '#FF2304',
    fontSize: 14,
    fontWeight: 'bold',
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
    marginBottom: 4,
  },

  value: {
    color: '#FFFF',
    fontSize: 14,
    fontWeight: '500',
  },

  // For Leave Type and Reason sections
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
    color: '#FFFF',
    fontSize: 14,
    marginTop: 4,
    lineHeight: 20,
  },
});

