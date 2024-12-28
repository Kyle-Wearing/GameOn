import React, { useContext } from "react";
import { Text, SafeAreaView, Image, Alert, Button } from "react-native";
import { UserContext } from "../../userContext";
import { useNavigation } from "@react-navigation/native";

function UserPageScreen() {
  const { user, setUser } = useContext(UserContext);
  const navigation = useNavigation();

  function logOut() {
    setUser({});
    navigation.navigate("LogIn");
  }
  return (
    <SafeAreaView>
      <Text>Profile Page</Text>
      <Image></Image>
      <Text>Username</Text>
      <Button
        onPress={() => Alert.alert("edit account details")}
        title="Edit Account"
      ></Button>
      <Button title="log out" onPress={logOut}></Button>
    </SafeAreaView>
  );
}

export default UserPageScreen;
