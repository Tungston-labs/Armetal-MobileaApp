import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0C1427',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 10,
    gap: 10,
  },
  headerTime: {
    color: '#fff',
    fontSize: 14,
    marginRight: 6,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ccc',
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 12,
    marginBottom: 10,
  },
  dayItem: {
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  selectedDay: {
    backgroundColor: '#1C2F53',
    borderRadius: 10,
  },
  dayText: {
    color: '#888',
    fontSize: 13,
  },
  dateText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  monthText: {
    color: '#888',
    fontSize: 11,
  },
  taskSectionTitle: {
    color: '#888',
    marginHorizontal: 16,
    marginBottom: 6,
    fontWeight: 'bold',
  },
  taskList: {
    paddingBottom: 100,
  },
  taskCard: {
    backgroundColor: '#12214D',
    borderRadius: 10,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  projectLabel: {
    color: '#ccc',
    fontSize: 12,
  },
  projectText: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 6,
  },
  taskLabel: {
    color: '#ccc',
    fontSize: 12,
  },
  taskText: {
    color: '#fff',
    fontSize: 14,
  },
  timeRight: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
  timeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  timestamp: {
    color: '#999',
    fontSize: 12,
    marginTop: 6,
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
    color: '#fff',
    marginLeft: 6,
    fontWeight: '600',
    fontSize: 16,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    backgroundColor: '#172554',
    borderRadius: 12,
    padding: 20,
    width: width * 0.85,
  },
  modalTitle: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 12,
    fontWeight: 'bold',
  },
  inputLabel: {
    color: '#fff',
    marginTop: 8,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#1F3A74',
    backgroundColor: '#0C1427',
    color: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  timeInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: '#1F3A74',
    backgroundColor: '#0C1427',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
  },
  timeInput: {
    flex: 1,
    color: '#fff',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
  },
  cancelBtn: {
    backgroundColor: '#FF4444',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  cancelText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  submitBtn: {
    backgroundColor: '#3352BA',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 30,
  },
  submitText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
