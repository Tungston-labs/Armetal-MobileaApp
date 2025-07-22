import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
export const boxWidth = Math.floor((width - 80) / 7); // 80 = arrow + padding

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#151D34',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#262D40',
  
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop:40,
  },
  avatarImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginTop:40,
    
  },
  calendarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 16,
    paddingHorizontal: 8,
    marginLeft:-12,
  },
  arrowBox: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 25,
    height: 100,
  },
  calendar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    marginBottom: 16,
    borderWidth: 1,
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
    textAlign: 'right',
    marginTop: 6,
    fontSize: 12,
    color: '#FFFFFF',
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
});
