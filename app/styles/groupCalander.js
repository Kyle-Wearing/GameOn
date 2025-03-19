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
  button: {},
  calendar: {
    borderWidth: 1,
    margin: 1,
    borderColor: "black",
    height: "auto",
  },
  dateText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
    color: "#333",
  },
  eventList: {
    marginTop: 10,
  },
  eventItem: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    marginBottom: 10,
    width: "75%",
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignSelf: "center",
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#333",
    textAlign: "center",
  },
});
