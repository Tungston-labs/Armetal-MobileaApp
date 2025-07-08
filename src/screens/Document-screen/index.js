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
import styles from "./styles";

export default function DocumentsScreen() {
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
            source={require("../../assets/health-card.jpg")}
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
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Medical Insurance number</Text>
          <TextInput
            style={styles.input}
            placeholder="Insurance number"
            placeholderTextColor="#8a8dad"
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Iqama Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Iqama Number"
            placeholderTextColor="#8a8dad"
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Visa expiry date</Text>
          <TextInput
            style={styles.input}
            placeholder="Visa expiry date"
            placeholderTextColor="#8a8dad"
          />
        </View>
      </ScrollView>
    </View>
  );
}
