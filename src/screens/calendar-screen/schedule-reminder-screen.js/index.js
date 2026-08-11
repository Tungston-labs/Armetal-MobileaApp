import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  Modal,
  RefreshControl,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Calendar } from "react-native-calendars";
import styles from "./styles";
import AddEventModal from "../../../screens/EventModal";
import authAxios from "../../../utils/authAxios";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useRefreshOnReconnect from "../../../hooks/useRefreshOnReconnect";


const ReminderTab = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(new Date());
  const [yearPickerVisible, setYearPickerVisible] = useState(false);
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const insets = useSafeAreaInsets();

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

  const toApiDate = useCallback((date) => {
    const localDate = new Date(date);
    localDate.setHours(0, 0, 0, 0);

    return new Date(
      localDate.getTime() - localDate.getTimezoneOffset() * 60000
    )
      .toISOString()
      .split("T")[0];
  }, []);

  const fetchReminders = useCallback(async (date = null, { showLoader = false } = {}) => {
    if (showLoader) setLoading(true);

    try {
      const endpoint = date ? `/reminders?date=${date}` : `/reminders/`;
      const response = await authAxios.get(endpoint);

      const data = response.data?.results ?? response.data ?? [];
      setReminders(data);
      setError(null);
    } catch (error) {
      console.error(
        "Error fetching reminders:",
        error?.response?.data || error.message || error
      );
      setReminders([]);
      setError("Failed to fetch reminders. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReminders(null, { showLoader: true }); // initial load
  }, [fetchReminders]);

  useRefreshOnReconnect(() => fetchReminders(toApiDate(selectedDate)));

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchReminders(toApiDate(selectedDate));
    setRefreshing(false);
  }, [fetchReminders, selectedDate, toApiDate]);

  const handleDateSelect = (day) => {
    const localDate = new Date(day.timestamp);
    localDate.setHours(0, 0, 0, 0);

    setSelectedDate(localDate);
    setShowCalendar(false);

    fetchReminders(toApiDate(localDate), { showLoader: true });
  };

  const onChangeDate = (event, date) => {
    if (date) setSelectedDate(date);
    setShowPicker(false);
  };

  const formatDate = (date) => {
    return date ? new Intl.DateTimeFormat("en-GB").format(date) : "N/A";
  };

  return (
    <View style={styles.container}>
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
                key={calendarMonth.toISOString()}
                current={`${calendarMonth.getFullYear()}-${String(
                  calendarMonth.getMonth() + 1
                ).padStart(2, "0")}-01`}
                onDayPress={handleDateSelect}
                monthFormat={"MMMM yyyy"}
                hideArrows={true}
                dayComponent={({ date, state }) => {
                  const isSunday =
                    new Date(date.dateString).getDay() === 0;
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

             {yearPickerVisible && (
  <Modal transparent animationType="fade">
    <View style={styles.modalOverlay}>
      <View style={styles.yearPickerContainer}>
        {/* Back / Close button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setYearPickerVisible(false)}
        >
          <Ionicons name="chevron-back" size={22} color="#fff" />
        </TouchableOpacity>

        <FlatList
          data={Array.from({ length: 20 }, (_, i) => 2010 + i)}
          keyExtractor={(item) => item.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                const updated = new Date(calendarMonth);
                updated.setFullYear(item);
                setCalendarMonth(updated);
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

        </>
      )}

      {/* Reminders */}
      {loading && reminders.length === 0 ? (
        <ActivityIndicator
          size="large"
          color="#000"
          style={{ marginTop: 30 }}
        />
      ) : (
        <FlatList
          data={error ? [] : reminders}
          keyExtractor={(item, index) =>
            item?.id != null ? item.id.toString() : index.toString()
          }
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#ffffff", "#d3d3d3"]}
              tintColor="#ffffff"
              progressBackgroundColor={
                Platform.OS === "android" ? "#2c2c2c" : "transparent"
              }
            />
          }
          ListEmptyComponent={
            <Text
              style={{ textAlign: "center", color: "white", marginTop: 20 }}
            >
              {error || "No reminders found"}
            </Text>
          }
          renderItem={({ item }) => {
            const dateObj = item?.scheduled_datetime
              ? new Date(item.scheduled_datetime)
              : null;
            const timeString = dateObj
              ? dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
              : "--:--";

            return (
              <View style={styles.reminderCard}>
                <Text style={styles.reminderTitle}>{item?.title || "No Title"}</Text>
                <View style={styles.reminderTimeBox}>
                  <Ionicons
                    name="time-outline"
                    size={14}
                    color="#fff"
                    style={{ marginRight: 6 }}
                  />
                  <Text style={styles.reminderTimeText}>{timeString}</Text>
                </View>
                <Text style={styles.reminderDescription}>{item?.body || ""}</Text>
              </View>
            );
          }}
        />
      )}

      <TouchableOpacity
  style={[styles.fab, { bottom: styles.fab.bottom + insets.bottom }]}
        onPress={() => setShowAddModal(true)}
      >
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>


      {showAddModal && (
        <AddEventModal
          visible={showAddModal}
          onClose={() => setShowAddModal(false)}
          selectedDate={selectedDate}
          onEventAdded={(newEvent) =>
            setReminders((prev) =>
              [...prev, newEvent].sort(
                (a, b) => new Date(a.scheduled_datetime).getTime() - new Date(b.scheduled_datetime).getTime()
              )
            )
          }
          
        />
      )}
    </View>
  );
};

export default ReminderTab;
