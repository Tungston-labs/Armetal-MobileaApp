import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#151D34',
    
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-end',     
    backgroundColor: '#262D40',
    paddingHorizontal: 20,
    paddingBottom: 18,          
    height: 100,                
    borderBottomWidth: 0.5,
    borderBottomColor: '#FFFF',
    marginBottom: 10,
  },

  headerTitle: {
    marginLeft: 10,
    fontSize: 22,
    color: '#FFFFFF',
    fontFamily: 'Raleway_700Bold',
  },

  teamCard: {
    borderRadius: 12,
    padding: wp('2%'),
    margin: 10,
    marginBottom: hp('2%'),
    height: hp('22%'),
    justifyContent: 'space-between',
    paddingTop: hp('1.0%'),  
  },
  teamTitle: {
    color: 'white',
    fontSize: wp('4.6%'),
    fontFamily: 'Montserrat_400Regular',
  },
  teamLeadLabel: {
    color: '#B0B9D4',
    fontSize: wp('2.5%'),
    marginBottom: hp('0.5%'),
    fontFamily: 'Montserrat_400Regular',

  },
  teamLeadInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('0.5%'),
    borderTopWidth: 0.5,
    borderTopColor: '#B0B9D4',
  },
  leadAvatar: {
    marginTop: 14,
    width: wp('9%'),
    height: wp('9%'),
    borderRadius: wp('4.5%'),
    marginRight: wp('2%'),
  },
  teamLeadName: {
    color: 'white',
    fontSize: wp('4.2%'),
    fontFamily: 'Montserrat_400Regular',
    marginTop: 14,
  },
  memberRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: hp('1%'),
    marginBottom:32,
  },
  memberCount: {
    color: 'white',
    fontSize: wp('4.1%'),
    fontFamily: 'Montserrat_400Regular',
    

  },
  count: {
    color: 'white',
    fontSize: wp('5%'),
    fontWeight: '600',
    marginRight:30,
    
    fontFamily: 'Montserrat_700Bold',

  },
  membersHeader: {
    color: 'white',
    fontSize: wp('4.5%'),
    fontFamily: 'Montserrat_400Regular',

    marginLeft: 15,
  },
  memberList: {
    paddingBottom: hp('2%'),
  },
  memberItem: {
    margin: 10,
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
    fontFamily: 'Montserrat_400Regular',

  },
});

export default styles;
