import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

// ✅ Direct SVG import
import DownloadIcon from "../../../assets/download.svg";

import styles from "./styles";
import authAxios from "../../utils/authAxios";

export default function DocumentsScreen() {
  const navigation = useNavigation();
  const [employeeId, setEmployeeId] = useState(null);

  const [data, setData] = useState({
    healthCardImage: null,
    workPermitUrls: [],
    contractUrls: [],
    passportNumber: "",
    insuranceNumber: "",
    iqamaNumber: "",
    visaExpiry: "",
  });

  useEffect(() => {
    const fetchDocumentData = async () => {
      try {
        const summaryResponse = await authAxios.get("/employee/document-summary/");
        const summary = summaryResponse.data;
        setEmployeeId(summary.employee_id);

        const detailResponse = await authAxios.get(
          `/employees/${summary.employee_id}/documents/`
        );
        const detail = detailResponse.data;

        const replaceLocalhost = (url) =>
          typeof url === "string"
            ? url.replace("localhost", "192.168.29.146")
            : null;

        const replaceLocalhostInArray = (arr) =>
          Array.isArray(arr)
            ? arr.map((url) =>
                typeof url === "string"
                  ? url.replace("localhost", "192.168.29.146")
                  : url
              )
            : [];

        setData({
          healthCardImage: replaceLocalhost(detail.insurance_image_url),
          workPermitUrls: replaceLocalhostInArray(detail.work_permit_urls),
          contractUrls: replaceLocalhostInArray(detail.contract_urls),
          passportNumber: summary.passport_number || "",
          insuranceNumber: summary.healthcard_number || "",
          iqamaNumber: summary.iqama_number || "",
          visaExpiry: summary.visa_expiry_date || "",
        });
      } catch (error) {
        console.error("❌ Failed to fetch documents:", error);
        Alert.alert("Error", "Could not load document data");
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
        {/* Health Card */}
        <View style={styles.card}>
          <Image
            source={require("../../assets/health-card.jpg")}
            style={styles.cardImage}
            resizeMode="cover"
          />

          {data.insuranceNumber ? (
            <Text style={styles.cardNumberText}>{data.insuranceNumber}</Text>
          ) : null}
        </View>

        {/* Work Permit */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Work Permit</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.inputWithIcon}
              placeholder="Work Permit"
              value={data.workPermitUrls.length > 0 ? "Available" : ""}
              editable={false}
              placeholderTextColor="#8a8dad"
            />
            {data.workPermitUrls.length > 0 && (
              <TouchableOpacity
                style={styles.inputIcon}
                onPress={() => handleImagePreview(data.workPermitUrls)}
              >
                <DownloadIcon width={20} height={20} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Employment Contract */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Employment Contract</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.inputWithIcon}
              placeholder="Contract"
              value={data.contractUrls.length > 0 ? "Available" : ""}
              editable={false}
              placeholderTextColor="#8a8dad"
            />
            {data.contractUrls.length > 0 && (
              <TouchableOpacity
                style={styles.inputIcon}
                onPress={() => handleImagePreview(data.contractUrls)}
              >
                <DownloadIcon width={20} height={20} />
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

        {/* Iqama Number */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Iqama Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Iqama Number"
            value={data.iqamaNumber}
            editable={false}
            placeholderTextColor="#8a8dad"
          />
        </View>

        {/* Insurance Number */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Insurance Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Insurance Number"
            value={data.insuranceNumber}
            editable={false}
            placeholderTextColor="#8a8dad"
          />
        </View>

        {/* Visa Expiry */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Visa Expiry Date</Text>
          <TextInput
            style={styles.input}
            placeholder="Visa Expiry Date"
            value={data.visaExpiry}
            editable={false}
            placeholderTextColor="#8a8dad"
          />
        </View>
      </ScrollView>
    </View>
  );
}
