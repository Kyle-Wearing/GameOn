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
    backgroundColor: "#f2f2f2",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#b5b3b3",
    marginLeft: width * 0.03,
    marginRight: width * 0.03,
  },
  groupText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    textAlign: "center",
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
});
