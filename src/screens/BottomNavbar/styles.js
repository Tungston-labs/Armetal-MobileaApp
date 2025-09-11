import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  bottomTab: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center', // ✅ keeps icons vertically aligned
    backgroundColor: '#172554',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#2d3454',
  },
  tabIconActive: {
    backgroundColor: '#3352BA',
    padding: 8,          // ✅ more padding for larger icons
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabIconNormal: {
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});



