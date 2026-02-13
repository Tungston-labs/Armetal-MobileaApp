import React, { useState } from "react";
import {
View,
Text,
Modal,
TouchableOpacity,
StyleSheet,
} from "react-native";

export default function LocationDisclosure({ onAgree }) {
const [visible, setVisible] = useState(true);

const handleAgree = () => {
setVisible(false);
onAgree();
};

return ( <Modal visible={visible} transparent animationType="slide"> <View style={styles.overlay}> <View style={styles.card}> <Text style={styles.title}>
Background Location Access </Text>

```
      <Text style={styles.text}>
        Rekory collects location data in the background during
        active work sessions to verify employee presence at
        assigned project sites using geo-fencing.
        {"\n\n"}
        Location tracking continues even when the app is
        minimized or closed to ensure accurate attendance
        and work activity records.
        {"\n\n"}
        Data is used only for workforce management and not
        for advertising purposes.
      </Text>

      <TouchableOpacity
        style={styles.allowBtn}
        onPress={handleAgree}
      >
        <Text style={styles.btnText}>
          Agree & Continue
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setVisible(false)}
      >
        <Text style={styles.cancel}>
          Cancel
        </Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>
)
}
```

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
borderRadius: 12,
},
title: {
fontSize: 18,
fontWeight: "bold",
marginBottom: 10,
},
text: {
fontSize: 14,
lineHeight: 20,
marginBottom: 20,
},
allowBtn: {
backgroundColor: "#007bff",
padding: 12,
borderRadius: 8,
alignItems: "center",
},
btnText: {
color: "#fff",
fontWeight: "bold",
},
cancel: {
textAlign: "center",
marginTop: 10,
color: "red",
},
});
```