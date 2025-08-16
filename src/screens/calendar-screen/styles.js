import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F1A35",
  },
  header: {
    height: 100,
    borderBottomWidth: 0.5,
    borderBottomColor: '#FFFF',
    backgroundColor: '#262D40',
    position: 'relative',
   
   
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginTop:64,
    marginLeft:24

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
  borderColor: "#fff",     
  borderWidth: 0.2,
  borderRadius:2,          
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
