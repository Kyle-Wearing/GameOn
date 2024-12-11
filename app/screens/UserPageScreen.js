import React from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  Alert,
} from "react-native";

function UserPageScreen() {
  return (
    <SafeAreaView>
      <Text>Profile Page</Text>
      <Image></Image>
      <Text>Username</Text>
      <Button
        onPress={() => Alert.alert("edit account details")}
        title="Edit Account"
      ></Button>
    </SafeAreaView>
  );
}

export default UserPageScreen;
