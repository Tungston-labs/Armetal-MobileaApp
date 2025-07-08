import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./styles";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function DocumentsScreen() {
  const [data, setData] = useState({
    workPermit: "",
    contract: "",
    passport: "",
    insurance: "",
    iqama: "",
    visaExpiry: "",
    healthCardImage: null,
  });

  useEffect(() => {
    fetchDocumentSummary();
  }, []);

  const fetchDocumentSummary = async () => {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      const res = await axios.get("http://192.168.29.146:8000/api/employee/document-summary/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const {
        passport_number,
        iqama_number,
        visa_expiry_date,
        healthcard_number,
        work_permit_urls,
        contract_urls,
      } = res.data;

      setData({
        workPermit: work_permit_urls[0] || "",
        contract: contract_urls[0] || "",
        passport: passport_number || "",
        insurance: healthcard_number || "",
        iqama: iqama_number || "",
        visaExpiry: visa_expiry_date || "",
        healthCardImage: work_permit_urls[0] || null, // Assuming work permit also has image
      });
    } catch (error) {
      console.error("Failed to load document summary:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Documents</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Health Card Section */}
        <View style={styles.card}>
          <Image
            source={
              data.healthCardImage
                ? { uri: data.healthCardImage }
                : require("../../assets/health-card.jpg")
            }
            style={styles.cardImage}
            resizeMode="cover"
          />
        </View>

        {/* Input Fields */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Work Permit</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Work Permit"
              placeholderTextColor="#8a8dad"
              value={data.workPermit}
              editable={false}
            />
            <TouchableOpacity style={styles.iconButton}>
              <Icon name="image-outline" size={20} color="#8a8dad" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Employment Contract</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Employment Contract"
              placeholderTextColor="#8a8dad"
              value={data.contract}
              editable={false}
            />
            <TouchableOpacity style={styles.iconButton}>
              <Icon name="image-outline" size={20} color="#8a8dad" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Passport number</Text>
          <TextInput
            style={styles.input}
            placeholder="Passport number"
            placeholderTextColor="#8a8dad"
            value={data.passport}
            editable={false}
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Medical Insurance number</Text>
          <TextInput
            style={styles.input}
            placeholder="Insurance number"
            placeholderTextColor="#8a8dad"
            value={data.insurance}
            editable={false}
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Iqama Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Iqama Number"
            placeholderTextColor="#8a8dad"
            value={data.iqama}
            editable={false}
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Visa expiry date</Text>
          <TextInput
            style={styles.input}
            placeholder="Visa expiry date"
            placeholderTextColor="#8a8dad"
            value={data.visaExpiry}
            editable={false}
          />
        </View>
      </ScrollView>
    </View>
  );
}
