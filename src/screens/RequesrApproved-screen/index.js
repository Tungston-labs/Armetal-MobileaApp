import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

export default function RequestApprovedScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Request detail</Text>
        <Image
          source={{ uri: 'https://via.placeholder.com/40x40.png?text=DP' }}
          style={styles.avatar}
        />
      </View>

      <View style={styles.separator} />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          {/* Status Badge */}
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>Approved</Text>
          </View>

          {/* From / To / Time */}
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>From</Text>
              <Text style={styles.value}>12/12/2025</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>To</Text>
              <Text style={styles.value}>19/12/2025</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>Time</Text>
              <Text style={styles.value}>11:30 AM</Text>
            </View>
          </View>

          {/* Leave Type */}
          <View style={styles.section}>
            <Text style={styles.label}>Leave Type</Text>
            <Text style={styles.value}>Paid Leave</Text>
          </View>

          {/* Reason */}
          <View style={styles.section}>
            <Text style={styles.label}>Reason</Text>
            <Text style={styles.value}>
              Lorem ipsum dolor sit amet consectetur. Vitae scelerisque dui aliquet quis mattis vivamus scelerisque ligula. Risus lacus facilisis lectus egestas feugiat tellus nisi. Laoreet ipsum et non nunc semper. Imperdiet facilisis quis fringilla in arcu duis volutpat tincidunt.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


