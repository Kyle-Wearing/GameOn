import React, { useContext, useRef, useState } from "react";
import {
  View,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
  TouchableOpacity,
  Text,
} from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";

import { getUser, postUser } from "../../until";
import { auth } from "../../FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { loginStyle } from "../styles/loginPage";
import { UserContext } from "../../userContext";

function CreateAccountScreen() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassowrd] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const refPasswordInput = useRef(null);
  const refConfirmPasswordInput = useRef(null);
  const refEmailInput = useRef(null);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [error, setError] = useState("");
  const { setUser } = useContext(UserContext);

  const focusOnPassword = () => {
    refPasswordInput?.current?.focus();
  };
  const focusOnConfirmPassword = () => {
    refConfirmPasswordInput?.current?.focus();
  };
  const focusOnEmail = () => {
    refEmailInput?.current?.focus();
  };

  const passwordVisibility = () => {
    setHidePassword(!hidePassword);
  };

  const signIn = async () => {
    navigation.navigate("LogIn");
  };

  const signUp = async () => {
    if (username) {
      if (confirmPassword === password) {
        setLoading(true);
        try {
          const user = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          setLoading(false);
          if (user) {
            await postUser(user.user.uid, email, username);
            const newUser = await getUser(user.user.uid);
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
      } else {
        setError("passwords do not match");
      }
    } else {
      setError("must enter a username");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={loginStyle.pageContainer}>
        <TextInput
          placeholder="Enter Username"
          style={loginStyle.input}
          value={username}
          onChangeText={(text) => {
            setUsername(text);
            setError("");
          }}
          onSubmitEditing={focusOnEmail}
          returnKeyType="next"
          editable={!loading}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          ref={refEmailInput}
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
              setPassowrd(text);
              setError("");
            }}
            ref={refPasswordInput}
            secureTextEntry={hidePassword}
            onSubmitEditing={focusOnConfirmPassword}
            returnKeyType="next"
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
        <TextInput
          placeholder="Confirm Password"
          style={loginStyle.input}
          value={confirmPassword}
          onChangeText={(text) => {
            setConfirmPassword(text);
            setError("");
          }}
          ref={refConfirmPasswordInput}
          secureTextEntry={hidePassword}
          returnKeyType="done"
          editable={!loading}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {error ? <Text style={loginStyle.errorText}>{error}</Text> : null}
        {loading ? (
          <ActivityIndicator />
        ) : (
          <TouchableOpacity style={loginStyle.button} onPress={signUp}>
            <Text style={loginStyle.buttonText}> Sign Up</Text>
          </TouchableOpacity>
        )}
        <View style={loginStyle.container}>
          <Text style={loginStyle.text}>Already have an account?</Text>
          <TouchableOpacity onPress={signIn} style={loginStyle.button}>
            <Text style={loginStyle.buttonText}>log in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default CreateAccountScreen;
