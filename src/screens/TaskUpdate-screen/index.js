import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from './styles';
import BottomNavbar from '../BottomNavbar';
import TaskModal from '../TaskModal';  // ✅ <-- Import your separate TaskModal component

const dates = [
  { day: 'Mon', date: '12', month: 'Mar' },
  { day: 'Tue', date: '13', month: 'Mar', active: true },
  { day: 'Wed', date: '14', month: 'Mar' },
  { day: 'Thu', date: '15', month: 'Mar' },
  { day: 'Fri', date: '16', month: 'Mar' },
  { day: 'Sat', date: '17', month: 'Mar' },
];

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

  const navigation = useNavigation();
  const route = useRoute();

  const handleSubmit = () => {
    console.log('Submitted:', { project, task, timeTaken });
    setModalVisible(false);
    setProject('');
    setTask('');
    setTimeTaken('');
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

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Daily task update</Text>
        <TouchableOpacity onPress={() => navigation.navigate("ProfileScreen")}>
        <Image
          source={{
            uri: 'https://i.imgur.com/4YQ1H5F.jpg',
          }}
          style={styles.avatarImage}
        />
        </TouchableOpacity>
      </View>

      {/* Calendar */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.calendar}>
        {dates.map((item, index) => (
          <View key={index} style={[styles.dateBox, item.active && styles.activeDateBox]}>
            <Text style={[styles.dayText, item.active && styles.activeDayText]}>{item.day}</Text>
            <Text style={[styles.dateText, item.active && styles.activeDateText]}>{item.date}</Text>
            <Text style={[styles.monthText, item.active && styles.activeDayText]}>{item.month}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Divider with Task Title */}
      <View style={styles.taskHeader}>
        <View style={styles.line} />
        <Text style={styles.taskTitle}>Task</Text>
        <View style={styles.line} />
      </View>

      {/* Tasks */}
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
        onPress={() => setModalVisible(true)}  // ✅ Open modal on press
      >
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
