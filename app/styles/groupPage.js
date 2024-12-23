import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const groupPage = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
