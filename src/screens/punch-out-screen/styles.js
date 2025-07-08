// import { StyleSheet, Dimensions } from 'react-native';
// const { width } = Dimensions.get('window');

// export default StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#151D34',
//   },

//   scrollView: {
//     padding: 16,
//     paddingBottom: 100,
//   },

//   homeBox: {
//   backgroundColor: '#262D40',
//   borderRadius: 14,
//   padding: 11,
//   marginBottom: 2,
//   height:100,
// },

// headerRow: {
//   flexDirection: 'row',
//   justifyContent: 'space-between',
//   alignItems: 'flex-start',
// },

// homeTitle: {
//   color: '#FFFFFF',
//   fontSize: 22,
//   fontWeight: 'bold',
//   marginBottom: 10,
// },

// welcomeText: {
//   color: '#FFFFFF',
//   fontSize: 18,
//   fontWeight: '600',
//   lineHeight: 26,
 
// },

// profilePic: {
//   width: 30,
//   height: 30,
//   borderRadius: 5,
//   marginLeft: 16,
// },

//   sectionTitle: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     marginBottom: 8,
//     fontWeight: '500',
//   },

//   departmentCard: {
//     backgroundColor: '#172554',
//     borderRadius: 10,
//     padding: 16,
//     marginBottom: 16,
//     borderWidth: 0.5,
//     borderColor: '#FFFFFF',
//   },

//   departmentName: {
//     color: '#FFFFFF',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },

//   teamLeadLabel: {
//     color: '#FFFFFF',
//     fontSize: 12,
//     marginTop: 4,
//   },

//   leadContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 8,
//     borderTopWidth: 1,
//     borderTopColor: '#FFFFFF',
//     paddingTop: 8,
//   },
//   avatar: {
//     width: 30,
//     height: 30,
//     borderRadius: 15,
//     marginRight: 8,
//   },
//   leadName: {
//     color: '#FFFFFF',
//     fontSize: 14,
//   },
//   calendarRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 16,
//   },
//   dayBox: {
//     width: width / 7.5,
//     paddingVertical: 10,
//     borderRadius: 10,
//     backgroundColor: '#172554',
//     alignItems: 'center',
//   },
//   activeDay: {
//     backgroundColor: '#E1E8EC',
//   },
//   dayText: {
//     color: '#FFFFFF',
//     fontSize: 12,
//     fontWeight: '500',
//   },
//   dateText: {
//     color: '#FFFFFF',
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   activeDayText: {
//     color: '#172554',
//   },
//   activeDateText: {
//     color: '#172554',
//     fontWeight: 'bold',
//   },
//   attendanceBox: {
//   backgroundColor: '#0E1E6D',
//   borderRadius: 10,
//   padding: 16,
//   marginBottom: 20,
//   borderWidth: 0.5,
  
// },

// attendanceTitle: {
//   color: '#FFFFFF',
//   fontSize: 16,
//   fontWeight: 'bold',
//   marginBottom: 16,
//   textTransform: 'capitalize',
// },

// label: {
//   color: '#FFFFFF',
//   fontSize: 15,
//   marginTop: 4,
// },

// labelDisabled: {
//   color: '#666F8E',
//   fontSize: 15,
//   marginTop: 12,
// },

// timeRow: {
//   flexDirection: 'row',
//   justifyContent: 'space-between',
//   marginTop: 4,
// },

// timeLabel: {
//   color: '#FFFFFF',
//   fontSize: 14,
// },

// timeValue: {
//   color: '#FFFFFF',
//   fontSize: 14,
// },

// timeLabelDisabled: {
//   color: '#666',
//   fontSize: 14,
// },



// line: {
//   height: 1,
//   backgroundColor: '#FFFFFF',
//   marginVertical: 14,
// },

// totalHoursRow: {
//   flexDirection: 'row',
//   alignItems: 'center',
// },

// totalHoursText: {
//   color: '#FFFFFF',
//   fontSize: 14,
//   marginLeft: 6,
// },

// hours: {
//   marginLeft: 'auto',
//   color: '#FFFFFF',
//   fontSize: 14,
// },

//   swipeButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#E1E8EC',
//     padding: 5,
//     borderRadius: 30,
//     justifyContent: 'center',
//     marginBottom: 40,
//   },
//   swipeText: {
//     color: '#030303',
//     fontSize: 16,
//     fontWeight: '600',
//     marginLeft: 8,
//   },

//   bottomTab: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     height: 60,
//     backgroundColor: '#172554',
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     borderTopWidth: 0.5,
    
//   },
// });


import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#151D34',
  },

  scrollView: {
    padding: 16,
    paddingBottom: 100,
  },

  homeBox: {
    backgroundColor: '#262D40',
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
    height: 120,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  homeTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  welcomeText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 26,
  },

  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 16,
  },

  sectionTitle: {
    color: '#FFFFFF',
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
    marginBottom: 6,
  },

  teamLeadLabel: {
    color: '#FFFFFF',
    fontSize: 12,
    marginTop: 4,
  },

  leadContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
    backgroundColor: '#172554',
    alignItems: 'center',
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

  monthText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '400',
  },

  activeDayText: {
    color: '#172554',
  },

  activeDateText: {
    color: '#172554',
    fontWeight: 'bold',
  },

  activeMonthText: {
    color: '#172554',
  },

  attendanceBox: {
    backgroundColor: '#172554',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    borderWidth: 0.5,
  },

  attendanceTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
    textTransform: 'capitalize',
  },

  label: {
    color: '#FFFFFF',
    fontSize: 15,
    marginTop: 8,
  },

  labelDisabled: {
    color: '#666F8E',
    fontSize: 15,
    marginTop: 12,
  },

  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },

  timeLabel: {
    color: '#FFFFFF',
    fontSize: 14,
  },

  timeValue: {
    color: '#FFFFFF',
    fontSize: 14,
  },

  timeLabelDisabled: {
    color: '#666',
    fontSize: 14,
  },

  timeValueDisabled: {
    color: '#666',
    fontSize: 14,
  },

  line: {
    height: 1,
    backgroundColor: '#FFFFFF',
    marginVertical: 14,
  },

  totalHoursRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  totalHoursText: {
    color: '#FFFFFF',
    fontSize: 14,
    marginLeft: 6,
  },

  hours: {
    marginLeft: 'auto',
    color: '#FFFFFF',
    fontSize: 14,
  },

  swipeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E1E8EC',
    padding: 10,
    borderRadius: 30,
    justifyContent: 'center',
    marginBottom: 40,
  },

  swipeText: {
    color: '#030303',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },

  
});
