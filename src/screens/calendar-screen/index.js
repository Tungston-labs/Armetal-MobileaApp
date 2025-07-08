import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import styles from "./styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";
import BottomNavbar from "../BottomNavbar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const CalendarScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = "http://192.168.29.146:8000/api/holidays/employee/";

  const fetchHolidays = async () => {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      if (!token) {
        console.warn("Access token not found");
        return;
      }

      const res = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const formatted = res.data.results.map((holiday) => ({
        id: holiday.id.toString(),
        date: new Date(holiday.date).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
        }),
        title: holiday.description || "Holiday",
        from: holiday.date,
        to: holiday.date,
        type: holiday.holiday_type_display,
      }));

      setHolidays(formatted);
    } catch (err) {
      console.error("Failed to fetch holidays:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHolidays();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.greenStrip} />
      <View style={styles.cardContent}>
        <Text style={styles.dateText}>{item.date}</Text>
        <Text style={styles.titleText}>{item.title}</Text>
        <Text style={styles.dateRange}>
          {item.type} | {item.from === item.to ? `On ${item.from}` : `From ${item.from} to ${item.to}`}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Calendar</Text>
        <View style={{ width: 36 }} />
      </View>

      {/* Holiday List */}
      <Text style={styles.sectionTitle}>Public Holiday List</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#3352BA" style={{ marginTop: 30 }} />
      ) : (
        <FlatList
          data={holidays}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 80 }}
        />
      )}

      <BottomNavbar navigation={navigation} route={route} />
    </SafeAreaView>
  );
};

export default CalendarScreen;
