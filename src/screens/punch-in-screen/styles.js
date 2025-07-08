import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#151D34',
  },

  innerWrapper: {
    flex: 1,
  },

  scrollView: {
    padding: 16,
    paddingBottom: 30,
  }, 

  homeBox: {
    backgroundColor: '#262D40',
    borderRadius: 14,
    paddingVertical: 20,
    paddingHorizontal: 16,
    marginBottom: 20,
  },

  homeContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  homeTitle: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  welcomeText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 26,
  },

  profilePic: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
  },

  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
  },

  departmentCard: {
    backgroundColor: '#172554',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    borderWidth: 0.5,
    borderColor: '#FFFFFF',
  },

  departmentName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },

  teamLeadLabel: {
    color: '#FFFFFF',
    fontSize: 12,
    marginTop: 4,
  },

  leadContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#FFFFFF',
    paddingTop: 8,
  },

  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
  },

  leadName: {
    color: '#FFFFFF',
    fontSize: 14,
  },

  calendarRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  dayBox: {
    width: width / 7.5,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#1D2A5C',
    alignItems: 'center',
    height: 98,
  },

  activeDay: {
    backgroundColor: '#E1E8EC',
  },

  dayText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },

  dateText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },

  activeDayText: {
    color: '#172554',
  },

  activeDateText: {
    color: '#172554',
    fontWeight: 'bold',
  },

  attendanceBox: {
    backgroundColor: '#172554',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    borderWidth: 0.5,
    borderColor: '#3a4ca0',
  },

  attendanceTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    textTransform: 'capitalize',
  },

  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },

  timeLabel: {
    color: '#FFFFFF',
    fontSize: 14,
  },

  timeValue: {
    color: '#FFFFFF',
    fontSize: 14,
  },

  line: {
    height: 1,
    backgroundColor: '#FFFFFF',
    marginVertical: 10,
  },

  totalHoursRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },

  totalHoursText: {
    color: '#FFFFFF',
    fontSize: 19,
    marginLeft: 6,
  },

  hours: {
    marginLeft: 'auto',
    color: '#ccc',
    fontSize: 14,
  },

  swipeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E1E8EC',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    justifyContent: 'center',
    marginBottom: 20,
  },

  swipeText: {
    color: '#030303',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },

  
});
