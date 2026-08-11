import Toast from "react-native-toast-message";

export const showConfirmation = ({
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmColor = "#EF4444",
}) => {
  Toast.show({
    type: "confirm",
    text1: title,
    text2: message,
    position: "bottom",
    bottomOffset: 70,
    autoHide: false,
    props: {
      onConfirm,
      onCancel,
      confirmText,
      cancelText,
      confirmColor,
    },
  });
};
