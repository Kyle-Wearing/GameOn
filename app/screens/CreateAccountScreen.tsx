import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Button,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";

import { auth } from "../../FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

function CreateAccountScreen() {
  const [email, setEmail] = useState("");
  const [password, setpassowrd] = useState("");
  const refPasswordInput = useRef(null);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const focusOnPassword = () => {
    refPasswordInput?.current?.focus();
  };

  const signIn = async () => {
    navigation.navigate("LogIn");
  };

  const signUp = async () => {
    setLoading(true);
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      setLoading(false);
      if (user) {
        navigation.navigate("HomePage");
      }
    } catch (error: any) {
      setLoading(false);
      console.log(error);
      const index = error.code.indexOf("/");
      const errorMsg = error.code
        .slice(index + 1)
        .split("-")
        .join(" ");
      alert("sign in failed: " + errorMsg);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1 }}>
        <TextInput
          keyboardType="email-address"
          placeholder="email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          onSubmitEditing={focusOnPassword}
          returnKeyType="next"
          editable={!loading}
        />
        <TextInput
          placeholder="password"
          style={styles.input}
          value={password}
          onChangeText={setpassowrd}
          ref={refPasswordInput}
          secureTextEntry={true}
          returnKeyType="done"
          editable={!loading}
        />
        <Button title={"Log in"} onPress={signIn}></Button>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Button title={"Sign up"} onPress={signUp}></Button>
        )}
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
