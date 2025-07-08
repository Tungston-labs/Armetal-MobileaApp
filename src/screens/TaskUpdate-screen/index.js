import React, { useEffect, useState } from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// ✅ Utility function to get Monday of current week
const getStartOfWeek = (date) => {
  const d = new Date(date);
  const day = d.getDay(); // Sunday = 0
  const diff = d.getDate() - (day === 0 ? 6 : day - 1); // If Sunday, go back 6 days
  return new Date(d.setDate(diff));
};

export default function TaskUpdateScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [project, setProject] = useState('');
  const [task, setTask] = useState('');
  const [timeTaken, setTimeTaken] = useState('');
  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [weekStartDate, setWeekStartDate] = useState(getStartOfWeek(new Date()));

  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      const response = await axios.get('http://192.168.29.146:8000/api/employee/tasks/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(response.data.results || []);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  };

  const isSameDate = (date1, date2) =>
    new Date(date1).toDateString() === new Date(date2).toDateString();

  const filteredTasks = tasks.filter((item) =>
    isSameDate(item.updated_at, selectedDate)
  );

  const handleSubmit = () => {
    setModalVisible(false);
    setProject('');
    setTask('');
    setTimeTaken('');
  };

  const changeWeek = (direction) => {
    const newStart = new Date(weekStartDate);
    newStart.setDate(newStart.getDate() + direction * 7);
    setWeekStartDate(newStart);

    const sameDayOfWeek = new Date(newStart);
    sameDayOfWeek.setDate(newStart.getDate() + selectedDate.getDay() - 1);
    setSelectedDate(sameDayOfWeek);
  };

  const renderWeekDays = () => {
    return Array.from({ length: 6 }).map((_, i) => {
      const date = new Date(weekStartDate);
      date.setDate(weekStartDate.getDate() + i);
      const isSelected = selectedDate.toDateString() === date.toDateString();

      return (
        <TouchableOpacity
          key={i}
          style={[styles.dayItem, isSelected && styles.selectedDay]}
          onPress={() => setSelectedDate(date)}
        >
          <Text style={styles.dayText}>{date.toLocaleDateString('en-US', { weekday: 'short' })}</Text>
          <Text style={styles.dateText}>{date.getDate()}</Text>
          <Text style={styles.monthText}>{date.toLocaleDateString('en-US', { month: 'short' })}</Text>
        </TouchableOpacity>
      );
    });
  };

  const renderItem = ({ item }) => (
    <View style={styles.taskCard}>
      <View>
        <Text style={styles.projectLabel}>Project</Text>
        <Text style={styles.projectText}>{item.project}</Text>
        <Text style={styles.taskLabel}>Task</Text>
        <Text style={styles.taskText}>{item.task}</Text>
      </View>
      <View style={styles.timeRight}>
        <Text style={styles.timeText}>{item.time_taken} Hrs</Text>
      </View>
      <Text style={styles.timestamp}>
        {new Date(item.updated_at).toLocaleTimeString()}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTime}>11:07</Text>
        <Ionicons name="wifi" size={18} color="white" />
        <Ionicons name="battery-full" size={20} color="white" style={{ marginLeft: 8 }} />
      </View>

      {/* Title */}
      <View style={styles.titleRow}>
        <Text style={styles.title}>Daily task update</Text>
        <View style={styles.avatarCircle} />
      </View>

      {/* Arrows and Week Navigation */}
      <View style={styles.calendarNavRow}>
        <TouchableOpacity onPress={() => changeWeek(-1)}>
          <Ionicons name="chevron-back-circle" size={26} color="#000" />
        </TouchableOpacity>
        <View style={styles.daysRow}>
          {renderWeekDays()}
        </View>
        <TouchableOpacity onPress={() => changeWeek(1)}>
          <Ionicons name="chevron-forward-circle" size={26} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Task List */}
      <Text style={styles.taskSectionTitle}>Tasks on {selectedDate.toDateString()}</Text>
      <FlatList
        data={filteredTasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.taskList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={{ color: '#888', textAlign: 'center', marginTop: 20 }}>
            No tasks found for this date.
          </Text>
        }
      />

      {/* Add Task */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="add" size={20} color="#fff" />
        <Text style={styles.addText}>Add Task</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Task Update</Text>
            <Text style={styles.inputLabel}>Project</Text>
            <TextInput
              placeholder="Project"
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
