import { StyleSheet, Dimensions, Platform, StatusBar } from "react-native";
const { width, height } = Dimensions.get("window");

export const groupSettings = StyleSheet.create({
  backIcon: {
    padding: 10,
  },
  errorText: {
    color: "red",
    textAlign: "center",
  },
  input: {
    height: 25,
    width: "40%",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ccc",
    paddingLeft: 15,
    fontSize: 14,
    backgroundColor: "#fff",
    flexDirection: "row",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  label: {
    padding: 3,
  },
  codeContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  AndroidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  }
});
