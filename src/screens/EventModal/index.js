import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; 

import styles from "./styles";

const AddEventModal = ({ visible, onClose, selectedDate, onEventAdded }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = async () => {
    try {
      const datetime = new Date(selectedDate);
      const [hours, minutes] = time.split(":");
      datetime.setHours(hours);
      datetime.setMinutes(minutes);

      const isoDatetime = datetime.toISOString(); // <-- Correct format!

      const res = await fetch("http://178.248.112.16:8001/api/reminders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          body: description,
          scheduled_datetime: isoDatetime,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("API Error:", data);
        return;
      }

      onEventAdded(data);
      onClose();
    } catch (error) {
      console.error("Failed to add reminder:", error.message);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.header}>Add New Event</Text>

          <TextInput
            placeholder="Event Title"
            placeholderTextColor="#999"
            style={styles.input}
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            placeholder="Description"
            placeholderTextColor="#999"
            style={[styles.input, { height: 80 }]}
            multiline
            value={description}
            onChangeText={setDescription}
          />
          <TextInput
            placeholder="Time (e.g., 14:30)"
            placeholderTextColor="#999"
            style={styles.input}
            value={time}
            onChangeText={setTime}
          />

          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSubmit} style={styles.saveButton}>
              <Text style={styles.saveText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddEventModal;
