import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Image,
  RefreshControl,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from './styles';
import BottomNavbar from '../BottomNavbar';
import TaskModal from '../TaskModal';
import moment from 'moment';
import authAxios from '../../utils/authAxios';
import SwipeLoader from "../../components/SwipeLoader"
const API_BASE_URL = 'http://178.248.112.16:8000';

export default function TaskUpdateScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
  const [dates, setDates] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [profilePic, setProfilePic] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [project, setProject] = useState('');
  const [task, setTask] = useState('');
  const [timeTaken, setTimeTaken] = useState('');
  const [loading, setLoading] = useState(true);   // ✅ new
  const [refreshing, setRefreshing] = useState(false); // ✅ new

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
      if (!refreshing) setLoading(true);
      const response = await authAxios.get(`/employee/tasks/?date=${date}`);
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
    } finally {
      setLoading(false);
    }
  };

  const fetchProfilePicture = async () => {
    try {
      const response = await authAxios.get('/profile/');
      const profilePicPath = response?.data?.profile_pic;
      const picUrl = profilePicPath
        ? `${API_BASE_URL}${profilePicPath}`
        : 'https://cdn-icons-png.flaticon.com/512/149/149071.png';
      setProfilePic(picUrl);
    } catch (error) {
      console.error('❌ Error fetching profile picture:', error?.message || error);
    }
  };

  useEffect(() => {
    const start = moment();
    setDates(getDateRange(start, selectedDate));
    fetchProfilePicture();
  }, []);

  useEffect(() => {
    fetchTasks(selectedDate);
    setDates(prevDates =>
      prevDates.map(d => ({
        ...d,
        active: d.fullDate === selectedDate,
      }))
    );
  }, [selectedDate]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchTasks(selectedDate);
    setRefreshing(false);
  }, [selectedDate]);

  const handleSubmit = () => {
    setModalVisible(false);
    setProject('');
    setTask('');
    setTimeTaken('');
    fetchTasks(selectedDate);
  };

const renderItem = ({ item }) => (
  <View style={{ marginBottom: 12 }}>
    {/* Task Card */}
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
    </View>

    {/* ✅ Timestamp outside the card */}
    <Text style={styles.timestamp}>{item.submittedAt}</Text>
  </View>
);


  const scrollCalendar = (direction) => {
    const newStart = moment(dates[0].fullDate).add(direction * 7, "days");
    const newSelected = newStart.format("YYYY-MM-DD");
    const newDates = getDateRange(newStart, newSelected);
    setDates(newDates);
    setSelectedDate(newSelected);
  };

  const onDateSelect = (dateObj) => {
    setSelectedDate(dateObj.fullDate);
    setDates(prevDates =>
      prevDates.map(d => ({
        ...d,
        active: d.fullDate === dateObj.fullDate,
      }))
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
  {/* Back Arrow + Title in one row */}
  <View style={{ flexDirection: "row", alignItems: "center", marginTop: 40 }}>
  <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 8 }}>
    <Ionicons name="arrow-back" size={24} color="#fff" />
  </TouchableOpacity>
  <Text style={styles.title}>Daily task update</Text>
</View>



  {/* Profile Pic */}
  <TouchableOpacity onPress={() => navigation.navigate("ProfileScreen")}>
    <Image source={{ uri: profilePic }} style={styles.avatarImage} />
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
      {loading ? (
        <SwipeLoader size="large" color="#fff" style={{ marginTop: 20 }} />
      ) : (
        <View style={{ flex: 1 }}>
          <FlatList
            data={tasks}
            renderItem={renderItem}
            keyExtractor={(item) => item.id?.toString()}
            contentContainerStyle={styles.taskList}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={["#ffffff", "#d3d3d3"]}
                tintColor="#ffffff"
                progressBackgroundColor={
                  Platform.OS === "android" ? "#2c2c2c" : "transparent"
                }
              />
            }
            ListEmptyComponent={
              <Text style={{ color: "#888", textAlign: "center", marginTop: 20 }}>
                No tasks found for this date.
              </Text>
            }
          />
        </View>
      )}





      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}>

        <Ionicons name="add" size={24} color="white" />
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
      <View style={{ position: "absolute", left: 0, right: 0, bottom: 0 }}>
        <BottomNavbar navigation={navigation} route={route} />
      </View>
    </SafeAreaView>
  );
}
