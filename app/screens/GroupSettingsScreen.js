import React, { useState } from "react";
import { Button } from "react-native";
import { Text, SafeAreaView, TextInput } from "react-native";
import { updateGroupSettings } from "../../until";
import Ionicons from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { groupSettings } from "../styles/groupSettingsPage";
import { View } from "react-native";
import * as Clipboard from "expo-clipboard";

function GroupSettingsScreen({ route }) {
  const { groupName, groupMembers, group_id } = route.params;
  const navigation = useNavigation();
  const [newName, setNewName] = useState("");
  const [error, setError] = useState("");
  const id = group_id.slice(1);

  function handleConfirm() {
    if (newName) {
      updateGroupSettings(id, newName, groupMembers);
      navigation.goBack();
    } else {
      setError("must enter group name");
    }
  }

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(id);
  };

  return (
    <SafeAreaView>
      <TouchableOpacity
        style={groupSettings.backIcon}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Ionicons
          name="chevron-back-outline"
          size={30}
          color="black"
        ></Ionicons>
      </TouchableOpacity>
      <View style={groupSettings.inputContainer}>
        <Text style={groupSettings.label}>Group Name:</Text>
        <TextInput
          style={groupSettings.input}
          placeholder={groupName}
          value={newName}
          onChangeText={(text) => {
            setNewName(text);
            setError("");
          }}
          autoCapitalize="none"
          autoCorrect={false}
        ></TextInput>
      </View>
      {error ? <Text style={groupSettings.errorText}>{error}</Text> : null}
      <View style={groupSettings.codeContainer}>
        <Text>{id}</Text>
        <TouchableOpacity
          style={groupSettings.backIcon}
          onPress={() => {
            copyToClipboard();
          }}
        >
          <Ionicons name="copy-outline" size={15} color="black"></Ionicons>
        </TouchableOpacity>
      </View>
      <Button title="confirm changes" onPress={handleConfirm}></Button>
    </SafeAreaView>
  );
}

export default GroupSettingsScreen;
