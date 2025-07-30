import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#151D34',
    padding: 4,
  },

  innerWrapper: {
    flex: 1,
  },

  scrollView: {
    padding: 5,
    paddingBottom: 50,
  },

  homeBox: {
    backgroundColor: '#262D40',
    borderRadius: 14,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginTop: 40,
    paddingBottom: 30,
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
    color: '#FFFFFF',
    fontSize: 18,
    marginBottom: 10,
    marginTop: 10,
    fontWeight: '400',
    marginLeft: 6,
  },

  departmentCard: {
    backgroundColor: '#172554',
    borderRadius: 7,
    padding: "4%",
    marginBottom: 16,
    borderWidth: 0.2,
    borderColor: '#FFFFFF',
    margin: 5,
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
    borderTopWidth: 0.5,
    borderTopColor: '#FFFFFF',
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
    marginBottom: 20,
    paddingHorizontal: 8,
  },

  dayBox: {
    width: width / 7.2,
    height: 100,
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
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 2,
    fontFamily: 'Satoshi',
  },

  monthText: {
    color: '#FFFFFF',
    fontSize: 20,
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
    marginHorizontal: 12,
    padding: 16,
    borderRadius: 12,
    borderWidth: 0.2,
    borderColor: '#3a4ca0',
  },

  attendanceTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 14,
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

  circularCalendarWrapper: {
    alignItems: "center",
    marginVertical: 18,
  },

  dayOfWeekText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
  },

  dateTextLarge: {
    fontSize: 22,
    marginVertical: 4,
    color: "#fff",
    fontWeight: "bold",
  },

  gridMenu: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
    marginHorizontal: 10,
    flexWrap: "wrap",
  },

  gridItem: {
    width: "23%",
    aspectRatio: 1,
    backgroundColor: "#1D2A5C",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  gridTitle: {
    marginTop: 6,
    fontSize: 12,
    color: "#fff",
    textAlign: "center",
  },

  specialItem: {
    backgroundColor: "#3352BA",
  },

  swipeWrapper: {
    padding: 12,
  },

  loading: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    marginTop: 50,
  },
});
