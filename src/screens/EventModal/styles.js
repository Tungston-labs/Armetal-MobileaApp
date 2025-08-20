import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "#000000aa",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#0C1124", // darker background for modal
    padding: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderTopWidth: 1,
    borderColor: "#1F2A46",
  },
  header: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    color: "#fff",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#253157",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
    color: "#e0e7ff", // light text
    backgroundColor: "#101C3A", // input background matching screenshot
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  cancelButton: {
    paddingVertical: 12,
    paddingHorizontal: 40,
    backgroundColor: "#fff",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#FF6B6B",

  },
  cancelText: {
    color: "#FF6B6B",
    fontWeight: "600",
    fontSize: 16,
  },
  saveButton: {
    paddingVertical: 12,
    paddingHorizontal: 75,
    borderRadius: 20,
    backgroundColor: "#4361EE",

  },
  saveText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default styles;
