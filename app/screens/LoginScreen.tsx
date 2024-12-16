import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Button,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

import { loginStyle } from "../styles/loginPage";

import Ionicons from "react-native-vector-icons/Ionicons";

import { auth } from "../../FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const refPasswordInput = useRef(null);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);

  const focusOnPassword = () => {
    refPasswordInput?.current?.focus();
  };

  const signIn = async () => {
    setLoading(true);
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      console.log(user.user.uid);
      if (user) {
        navigation.navigate("GameOn");
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

  const signUp = async () => {
    navigation.navigate("CreateAccount");
  };

  const passwordVisibility = () => {
    setHidePassword(!hidePassword);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={loginStyle.pageContainer}>
        <TextInput
          keyboardType="email-address"
          placeholder="Enter Email Address"
          style={loginStyle.input}
          value={email}
          onChangeText={setEmail}
          onSubmitEditing={focusOnPassword}
          returnKeyType="next"
          editable={!loading}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <View style={loginStyle.input}>
          <TextInput
            style={{ fontSize: 16, flex: 1 }}
            placeholder="Enter Password"
            value={password}
            onChangeText={setPassword}
            ref={refPasswordInput}
            secureTextEntry={hidePassword}
            returnKeyType="done"
            editable={!loading}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TouchableOpacity
            style={loginStyle.iconButton}
            onPress={passwordVisibility}
          >
            <Ionicons
              name={hidePassword ? "eye-outline" : "eye-off-outline"}
              size={20}
              color={"black"}
            ></Ionicons>
          </TouchableOpacity>
        </View>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <TouchableOpacity style={loginStyle.button} onPress={signIn}>
            <Text style={loginStyle.buttonText}>Log In</Text>
          </TouchableOpacity>
        )}
        <View style={loginStyle.container}>
          <Text style={loginStyle.text}>Don't have an account?</Text>
          <TouchableOpacity onPress={signUp} style={loginStyle.button}>
            <Text style={loginStyle.buttonText}>Sign up!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default LoginScreen;
