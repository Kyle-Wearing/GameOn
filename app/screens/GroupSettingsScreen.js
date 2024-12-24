import React from "react";
import { Button } from "react-native";
import { Text, SafeAreaView, TextInput } from "react-native";
import { updateGroupSettings } from "../../until";

function GroupSettingsScreen({ route }) {
  const { groupName, groupMembers, group_id } = route.params;
  console.log(groupMembers);
  return (
    <SafeAreaView>
      <Text>{groupName}</Text>
      <Button
        title="test"
        onPress={() => {
          updateGroupSettings(group_id, "test update name", groupMembers);
        }}
      ></Button>
    </SafeAreaView>
  );
}

export default GroupSettingsScreen;
