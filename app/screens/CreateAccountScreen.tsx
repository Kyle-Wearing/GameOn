import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Button,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

import { auth } from "../../FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

function CreateAccountScreen() {
  const [email, setEmail] = useState("");
  const [password, setpassowrd] = useState("");
  const refPasswordInput = useRef(null);
  const navigation = useNavigation();

  const focusOnPassword = () => {
    refPasswordInput?.current?.focus();
  };

  const signIn = async () => {
    navigation.navigate("LogIn");
  };

  const signUp = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      if (user) {
        navigation.navigate("HomePage");
      }
    } catch (error: any) {
      console.log(error);
      alert("sign in failed: " + error.message);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1 }}>
        <TextInput
          placeholder="email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          onSubmitEditing={focusOnPassword}
          returnKeyType="next"
        />
        <TextInput
          placeholder="password"
          style={styles.input}
          value={password}
          onChangeText={setpassowrd}
          ref={refPasswordInput}
          secureTextEntry={true}
          returnKeyType="done"
        />
        <Button title={"Log in"} onPress={signIn}></Button>
        <Button title={"Sign up"} onPress={signUp}></Button>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
  },
});

export default CreateAccountScreen;
