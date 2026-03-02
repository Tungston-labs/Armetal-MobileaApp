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
            Background Location Access
          </Text>

          <Text style={styles.text}>
            Location will be tracked every 30 minutes during
            active work sessions for attendance verification.
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
  overlay:{flex:1,backgroundColor:"#00000088",justifyContent:"center",padding:20},
  card:{backgroundColor:"#fff",padding:20,borderRadius:12},
  title:{fontSize:18,fontWeight:"bold",marginBottom:10},
  text:{fontSize:14,marginBottom:20},
  allowBtn:{backgroundColor:"#007bff",padding:12,borderRadius:8,alignItems:"center"},
  btnText:{color:"#fff",fontWeight:"bold"},
  cancel:{textAlign:"center",marginTop:10,color:"red"},
});