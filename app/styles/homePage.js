import { StyleSheet, Dimensions } from "react-native";
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
  },
});
