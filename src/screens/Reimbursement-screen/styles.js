import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#151D34", // dark background
  },
  header: {
    height:100,
    flexDirection: 'row',       // ensures children are in one line
    alignItems: 'center',       // vertical alignment
    paddingTop: 50,
    paddingBottom: 18,
    paddingHorizontal: 16,      // use standard padding, not too wide
    borderBottomWidth: 0.5,
    borderBottomColor: '#FFFF',
    backgroundColor: '#262D40',
  },
  headerTitle: {
    color: '#fff',
      fontSize: 22,
    fontFamily: 'Raleway_700Bold',
    // marginLeft: 12,             // space between arrow and text
    flex: 1,                     // makes title take remaining space
  },
  scrollContent: {
    padding: 15,
    paddingBottom: 80,
  },
  card: {
    backgroundColor: "#172554",
    borderRadius: 10,
    padding: 15,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    color: "#a5b4c3",
    fontSize: 12,
    marginBottom: 2,
    fontFamily: 'Montserrat_400Regular',
  },
  expenseText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: 'Montserrat_700Bold',
  },

  // ✅ EXACT like "Approved" button image
  statusBadge: {
    borderWidth: 0.5,
    borderColor: "#26B887",
    paddingVertical: 6,
    paddingHorizontal: 30,
    borderRadius: 8,
    
  },
  statusText: {
    color: "#26B887",
    fontSize: 14,
    fontWeight: "600",
    
  },

  section: {
    marginTop: 15,
  },
  value: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: 'Montserrat_400Regular',
  },
  noteText: {
    color: "#FFFFFF",
    fontSize: 13,
    lineHeight: 18,
  },
  billImage: {
    width: 70,
    height: 90,
    borderRadius: 4,
    marginRight: 10,
    marginTop: 8,
  },

  // ✅ EXACT like "Cancel" button in screenshot
  cancelButton: {
    marginTop: 20,
    borderColor: "#FF2304",
    borderWidth: 1.5,
    borderRadius: 33,
    paddingVertical: 5,
    paddingHorizontal: 50,  // ✅ controls width nicely
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4B322E",
    alignSelf: "center",    // ✅ centers the button
  },
  
  cancelButtonText: {
    color: "#FF2304",
    fontSize: 15,
    fontFamily: 'Montserrat_400Regular',
  },

  bottomNavbarContainer: {
    position: "absolute",
    bottom: 8,
    left: 5,
    right: 5,
  },
});
