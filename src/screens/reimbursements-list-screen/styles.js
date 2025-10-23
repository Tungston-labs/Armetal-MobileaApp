import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#151D34", 
  },

  header: {
    height: 100,
    flexDirection: 'row',       
    alignItems: 'center',       
    paddingTop: 50,
    paddingBottom: 18,
    paddingHorizontal: 16,      
    borderBottomWidth: 0.5,
    borderBottomColor: '#FFFF',
    backgroundColor: '#262D40',
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
    fontFamily: 'Raleway_700Bold', 
  },

  scrollContainer: {
    paddingHorizontal: 15,
    paddingTop: 15, 
    paddingBottom: 120, 
  },

  card: {
    backgroundColor: "#172554",
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    borderWidth: 0.4,
    borderColor: "grey"
  },

  
  statusBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 40,   
    paddingVertical: 5,
    borderRadius: 6,
    borderWidth: 0.5,
    marginBottom: 10,
  },

  statusText: {
    fontSize: 14,
    fontFamily: 'Raleway_700',

  },

  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    color: "#a5b4c3",
    fontSize: 12,
    marginBottom: 2,
  },
  category: {
    color: "#fff",
    fontSize: 16,
    fontFamily: 'Raleway_700',

  },
  amount: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  noteBox: {
    marginTop: 5,
  },
  note: {
    color: "#a5b4c3",
    fontSize: 13,
    lineHeight: 18,
  },

  fixedButton: {
    position: "absolute",
    bottom: 100, 
    left: 300,
    right: 20,
    backgroundColor: "#3352BA",
    width: 60, 
    height: 60,
    borderRadius: 30, 
    justifyContent: "center",
    alignItems: "center",
  },

  fixedButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  bottomNavbarContainer: {
    position: "absolute",
    bottom: 8,
    left: 5,
    right: 5,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 100,
    backgroundColor: '#7490F3',
    width: 50,
    height: 50,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  imageWrapper: {
    marginTop: 12,
    position: "relative",
    width: 90,
    height: 110,
  },

  closeIcon: {
    position: "absolute",
    top: -6,
    right: -6,
    zIndex: 10,
  }

});


