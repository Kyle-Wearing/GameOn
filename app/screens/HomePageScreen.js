import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

function HomePageScreen({ navigation }) {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}>Your Groups:</Text>
        <View style={{ backgroundColor: "green", flex: 1 }}>
          <Text style={styles.text}>Group 1</Text>
          <Text style={styles.topScores}>Top scores:</Text>
        </View>
        <View style={{ backgroundColor: "red", flex: 1 }}>
          <Text style={styles.text}>Group 2</Text>
          <Text style={styles.topScores}>Top scores:</Text>
        </View>
        <View style={{ backgroundColor: "orange", flex: 1 }}>
          <Text style={styles.text}>Group 3</Text>
          <Text style={styles.topScores}>Top scores:</Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 10,
    margin: 10,
  },
  text: {
    fontSize: 40,
  },
  topScores: {
    fontSize: 20,
  },
});

export default HomePageScreen;
