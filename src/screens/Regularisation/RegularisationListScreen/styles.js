import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F1A35",
  },
  card: {
    backgroundColor: "#262D40",
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
  },
  label: {
    color: "#8F8F8F",
    fontSize: 14,
    marginBottom: 6,
  },
  value: {
    color: "#FFFFFF",
  },
  badge: {
    alignSelf: "flex-start",
    marginTop: 12,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});

export default styles;