import React, { useContext, useState } from "react";
import { Text, SafeAreaView, Image, Alert, Button } from "react-native";
import { UserContext } from "../../userContext";
import { useNavigation } from "@react-navigation/native";
import { Modal } from "react-native";
import { View } from "react-native";
import { userSettings } from "../styles/userSettings";
import { TextInput } from "react-native";
import { updateUsername } from "../../until";
import AsyncStorage from "@react-native-async-storage/async-storage";

function UserPageScreen() {
  const { user, setUser } = useContext(UserContext);
  const navigation = useNavigation();
  const [editUserVisible, setEditUserVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  function logOut() {
    _removeData();
    setUser({});

    navigation.navigate("LogIn");
  }

  const _removeData = async () => {
    try {
      await AsyncStorage.removeItem("USERID");
      await AsyncStorage.removeItem("USERNAME");
    } catch (err) {
      console.log(err);
    }
  };

  function handleConfirm() {
    if (username) {
      updateUsername(user.uid, username);
      setUser((currUser) => {
        return { ...currUser, username: username };
      });
      setEditUserVisible(false);
      setUsername("");
    } else {
      setError("must enter a username");
    }
  }

  return (
    <SafeAreaView>
      <Modal animationType="none" transparent={true} visible={editUserVisible}>
        <View style={userSettings.centeredView}>
          <View style={userSettings.modalView}>
            <Text>Username</Text>
            <TextInput
              returnKeyType="done"
              autoCapitalize="none"
              autoCorrect={false}
              placeholder={user.username}
              style={userSettings.input}
              placeholderTextColor={"gray"}
              value={username}
              onChangeText={(text) => {
                setUsername(text);
                setError("");
              }}
            ></TextInput>
            {error ? <Text style={userSettings.errorText}>{error}</Text> : null}
            <Button onPress={handleConfirm} title="confirm"></Button>
            <Button
              onPress={() => {
                setEditUserVisible(false);
                setUsername("");
              }}
              title="cancel"
            ></Button>
          </View>
        </View>
      </Modal>
      <Image></Image>
      <Text style={userSettings.text}>Username: {user.username}</Text>
      <Button
        onPress={() => setEditUserVisible(true)}
        title="Edit Account"
      ></Button>
      <Button title="log out" onPress={logOut}></Button>
    </SafeAreaView>
  );
}

export default UserPageScreen;
