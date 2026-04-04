import { StyleSheet } from "react-native";

export const gamesPlayed = StyleSheet.create({
  header: {
    height: 60,
    justifyContent: "center",
  },

  backIcon: {
    position: "absolute",
    left: 10,
    zIndex: 1,
  },

  title: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
  },

  titleText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  container: {
    padding: 12,
  },
  card: {
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
  scoredCard: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    marginBottom: 10,
    width: "75%",
    backgroundColor: "#e6ffe6",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#27AE60",
  },
  gameName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    color: "#333",
  },
  date: {
    fontSize: 14,
    color: "#666",
  },
});
