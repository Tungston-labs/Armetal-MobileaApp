import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#151D34',
  },
header: {
  flexDirection: 'row',
  alignItems: 'flex-end',     // Push items to bottom
  backgroundColor: '#262D40',
  paddingHorizontal: 20,
  paddingBottom: 18,          // Add bottom padding instead of marginTop
  height: 100,                // Increased height to allow more vertical space
  borderBottomWidth: 0.2,
},

headerTitle: {
  marginLeft: 20,
  fontSize: 22,
  color: '#FFFFFF',
  fontWeight: 'bold',
  // marginTop removed
},

  separator: {
    height: 1,
    // backgroundColor: '#FFFFFF',
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    paddingBottom: 120, // space for bottom bar
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#172554',
    borderRadius: 20,
    padding: 16,
    marginHorizontal: 6,
    alignItems: 'center',
  },
  statLabel: {
    color: '#FFFFFF',
    fontSize: 13,
  },
  statValue: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 6,
  },
  section: {
    marginBottom: 20,
  
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateInput: {
    flex: 1,
    marginHorizontal: 4,
  },
  inputLabel: {
    color: '#FFFFFF',
    fontSize: 13,
    marginBottom: 6,
  },
  dateField: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#172554',
    borderRadius: 10,
    paddingVertical: 13,
    paddingHorizontal: 12,
    justifyContent: 'space-between',
    borderWidth: 0.2,
    borderColor: '#FFFFFF',
  },
  dateText: {
    color: '#485378',
    fontSize: 15,
  },
  input: {
    backgroundColor: '#172554',
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 10,
    color: '#FFFFFF',
    borderWidth: 0.2,
    borderColor: '#1d294a',
    marginBottom:20,
  },
  textArea: {
    backgroundColor: '#172554',
    padding: 12,
    borderRadius: 10,
    color: '#FFFF',
    height: 120,
    textAlignVertical: 'top',
    borderWidth: 0.2,
    borderColor: '#FFFFFF',
    marginBottom:20,
  },
  footer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: '#FF2304',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2F1E2E',
    marginBottom:25,
  },
  applyButton: {
    flex: 1,
    backgroundColor: '#3352BA',
    paddingVertical: 16,
    marginLeft: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom:25,
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  pickerWrapper: {
  backgroundColor: '#green',
  borderRadius: 10,
  borderWidth: 1,
  borderColor: '#1d294a',
  marginTop: 6,
  paddingHorizontal: 8,
  justifyContent: 'center',
},
picker: {
  height: 50,
  color: '#ccc', // matches input text color
  width: '100%',
},

});
