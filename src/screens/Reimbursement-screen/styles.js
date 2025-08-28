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
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 10,
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
    borderWidth: 1,
    borderColor: "#26B887",
    paddingVertical: 6,
    paddingHorizontal: 18,
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
    borderRadius: 6,
    marginRight: 10,
    marginTop: 8,
  },

  // ✅ EXACT like "Cancel" button in screenshot
  cancelButton: {
    marginTop: 20,
    borderColor: "#FF2304",
    borderWidth: 1.5,
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#371F1B",
  },
  cancelButtonText: {
    color: "#FF2304",
    fontSize: 16,
    fontWeight: "600",
  },

  bottomNavbarContainer: {
    position: "absolute",
    bottom: 8,
    left: 5,
    right: 5,
  },
});
