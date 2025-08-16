// import { StyleSheet } from "react-native";

// export default StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#151D34",
//     paddingHorizontal: 16,
//     paddingTop: 40,
//     paddingBottom: 80,
//   },
//   scrollView: { paddingBottom: 40 },

//   // Header
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 22,
//   },
//   logo: {
//     width: 80,   // Specific width
//     height: 40,  // Specific height
//     resizeMode: "contain", // Keeps aspect ratio
//     paddingBottom: 10,
//   },

//   logoRow: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   logoRow: {
//     flexDirection: "column",  // Stack vertically
//     alignItems: "flex-start", // Align left
//   },
//   helloText: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "600",
//     textAlign: "left",
//     marginTop: 5,
//   },

//   profilePic: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,

//   },

//   // Circle
//   circleWrapper: {
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 10,
//     position: "relative",
//     width: 20,
//     height: 200,
//     alignSelf: "center",
//   },
//   circle: {
//     width: 190,
//     height: 190,
//     borderRadius: 100,
//     backgroundColor: "#1D2C60",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   segment: {
//     position: "absolute",
//     width: 14,
//     height: 10,
//     borderRadius: 1,
//   },
//   dayText: { color: "#FFFFFF", fontSize: 16 },
//   monthText: {
//     color: "#fff",
//     fontSize: 20,
//     fontWeight: "700",
//     marginTop: 5,
//   },
//   dateText: {
//     color: "#fff",
//     fontSize: 28,
//     marginTop: 5,
//     fontWeight: "600",
//   },

//   // Oval Indicators Horizontal with Vertical Oval
//   legendRow: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     alignItems: "center",
//     width: "100%",

//     paddingVertical: 19,
//   },

//   legendItem: {
//     flexDirection: "row",
//     alignItems: "center",
//   },

//   legendDot: {
//     width: 8,
//     height: 12,
//     borderRadius: 8, // Makes it a perfect circle
//     marginRight: 4,
//   },

//   legendText: {
//     color: "#FFFFFF",
//     fontSize: 12,

//   },

//   // Menu Grid
//   menuGrid: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-between",
//     marginTop: 30,
//     height: 70,
//   },
//   menuBox: {

//     aspectRatio: 1,
//     backgroundColor: "#172555",
//     borderRadius: 12,
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 16,
//     height: 80,
//     width: 90,
//   },
//   applyLeaveBox: {
//     backgroundColor: "#3352BA",
//     width: 90,
//   },
//   menuText: {
//     color: "#fff",
//     fontSize: 12,
//     textAlign: "center",
//     marginTop: 15,
//   },

//   // Attendance Box
//   attendanceBox: {
//     backgroundColor: "#172555",
//     padding: 16,
//     marginTop: 180,
//     borderRadius: 12,

//   },
//   attendanceTitle: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "700",
//     marginBottom: 11,
//     textAlign: "center",
//   },
//   timeRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 8,
//   },
//   timeLabel: { color: "#fff", fontSize: 16 },
//   timeValue: { color: "#fff", fontSize: 16 },
//   line: {
//     height: 1,
//     backgroundColor: "#fff",
//     opacity: 0.3,
//     marginVertical: 8,
//   },
//   totalHoursRow: {
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 8,
//   },
//   totalHoursText: { color: "#fff", fontSize: 16, marginLeft: 4 },
//   hours: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "700",
//     marginLeft: 6,
//   },

//   // Bottom Navbar
//   bottomNavbarContainer: {
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//   },
// });


import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#151D34",
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 40,
  },
  scrollView: { paddingBottom: 0 },

  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: -9,
  },
  logo: {
    width: 90,
    height: 50,
    resizeMode: "contain",
    paddingBottom: 10,
  },
  logoRow: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  helloText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "left",
    marginTop: 8,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  // Circle
  circleWrapper: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: -10,
    position: "relative",
    width: 200,
    height: 200,
    alignSelf: "center",
  },
  circle: {
    width: 140,
    height: 140,
    borderRadius: 100,
    backgroundColor: "#1D2C60",
    justifyContent: "center",
    alignItems: "center",
  },
  segment: {
    position: "absolute",
    width: 10,
    height: 7,
    borderRadius: 1,
  },
  dayText: { color: "#FFFFFF", fontSize: 16 },
  monthText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
    marginTop: 5,
  },
  dateText: {
    color: "#fff",
    fontSize: 20,
    marginTop: 5,
    fontWeight: "600",
  },

  // Legend
  legendRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    paddingVertical: 19,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  legendDot: {
    width: 8,
    height: 12,
    borderRadius: 8,
    marginRight: 3,
  },
  legendText: {
    color: "#FFFFFF",
    fontSize: 12,
  },

  // Menu Grid
  menuGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 1,
  },
  menuBox: {
    width: "22%", // 4 columns
    aspectRatio: 0.7, // Keeps square
    backgroundColor: "#172555",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    paddingVertical: -2,
  },
  applyLeaveBox: {
    backgroundColor: "#3352BA",
  },
  menuText: {
    color: "#fff",
    fontSize: 10.5,
    textAlign: "center",
    marginTop: 8,
  },

  // Attendance Box
  attendanceBox: {
    backgroundColor: "#172555",
    padding: 10,
    marginTop: -40,
    borderRadius: 12,
  },

  attendanceTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 1,
    textAlign: "center",
  },
  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 1,
  },
  timeLabel: { color: "#fff", fontSize: 13 },
  timeValue: { color: "#fff", fontSize: 13 },
  line: {
    
    backgroundColor: "#fff",
    opacity: 0.3,
    marginVertical: 0,
  },
  totalHoursRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 3,
  },
  totalHoursText: { color: "#fff", fontSize: 16, marginLeft: 4 },
  hours: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 1,
  },

  // Bottom Navbar
  bottomNavbarContainer: {
    position: "absolute",
    bottom: -8,
    left: 5,
    right: 5,
  },
});

