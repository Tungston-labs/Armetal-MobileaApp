import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Platform } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Calendar } from "react-native-calendars";
import styles from "./styles";
import AddEventModal from "../../../screens/EventModal"
import authAxios from "../../../utils/authAxios" ;
const ReminderTab = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(new Date());
  const [yearPickerVisible, setYearPickerVisible] = useState(false);
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  // const API_BASE_URL = "http://178.248.112.16:8001";

useEffect(() => {
  const fetchReminders = async () => {
    try {
      const response = await authAxios.get(`/auth/reminders/`);
      setReminders(response.data);
    } catch (error) {
      console.error("Error fetching reminders:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchReminders();
}, []);


  const onChangeDate = (event, date) => {
    if (date) {
      setSelectedDate(date);
    }
    setShowPicker(false);
  };
  const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-GB").format(date);
  };
  const handleDateSelect = (day) => {
    const selected = new Date(day.timestamp);
    const today = new Date();
    selected.setHours(0, 0, 0, 0);

    setSelectedDate(selected);
    setShowCalendar(false);
  };
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

 const addReminder = async () => {
  try {
    const response = await authAxios.post(`/auth/reminders/`, {
      title: "New Reminder",
      description: "This is a test event",
      time: "10:00 AM",
      date: selectedDate.toISOString(), // Confirm with backend format
    });

    const newReminder = response.data;
    setReminders((prev) => [...prev, newReminder]);
  } catch (error) {
    console.error("Error adding reminder:", error?.response?.data || error.message);
  }
};


  return (
    <View style={styles.container}>
      {/* Date Picker Card */}

      {/* Date Selector */}
      <TouchableOpacity
        style={styles.dateCard}
        onPress={() => setShowCalendar(!showCalendar)}
      >
        <Ionicons
          name="calendar"
          size={22}
          color="#fff"
          style={{ marginRight: 10 }}
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.dateLabel}>Select a day</Text>
          <Text style={styles.selectedDate}>{formatDate(selectedDate)}</Text>
        </View>
        <Ionicons
          name={showCalendar ? "chevron-up" : "chevron-down"}
          size={20}
          color="#fff"
        />
      </TouchableOpacity>
      {/* Native Date Picker */}
      {showPicker && (
        <DateTimePicker
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          value={selectedDate}
          onChange={onChangeDate}
        />
      )}
      {showCalendar && (
        <>
          <View style={styles.calendarWrapper}>
            <View style={styles.calendarContainer}>
              <Calendar
                key={calendarMonth.toISOString()}
                current={`${calendarMonth.getFullYear()}-${String(
                  calendarMonth.getMonth() + 1
                ).padStart(2, "0")}-01`}
                onDayPress={handleDateSelect}
                monthFormat={"MMMM yyyy"}
                hideArrows={true}
                dayComponent={({ date, state }) => {
                  const isSunday = new Date(date.dateString).getDay() === 0;
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        handleDateSelect({
                          dateString: date.dateString,
                          timestamp: new Date(date.dateString).getTime(),
                        })
                      }
                    >
                      <Text
                        style={{
                          textAlign: "center",
                          padding: 8,
                          borderRadius: 8,
                          backgroundColor:
                            formatDate(selectedDate) ===
                            formatDate(new Date(date.dateString))
                              ? "#2814e0ff"
                              : "transparent",
                          color: isSunday
                            ? "#FF4B4B"
                            : state === "disabled"
                            ? "#3e4e6c"
                            : "#fff",
                        }}
                      >
                        {date.day}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
                renderHeader={(date) => {
                  const month = monthNames[date.getMonth()];
                  const year = date.getFullYear();

                  return (
                    <View style={styles.calendarHeader}>
                      <View style={styles.monthWithArrow}>
                        <TouchableOpacity
                          onPress={() => {
                            const newDate = new Date(calendarMonth);
                            newDate.setMonth(newDate.getMonth() - 1);
                            setCalendarMonth(newDate);
                          }}
                        >
                          <Ionicons
                            name="chevron-back"
                            size={22}
                            color="#fff"
                          />
                        </TouchableOpacity>
                        <Text style={styles.monthText}>{month}</Text>
                        <TouchableOpacity
                          onPress={() => {
                            const newDate = new Date(calendarMonth);
                            newDate.setMonth(newDate.getMonth() + 1);
                            setCalendarMonth(newDate);
                          }}
                        >
                          <Ionicons
                            name="chevron-forward"
                            size={22}
                            color="#fff"
                          />
                        </TouchableOpacity>
                      </View>
                      Year only on right side
                      <TouchableOpacity
                        onPress={() => setYearPickerVisible(true)}
                      >
                        <Text style={styles.yearText}>{year}</Text>
                      </TouchableOpacity>
                    </View>
                  );
                }}
                theme={{
                  backgroundColor: "#172554",
                  calendarBackground: "#172554",
                  textSectionTitleColor: "#fff",
                  selectedDayBackgroundColor: "#2814e0ff",
                  selectedDayTextColor: "#fff",
                  todayTextColor: "#fff",
                  dayTextColor: "#fff",
                  textDisabledColor: "#3e4e6c",
                  arrowColor: "#fff",
                }}
                style={styles.calendar}
              />

              {/* Year Picker Modal */}
              {yearPickerVisible && (
                <Modal transparent animationType="fade">
                  <View style={styles.modalOverlay}>
                    <View style={styles.yearPickerContainer}>
                      <FlatList
                        data={Array.from({ length: 20 }, (_, i) => 2010 + i)}
                        keyExtractor={(item) => item.toString()}
                        renderItem={({ item }) => (
                          <TouchableOpacity
                            onPress={() => {
                              const updated = new Date(calendarMonth);
                              updated.setFullYear(item);
                              setCalendarMonth(updated); // This re-renders calendar
                              setYearPickerVisible(false);
                            }}
                          >
                            <Text style={styles.yearItem}>{item}</Text>
                          </TouchableOpacity>
                        )}
                      />
                    </View>
                  </View>
                </Modal>
              )}
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setShowCalendar(false)}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.doneButton}
              onPress={() => setShowCalendar(false)}
            >
              <Text style={styles.doneText}>Done</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
      {/* Reminders */}
      <FlatList
        data={reminders}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => (
          <View style={styles.reminderCard}>
            <Text style={styles.reminderTitle}>{item.title}</Text>
            <View style={styles.reminderTimeBox}>
              <Ionicons
                name="time-outline"
                size={14}
                color="#fff"
                style={{ marginRight: 6 }}
              />
              <Text style={styles.reminderTimeText}>{item.time}</Text>
            </View>
            <Text style={styles.reminderDescription}>{item.description}</Text>
          </View>
        )}
      />

      {/* Add Event Button */}
      <TouchableOpacity
        style={styles.addEventBtn}
        onPress={() => setShowAddModal(true)}
      >
        <Ionicons name="add" size={20} color="#fff" />
        <Text style={styles.addEventText}>Add Event</Text>
      </TouchableOpacity>
      {showAddModal && (
        <AddEventModal
          visible={showAddModal}
          onClose={() => setShowAddModal(false)}
          selectedDate={selectedDate}
          onEventAdded={(newEvent) =>
            setReminders((prev) => [...prev, newEvent])
          }
        />
      )}
    </View>
  );
};
export default ReminderTab;
