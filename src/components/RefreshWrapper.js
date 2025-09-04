// src/components/RefreshWrapper.js
import React, { useState } from "react";
import { ScrollView, RefreshControl, Platform } from "react-native";

const RefreshWrapper = ({ children, onRefresh, style, contentContainerStyle }) => {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await onRefresh?.(); // call screen-specific refresh
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <ScrollView
      style={style}
      contentContainerStyle={contentContainerStyle}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          colors={["#ffffff", "#d3d3d3"]}  // ✅ Android spinner (white & light gray)
          tintColor="#ffffff"              // ✅ iOS spinner (white)
          progressBackgroundColor={Platform.OS === "android" ? "#2c2c2c" : "transparent"} 
        />
      }
    >
      {children}
    </ScrollView>
  );
};

export default RefreshWrapper;
