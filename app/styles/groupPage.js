import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const groupPage = StyleSheet.create({
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
  leaderboard: {
    alignContent: "center",
    height: height * 0.3,
    width: width * 0.8,
    borderWidth: 1,
    borderColor: "red",
  },
  buttonContainer: {
    flexDirection: "column",
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    margin: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
