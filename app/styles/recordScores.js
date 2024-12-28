import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const recordScores = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: width * 0.75,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 25,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "",
  },
  input: {
    height: 50,
    width: width * 0.5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ccc",
    padding: 15,
    fontSize: 16,
    backgroundColor: "#fff",
    flexDirection: "row",
  },
  container: {
    marginTop: height * 0.35,
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    marginBottom: 20,
    alignItems: "center",
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
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  scoreInput: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
  scoreTitle: {
    fontSize: 16,
    fontWeight: "bold",
    padding: 10,
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
