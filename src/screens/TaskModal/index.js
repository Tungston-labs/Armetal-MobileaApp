import React from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';
import authAxios from '../../utils/authAxios';
// import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

export default function TaskModal({
  visible,
  onClose,
  project,
  setProject,
  task,
  setTask,
  timeTaken,
  setTimeTaken,
  onSubmit,
}) {
  const handleSubmit = async () => {
    if (!project || !task || !timeTaken) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'All fields are required.',
      });
      return;
    }

     try {
      const token = await AsyncStorage.getItem('accessToken');
      if (!token) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Token not found',
        });
        return;
      }

      const payload = {
        project,
        task,
        time_taken: parseFloat(timeTaken),
      };

        await authAxios.post('/employee/tasks/', payload);

       Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Task submitted successfully!',
      });

      onSubmit(); // refresh list and clear form
    } catch (error) {
      console.error('❌ Task submission failed:', error.response?.data || error.message);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Task submission failed.',
      });
    }
  };
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalBackground}>
        <View style={styles.modalCard}>
          <Text style={styles.modalTitle}>Task Update</Text>

          <Text style={styles.inputLabel}>Project</Text>
          <TextInput
            placeholder="Project Name"
            value={project}
            onChangeText={setProject}
            style={styles.input}
            placeholderTextColor="#8a8dad"
          />

          <Text style={styles.inputLabel}>Task</Text>
          <TextInput
            placeholder="Task Details"
            value={task}
            onChangeText={setTask}
            style={styles.input}
            placeholderTextColor="#8a8dad"
          />

          <Text style={styles.inputLabel}>Time Taken</Text>
          <View style={styles.timeInputRow}>
            <View style={styles.iconBox}>
              <Ionicons name="time" size={20} color="#8a8dad" />
            </View>
            <TextInput
              placeholder="e.g. 3.5"
              value={timeTaken}
              onChangeText={setTimeTaken}
              style={styles.timeInput}
              placeholderTextColor="#8a8dad"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.modalActions}>
            <TouchableOpacity onPress={onClose} style={styles.cancelBtn}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleSubmit} style={styles.submitBtn}>
              <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
