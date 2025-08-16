import React, { useState } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import authAxios from "../../utils/authAxios" ;
import styles from "./styles";

const AddEventModal = ({ visible, onClose, selectedDate, onEventAdded }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");

const handleSubmit = async () => {
  try {
    if (!title || !description || !time) {
      alert("Please fill in all fields");
      return;
    }

    if (!time.includes(":")) {
      alert("Please enter time in HH:MM format");
      return;
    }

    const [hours, minutes] = time.split(":").map(Number);

    if (
      isNaN(hours) ||
      isNaN(minutes) ||
      hours < 0 ||
      hours > 23 ||
      minutes < 0 ||
      minutes > 59
    ) {
      alert("Invalid time entered");
      return;
    }

    const datetime = new Date(selectedDate);
    datetime.setHours(hours, minutes, 0, 0);

    const isoDatetime = datetime.toISOString();

    const res = await authAxios.post("/reminders/", {
      title,
      body: description,
      scheduled_datetime: isoDatetime,
    });

    alert("Reminder set successfully!");

    onEventAdded(res.data);
    onClose();
  } catch (error) {
    console.error(
      "Failed to add reminder:",
      error.response?.data || error.message
    );

    alert(
      `Failed to add reminder: ${
        typeof error.response?.data === "string"
          ? error.response.data
          : error.message
      }`
    );
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
