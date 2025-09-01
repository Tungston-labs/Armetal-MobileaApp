import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import authAxios from "../../../utils/authAxios";
import styles from "./styles";

const HolidayTab = () => {
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // ✅ state for error

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const res = await authAxios.get("/holidays/");
       
        const formatted = res.data.results.map((holiday) => {
          const dateString = new Date(holiday.date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          });
        
          return {
            id: holiday.id.toString(),
            title: holiday.description || "Holiday",
            date: dateString,  // formatted for display
            from: dateString,  // ✅ already string
            to: dateString,    // ✅ already string
            type: holiday.holiday_type_display,
          };
        });
        
        setHolidays(formatted);
        setError(null); // clear error if successful
      } catch (err) {
        console.error("Failed to fetch holidays", err.message);
        setError("Failed to fetch holidays. Please try again."); // ✅ set error text
      } finally {
        setLoading(false);
      }
    };

    fetchHolidays();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
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
        />
      )}
    </View>
  );
};

export default HolidayTab;
