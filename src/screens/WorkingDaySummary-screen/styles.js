import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#151D34',
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 80, // Leave space for bottom navbar
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#FFFFFF',
    marginBottom: 30,
  },
  headerText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
    marginRight: 24, // ensures center alignment despite back icon
  },
  circleWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    position: 'relative',
    width: 220,
    height: 220,
    alignSelf: 'center',
  },
  segment: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 2,
  },
  circle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#1D2C60',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  monthText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    marginTop: 5,
  },
  dateText: {
    color: '#fff',
    fontSize: 28,
    marginTop: 5,
    fontWeight: '600',
  },
  summaryCard: {
    backgroundColor: '#172555',
    padding: 16,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  centerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  label: {
    color: '#fff',
    fontSize: 16,
  },
  value: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  subLabel: {
    color: '#ccc',
    fontSize: 14,
  },
  subValue: {
    color: '#ccc',
    fontSize: 14,
  },
  centerText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 6,
  },

  // 🟦 Each status card separate
  statusCard: {
    marginBottom: 20,
    
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#172555',
    padding: 12,
    
    marginBottom: 10,
    // borderRightColor:"red",
    // borderLeftColor:"red",
    // borderLeftWidth:2,
  },
  
  colorBar: {
    width: 6,
    height: 30,
    borderRadius: 3,
  },
  halfBarWrapper: {
    flexDirection: 'row',
    width: 6,
    height: 30,
  },
  halfBar: {
    width: 3,
    height: 30,
  },
  statusLabel: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    paddingLeft: 8,
  },
  statusValue: {
    color: '#fff',
    fontSize: 16,
  },

  // Bottom nav bar fixed at bottom
  bottomNavbarContainer: {
    position: 'absolute',
    bottom: -70,
    left: -15,
    right: -15,
  },
});
