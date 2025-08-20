import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#151D34',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical:25,
    borderBottomWidth: 0.3,
    backgroundColor: "#262D40",
    borderBottomColor: '#FFFFFF',
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft:18,
    marginTop:25,
  },

  circleWrapper: {
    alignItems: "center",
    justifyContent: "center",
     marginTop:10,
     position: "relative",
    width: 200,
    height: 200,
    alignSelf: "center",
  },
  circle: {
    width: 140,
    height: 140,
    borderRadius: 100,
    backgroundColor: "#1D2C60",
    justifyContent: "center",
    alignItems: "center",
  },
  segment: {
    position: "absolute",
    width: 10,
    height: 7,
    borderRadius: 1,
  },
  dayText: { color: "#FFFFFF", fontSize: 16 },
  monthText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    marginTop: 5,
    
  },
  dateText: {
    color: "#fff",
    fontSize: 28,
    marginTop: 5,
    fontWeight: "600",
  },

  summaryCard: {
    backgroundColor: '#172555',
    padding: 15,
    marginTop: 10,
     marginHorizontal: 15,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 1,
  },
  centerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 3,
  },
  label: {
    color: '#fff',
    fontSize: 18,
    fontWeight: "500",
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
    fontSize: 15,
    fontWeight: "800",
    marginLeft: 6,
  },

  statusCard: {
    marginTop: 10,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#172555',
    padding: 17,
    marginBottom: 10,
    borderLeftWidth: 3,
    position: 'relative',
    marginHorizontal: 15,
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

  halfBorderWrapper: {
    position: 'absolute',
    left: -3,
    top: 0,
    bottom: 0,
    width: 3,
    flexDirection: 'column',
  },
  halfBorder: {
    flex: 1,
    width: 3,
  },

    bottomNavbarContainer: {
    position: 'absolute',
    bottom: 8,
    left: 0,
    right: 0,
  },
});


