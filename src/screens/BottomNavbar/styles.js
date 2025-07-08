import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  bottomTab: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#0f162f',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#2d3454',
  },
  tabIconActive: {
    backgroundColor: '#4169e1',
    padding: 10,
    borderRadius: 20,
  },
  tabIconNormal: {
    padding: 10,
  },
});
