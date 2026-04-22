import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#151D34",
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 60,
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
    fontFamily: 'Raleway_700Bold',
    textAlign: "left",
    marginTop: 8,
  },
  profilePic: {
    width: 45,
    height: 45,
    borderRadius: 25,
    marginBottom:30,
    marginRight:10,
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
  borderRadius: 80,   
  overflow: "hidden", 
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

  attendanceBox: {
    backgroundColor: "#172555",
    padding: 18,
    marginTop: 40,
    borderRadius: 15,
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
  trackingCard: {
    marginTop: 10,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.12)",
    gap: 10,
  },
  trackingHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  trackingTitleBlock: {
    flex: 1,
    paddingRight: 12,
  },
  trackingTitle: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },
  trackingSubtitle: {
    color: "#95A2D3",
    fontSize: 12,
    marginTop: 4,
  },
  trackingBadge: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  trackingBadgeOn: {
    backgroundColor: "rgba(47,130,47,0.18)",
  },
  trackingBadgeOff: {
    backgroundColor: "rgba(237,43,43,0.18)",
  },
  trackingBadgeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  trackingBadgeDotOn: {
    backgroundColor: "#42D77D",
  },
  trackingBadgeDotOff: {
    backgroundColor: "#FF7C7C",
  },
  trackingBadgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },
  trackingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  trackingLabel: {
    color: "#95A2D3",
    fontSize: 12.5,
  },
  trackingValue: {
    color: "#FFFFFF",
    fontSize: 12.5,
    fontWeight: "500",
    textAlign: "right",
    flex: 1,
    marginLeft: 18,
  },
  trackingNote: {
    color: "#B5C0EA",
    fontSize: 11.5,
    lineHeight: 16,
  },
  // Bottom Navbar
  bottomNavbarContainer: {
    position: "absolute",
    bottom: 2,
    left: 3,
    right: 2,
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
