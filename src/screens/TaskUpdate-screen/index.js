import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Dimensions,
} from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles, { boxWidth } from './styles';
import BottomNavbar from '../BottomNavbar';
import TaskModal from '../TaskModal';
import axios from 'axios';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TaskUpdateScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
  const [dates, setDates] = useState([]);
  const [tasks, setTasks] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [project, setProject] = useState('');
  const [task, setTask] = useState('');
  const [timeTaken, setTimeTaken] = useState('');

  const getDateRange = (startDate, selected) => {
    return Array.from({ length: 7 }).map((_, index) => {
      const date = startDate.clone().add(index, 'days');
      return {
        day: date.format('ddd'),
        date: date.format('D'),
        month: date.format('MMM'),
        fullDate: date.format('YYYY-MM-DD'),
        active: date.format('YYYY-MM-DD') === selected,
      };
    });
  };

  const fetchTasks = async (date) => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      if (!token) {
        console.warn('⚠️ No token found in AsyncStorage');
        return;
      }

      const response = await axios.get(
        `http://178.248.112.16:8000/api/employee/tasks/?date=${date}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const taskList = response.data.results.map(item => ({
        id: item.id,
        project: item.project,
        task: item.task,
        time: `${parseFloat(item.time_taken).toFixed(2)} Hrs`,
        submittedAt: moment(item.updated_at).format('hh:mm A'),
      }));
      setTasks(taskList);
    } catch (error) {
      console.error('❌ Error fetching tasks:', error.response?.data || error.message);
    }
  };

  useEffect(() => {
    const start = moment(selectedDate);
    setDates(getDateRange(start, selectedDate));
    fetchTasks(selectedDate);
  }, [selectedDate]);

  const handleSubmit = () => {
  setModalVisible(false);
  setProject('');
  setTask('');
  setTimeTaken('');
  fetchTasks(selectedDate); // Refresh task list after new task is added
};


  const renderItem = ({ item }) => (
    <View style={styles.taskCard}>
      <View style={styles.taskRow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.projectLabel}>Project</Text>
          <Text style={styles.projectText}>{item.project}</Text>
          <Text style={styles.taskLabel}>Task</Text>
          <Text style={styles.taskText}>{item.task}</Text>
        </View>
        <Text style={styles.timeText}>{item.time}</Text>
      </View>
      <Text style={styles.timestamp}>{item.submittedAt}</Text>
    </View>
  );

  const scrollCalendar = (direction) => {
    const newStart = moment(dates[0].fullDate).add(direction * 7, 'days');
    const newSelected = newStart.format('YYYY-MM-DD');
    setSelectedDate(newSelected);
  };

  const onDateSelect = (dateObj) => {
    setSelectedDate(dateObj.fullDate);
    setDates(dates.map(d => ({
      ...d,
      active: d.fullDate === dateObj.fullDate,
    })));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Daily task update</Text>
        <TouchableOpacity onPress={() => navigation.navigate("ProfileScreen")}>
          <Image
            source={{ uri: 'https://i.imgur.com/4YQ1H5F.jpg' }}
            style={styles.avatarImage}
          />
        </TouchableOpacity>
      </View>

      {/* Calendar */}
      <View style={styles.calendarWrapper}>
        <TouchableOpacity onPress={() => scrollCalendar(-1)} style={styles.arrowBox}>
          <AntDesign name="left" size={18} color="gray" />
        </TouchableOpacity>

        <View style={styles.calendar}>
          {dates.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.dateBox, item.active && styles.activeDateBox]}
              onPress={() => onDateSelect(item)}
            >
              <Text style={[styles.dayText, item.active && styles.activeDayText]}>{item.day}</Text>
              <Text style={[styles.dateText, item.active && styles.activeDateText]}>{item.date}</Text>
              <Text style={[styles.monthText, item.active && styles.activeDayText]}>{item.month}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity onPress={() => scrollCalendar(1)} style={styles.arrowBox}>
          <AntDesign name="right" size={18} color="gray" />
        </TouchableOpacity>
      </View>

      {/* Divider */}
      <View style={styles.taskHeader}>
        <View style={styles.line} />
        <Text style={styles.taskTitle}>Task</Text>
        <View style={styles.line} />
      </View>

      {/* Task List */}
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id?.toString()}
        contentContainerStyle={styles.taskList}
        showsVerticalScrollIndicator={false}
      />

      {/* Add Task */}
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Ionicons name="add" size={20} color="#fff" />
        <Text style={styles.addText}>Add Task</Text>
      </TouchableOpacity>

      {/* Modal */}
      <TaskModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        project={project}
        setProject={setProject}
        task={task}
        setTask={setTask}
        timeTaken={timeTaken}
        setTimeTaken={setTimeTaken}
        onSubmit={handleSubmit}
      />

      {/* Bottom Nav */}
      <BottomNavbar navigation={navigation} route={route} />
    </SafeAreaView>
  );
}
