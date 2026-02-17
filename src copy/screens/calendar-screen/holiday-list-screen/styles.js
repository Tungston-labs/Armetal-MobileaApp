import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 16,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#172554",
    borderRadius: 12,
    borderLeftColor:"#3352BA",
    borderLeftWidth: 10,
    padding: 10,
    marginVertical: 8,
   
  },

  cardContent: {
    flex: 1,
   
  },
  dateText: {
    fontSize: 14,
    color: "#FFFFFF",
    fontWeight: "600",
    marginBottom: 4,
  },
  titleText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#FFFFFF",
    marginBottom: 4,
    
  },
  dateRange: {
    fontSize: 12,
    color: "#BBBBBB",
    
  },
});

export default styles;
