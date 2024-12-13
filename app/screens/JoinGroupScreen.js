import React from "react";
import { Text, SafeAreaView, TextInput } from "react-native";

function JoinGroupScreen({ navigation }) {
  return (
    <SafeAreaView>
      <Text>Join Group</Text>
      <TextInput value={"Enter Group Code Here"} />
    </SafeAreaView>
  );
}

export default JoinGroupScreen;
