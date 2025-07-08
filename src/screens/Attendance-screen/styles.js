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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 40,
    paddingBottom: 24,
    paddingHorizontal: 16,
    backgroundColor: '#262D40',
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    flex: 1,
    marginLeft: 12,
    fontFamily: 'Raleway-Bold', 
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
    backgroundColor: '#172554',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomColor:'#FFFF'
  },

  headerCell: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 16,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#1C2D5B',
  },

  cell: {
    color: '#fff',
    fontSize: 15,
    fontFamily: 'Satoshi-Regular',
  },

  bottomTab: {
    height: 64,
    backgroundColor: '#172554',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 0.5,
    borderTopColor: '#3a4ca0',
  },
});
