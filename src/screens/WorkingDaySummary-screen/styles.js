import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#151D34',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 25,
    borderBottomWidth: 0.3,
    backgroundColor: "#262D40",
    borderBottomColor: '#FFFFFF',
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    color: '#FFFFFF',
    marginLeft: 18,
    marginTop: 25,
    fontFamily: 'Raleway_700Bold', // <-- add this

  },

circleWrapper: {
  marginTop:30,
  alignItems: "center",
  justifyContent: "center",
  marginBottom: -10,
  position: "relative",
  width: 160,
  height: 160,
  alignSelf: "center",
  marginBottom:20,
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

  summaryCard: {
    backgroundColor: '#172555',
    padding: 15,
    marginTop: 10,
    marginHorizontal: 15,
    
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 1,
  },
  centerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 3,
  },
  label: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
    fontFamily: 'Raleway_700Bold', // <-- add this


  },

  value: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  subLabel: {
    color: '#FFFFFF',
    fontFamily: 'Raleway_700', // <-- add this
    fontSize: 13,
  },
  subValue: {
    color: '#fff',
    fontSize: 14,
  },

  divider: {
    height: 1,           // thin line
    backgroundColor: '#fff', // line color
    opacity: 5,        // match your theme
    marginVertical: 10,  // spacing above and below
  },

  centerText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: "800",
    marginLeft: 6,
  },

  statusCard: {
    marginTop: 10,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#172555',
    padding: 17,
    marginBottom: 10,
    borderLeftWidth: 3,
    position: 'relative',
    marginHorizontal: 15,
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
  
  segment: {
    position: "absolute",
    width: 10,
    height: 7,
    borderRadius: 1,
  },
  
  halfSegmentContainer: {
    flexDirection: "row", // place children side by side
    width: "100%",
    height: "100%",
  },
  
  halfSegment: {
    flex: 1,           // take half width automatically
    height: "100%",
  },
  
  
  bottomNavbarContainer: {
    position: 'absolute',
    bottom: 8,
    left: 0,
    right: 0,
  },
});


