import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#151D34", // dark navy background
  },

  header: {
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
    backgroundColor: "#262D40",
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
  },

  scrollContainer: {
    paddingHorizontal: 15,
    paddingTop: 15, // ✅ space between header and cards
    paddingBottom: 120, // space for button + navbar
  },

  card: {
    backgroundColor: "#172554",
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },

  // ✅ Rectangle status badge with border
  statusBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1.2,
    marginBottom: 10,
    backgroundColor: "#172554", // match card background
  },
  statusText: {
    fontSize: 14,
    fontWeight: "600",
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
    fontWeight: "500",
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
    bottom: 70, // above navbar
    left: 20,
    right: 20,
    backgroundColor: "#2d6cdf",
    paddingVertical: 14,
    borderRadius: 12,
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
});
 

