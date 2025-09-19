import React, { useState } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import authAxios from "../../utils/authAxios";
import styles from "./styles";
import * as Notifications from "expo-notifications";
import Toast from "react-native-toast-message"; // ✅ Add this

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
    } catch (error) {
      console.error("Error scheduling notification:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!title || !description) {
        Toast.show({
          type: "error",
          text1: "Validation Error",
          text2: "Please fill in all fields",
          text1Style: { fontSize: 18, fontFamily: "Montserrat_700Bold" },
          text2Style: { fontSize: 15, fontFamily: "Raleway_500Medium" },
        });
        return;
      }
  
      // ✅ Title length validation
      if (title.length > 100) {
        Toast.show({
          type: "error",
          text1: "Validation Error",
          text2: "Title cannot exceed 100 characters",
          text1Style: { fontSize: 18, fontFamily: "Montserrat_700Bold" },
          text2Style: { fontSize: 15, fontFamily: "Raleway_500Medium" },
        });
        return;
      }
  
      // Convert 12-hour to 24-hour
      let hours24 = hour % 12;
      if (ampm === "PM") hours24 += 12;
  
      const datetime = new Date(selectedDate);
      datetime.setHours(hours24, minute, 0, 0);
  
      // ✅ Validation: prevent past date/time
      if (datetime <= new Date()) {
        Toast.show({
          type: "error",
          text1: "Invalid Date",
          text2: "date and time has passed",
          text1Style: { fontSize: 18, fontFamily: "Montserrat_700Bold" },
          text2Style: { fontSize: 15, fontFamily: "Raleway_500Medium" },
        });
        return;
      }
  
      const isoDatetime = datetime.toISOString();
  
      const res = await authAxios.post("/reminders/", {
        title,
        body: description,
        scheduled_datetime: isoDatetime,
      });
  
      await scheduleNotification(datetime, res.data.title, res.data.body);
  
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Reminder set successfully!",
        text1Style: { fontSize: 18, fontFamily: "Montserrat_700Bold" },
        text2Style: { fontSize: 15, fontFamily: "Raleway_500Medium" },
      });
  
      onEventAdded(res.data);
      onClose();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to add reminder",
        text1Style: { fontSize: 18, fontFamily: "Montserrat_700Bold" },
        text2Style: { fontSize: 15, fontFamily: "Raleway_500Medium" },
      });
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
            style={[styles.input1, { height: 60 }]}
            value={title}
            onChangeText={setTitle}
            maxLength={100} 
          />

          <TextInput
            placeholder="Description"
            placeholderTextColor="#999"
            style={[styles.input2, { height: 90 }]}
            multiline
            value={description}
            onChangeText={setDescription}
          />

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
