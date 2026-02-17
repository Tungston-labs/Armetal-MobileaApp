import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a122a",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#262D40",
    height:100,
    borderBottomWidth: 0.5,
    borderBottomColor: '#FFFF',
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
    marginTop:35,
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
    alignSelf: 'flex-start',
    backgroundColor: '#183259',
    borderWidth: 1,
    borderColor: '#26B887',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginBottom: 8,
    backgroundColor: "#183259",
  },
  statusText: {
    color: '#26B887',
    fontSize: 16,
    paddingHorizontal:12,
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
    fontSize: 15,
    fontFamily: 'Montserrat_400Regular',
  },
  section: {
    marginBottom: 16,
  },
});
