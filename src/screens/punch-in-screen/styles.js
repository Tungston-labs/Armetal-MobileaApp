import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#151D34',
  },

  innerWrapper: {
    flex: 1,
  },

  scrollView: {
    paddingBottom: 8,
  },

  homeBox: {
    backgroundColor: '#262D40',
    borderRadius: 0,
    paddingVertical: 48,
    paddingHorizontal: 18,
    marginBottom: 20,
    width: '100%',
  },

  homeContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },

  homeTitle: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    fontFamily: 'Raleway',
  },

  welcomeText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 26,
    fontFamily: 'Satoshi',
  },

  profilePic: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },

  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
    fontWeight: '600',
    paddingHorizontal: 16,
    fontFamily: 'Raleway',
  },

  departmentCard: {
    backgroundColor: '#172554',
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 16,
    marginBottom: 20,
    borderWidth: 0.5,
    borderColor: '#3a4ca0',
    marginHorizontal: 16,
  },

  departmentName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Raleway',
  },

  teamLeadLabel: {
    color: '#FFFFFF',
    fontSize: 12,
    marginTop: 4,
    fontFamily: 'Satoshi',
  },

  leadContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    borderTopWidth: 0.5,
    borderTopColor: '#3a4ca0',
    paddingTop: 8,
  },

  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },

  leadName: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Satoshi',
  },

  calendarRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingHorizontal: 16,
  },

  dayBox: {
    width: width / 7.2,
    height: 90,
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 12,
    backgroundColor: '#1D2A5C',
    alignItems: 'center',
    justifyContent: 'center',
  },

  activeDay: {
    backgroundColor: '#E1E8EC',
  },

  dayText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 2,
    fontFamily: 'Satoshi',
  },

  dateText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
    fontFamily: 'Satoshi',
  },

  monthText: {
    color: '#FFFFFF',
    fontSize: 11,
    opacity: 0.7,
    fontFamily: 'Satoshi',
  },

  activeDayText: {
    color: '#172554',
    fontFamily: 'Satoshi',
  },

  activeDateText: {
    color: '#172554',
    fontWeight: 'bold',
    fontFamily: 'Satoshi',
  },

  attendanceBox: {
    backgroundColor: '#172554',
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 16,
    marginBottom: 20,
    borderWidth: 0.5,
    borderColor: '#3a4ca0',
    marginHorizontal: 16,
  },

  attendanceTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 14,
    textTransform: 'capitalize',
    fontFamily: 'Raleway',
  },

  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
  },

  timeLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Satoshi',
  },

  timeValue: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Satoshi',
  },

  line: {
    height: 1,
    backgroundColor: '#3a4ca0',
    marginVertical: 12,
  },

  totalHoursRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },

  totalHoursText: {
    color: '#FFFFFF',
    fontSize: 18,
    marginLeft: 6,
    fontFamily: 'Satoshi',
  },

  hours: {
    marginLeft: 'auto',
    color: '#ccc',
    fontSize: 14,
    fontFamily: 'Satoshi',
  },

  swipeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E1E8EC',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 28,
    justifyContent: 'center',
    marginBottom: 8,
    marginHorizontal: 16,
  },

  swipeText: {
    color: '#030303',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
    fontFamily: 'Satoshi',
  },
});
