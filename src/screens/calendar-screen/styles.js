import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F1A35",
  },
  header: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingHorizontal: 16,
    backgroundColor: '#262D40',
    borderBottomWidth: 0.2,
    borderBottomColor: "#FFFFFF",
  },
  
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Raleway_700Bold',
    color: '#FFF',
    flex: 1,
    marginLeft: 12,
    marginBottom: 19,
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
  borderColor:"white",
       
},
  tabText: {
    color: "#fff",
    fontFamily: 'Montserrat_400Regular',
   
  },
    bottomNavbarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    
  },
});

export default styles;
