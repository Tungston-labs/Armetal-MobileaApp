import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    //  backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "flex-end",
    marginBottom:0
  },
  modalContent: {
    backgroundColor: "#0C1124", 
    padding: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderTopWidth: 1,
    borderColor: "#1F2A46",
     marginBottom: 50,

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
  marginTop: 20,
},
  
 cancelButton: {
  flex: 0.6,   
  paddingVertical: 12,
  marginRight: 10, 
  backgroundColor: "#FBE6D8",
  borderRadius: 25,
  borderWidth: 2,
  borderColor: "red",
  alignItems: "center",
},
  
  cancelText: {
    color: "red",
    fontWeight: "600",
    fontSize: 16,
  },
  
  saveButton: {
  flex: 1.4,   // larger width
  paddingVertical: 12,
  marginLeft: 10,
  borderRadius: 25,
  backgroundColor: "#4361EE",
  alignItems: "center",
},
  
  saveText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  
timePickerContainer: {
  flexDirection: "row",
  justifyContent: "space-evenly", 
  alignItems: "center",
  borderWidth: 1,
  borderColor: "#253157",
  borderRadius: 12,
  marginBottom: 12,
  backgroundColor: "#101C3A",
  paddingHorizontal: 9,
},
  
 timePicker: {
  color: "#e0e7ff",
  height: 50,          // uniform height
  textAlign: "center", // centers labels
},
  label: {
    fontSize: 14,
    color: "#e0e7ff",
    marginBottom: 6,

  },
  
  
});

export default styles;
