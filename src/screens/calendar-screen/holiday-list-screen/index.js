import React, { useEffect, useState, useCallback } from "react";
import { View, Text, FlatList, ActivityIndicator, RefreshControl, Platform } from "react-native";
import authAxios from "../../../utils/authAxios";
import styles from "./styles";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import useRefreshOnReconnect from "../../../hooks/useRefreshOnReconnect";
const HolidayTab = () => {
  const insets = useSafeAreaInsets();
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchHolidays = useCallback(async ({ showLoader = false } = {}) => {
    if (showLoader) setLoading(true);

    try {
      const res = await authAxios.get("/holidays/employee/");
      const holidayResults = res.data?.results ?? res.data ?? [];
      const formatted = holidayResults.map((holiday) => {
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
  }, []);

  useEffect(() => {
    fetchHolidays({ showLoader: true });
  }, [fetchHolidays]);

  useRefreshOnReconnect(fetchHolidays);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchHolidays();
    setRefreshing(false);
  }, [fetchHolidays]);

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
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#0F1A35",
        paddingBottom: insets.bottom,
      }}
    >
      <Text style={styles.sectionTitle}>Public Holiday List</Text>

      {loading && holidays.length === 0 ? (
        <ActivityIndicator size="large" color="#3352BA" style={{ marginTop: 30 }} />
      ) : (
        <FlatList
          style={{ flex: 1 }}
          data={error ? [] : holidays}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 16,
            paddingBottom: 20,
          }}
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
            <View style={{ flex: 1, padding: 16, alignItems: "center" }}>
              <Text
                style={{
                  color: error ? "#ff6b6b" : "#ccc",
                  fontSize: 16,
                  textAlign: "center",
                }}
              >
                {error || "No public holidays found."}
              </Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
};

export default HolidayTab;
