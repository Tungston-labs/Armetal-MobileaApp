// import { StyleSheet, Dimensions } from 'react-native';

// const { width, height } = Dimensions.get('window');

// export default StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#151D34',
//     paddingHorizontal: 16,
//     paddingTop: 40,
//     paddingBottom: 80,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingBottom: 30,
//     borderBottomWidth: 1,
//     borderBottomColor: '#FFFFFF',
//     marginBottom: 30,
//   },
//   headerText: {
//     flex: 1,
//     textAlign: 'center',
//     fontSize: 20,
//     color: '#FFFFFF',
//     fontWeight: '600',
//     marginRight: 24,
//   },
//   circleWrapper: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 20,
//     position: 'relative',
//     width: 220,
//     height: 220,
//     alignSelf: 'center',
//   },
//   segment: {
//     position: 'absolute',
//     width: 10,
//     height: 10,
//     borderRadius: 2,
//   },
//   circle: {
//     width: 180,
//     height: 180,
//     borderRadius: 90,
//     backgroundColor: '#1D2C60',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   dayText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//   },
//   monthText: {
//     color: '#fff',
//     fontSize: 20,
//     fontWeight: '700',
//     marginTop: 5,
//   },
//   dateText: {
//     color: '#fff',
//     fontSize: 28,
//     marginTop: 5,
//     fontWeight: '600',
//   },
//   summaryCard: {
//     backgroundColor: '#172555',
//     padding: 16,
//     marginBottom: 20,
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 6,
//   },
//   centerRow: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   label: {
//     color: '#fff',
//     fontSize: 16,
//   },
//   value: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   subLabel: {
//     color: '#ccc',
//     fontSize: 14,
//   },
//   subValue: {
//     color: '#ccc',
//     fontSize: 14,
//   },
//   centerText: {
//     color: '#fff',
//     fontSize: 18,
//     marginLeft: 6,
//   },

//   // 🟦 Status card
//   statusCard: {
//     marginBottom: 10,
//   },
//   statusRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#172555',
//     padding: 16,
//     marginBottom: 10,
//     borderLeftWidth: 3, // Left border for color
//     position: 'relative',
//   },
//   statusLabel: {
//     flex: 1,
//     color: '#fff',
//     fontSize: 16,
//     paddingLeft: 8,
//   },
//   statusValue: {
//     color: '#fff',
//     fontSize: 16,
//   },

//   // Half color left border for "Absent Half day"
//   halfBorderWrapper: {
//     position: 'absolute',
//     left: -3,
//     top: 0,
//     bottom: 0,
//     width: 3,
//     flexDirection: 'column',
//   },
//   halfBorder: {
//     flex: 1,
//     width: 3,
//   },

//   // Bottom nav bar fixed at bottom
//   bottomNavbarContainer: {
//     position: 'absolute',
//     bottom: -76,
//     left: -15,
//     right: -15,
//   },
// });

import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#151D34',
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 80,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#FFFFFF',
    marginBottom: 30,
  },
  headerText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
    marginRight:130,
  },

  // ✅ Circle same as first code
  circleWrapper: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 35,
    position: "relative",
    width: 200,
    height: 200,
    alignSelf: "center",
  },
  circle: {
    width: 190,
    height: 190,
    borderRadius: 100,
    backgroundColor: "#1D2C60",
    justifyContent: "center",
    alignItems: "center",
  },
  segment: {
    position: "absolute",
    width: 14,
    height: 10,
    borderRadius: 1,
  },
  dayText: { color: "#FFFFFF", fontSize: 16 },
  monthText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    marginTop: 5,
  },
  dateText: {
    color: "#fff",
    fontSize: 28,
    marginTop: 5,
    fontWeight: "600",
  },

  summaryCard: {
    backgroundColor: '#172555',
    padding: 16,
    marginBottom: 30,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  centerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  label: {
    color: '#fff',
    fontSize: 16,
  },
  value: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  subLabel: {
    color: '#ccc',
    fontSize: 14,
  },
  subValue: {
    color: '#ccc',
    fontSize: 14,
  },
  centerText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 6,
  },

  statusCard: {
    marginBottom: 10,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#172555',
    padding: 16,
    marginBottom: 10,
    borderLeftWidth: 3,
    position: 'relative',
  },
  statusLabel: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    paddingLeft: 8,
  },
  statusValue: {
    color: '#fff',
    fontSize: 16,
  },

  halfBorderWrapper: {
    position: 'absolute',
    left: -3,
    top: 0,
    bottom: 0,
    width: 3,
    flexDirection: 'column',
  },
  halfBorder: {
    flex: 1,
    width: 3,
  },

  bottomNavbarContainer: {
    position: 'absolute',
    bottom: -68,
    left: -15,
    right: -15,
  },
});
