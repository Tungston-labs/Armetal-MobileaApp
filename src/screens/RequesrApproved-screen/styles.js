import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a122a",
  },
  header: {
  height: 110,
  paddingTop: 40,
  paddingHorizontal: 20,
  backgroundColor: '#262D40',
  justifyContent: 'center',
},

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  headerTitle: {
    fontSize: 18,
    color: "#FFFF",
    fontWeight: "bold",
    marginLeft: 12,
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  separator: {
    height: 0.2,
    backgroundColor: "#FFFF",
    
  },
  content: {
    padding: 16,
  },
  card: {
    backgroundColor: "#172554",
    borderRadius: 12,
    padding: 16,
    borderWidth: 0.2,
    borderColor: "#FFFF",
  },
  statusBadge: {
    alignSelf: "flex-start",
    backgroundColor: "transparent",
    borderColor: "#26B887",
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  statusText: {
    color: "#26B887",
    fontSize: 14,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  column: {
    flex: 1,
    alignItems: "flex-start",
    marginHorizontal: 4,
  },
  label: {
    color: "#575F7D",
    fontSize: 14,
    marginBottom: 4,
    fontFamily: 'Montserrat_400Regular',
  },
  value: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: 'Montserrat_400Regular',
  },
  section: {
    marginBottom: 16,
  },
});
