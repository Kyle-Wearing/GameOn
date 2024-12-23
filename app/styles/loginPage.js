import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const loginStyle = StyleSheet.create({
  pageContainer: {
    alignItems: "center",
    flex: 1,
    padding: height * 0.1,
  },

  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    marginTop: 60,
  },
  text: {
    fontSize: 18,
    marginRight: 10,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  input: {
    height: 50,
    width: "100%",
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
  errorText: {
    color: "red",
    marginTop: -15,
  },
});
