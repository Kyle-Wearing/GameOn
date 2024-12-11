import React from "react";
import {
  View,
  StyleSheet,
  Button,
  Text,
  TextInput,
  SafeAreaView,
} from "react-native";

function LoginScreen(props) {
  return (
    <SafeAreaView>
      <Text>Account Details</Text>
      <TextInput style={styles.input} value={"Username Here"} />
      <TextInput style={styles.input} value={"Password Here"} />
      <Button title="Log In">Log In</Button>
      <Button
        title="Create Account"
        onPress={() => {
          props.navigation.navigate("CreateAccount");
        }}
      >
        Create Account
      </Button>
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
