import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#151D34',
    // paddingHorizontal: wp('4%'),
    // paddingTop: hp('2%'),
  },
 header: {
  flexDirection: 'row',
  alignItems: 'flex-end',     // Push items to bottom
  backgroundColor: '#262D40',
  paddingHorizontal: 20,
  paddingBottom: 18,          // Add bottom padding instead of marginTop
  height: 100,                // Increased height to allow more vertical space
  borderBottomWidth: 0.2,
  marginBottom:20,
},

headerTitle: {
  marginLeft: 20,
  fontSize: 22,
  color: '#FFFFFF',
  fontWeight: 'bold',
  // marginTop removed
},


  teamCard: {
    borderRadius: 12,
    padding: wp('4%'),
   margin:10,
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
  borderTopWidth: 0.5,
    borderTopColor: '#B0B9D4',
  },
  leadAvatar: {
    marginTop:10,
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
    paddingTop: hp('1%'),
  },
  memberCount: {
    color: 'white',
    fontSize: wp('4.1%'),
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
    // marginBottom: hp('1.2%'),
    fontFamily: 'Satoshi',
    marginLeft:15,
  },
  memberList: {
    paddingBottom: hp('2%'),
  },
  memberItem: {
    margin:10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#172554',
    borderRadius: 10,
    padding: wp('1.5%'),
    marginBottom: hp('.1%'),
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
