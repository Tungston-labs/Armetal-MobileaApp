// import { StyleSheet, Dimensions } from 'react-native';

// const { width } = Dimensions.get('window');

// export default StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#0a122a',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     paddingVertical: 16,
//     backgroundColor: '#0d1a3d',
//     borderBottomWidth: 1,
//     borderBottomColor: '#222',
//   },
//   headerTitle: {
//     marginLeft: 16,
//     fontSize: 20,
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   content: {
//     padding: 16,
//     paddingBottom: 40,
//   },
//   statsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//   },
//   statBox: {
//     flex: 1,
//     backgroundColor: '#121c3d',
//     borderRadius: 12,
//     padding: 16,
//     marginHorizontal: 4,
//     alignItems: 'center',
//   },
//   statLabel: {
//     color: '#ccc',
//     fontSize: 14,
//   },
//   statValue: {
//     color: '#fff',
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginTop: 8,
//   },
//   dateRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 16,
//   },
//   dateInput: {
//     flex: 1,
//     marginHorizontal: 4,
//   },
//   inputLabel: {
//     color: '#ccc',
//     marginBottom: 4,
//     fontSize: 14,
//   },
//   dateField: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#121c3d',
//     padding: 12,
//     borderRadius: 8,
//     justifyContent: 'space-between',
//   },
//   dateText: {
//     color: '#ccc',
//     fontSize: 16,
//   },
//   input: {
//     backgroundColor: '#121c3d',
//     padding: 12,
//     borderRadius: 8,
//     marginBottom: 16,
//     color: '#fff',
//   },
//   textArea: {
//     backgroundColor: '#121c3d',
//     padding: 12,
//     borderRadius: 8,
//     marginBottom: 24,
//     color: '#fff',
//     height: 120,
//     textAlignVertical: 'top',
//   },
//   footerButtons: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   deleteButton: {
//     width: 56,
//     height: 56,
//     borderRadius: 28,
//     borderWidth: 2,
//     borderColor: '#ff3333',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   applyButton: {
//     flex: 1,
//     backgroundColor: '#365acf',
//     paddingVertical: 16,
//     marginLeft: 16,
//     borderRadius: 30,
//     alignItems: 'center',
//   },
//   applyButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

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
  },
  headerTitle: {
    marginLeft: 16,
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  separator: {
    height: 1,
    backgroundColor: '#222',
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
    backgroundColor: '#121c3d',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 6,
    alignItems: 'center',
  },
  statLabel: {
    color: '#ccc',
    fontSize: 13,
  },
  statValue: {
    color: '#fff',
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
    color: '#bbb',
    fontSize: 13,
    marginBottom: 6,
  },
  dateField: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#121c3d',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#1d294a',
  },
  dateText: {
    color: '#ccc',
    fontSize: 15,
  },
  input: {
    backgroundColor: '#121c3d',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 10,
    color: '#fff',
    borderWidth: 1,
    borderColor: '#1d294a',
  },
  textArea: {
    backgroundColor: '#121c3d',
    padding: 12,
    borderRadius: 10,
    color: '#fff',
    height: 120,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: '#1d294a',
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
    borderColor: '#ff3333',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0a122a',
  },
  applyButton: {
    flex: 1,
    backgroundColor: '#365acf',
    paddingVertical: 16,
    marginLeft: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  pickerWrapper: {
  backgroundColor: '#121c3d',
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
