import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import authAxios from "../../utils/authAxios";
import styles from "./styles";
import * as Notifications from "expo-notifications";
import Toast from "react-native-toast-message";

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
        console.warn(
          "Event time is in the past. Notification will not be scheduled."
        );
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

      let hours24 = hour % 12;
      if (ampm === "PM") hours24 += 12;

      const datetime = new Date(selectedDate);
      datetime.setHours(hours24, minute, 0, 0);

      if (datetime <= new Date()) {
        Toast.show({
          type: "error",
          text1: "Invalid Date",
          text2: "Date and time has passed",
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
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.overlay}>
            <ScrollView
              contentContainerStyle={{ flexGrow: 1, justifyContent: "flex-end" }}
              keyboardShouldPersistTaps="handled"
            >
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

                <Text style={styles.label}>Select Time</Text>
                <View style={styles.timePickerContainer}>
                  <Picker
                    selectedValue={hour}
                    dropdownIconColor="#fff"
                    style={styles.timePicker}
                    itemStyle={{ color: "#fff" }}
                    onValueChange={(val) => setHour(val)}
                  >
                    {[...Array(12)].map((_, i) => (
                      <Picker.Item
                        key={i}
                        label={`${i + 1}`}
                        value={i + 1}
                        color="#fff"
                      />
                    ))}
                  </Picker>

                  <Picker
                    selectedValue={minute}
                    dropdownIconColor="#fff"
                    style={styles.timePicker}
                    itemStyle={{ color: "#fff" }}
                    onValueChange={(val) => setMinute(val)}
                  >
                    {[...Array(60)].map((_, i) => (
                      <Picker.Item
                        key={i}
                        label={i.toString().padStart(2, "0")}
                        value={i}
                        color="#fff"
                      />
                    ))}
                  </Picker>

                  <Picker
                    selectedValue={ampm}
                    dropdownIconColor="#fff"
                    style={styles.timePicker}
                    itemStyle={{ color: "#fff" }}
                    onValueChange={(val) => setAmPm(val)}
                  >
                    <Picker.Item label="AM" value="AM" color="#fff" />
                    <Picker.Item label="PM" value="PM" color="#fff" />
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
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default AddEventModal;
