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
import AsyncStorage from '@react-native-async-storage/async-storage';

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
      Alert.alert('Validation Error', 'All fields are required.');
      return;
    }

    // ✅ Validate numeric value
    const hours = parseFloat(timeTaken);
    if (isNaN(hours) || hours <= 0) {
      Alert.alert('Invalid Input', 'Time taken must be a valid number greater than 0.');
      return;
    }

    // ✅ Validate hours <= 24
    if (hours > 24) {
      Alert.alert('Invalid Hours', 'Time taken cannot be more than 24 hours.');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('accessToken');
      if (!token) {
        Alert.alert('Error', 'Token not found');
        return;
      }

      const payload = {
        project,
        task,
        time_taken: hours,
      };

      await authAxios.post('/employee/tasks/', payload);

      Alert.alert('Success', 'Task submitted successfully!', [
        { text: 'OK', onPress: () => onSubmit() },
      ]);
    } catch (error) {
      console.error('❌ Task submission failed:', error.response?.data || error.message);
      Alert.alert('Error', 'Task submission failed.');
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

          <Text style={styles.inputLabel}>Time Taken (hours)</Text>
          <View style={styles.timeInputRow}>
            <View style={styles.iconBox}>
              <Ionicons name="time" size={20} color="#8a8dad" />
            </View>
            <TextInput
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
