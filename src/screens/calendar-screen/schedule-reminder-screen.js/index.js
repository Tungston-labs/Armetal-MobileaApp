// ReminderTab.optimized.js (drop-in replacement)
import React, { useEffect, useState, useRef, useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  Modal,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Calendar } from "react-native-calendars";
import styles from "./styles";
import AddEventModal from "../../../screens/EventModal";
import authAxios from "../../../utils/authAxios";
import DateTimePicker from '@react-native-community/datetimepicker';

const ReminderTab = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(new Date());
  const [yearPickerVisible, setYearPickerVisible] = useState(false);
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  // tokenLoaded ensures we don't call endpoints before an access token is available

  // refs to prevent duplicate fetches / debounce
  const isFetchingRef = useRef(false);
  const debounceTimerRef = useRef(null);

  const monthNames = useMemo(
    () => [
      "January", "February", "March", "April", "May", "June", "July", "August",
      "September", "October", "November", "December"
    ],
    []
  );

  // load token once on mount and only then do the initial fetch
  useEffect(() => {
    fetchReminders();
  }, []);


  const fetchReminders = async (date = null) => {
    setLoading(true);
    try {
      const endpoint = date ? `/reminders/?date=${date}` : `/reminders/`;
      const response = await authAxios.get(endpoint);
      const data = response.data?.results ?? response.data ?? [];
      setReminders(data);
    } catch (error) {
      console.error("Error fetching reminders:", error?.response?.data ?? error.message);
      setReminders([]);
    } finally {
      setLoading(false);
    }
  };


  // Debounced date selection: avoid firing many calls when user taps quickly
  const handleDateSelect = (day) => {
    setSelectedDate(new Date(day.dateString));  // direct, no conversion
    setShowCalendar(false);

    const utcDate = day.dateString; // already in YYYY-MM-DD

    // debounce
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = setTimeout(() => {
      fetchReminders(utcDate);
      debounceTimerRef.current = null;
    }, 180);
  };


  const onChangeDate = (event, date) => {
    if (date) setSelectedDate(date);
    setShowPicker(false);
  };

  // helper: cheap string compared selected date to avoid heavy formatting inside dayComponent
  const selectedDateString = selectedDate ? selectedDate.toISOString().split("T")[0] : null;
  const formatDate = (d) => (d ? new Intl.DateTimeFormat("en-GB").format(d) : "N/A");

  return (
    <View style={styles.container}>
      {/* Date Selector */}
      <TouchableOpacity
        style={styles.dateCard}
        onPress={() => setShowCalendar((s) => !s)}
      >
        <Ionicons name="calendar" size={22} color="#fff" style={{ marginRight: 10 }} />
        <View style={{ flex: 1 }}>
          <Text style={styles.dateLabel}>Select a day</Text>
          <Text style={styles.selectedDate}>{formatDate(selectedDate)}</Text>
        </View>
        <Ionicons name={showCalendar ? "chevron-up" : "chevron-down"} size={20} color="#fff" />
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          value={selectedDate || new Date()}
          onChange={onChangeDate}
        />
      )}

      {showCalendar && (
        <>
          <View style={styles.calendarWrapper}>
            <View style={styles.calendarContainer}>
              <Calendar
                // remove 'key' to avoid forced remounts
                current={`${calendarMonth.getFullYear()}-${String(calendarMonth.getMonth() + 1).padStart(2, '0')}-01`}
                onDayPress={handleDateSelect}
                monthFormat={"MMMM yyyy"}
                hideArrows={true}
                dayComponent={({ date, state }) => {
                  const isSunday = new Date(date.dateString).getDay() === 0;
                  const isSelected = date.dateString === selectedDateString;
                  return (
                    <TouchableOpacity
                      onPress={() => handleDateSelect({ dateString: date.dateString })}

                    >
                      <Text
                        style={{
                          textAlign: "center",
                          padding: 8,
                          borderRadius: 8,
                          backgroundColor: isSelected ? "#2814e0ff" : "transparent",
                          color: isSunday ? "#FF4B4B" : state === "disabled" ? "#3e4e6c" : "#fff",
                        }}
                      >
                        {date.day}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
                renderHeader={(dateObj) => {
                  const month = monthNames[dateObj.getMonth()];
                  const year = dateObj.getFullYear();
                  return (
                    <View style={styles.calendarHeader}>
                      <View style={styles.monthWithArrow}>
                        <TouchableOpacity onPress={() => {
                          const newDate = new Date(calendarMonth);
                          newDate.setMonth(newDate.getMonth() - 1);
                          setCalendarMonth(newDate);
                        }}>
                          <Ionicons name="chevron-back" size={22} color="#fff" />
                        </TouchableOpacity>

                        <Text style={styles.monthText}>{month}</Text>

                        <TouchableOpacity onPress={() => {
                          const newDate = new Date(calendarMonth);
                          newDate.setMonth(newDate.getMonth() + 1);
                          setCalendarMonth(newDate);
                        }}>
                          <Ionicons name="chevron-forward" size={22} color="#fff" />
                        </TouchableOpacity>
                      </View>

                      <TouchableOpacity onPress={() => setYearPickerVisible(true)}>
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

              {yearPickerVisible && (
                <Modal transparent animationType="fade">
                  <View style={styles.modalOverlay}>
                    <View style={styles.yearPickerContainer}>
                      <TouchableOpacity style={styles.backButton} onPress={() => setYearPickerVisible(false)}>
                        <Ionicons name="chevron-back" size={22} color="#fff" />
                      </TouchableOpacity>

                      <FlatList
                        data={Array.from({ length: 20 }, (_, i) => 2010 + i)}
                        keyExtractor={(item) => item.toString()}
                        renderItem={({ item }) => (
                          <TouchableOpacity onPress={() => {
                            const updated = new Date(calendarMonth);
                            updated.setFullYear(item);
                            setCalendarMonth(updated);
                            setYearPickerVisible(false);
                          }}>
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
        </>
      )}

      {/* Reminders */}
      {loading ? (
        <ActivityIndicator size="large" color="#000" style={{ marginTop: 30 }} />
      ) : (
        <FlatList
          data={reminders}
          keyExtractor={(item, index) => (item?.id != null ? item.id.toString() : index.toString())}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={<Text style={{ textAlign: "center", color: "white", marginTop: 20 }}>No reminders found</Text>}
          renderItem={({ item }) => {
            const dateObj = item?.scheduled_datetime ? new Date(item.scheduled_datetime) : null;
            const timeString = dateObj ? dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "--:--";
            return (
              <View style={styles.reminderCard}>
                <Text style={styles.reminderTitle}>{item?.title || "No Title"}</Text>
                <View style={styles.reminderTimeBox}>
                  <Ionicons name="time-outline" size={14} color="#fff" style={{ marginRight: 6 }} />
                  <Text style={styles.reminderTimeText}>{timeString}</Text>
                </View>
                <Text style={styles.reminderDescription}>{item?.body || ""}</Text>
              </View>
            );
          }}
        />
      )}

      <TouchableOpacity style={styles.fab} onPress={() => setShowAddModal(true)}>
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>

      {showAddModal && (
        <AddEventModal
          visible={showAddModal}
          onClose={() => setShowAddModal(false)}
          selectedDate={selectedDate}
          onEventAdded={(newEvent) =>
            setReminders((prev) =>
              [...prev, newEvent].sort((a, b) => new Date(a.scheduled_datetime).getTime() - new Date(b.scheduled_datetime).getTime())
            )
          }
        />
      )}
    </View>
  );
};

export default ReminderTab;
