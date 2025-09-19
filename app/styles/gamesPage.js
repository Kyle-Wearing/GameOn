import { StyleSheet, Dimensions, Platform, StatusBar } from "react-native";
const { width, height } = Dimensions.get("window");

export const gamesPage = StyleSheet.create({
  container: {
    alignItems: "center",
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
});
