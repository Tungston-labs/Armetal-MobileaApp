// // styles.js
// import { StyleSheet } from 'react-native';

// export default StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#0F1A3C',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     padding: 16,
//     backgroundColor: '#0F1A3C',
//   },
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   sectionTitle: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//     marginLeft: 16,
//     marginBottom: 12,
//   },
//   card: {
//     flexDirection: 'row',
//     backgroundColor: '#132259',
//     borderRadius: 10,
//     padding: 12,
//     marginBottom: 12,
//   },
//   greenStrip: {
//     width: 4,
//     backgroundColor: '#2ECC71',
//     borderRadius: 4,
//     marginRight: 10,
//   },
//   cardContent: {
//     flex: 1,
//   },
//   dateText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   titleText: {
//     color: '#B0BEC5',
//     marginVertical: 2,
//   },
//   dateRange: {
//     color: '#B0BEC5',
//     fontSize: 12,
//     marginTop: 4,
//   },
  
//   tabIconActive: {
//     backgroundColor: '#1E3A8A',
//     padding: 8,
//     borderRadius: 20,
//   },
// });


import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#151D34',
  },

  /** HEADER */
  header: {
    backgroundColor: '#262D40',
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#FFFFFF',  // thin line under header like screenshot
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFF',
  },

  /** SECTION TITLE */
  sectionTitle: {
    color: '#FFFF',
    fontSize: 18,
    fontWeight: '600',
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 12,
  },

  /** CARD CONTAINER */
 card: {
  flexDirection: 'row',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  backgroundColor: '#132259',
  borderRadius: 12,
  padding: 16,
  marginHorizontal: 16,
  marginBottom: 12,
},

cardLeft: {
  flexDirection: 'row',
  alignItems: 'stretch',
  flex: 1,
},

greenStrip: {
  width: 4,
  backgroundColor: '#2ECC71',
  borderRadius: 4,
  marginRight: 12,
  alignSelf: 'stretch',
},

leftTextGroup: {
  flexShrink: 1,
},

dateText: {
  color: '#fff',
  fontSize: 16,
  fontWeight: 'bold',
},

titleText: {
  color: '#B0BEC5',
  fontSize: 14,
  marginTop: 2,
},

rightDateRange: {
  color: '#B0BEC5',
  fontSize: 12,
  textAlign: 'right',
},


  /** ACTIVE TAB ICON */
  tabIconActive: {
    backgroundColor: '#1E3A8A',
    padding: 8,
    borderRadius: 20,
  },
});
