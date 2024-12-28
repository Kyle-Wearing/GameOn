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
    height: height * 0.4,
    width: width * 0.8,
    padding: 20,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    margin: 15,
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    marginBottom: 30,
  },
  memberCard: {
    backgroundColor: "#ADC2A9",
    marginBottom: 15,
    padding: 15,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
  memberCard0: {
    backgroundColor: "#FFD700",
    marginBottom: 15,
    padding: 15,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
  memberCard1: {
    backgroundColor: "#C0C0C0",
    marginBottom: 15,
    padding: 15,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
  memberCard2: {
    backgroundColor: "#CD7F32",
    marginBottom: 15,
    padding: 15,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },

  username: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  score: {
    fontSize: 14,
    color: "#333",
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
