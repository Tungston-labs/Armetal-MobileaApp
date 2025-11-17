import React from "react";
import { Modal, TouchableOpacity, View, Text, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function DatePickerModal({ visible, date, onClose, onChange }) {
  return (
    <Modal transparent animationType="fade" visible={visible} onRequestClose={onClose}>
      <TouchableOpacity
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.4)",
        }}
        activeOpacity={1}
        onPressOut={onClose}
      >
        <View
          style={{
            backgroundColor: "#fff",
            padding: 15,
            borderRadius: 12,
            width: "90%",
          }}
        >
          <DateTimePicker
            value={date}
            mode="date"
            display={Platform.OS === "ios" ? "inline" : "default"}
            onChange={(event, selectedDate) => {
              if (selectedDate) onChange(selectedDate);

              if (Platform.OS !== "ios") onClose(); // auto-close for Android
            }}
          />

          {/* iOS Done button */}
          {Platform.OS === "ios" && (
            <TouchableOpacity onPress={onClose} style={{ marginTop: 10, alignSelf: "flex-end" }}>
              <Text style={{ color: "#007aff", fontSize: 16 }}>Done</Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    </Modal>
  );
}
