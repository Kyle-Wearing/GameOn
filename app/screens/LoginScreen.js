import React from "react";
import {
  View,
  StyleSheet,
  Button,
  Text,
  TextInput,
  SafeAreaView,
  SafeAreaViewBase,
} from "react-native";

function LoginScreen(props) {
  return (
    <SafeAreaView>
      <Text>Account Details</Text>
      <TextInput style={styles.input} value={"Username Here"} />
      <TextInput style={styles.input} value={"Password Here"} />
      <Button title="Log In">Log In</Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
  },
});

export default LoginScreen;
