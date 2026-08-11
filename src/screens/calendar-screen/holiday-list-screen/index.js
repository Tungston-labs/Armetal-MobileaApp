import React, { useEffect, useState, useCallback } from "react";
import { View, Text, FlatList, ActivityIndicator, RefreshControl, Platform } from "react-native";
import authAxios from "../../../utils/authAxios";
import styles from "./styles";
import useRefreshOnReconnect from "../../../hooks/useRefreshOnReconnect";

const HolidayTab = () => {
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchHolidays = async () => {
    try {
      const res = await authAxios.get("/holidays/employee/");
      const formatted = res.data.results.map((holiday) => {
        const dateString = new Date(holiday.date).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        });
        return {
          id: holiday.id.toString(),
          title: holiday.description || "Holiday",
          date: dateString,
          from: dateString,
          to: dateString,
          type: holiday.holiday_type_display,
        };
      });
      setHolidays(formatted);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch holidays", err.message);
      setError("Failed to fetch holidays. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHolidays();
  }, []);

  useRefreshOnReconnect(fetchHolidays);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchHolidays();
    setRefreshing(false);
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.dateText}>{item.date}</Text>
        <Text style={styles.titleText}>{item.title}</Text>
        <Text style={styles.dateRange}>
          {item.type} 
          
        </Text>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#0F1A35" }}>
      <Text style={styles.sectionTitle}>Public Holiday List</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#3352BA" style={{ marginTop: 30 }} />
      ) : error ? (
        <View style={{ padding: 16, alignItems: "center" }}>
          <Text style={{ color: "red", fontSize: 16 }}>{error}</Text>
        </View>
      ) : (
        <FlatList
          data={holidays}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 80 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#ffffff", "#d3d3d3"]}
              tintColor="#ffffff"
              progressBackgroundColor={Platform.OS === "android" ? "#2c2c2c" : "transparent"}
            />
          }
        />
      )}
    </View>
  );
};

export default HolidayTab;
