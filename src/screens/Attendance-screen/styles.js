// styles.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#151D34',
  },

  innerWrapper: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: 16,
  },

  header: {
    height: 100,  
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingHorizontal: 16,
    backgroundColor: '#262D40',
    borderBottomWidth: 0.2,
    borderBottomColor:"#FFFFFF",
  },

  dateText: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'Montserrat_400Regular',
  },

  dateLabel: {
    fontSize: 13,
    color: '#ccc',
    fontFamily: 'Montserrat_400Regular',
  },

  noteCard: {
    backgroundColor: '#1C2D5B',
    margin: 16,
    borderRadius: 12,
    padding: 12,
  },

  noteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  noteText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Montserrat_400Regular',
  },

  noteInput: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Montserrat_400Regular',
    borderWidth: 1,
    borderColor: '#2f3e74',
    padding: 8,
    borderRadius: 8,
    minHeight: 80,
    textAlignVertical: 'top',
  },

  // Heading / Title updated to Raleway
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Raleway_700Bold',
    color: '#FFF',
    flex: 1,
    marginLeft: 12,
    marginTop: 6,
  },

  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  card: {
    margin: 16,
    backgroundColor: '#172554',
    borderRadius: 12,
    borderWidth: 0.5,
    overflow: 'hidden',
  },

  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomColor: '#FFFF',
  },

  // Table header text uses Raleway for headings
  headerCell: {
    fontFamily: 'Raleway_700Bold',
    color: '#fff',
    fontSize: 20,
  },

  divider: {
    height: 1,
    backgroundColor: '#fff',
    opacity: 0.4,
    width: '90%',
    alignSelf: 'center',
    marginVertical: 2,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#1C2D5B',
  },

  cell: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Montserrat_400Regular',
  },

  bottomTab: {
    height: 64,
    backgroundColor: '#172554',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 0.5,
    borderTopColor: '#3a4ca0',
    marginTop: 50,
  },
  bottomNavbarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  dateCard: {
    backgroundColor: '#172554',
    margin: 16,
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  selectDateText: {
    fontSize: 13,
    color: '#FFFFFF',
    fontFamily: 'Montserrat_400Regular',
  },

  selectedDate: {
    fontSize: 13,
    color: '#FFFFFF',
    fontFamily: 'Montserrat_700Bold',
  },

  inlineCalendarContainer: {
    backgroundColor: '#172554',
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 12,
    padding: 10,
  },

  cancelText: {
    color: '#fff',
    fontWeight: '600',
  },
  doneText: {
    color: '#fff',
    fontWeight: '600',
  },
  pickerContainer: {
    backgroundColor: '#172554',
    borderRadius: 16,
    padding: 16,
    marginTop: 0,
  },
  pickerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  calendar: {
    height: 320,
    width: '95%',
    alignSelf: 'center',
  },
  calendarWrapper: {
    marginHorizontal: 16,
    backgroundColor: '#172554',
    borderRadius: 16,
    paddingVertical: 2,
    borderWidth: 0.3,
    borderColor: '#fff',
  },
  calendarContainer: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  calendarHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    backgroundColor: '#172554',
    width: '98%',
  },
  monthWithArrow: {
    flexDirection: 'row',
    width: '50%',
  },

  // Month text updated to Raleway
  monthText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Raleway_700Bold',
  },

  yearText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Raleway_700Bold',
    marginLeft: 12,
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    marginHorizontal: 30,
  },
  cancelButton: {
    backgroundColor: '#f30606ff',
    paddingVertical: 12,
    paddingHorizontal: 64,
    borderRadius: 20,
  },
  doneButton: {
    backgroundColor: '#1d478bff',
    paddingVertical: 12,
    paddingHorizontal: 64,
    borderRadius: 20,
  },
  yearPickerContainer: {
    backgroundColor: '#172554',
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
    color: '#fff',
    textAlign: 'center',
    paddingVertical: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
  },

  totalHoursCard: {
    backgroundColor: '#172554',
    margin: 12,
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalHoursLabel: {
    fontSize: 15,
    color: '#fff', 
    fontFamily: 'Montserrat_700Bold',
  },
  totalHoursValue: {
    fontSize: 15,
    color: '#ccc',
    fontFamily: 'Montserrat_700Bold',
  },
});
