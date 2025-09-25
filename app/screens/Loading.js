import React from "react";
import { View, ActivityIndicator, Text, StyleSheet } from "react-native";

const Loading = ({ message = "Loading..." }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#4A90E2" />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    padding: 20,
  },
  message: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: "500",
    color: "#374151",
  },
});

export default Loading;
