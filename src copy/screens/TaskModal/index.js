import React from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';
import authAxios from '../../utils/authAxios';
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
  description,
  setDescription,
}) {
  const handleSubmit = async () => {
    if (!project || !task || !timeTaken) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'All fields are required.',
        text1Style: { fontSize: 18, fontFamily: "Montserrat_700Bold" },
        text2Style: { fontSize: 15, fontFamily: "Raleway_500Medium" },
      });
      return;
    }

    if (project.length > 100) {
      Toast.show({
        type: 'error',
        text1: 'Too Long',
        text2: 'Project title cannot exceed 100 characters.',
        text1Style: { fontSize: 18, fontFamily: "Montserrat_700Bold" },
        text2Style: { fontSize: 15, fontFamily: "Raleway_500Medium" },
      });
      return;
    }

    const hours = parseFloat(timeTaken);
    if (isNaN(hours) || hours <= 0) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Input',
        text2: 'Time taken must be a number greater than 0.',
        text1Style: { fontSize: 18, fontFamily: "Montserrat_700Bold" },
        text2Style: { fontSize: 15, fontFamily: "Raleway_500Medium" },
      });
      return;
    }

    if (hours > 24) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Hours',
        text2: 'Time taken cannot be more than 24 hours.',
        text1Style: { fontSize: 18, fontFamily: "Montserrat_700Bold" },
        text2Style: { fontSize: 15, fontFamily: "Raleway_500Medium" },
      });
      return;
    }

    try {
      const token = await AsyncStorage.getItem('accessToken');
      if (!token) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Token not found.',
          text1Style: { fontSize: 18, fontFamily: "Montserrat_700Bold" },
          text2Style: { fontSize: 15, fontFamily: "Raleway_500Medium" },
        });
        return;
      }

      const payload = {
        project,
        task,
        description,
        time_taken: hours,
      };

      await authAxios.post('/employee/tasks/', payload);

      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Task submitted successfully!',
        text1Style: { fontSize: 18, fontFamily: "Montserrat_700Bold" },
        text2Style: { fontSize: 15, fontFamily: "Raleway_500Medium" },
      });

      onSubmit();
    } catch (error) {
      const errorMsg =
        error.response?.data?.time_taken?.[0] ||
        error.response?.data?.detail ||
        'Daily total cannot exceed 24 hours.';

      Toast.show({
        type: 'error',
        text1: '',
        text2: errorMsg,
        text1Style: { fontSize: 18, fontFamily: "Montserrat_700Bold" },
        text2Style: { fontSize: 15, fontFamily: "Raleway_500Medium" },
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

          <Text style={styles.inputLabel}>Description</Text>
          <TextInput
            placeholder="Task Description"
            value={description}
            onChangeText={setDescription}
            style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
            placeholderTextColor="#8a8dad"
            multiline={true}
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
