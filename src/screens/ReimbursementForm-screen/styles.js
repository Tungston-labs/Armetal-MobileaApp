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
    paddingHorizontal: 14,
    backgroundColor: "#262D40",
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontFamily: 'Raleway_700Bold',
    marginLeft: 10,

  },
  scrollContent: {
    padding: 15,
    paddingBottom: 300,
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
    borderWidth: 0.1,
    borderColor: "#ffff",
  },
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3352BA",
    borderRadius: 8,
    paddingVertical: 14,
    marginTop: 15,
    borderWidth: 0.2,
    borderColor: "#ffff",
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
    minHeight: 150,
    textAlignVertical: "top",
    borderWidth: 0.1,
    borderColor: "#ffff",
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
    borderWidth: 0.2,
    borderColor: "#ffff",
    fontFamily: 'Raleway_700',

  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  pickerWrapper: {
    borderWidth: 0.2,
    borderColor: "#ffff",
    borderRadius: 8,
    marginBottom: 12,
    overflow: "hidden",
  },
  imageWrapper: {
    marginTop: 12,
    position: "relative", // allows absolute positioning of close icon
    width: 90, // same as billImage width
    height: 110, // same as billImage height
  },
  
  closeIcon: {
    position: "absolute",
    top: -6,
    right: -6,
    zIndex: 10,
  }
  
});
