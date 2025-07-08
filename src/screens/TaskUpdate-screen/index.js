import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from './styles';
import BottomNavbar from '../BottomNavbar';

const sampleTasks = [
  {
    id: '1',
    project: 'Tijara',
    task: 'Design Social Media Graphics for Product Launch',
    time: '3:55 Hrs',
    submittedAt: '9:30 AM',
  },
  {
    id: '2',
    project: 'Tijara',
    task: 'Design Social Media Graphics for Product Launch',
    time: '3:55 Hrs',
    submittedAt: '9:30 AM',
  },
  {
    id: '3',
    project: 'Tijara',
    task: 'Design Social Media Graphics for Product Launch',
    time: '3:55 Hrs',
    submittedAt: '9:30 AM',
  },
];

export default function TaskUpdateScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [project, setProject] = useState('');
  const [task, setTask] = useState('');
  const [timeTaken, setTimeTaken] = useState('');

  const handleSubmit = () => {
    // You can handle task submission logic here
    setModalVisible(false);
    setProject('');
    setTask('');
    setTimeTaken('');
  };
const navigation = useNavigation(); 
  const route = useRoute();  


  const renderItem = ({ item }) => (
    <View style={styles.taskCard}>
      <View>
        <Text style={styles.projectLabel}>Project</Text>
        <Text style={styles.projectText}>{item.project}</Text>
        <Text style={styles.taskLabel}>Task</Text>
        <Text style={styles.taskText}>{item.task}</Text>
      </View>
      <View style={styles.timeRight}>
        <Text style={styles.timeText}>{item.time}</Text>
      </View>
      <Text style={styles.timestamp}>{item.submittedAt}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <Text style={styles.headerTime}>11:07</Text>
        <Ionicons name="wifi" size={18} color="white" />
        <Ionicons name="battery-full" size={20} color="white" style={{ marginLeft: 8 }} />
      </View>

      {/* Title and Profile */}
      <View style={styles.titleRow}>
        <Text style={styles.title}>Daily task update</Text>
        <View style={styles.avatarCircle} />
      </View>

      {/* Week Days Row */}
      <View style={styles.daysRow}>
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
          <View
            key={i}
            style={[styles.dayItem, day === 'Tue' && styles.selectedDay]}
          >
            <Text style={styles.dayText}>{day}</Text>
            <Text style={styles.dateText}>{13 + i}</Text>
            <Text style={styles.monthText}>Mar</Text>
          </View>
        ))}
      </View>

      {/* Task List */}
      <Text style={styles.taskSectionTitle}>Task</Text>
      <FlatList
        data={sampleTasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.taskList}
        showsVerticalScrollIndicator={false}
      />

      {/* Add Task Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="add" size={20} color="#fff" />
        <Text style={styles.addText}>Add Task</Text>
      </TouchableOpacity>

      {/* Modal for Task Update */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Task Update</Text>
            <Text style={styles.inputLabel}>Project</Text>
            <TextInput
              placeholder="Task Details"
              value={project}
              onChangeText={setProject}
              style={styles.input}
              placeholderTextColor="#888"
            />
            <Text style={styles.inputLabel}>Task</Text>
            <TextInput
              placeholder="Task Details"
              value={task}
              onChangeText={setTask}
              style={styles.input}
              placeholderTextColor="#888"
            />
            <Text style={styles.inputLabel}>Time Taken</Text>
            <View style={styles.timeInputRow}>
              <Ionicons name="time" size={20} color="#fff" />
              <TextInput
                placeholder="Select time"
                value={timeTaken}
                onChangeText={setTimeTaken}
                style={styles.timeInput}
                placeholderTextColor="#888"
              />
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.cancelBtn}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleSubmit}
                style={styles.submitBtn}
              >
                <Text style={styles.submitText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>
      </Modal>

      <BottomNavbar navigation={navigation} route={route} />
    </SafeAreaView>
  );
}
