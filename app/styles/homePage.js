import { StyleSheet, Dimensions } from "react-native";
import { SearchBar } from "react-native-screens";
const { width, height } = Dimensions.get("window");

export const homePage = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 10,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  groupButton: {
    backgroundColor: "#dfdbdbff",
    padding: 16,
    marginBottom: 10,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#b5b3b3",
    marginLeft: width * 0.03,
    marginRight: width * 0.03,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  groupText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    textAlign: "center",
    flex: 1,
  },
  titleText: {
    fontSize: 24,
    padding: 5,
  },
  input: {
    height: 50,
    width: width * 0.7,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ccc",
    paddingLeft: 15,
    fontSize: 16,
    backgroundColor: "#fff",
    marginBottom: 16,
    flexDirection: "row",
  },
  iconButton: {
    justifyContent: "center",
    padding: 10,
  },
  searchBar: {
    alignItems: "center",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },

  statCard: {
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    width: width * 0.28,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },

  statNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
  },

  statLabel: {
    fontSize: 12,
    color: "#666",
  },
});
