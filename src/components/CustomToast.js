import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";

const text1Style = {
  fontSize: 15,
  fontWeight: "700",
  color: "#0F172A",
};

const text2Style = {
  fontSize: 13,
  color: "#334155",
};

const standardProps = {
  text1NumberOfLines: 2,
  text2NumberOfLines: 3,
  text1Style,
  text2Style,
};

const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      {...standardProps}
      style={{ borderLeftColor: "#22C55E" }}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      {...standardProps}
      style={{ borderLeftColor: "#EF4444" }}
    />
  ),
  info: (props) => (
    <BaseToast
      {...props}
      {...standardProps}
      style={{ borderLeftColor: "#3B82F6" }}
    />
  ),
  confirm: ({ text1, text2, props }) => (
    <View
      style={{
        width: "92%",
        borderRadius: 8,
        padding: 14,
        backgroundColor: "#1E293B",
        shadowColor: "#000",
        shadowOpacity: 0.18,
        shadowRadius: 10,
        elevation: 5,
      }}
    >
      <Text style={{ color: "#FFFFFF", fontSize: 15, fontWeight: "700" }}>
        {text1}
      </Text>
      {!!text2 && (
        <Text style={{ color: "#CBD5E1", fontSize: 13, marginTop: 6 }}>
          {text2}
        </Text>
      )}
      <View style={{ flexDirection: "row", justifyContent: "flex-end", marginTop: 14 }}>
        <TouchableOpacity
          onPress={() => {
            Toast.hide();
            props?.onCancel?.();
          }}
          style={{ paddingHorizontal: 14, paddingVertical: 9, marginRight: 8 }}
        >
          <Text style={{ color: "#CBD5E1", fontWeight: "700" }}>
            {props?.cancelText || "Cancel"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Toast.hide();
            props?.onConfirm?.();
          }}
          style={{
            backgroundColor: props?.confirmColor || "#EF4444",
            borderRadius: 8,
            paddingHorizontal: 16,
            paddingVertical: 9,
          }}
        >
          <Text style={{ color: "#FFFFFF", fontWeight: "700" }}>
            {props?.confirmText || "Confirm"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  ),
};

export default function CustomToast() {
  return (
    <Toast
      config={toastConfig}
      position="bottom"
      bottomOffset={70}
      visibilityTime={3500}
    />
  );
}
