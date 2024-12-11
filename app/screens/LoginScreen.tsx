import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Button,
  Text,
  TextInput,
  SafeAreaView,
  SafeAreaViewBase,
  TouchableOpacity,
} from "react-native";

import { auth } from "../../FirebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setpassowrd] = useState("");

  const signIn = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      console.log(error);
      alert("sign in failed: " + error.message);
    }
  };

  const signUp = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      console.log(error);
      alert("sign in failed: " + error.message);
    }
  };

  return (
    <SafeAreaView>
      <Text>Login</Text>
      <TextInput
        placeholder="email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="password"
        style={styles.input}
        value={password}
        onChangeText={setpassowrd}
      />
      <TouchableOpacity onPress={signIn}>
        <Text>sign in</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={signUp}>
        <Text>sign up</Text>
      </TouchableOpacity>
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
