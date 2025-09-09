
import React, { useState } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker"; // install if not yet
import authAxios from "../../utils/authAxios";
import styles from "./styles";
import * as Notifications from "expo-notifications";

const AddEventModal = ({ visible, onClose, selectedDate, onEventAdded }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // 12-hour format states
  const [hour, setHour] = useState(12);
  const [minute, setMinute] = useState(0);
  const [ampm, setAmPm] = useState("AM");

  const scheduleNotification = async (eventDate, notifTitle, notifBody) => {
    try {
      const now = new Date();
      if (eventDate <= now) {
        console.warn("Event time is in the past. Notification will not be scheduled.");
        return;
      }
      await Notifications.scheduleNotificationAsync({
        content: {
          title: notifTitle,
          body: notifBody,
          sound: true,
        },
        trigger: eventDate,
      });
      console.log(`Notification scheduled for: ${eventDate}`);
    } catch (error) {
      console.error("Error scheduling notification:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!title || !description) {
        alert("Please fill in all fields");
        return;
      }

      // Convert 12-hour to 24-hour
      let hours24 = hour % 12; // convert 12 → 0
      if (ampm === "PM") hours24 += 12;

      const datetime = new Date(selectedDate);
      datetime.setHours(hours24, minute, 0, 0);

      const isoDatetime = datetime.toISOString();

      const res = await authAxios.post("/reminders/", {
        title,
        body: description,
        scheduled_datetime: isoDatetime,
      });

      await scheduleNotification(datetime, res.data.title, res.data.body);

      alert("Reminder set successfully!");
      onEventAdded(res.data);
      onClose();
    } catch (error) {
      console.error("❌ Failed to add reminder:", error.response?.data || error.message);
      alert(
        `Failed to add reminder: ${
          typeof error.response?.data === "string" ? error.response.data : error.message
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

          {/* Time Picker Section */}
         {/* Time Picker Section */}
<Text style={styles.label}>Select Time</Text>
<View style={styles.timePickerContainer}>
  {/* Hour Picker */}
  <Picker
    selectedValue={hour}
    dropdownIconColor="#e0e7ff"
    style={styles.timePicker}
    onValueChange={(itemValue) => setHour(itemValue)}
  >
    {[...Array(12)].map((_, i) => (
      <Picker.Item key={i} label={`${i + 1}`} value={i + 1} color="black" />
    ))}
  </Picker>

  {/* Minute Picker */}
  <Picker
    selectedValue={minute}
    dropdownIconColor="#e0e7ff"
    style={styles.timePicker}
    onValueChange={(itemValue) => setMinute(itemValue)}
  >
    {[...Array(60)].map((_, i) => (
      <Picker.Item
        key={i}
        label={i.toString().padStart(2, "0")}
        value={i}
        color="black"
      />
    ))}
  </Picker>

  {/* AM/PM Picker */}
  <Picker
    selectedValue={ampm}
    dropdownIconColor="#e0e7ff"
    style={styles.timePicker}
    onValueChange={(itemValue) => setAmPm(itemValue)}
  >
    <Picker.Item label="AM" value="AM" color="black" />
    <Picker.Item label="PM" value="PM" color="black" />
  </Picker>
</View>

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
