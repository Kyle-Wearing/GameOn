import React, { useContext, useState } from "react";
import { Alert, Button } from "react-native";
import { Text, SafeAreaView, TextInput } from "react-native";
import { leaveGroup, updateGroupSettings } from "../../until";
import Ionicons from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { groupSettings } from "../styles/groupSettingsPage";
import { View } from "react-native";
import * as Clipboard from "expo-clipboard";
import { UserContext } from "../../userContext";

function GroupSettingsScreen({ route }) {
  const { groupName, group_id } = route.params;
  const navigation = useNavigation();
  const [newName, setNewName] = useState("");
  const [error, setError] = useState("");
  const { user } = useContext(UserContext);

  async function handleConfirm() {
    if (newName) {
      const update = await updateGroupSettings(group_id, newName);
      if (update === 200) {
        navigation.pop();
      } else {
        setError("something went wrong");
      }
    } else {
      setError("must enter group name");
    }
  }

  function handleLeave() {
    Alert.alert(
      "Leave Group",
      "Are you sure you want to leave this group?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Leave",
          style: "destructive",
          onPress: async () => {
            try {
              await leaveGroup(user.uid, group_id);
              navigation.pop(2);
            } catch (err) {
              console.log("Leave group error:", err);
              Alert.alert("Error", "Failed to leave group.");
            }
          },
        },
      ],
      { cancelable: true },
    );
  }

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(group_id);
  };

  return (
    <SafeAreaView style={groupSettings.AndroidSafeArea}>
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
        <Text>{group_id}</Text>
        <TouchableOpacity
          style={groupSettings.backIcon}
          onPress={() => {
            copyToClipboard();
          }}
        >
          <Ionicons name="copy-outline" size={15} color="black"></Ionicons>
        </TouchableOpacity>
      </View>
      <Button title="Confirm Changes" onPress={handleConfirm}></Button>
      <Button title="Leave Group" onPress={handleLeave} color={"red"}></Button>
    </SafeAreaView>
  );
}

export default GroupSettingsScreen;
