import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";

export default function DocumentsScreen() {
  const navigation = useNavigation();

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
        {/* Health Card Section */}
        <View style={styles.card}>
          <Image
            source={require("../../assets/health-card.jpg")}
            style={styles.cardImage}
            resizeMode="cover"
          />
        </View>

        {/* Input Fields */}
        {[
          { label: "Work Permit", placeholder: "Work Permit", hasIcon: true },
          { label: "Employment Contract", placeholder: "Employment Contract", hasIcon: true },
          { label: "Passport number", placeholder: "Passport number" },
          { label: "Medical Insurance number", placeholder: "Insurance number" },
          { label: "Iqama Number", placeholder: "Iqama Number" },
          { label: "Visa expiry date", placeholder: "Visa expiry date" },
        ].map((field, index) => (
          <View style={styles.fieldContainer} key={index}>
            <Text style={styles.label}>{field.label}</Text>
            <View style={styles.inputRow}>
              <TextInput
                style={styles.input}
                placeholder={field.placeholder}
                placeholderTextColor="#8a8dad"
              />
              {field.hasIcon && (
                <TouchableOpacity style={styles.iconButton}>
                  <Icon name="image-outline" size={20} color="#8a8dad" />
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
