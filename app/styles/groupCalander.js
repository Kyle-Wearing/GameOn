import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const groupCalander = StyleSheet.create({
  container: {},
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
    marginTop: height * 0.35,
  },
});
