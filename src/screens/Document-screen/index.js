import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,StyleSheet
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import SwipeLoader from "../../components/SwipeLoader"
import { MaterialCommunityIcons } from '@expo/vector-icons';

// ✅ Direct SVG import
import DownloadIcon from "../../../assets/download.svg";

import styles from "./styles";
import authAxios from "../../utils/authAxios";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function DocumentsScreen() {
  const navigation = useNavigation();
  const [employeeId, setEmployeeId] = useState(null);
  const BASE_URL = "http://178.248.112.16:8001"; // 👈 match backend port
  const [loading, setLoading] = useState(true); // loader state

  const [data, setData] = useState({
    healthCardImage: null,
    workPermitUrls: [],
    contractUrls: [],
    passportNumber: "",
    insuranceNumber: "",
    iqamaNumber: "",
    visaExpiry: "",
    aadarNumber: "",
    contractExpiry: "",
    idCardImage: null,
  });
  
  const [country, setCountry] = useState(null);


  const normalizeUrl = (url) => {
    if (!url) return null;

    if (url.startsWith("http")) return url;

    if (url.includes("localhost")) return url.replace("localhost", "192.168.29.146");

    if (url.startsWith("/")) return `${BASE_URL}${url}`;

    return `${BASE_URL}/media/${url}`;
  };

  useEffect(() => {
    const fetchDocumentData = async () => {
      try {
        setLoading(true); // start loader
        const storedCountry = await AsyncStorage.getItem("country");
        console.log("country is:",storedCountry);
        
        setCountry(storedCountry);
        const summaryResponse = await authAxios.get("/employee/document-summary/");
        const summary = summaryResponse.data;
        setEmployeeId(summary.employee_id);

        const detailResponse = await authAxios.get(
          `/employees/${summary.employee_id}/documents/`
        );
        const detail = detailResponse.data;
        console.log("📄 Summary response:", summary);
console.log("📄 Detail response:", detail);


setData({
  idCardImage: normalizeUrl(summary.id_card_image_url),
  workPermitUrls: detail.work_permit_urls.map(normalizeUrl),
  contractUrls: detail.contract_urls.map(normalizeUrl),
  passportNumber: summary.passport_number || "",
  insuranceNumber: summary.healthcard_number || "",  // keep blank if backend doesn’t send number
  insuranceImage: normalizeUrl(summary.insurance_image_url), // ✅ add insurance image
  iqamaNumber: summary.iqama_number || "",
  visaExpiry: summary.visa_expiry_date || "",
  aadarNumber: summary.aadar_number || "", // ✅ correct spelling
  contractExpiry: summary.contract_expiry_date || "",
});

        
      } catch (error) {
        console.error("❌ Failed to fetch documents:", error);
        Alert.alert("Error", "Could not load document data");
      } finally {
        setLoading(false); // stop loader
      }
    };

    fetchDocumentData();
  }, []);

  const handleImagePreview = (urls) => {
    if (urls && urls.length > 0) {
      navigation.navigate("FullImageViewer", { imageUrl: urls[0] });
    } else {
      Alert.alert("No Image", "No image available to preview.");
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <SwipeLoader size="large" color="#3352BA" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={26} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Documents</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* ID Card */}
        <View style={styles.card}>
          {data.idCardImage ? (
            <TouchableOpacity onPress={() => handleImagePreview([data.idCardImage])}>
              <Image
                source={{ uri: data.idCardImage }}
                style={styles.cardImage}
                resizeMode="cover"
              />
            </TouchableOpacity>
          ) : (
            <Image
              source={require("../../assets/health-card.jpg")}
              style={styles.cardImage}
              resizeMode="cover"
            />
          )}
        </View>

{/* Work Permit */}
<View style={styles.fieldContainer}>
  <Text style={styles.label}>Work Permit</Text>
  <View style={styles.inputRow}>
    <TextInput
      style={styles.inputField} // Use the new inputField style
      placeholder="Work Permit"
      value={data.workPermitUrls.length > 0 ? "Work Permit" : ""}
      editable={false}
      placeholderTextColor="#8a8dad"
    />
    {data.workPermitUrls.length > 0 && (
      <TouchableOpacity
        style={styles.iconBox} // Small separate box
        onPress={() => handleImagePreview(data.workPermitUrls)}
      >
        <MaterialCommunityIcons name="image-outline" size={28} color="grey" />
      </TouchableOpacity>
    )}
  </View>
</View>

{/* Employment Contract */}
<View style={styles.fieldContainer}>
  <Text style={styles.label}>Employment Contract</Text>
  <View style={styles.inputRow}>
    <TextInput
      style={styles.inputField} // Change from inputWithIcon to inputField
      placeholder="Contract"
      value={data.contractUrls.length > 0 ? "Employment Contract" : ""}
      editable={false}
      placeholderTextColor="#8a8dad"
    />
    {data.contractUrls.length > 0 && (
      <TouchableOpacity
        style={styles.iconBox} // Small separate box
        onPress={() => handleImagePreview(data.contractUrls)}
      >
        <MaterialCommunityIcons name="image-outline" size={28} color="grey" />
      </TouchableOpacity>
    )}
  </View>
</View>


        {/* Passport Number */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Passport Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Passport number"
            value={data.passportNumber}
            editable={false}
            placeholderTextColor="#8a8dad"
          />
        </View>

        {/* Conditional Field: Aadhar vs Iqama */}
<View style={styles.fieldContainer}>
  <Text style={styles.label}>
    {country === "IN" ? "Aadhar Number" : "Iqama Number"}
  </Text>
  <TextInput
    style={styles.input}
    placeholder={country === "IN" ? "Aadhar Number" : "Iqama Number"}
    value={country === "IN" ? data.aadarNumber : data.iqamaNumber}
    editable={false}
    placeholderTextColor="#8a8dad"
  />
</View>


        {/* Insurance Number */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Medical Insurance Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Insurance Number"
            value={data.insuranceNumber}
            editable={false}
            placeholderTextColor="#8a8dad"
          />
        </View>

        {/* Conditional Field: Contract Expiry vs Visa Expiry */}
<View style={styles.fieldContainer}>
  <Text style={styles.label}>
    {country === "IN" ? "Contract Expiry Date" : "Visa Expiry Date"}
  </Text>
  <TextInput
    style={styles.input}
    placeholder={country === "IN" ? "Contract Expiry Date" : "Visa Expiry Date"}
    value={country === "IN" ? data.contractExpiry : data.visaExpiry}
    editable={false}
    placeholderTextColor="#8a8dad"
  />
</View>
      </ScrollView>
    </View>
  );
}
