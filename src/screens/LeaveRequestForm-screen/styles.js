import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#151D34',
  },
  header: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingHorizontal: 16,
    backgroundColor: '#262D40',
    borderBottomWidth: 0.2,
    borderBottomColor: "#FFFFFF",
  },

  headerTitle: {
    fontSize: 20,
    fontFamily: 'Raleway_700Bold',
    color: '#FFF',
    flex: 1,
    marginLeft: 12,
    marginBottom: 19,
  },
  pickerWrapper: {
    backgroundColor: '#172554',  
    borderRadius: 10,
    borderWidth: 0.2,
    borderColor: '#FFFFFF',
    marginTop: 14,               
    marginBottom: 20,
    paddingHorizontal: 12,
    paddingVertical: 14,
    justifyContent: 'center',
  },

  picker: {
    height: 45,
    color: '#FFFFFF',           
    fontSize: 15,
    fontFamily: 'Montserrat_400Regular',
    width: '100%',
  },
  separator: {
    height: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    paddingBottom: 100, 
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#172554',
    borderRadius: 20,
    padding: 16,
    marginHorizontal: 6,
    alignItems: 'center',
  },
  statLabel: {
    color: '#FFFFFF',
    fontSize: 13,
    fontFamily: 'Montserrat_400Regular',

  },
  statValue: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 6,
  },

  divider: {
    height: 1,
    backgroundColor: '#fff',
    opacity: 0.4,
    width: '100%',
    alignSelf: 'center',
    marginVertical: 20,
    marginBottom: 40,

  },

  section: {
    marginBottom: 20,
  },

  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  dateInput: {
    flex: 1,
    marginHorizontal: 4,
  },

  inputLabel: {
    color: '#FFFFFF',
    fontSize: 13,
    fontFamily: 'Montserrat_400Regular',
    marginBottom: 6,
  },

  dateField: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#172554',
    borderRadius: 10,
    paddingVertical: 13,
    paddingHorizontal: 12,
    justifyContent: 'space-between',
    borderWidth: 0.2,
    borderColor: '#FFFFFF',
  },

  leaveTypeBox: {
    backgroundColor: '#172554',
    borderRadius: 10,
    borderWidth: 0.2,
    borderColor: '#FFFFFF',
    height: 48,
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginTop: 5,
  },

  pickerWrapper: {
    backgroundColor: '#172554',
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: '#768F9C',
    justifyContent: 'center',
    height: 50,
    paddingHorizontal: 10,
  },

  picker: {
    color: '#7D8EB5',
    fontSize: 15,
    fontFamily: 'Montserrat_400Regular',
    width: '100%',
    height: '100%',
  },

  dateText: {
    color: '#7D8EB5',
    fontSize: 15,
    fontFamily: 'Montserrat_400Regular',
  },

  input: {
    backgroundColor: '#172554',
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 10,
    color: '#FFFFFF',
    borderWidth: 0.2,
    borderColor: '#1d294a',
    marginBottom: 20,
  },

  textArea: {
    backgroundColor: '#172554',
    padding: 12,
    borderRadius: 10,
    color: '#FFFF',
    height: 120,
    textAlignVertical: 'top',
    borderWidth: 0.2,
    borderColor: '#FFFFFF',
    marginBottom: 20,
  },


  footer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: '#FF2304',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2F1E2E',
    marginBottom: 25,
  },
  applyButton: {
    flex: 1,
    backgroundColor: '#3352BA',
    paddingVertical: 16,
    marginLeft: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 25,
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Montserrat_700Bold',
  },
  pickerWrapper: {
    backgroundColor: '#green',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#1d294a',
    marginTop: 6,
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
  picker: {
    height: 50,
    color: '#ccc', 
    width: '100%',
  },

});
