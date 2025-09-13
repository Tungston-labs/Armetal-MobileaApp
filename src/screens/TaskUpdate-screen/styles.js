import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
export const boxWidth = Math.floor((width - 80) / 7); // 80 = arrow + padding

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#151D34',
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#262D40",
    height:100,
    borderBottomWidth: 0.5,
    borderBottomColor: '#FFFF',
  },
  descriptionLabel: {
    marginTop: 6,
    fontWeight: '600',
    color: '#747C98',
    fontSize: 12,
  },
  descriptionText: {
    color: '#fff',
    fontSize: 14,
    marginTop: 12,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Raleway_700Bold',
    color: '#FFFFFF',
  },
  avatarImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginTop: 40,
  },
  calendarWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  arrowBox: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 25,
    height: 100,
  },
  calendar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  dateBox: {
    width: boxWidth,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#172554',
    marginHorizontal: 2,
  },
  activeDateBox: {
    backgroundColor: '#E1E8EC',
  },
  dayText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  activeDayText: {
    color: '#172554',
    fontWeight: 'bold',
  },
  dateText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  activeDateText: {
    color: '#172554',
    fontWeight: 'bold',
  },
  monthText: {
    color: '#848484',
    fontSize: 12,
  },
  taskHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    marginHorizontal: 16,
    gap: 8,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#737785',
  },
  taskTitle: {
    color: '#737785',
    fontWeight: 'bold',
    fontSize: 14,
  },
  taskList: {
    paddingBottom: 100,
  },
  taskCard: {
    backgroundColor: '#172554',
    borderRadius: 12,
    padding: 14,
    marginHorizontal: 16,
    borderWidth: 0.1,
    borderColor: '#FFFFFF',
  },
  taskRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  projectLabel: {
    color: '#747C98',
    fontSize: 12,
  },
  projectText: {
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 4,
  },
  taskLabel: {
    color: '#747C98',
    fontSize: 12,
  },
  taskText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  timeText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  timestamp: {
    fontSize: 12,
    color: "#bbb",
    textAlign: "right",
    marginRight: 20
  },
  addButton: {
    position: 'absolute',
    bottom: 80,
    left: 16,
    right: 16,
    backgroundColor: '#3352BA',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 10,
  },
  addText: {
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 6,
    fontSize: 16,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 90,
    backgroundColor: '#3352BA',
    width: 50,
    height: 50,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
});
