import React, { useContext, useEffect, useRef, useState } from "react";
import {
  View,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { loginStyle } from "../styles/loginPage";
import { getUser } from "../../until";

import Ionicons from "react-native-vector-icons/Ionicons";

import { auth } from "../../FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../../userContext";

function LoginScreen() {
  //"test@test.com"
  //"123456"
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const refPasswordInput = useRef(null);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const { user, setUser } = useContext(UserContext);
  const [error, setError] = useState("");

  useEffect(() => {
    _fetchData();
  }, [user.uid]);

  const focusOnPassword = () => {
    refPasswordInput?.current?.focus();
  };

  const signIn = async () => {
    setLoading(true);
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      if (user) {
        const newUser = await getUser(user.user.uid);
        _saveData(user.user.uid, newUser.username);
        setUser({ uid: user.user.uid, username: newUser.username });
        navigation.navigate("GameOn");
      }
    } catch (error: any) {
      setLoading(false);
      const index = error.code.indexOf("/");
      const errorMsg = error.code
        .slice(index + 1)
        .split("-")
        .join(" ");
      setError(errorMsg);
    }
  };

  const _saveData = async (uid: string, username: string) => {
    try {
      await AsyncStorage.setItem("USERID", uid);
      await AsyncStorage.setItem("USERNAME", username);
    } catch (err) {
      console.log(err);
    }
  };

  const _fetchData = async () => {
    try {
      const fetchedUserUid = await AsyncStorage.getItem("USERID");
      const fetchedUserName = await AsyncStorage.getItem("USERNAME");
      if (fetchedUserUid && fetchedUserName) {
        setUser({ uid: fetchedUserUid, username: fetchedUserName });
        navigation.navigate("GameOn");
      }
    } catch (err) {
      console.log(err);
      navigation.navigate("LogIn");
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
          onChangeText={(text) => {
            setEmail(text);
            setError("");
          }}
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
            onChangeText={(text) => {
              setPassword(text);
              setError("");
            }}
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
        {error ? <Text style={loginStyle.errorText}>{error}</Text> : null}
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
