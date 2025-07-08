// import { StyleSheet } from 'react-native';


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#151D34',
//     paddingHorizontal: 16,
//     paddingTop: 16,
//     fontFamily: 'Raleway',

//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   headerTitle: {
//     fontSize: 22,
//     color: 'white',
//     fontWeight: 'bold',
//     marginLeft: 10,
//   },
// teamCard: {
//   borderRadius: 12,
//   padding: 16,
//   marginBottom: 20,
//   height: 132,
//   justifyContent: 'space-between',
// },

// teamTitle: {
//   color: 'white',
//   fontSize: 18,
//   fontWeight: '600',
//   marginBottom: 4,
//   fontFamily: 'Satoshi',
// },

// teamLeadLabel: {
//   color: '#B0B9D4',
//   fontSize: 12,
//   marginBottom: 4,
//   fontFamily: 'Satoshi',
// },

// teamLeadInfo: {
//   flexDirection: 'row',
//   alignItems: 'center',
//   marginBottom: 8,
// },

// leadAvatar: {
//   width: 36,
//   height: 36,
//   borderRadius: 18,
//   marginRight: 8,
// },

// teamLeadName: {
//   color: 'white',
//   fontSize: 16,
//   fontFamily: 'Satoshi',
// },

// memberRow: {
//   flexDirection: 'row',
//   alignItems: 'center',
//   borderTopColor: 'white',
//   borderTopWidth: 0.6,
//   paddingTop: 6,
//   justifyContent: 'space-between',
// },

// memberCount: {
//   color: 'white',
//   fontSize: 14,
//   fontFamily: 'Satoshi',
// },

// count: {
//   position: 'absolute',
//   right: 16,
//   bottom: 10,
//   color: 'white',
//   fontSize: 20,
//   fontWeight: '600',
//   fontFamily: 'Satoshi',
// },

//   membersHeader: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: '600',
//     marginBottom: 10,
//     fontFamily: 'Satoshi',
//   },
//   memberList: {
//     paddingBottom: 20,
//   },
//   memberItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#172554',
//     borderRadius: 10,
//     padding: 12,
//     marginBottom: 10,
//   },
//   avatar: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     marginRight: 12,
//   },
//   memberName: {
//     color: 'white',
//     fontSize: 16,
//   },
// });

// export default styles;


import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#151D34',
    paddingHorizontal: wp('4%'),
    paddingTop: hp('2%'),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('1.5%'),
  },
  headerTitle: {
    fontSize: wp('5.5%'),
    color: 'white',
    fontWeight: 'bold',
    marginLeft: wp('2.5%'),
  },
  teamCard: {
    borderRadius: 12,
    padding: wp('4%'),
    marginBottom: hp('2%'),
    height: hp('18%'),
    justifyContent: 'space-between',
  },
  teamTitle: {
    color: 'white',
    fontSize: wp('4.5%'),
    fontWeight: '600',
    marginBottom: hp('0.5%'),
    fontFamily: 'Satoshi',
  },
  teamLeadLabel: {
    color: '#B0B9D4',
    fontSize: wp('3.2%'),
    marginBottom: hp('0.5%'),
    fontFamily: 'Satoshi',
  },
  teamLeadInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('0.5%'),
  },
  leadAvatar: {
    width: wp('9%'),
    height: wp('9%'),
    borderRadius: wp('4.5%'),
    marginRight: wp('2%'),
  },
  teamLeadName: {
    color: 'white',
    fontSize: wp('4.2%'),
    fontFamily: 'Satoshi',
  },
  memberRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 0.5,
    borderTopColor: '#B0B9D4',
    paddingTop: hp('1%'),
  },
  memberCount: {
    color: '#B0B9D4',
    fontSize: wp('3.8%'),
    fontFamily: 'Satoshi',
  },
  count: {
    color: 'white',
    fontSize: wp('5%'),
    fontWeight: '600',
    fontFamily: 'Satoshi',
  },
  membersHeader: {
    color: 'white',
    fontSize: wp('4.5%'),
    fontWeight: '600',
    marginBottom: hp('1.2%'),
    fontFamily: 'Satoshi',
  },
  memberList: {
    paddingBottom: hp('2%'),
  },
  memberItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#172554',
    borderRadius: 10,
    padding: wp('3.5%'),
    marginBottom: hp('1%'),
  },
  avatar: {
    width: wp('10%'),
    height: wp('10%'),
    borderRadius: wp('5%'),
    marginRight: wp('3%'),
  },
  memberName: {
    color: 'white',
    fontSize: wp('4.2%'),
    fontFamily: 'Satoshi',
  },
});

export default styles;
