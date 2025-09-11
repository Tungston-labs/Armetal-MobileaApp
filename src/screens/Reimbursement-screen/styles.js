import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#151D34", // dark background
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 35,
    paddingHorizontal: 15,
    backgroundColor: "#262D40",
    fontFamily: 'Raleway_700Bold',

  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 10,
    fontFamily: 'Raleway_700',

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
    color: "#485378",
    fontSize: 12,
    marginBottom: 2,
  },
  expenseText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },

  // ✅ EXACT like "Approved" button image
  statusBadge: {
    borderWidth: 0.3,
    borderColor: "#26B887",
    paddingVertical: 6,
    paddingHorizontal: 30,
    borderRadius: 8,
    backgroundColor: "#1E2C27",
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
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 90,  // ✅ controls width nicely
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#371F1B",
    alignSelf: "center",    // ✅ centers the button
  },
  
  cancelButtonText: {
    color: "#FF2304",
    fontSize: 16,
    fontFamily: 'Raleway_700Bold',

   
  },

  bottomNavbarContainer: {
    position: "absolute",
    bottom: 8,
    left: 5,
    right: 5,
  },
});
