import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#151D34",
    paddingHorizontal: 16,
    paddingTop: 40,
    // paddingBottom: 40,
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
    marginLeft:20,
    // paddingHorizontal:20,
  },
  logoRow: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  helloText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: 'Raleway_700Bold',
    textAlign: "left",
    marginTop: 8,
    marginLeft:20,
  
  },
  profilePic: {
    width: 45,
    height: 45,
    borderRadius: 25,
    marginBottom:35,
    marginRight:20,
  },

  // Circle
circleWrapper: {
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 10,
  marginTop: 30,
  position: "relative",
  width: 160,
  height: 160,
  alignSelf: "center",
},
circle: {
  width: 140,
  height: 140,
  borderRadius: 80,   // ✅ half of 140 for a perfect circle
  overflow: "hidden", // ✅ clip the gradient inside
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
textContainer: {
  position: "absolute",
  justifyContent: "center",
  alignItems: "center",
},


  // Legend
  legendRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    paddingVertical: 14,
    paddingHorizontal:20,
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
    marginTop: 10,
    paddingHorizontal:30,
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

  attendanceBox: {
    backgroundColor: "#172555",
    padding: 18,
    marginTop: 40,
    borderRadius: 15,
    paddingHorizontal:30,
    marginHorizontal:20,
  },
  
  // New header row (date + hours)
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  
  attendanceTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
  
  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  
  timeLabel: { color: "#fff", fontSize: 13 },
  timeValue: { color: "#fff", fontSize: 13 },

  // Align hours + clock in top-right
  totalHoursRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  hours: {
    color: "#5D6687",
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 4,
  },
  // Bottom Navbar
  bottomNavbarContainer: {
    position: "absolute",
    bottom: 8,
    left: 5,
    right: 5,
  },
  loaderOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(24, 29, 62, 0.9)", // semi-transparent background
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  loaderText: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  logoWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  
  logoImage: {
    width: 100,
    height: 100,
    position: "absolute", // keeps logo centered
    zIndex: 2,
  },
  
  rotatingCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 2,
    borderLeftColor: "#FFFFFF",     // white
    borderRightColor: "transparent",
    borderTopColor: "#D3D3D3",      // light gray
    borderBottomColor: "transparent",
    position: "absolute",
  }, 
});

