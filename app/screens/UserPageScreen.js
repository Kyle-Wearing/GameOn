import React from "react";
import { Text, SafeAreaView, Image, Alert, Button } from "react-native";

function UserPageScreen({ navigation }) {
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
