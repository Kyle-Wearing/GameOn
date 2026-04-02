import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");

export const UserPerformancePage = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f5f5f5",
    flex: 1,
  },
  summaryCard: {
    backgroundColor: "#ADC2A9",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 4,
  },
  summaryCard0: {
    backgroundColor: "#FFD700",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 4,
  },
  summaryCard1: {
    backgroundColor: "#C0C0C0",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 4,
  },
  summaryCard2: {
    backgroundColor: "#CD7F32",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 4,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  username: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
  },
  stat: {
    fontSize: 16,
    marginVertical: 2,
  },
  gameCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
  },
  gameName: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 6,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  backIcon: {
    padding: 10,
  },
  title: {
    position: "absolute",
    left: "50%",
    transform: [{ translateX: -width * 0.5 + width * 0.25 }],
  },
  titleText: {
    fontSize: 25,
    textAlign: "center",
    fontWeight: "600",
  },
  avatarRight: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginLeft: 15,
  },
});
