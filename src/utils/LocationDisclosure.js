import React from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";

export default function LocationDisclosure({
  visible,
  onAgree,
  onCancel,
}) {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>
            Tracking During Active Shift
          </Text>

          <Text style={styles.text}>
            Rekory uses your location only while you are checked in. The punch
            screen shows your tracking status, latest location, and last updated
            time, and tracking stops when you swipe out.
          </Text>

          <TouchableOpacity style={styles.allowBtn} onPress={onAgree}>
            <Text style={styles.btnText}>Agree & Continue</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onCancel}>
            <Text style={styles.cancel}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "#00000088",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
    color: "#151D34",
  },
  text: {
    fontSize: 14,
    marginBottom: 20,
    color: "#3C4666",
    lineHeight: 20,
  },
  allowBtn: {
    backgroundColor: "#172555",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontWeight: "700",
  },
  cancel: {
    textAlign: "center",
    marginTop: 12,
    color: "#D64646",
    fontWeight: "600",
  },
});
