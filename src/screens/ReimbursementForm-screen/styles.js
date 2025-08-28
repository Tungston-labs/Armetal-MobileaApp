import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#151D34", // dark bg
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
    paddingBottom: 50,
  },
  label: {
    color: "#FFFFFF",
    fontSize: 12,
    marginTop: 12,
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#172554",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 12,
    color: "#FFFFFF",
    fontSize: 15,
  },
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3352BA",
    borderRadius: 8,
    paddingVertical: 14,
    marginTop: 15,
  },
  uploadButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
    marginLeft: 8,
  },
  billImage: {
    width: 90,
    height: 110,
    borderRadius: 6,
    marginRight: 10,
  },
  textArea: {
    backgroundColor: "#172554",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 12,
    color: "#FFFFFF",
    fontSize: 14,
    minHeight: 90,
    textAlignVertical: "top",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  halfInputContainer: {
    flex: 1,
    marginRight: 8,
  },
  dateInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#172554",
    borderRadius: 8,
    paddingRight: 5,
  },
  dateInput: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 12,
    color: "#FFFFFF",
    fontSize: 14,
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: "#3352BA",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
