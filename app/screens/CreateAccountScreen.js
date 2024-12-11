import React from "react";
import {
  View,
  StyleSheet,
  Button,
  Text,
  TextInput,
  SafeAreaView,
} from "react-native";

function CreateAccountScreen() {
  return (
    <SafeAreaView>
      <Text>Create Account</Text>
      <TextInput style={styles.input} value={"Username Here"} />
      <TextInput style={styles.input} value={"Password Here"} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
  },
});

export default CreateAccountScreen;
