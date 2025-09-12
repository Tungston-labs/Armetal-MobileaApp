import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F1A35",
  },
header: {
  height: 110,
  borderBottomWidth: 0.5,
  borderBottomColor: '#FFFF',
  backgroundColor: '#262D40',
  flexDirection: 'row',         // ✅ row layout
  alignItems: 'center',         // ✅ vertical alignment
  justifyContent: 'flex-start', // keeps items left
  paddingHorizontal: 16,
  paddingTop: 40,               // adjust for status bar spacing
},

backButton: {
  marginRight: 12,
},

headerTitle: {
  color: "#fff",
  fontSize: 22,
  fontWeight: "700",
  fontFamily: "raleway",
},

  tabsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 16,
    borderRadius: 4,
    overflow: "hidden",
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "transparent",
  },
activeTab: {
  backgroundColor: "#172554",
  borderRadius:10,  
  borderWidth:0.2,
  borderColor:"white"        
},
  tabText: {
    color: "#fff",
    fontWeight: "600",
  },
    bottomNavbarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default styles;
