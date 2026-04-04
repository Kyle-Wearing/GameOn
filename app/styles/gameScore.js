import { StyleSheet } from "react-native";

export const gameScore = StyleSheet.create({
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
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    margin: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  gameName: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
    color: "#333",
  },
  date: {
    fontSize: 14,
    color: "#777",
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  position: {
    width: 30,
    fontWeight: "600",
    color: "#555",
  },
  username: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  score: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  noScores: {
    textAlign: "center",
    color: "#999",
    marginTop: 10,
  },
});
