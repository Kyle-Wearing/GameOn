import { StyleSheet, Dimensions, Platform, StatusBar } from "react-native";
const { width, height } = Dimensions.get("window");

export const groupCalander = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    position: "absolute",
    left: "50%",
    transform: [{ translateX: "-50%" }],
  },
  titleText: {
    fontSize: 25,
    textAlign: "center",
  },
  backIcon: {
    padding: 10,
  },
  button: {
    flex: 1,
  },
  calendar: {
    borderWidth: 1,
    borderColor: "black",
    height: 355,
  },
});
