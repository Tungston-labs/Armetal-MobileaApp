import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F1A35",
  },
  dateCard: {
    backgroundColor: "#172554",
    borderRadius: 12,
    margin: 12,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    borderRadius: 8,
    marginVertical: 4,
  },
  
  selectedDate: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
    fontFamily: "Satoshi-Bold",
  },
  dateLeft: {
    flexDirection: "column",
    alignItems: "flex-start", // Keep left-aligned
  },
  dateLabel: {
    fontSize: 13,
    color: "#ccc",
    fontFamily: "Satoshi-Regular",
  },
  dateLeftText: {
    color: "#fff",
    marginLeft: 10,
  },
  dateRightText: {
    color: "#fff",
    marginLeft: 32,
    marginTop: 4,
  },
  reminderCard: {
    backgroundColor: "#1B2D5A",
    borderRadius: 12,
    padding: 12,
    marginTop: 16,
    marginHorizontal: 12,
    borderLeftColor: "#3352BA",
    borderLeftWidth: 12,
  },
  reminderTitle: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  reminderTimeBox: {
    backgroundColor: "#101D40",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 6,
  },
  reminderTimeText: {
    color: "#fff",
    fontSize: 13,
  },

  reminderDescription: {
    color: "#ccc",
    fontSize: 13,
  },
  addEventBtn: {
    bottom: 70,
    alignSelf: "center",
    borderRadius: 10,
    backgroundColor: "#3352BA",
    width: "95%",
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent:"center",
    marginBottom:6,
  },
  addEventText: {
    color: "#fff",
    justifyContent:"center",
    fontSize: 16,
    
  },

  calendarWrapper: {
    marginHorizontal: 16,
    backgroundColor: "#172554",
    borderRadius: 16,
    paddingVertical: 2,
    borderWidth: 0.3,
    borderColor: "#fff",
  },
  calendarContainer: {
    borderRadius: 12,
    overflow: "hidden",
  },
  calendarHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    backgroundColor: "#172554",
    width: "98%",
  },
  monthWithArrow: {
    flexDirection: "row",
    width: "50%",
  },

  monthText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  yearText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 12, // keep it slightly spaced from arrow group
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
  },
  yearPickerContainer: {
    backgroundColor: "#172554",
    borderRadius: 12,
    padding: 10,
    marginVertical: 250,
    marginTop: 10,
    marginHorizontal: 300,
    width: 100,
    maxHeight: 200,
  },
  yearItem: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    paddingVertical: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    marginHorizontal: 30,
  },
  cancelButton: {
    backgroundColor: "#f30606ff",
    paddingVertical: 12,
    paddingHorizontal: 64,
    borderRadius: 20,
  },
  cancelText: {
    color: "#fff",
    fontWeight: "600",
  },
  calendar: {
  height: 320,
  width: '95%',
  alignSelf: 'center',
},
  doneButton: {
    backgroundColor: "#1d478bff",
    paddingVertical: 12,
    paddingHorizontal: 64,
    borderRadius: 20,
  },
  doneText:{
    color:'#fff',
    fontWeight: '600',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 90,
    backgroundColor: '#3352BA',
    width: 50,
    height: 50,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
});

export default styles;
