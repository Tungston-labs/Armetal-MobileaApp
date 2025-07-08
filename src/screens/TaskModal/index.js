import React from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles'; // You can move modal styles to a separate file if needed

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
              placeholder="e.g. 3:00 Hrs"
              value={timeTaken}
              onChangeText={setTimeTaken}
              style={styles.timeInput}
              placeholderTextColor="#8a8dad"
            />
          </View>

          {/* Buttons */}
          <View style={styles.modalActions}>
            <TouchableOpacity
              onPress={onClose}
              style={styles.cancelBtn}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onSubmit}
              style={styles.submitBtn}
            >
              <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
