import React, { useContext, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Modal } from "react-native";
import { Text, SafeAreaView, TextInput, Button } from "react-native";
import { joinGroup } from "../styles/joinGroup";
import { checkInGroup, createGroup, joinGroupById } from "../../until";
import { UserContext } from "../../userContext";
import { useNavigation } from "@react-navigation/native";

function JoinGroupScreen() {
  const [joinVisible, setJoinVisible] = useState(false);
  const [createVisible, setCreateVisible] = useState(false);
  const [joinCode, setJoinCode] = useState("");
  const [groupName, setGroupName] = useState("");
  const { user } = useContext(UserContext);
  const [error, setError] = useState("");
  const navigation = useNavigation();

  function handleCreateModal() {
    setGroupName("");
    setError("");
    setCreateVisible(!createVisible);
  }

  function handleJoinModal() {
    setJoinCode("");
    setError("");
    setJoinVisible(!joinVisible);
  }

  async function handleJoinGroup() {
    if (joinCode) {
      const check = await checkInGroup(joinCode, user.uid);
      if (!check) {
        joinGroupById(joinCode, user.uid, user.username)
          .then(() => {
            setJoinVisible(false);
            navigation.navigate("GameOn", {
              screen: "Home",
            });
          })
          .catch((err) => {
            setError("invalid join code");
          });
      } else {
        setError("you are already in this group");
      }
    } else {
      setError("must enter a join code");
    }
  }

  function handleCreateGroup() {
    if (groupName) {
      setCreateVisible(false);
      createGroup(groupName)
        .then((code) => {
          const codeStr = code.toString();
          const group_id = codeStr.split("/")[4];
          joinGroupById(group_id, user.uid, user.username);
          navigation.navigate("GameOn", {
            screen: "Home",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setError("must enter a group name");
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Modal animationType="none" transparent={true} visible={joinVisible}>
        <View style={joinGroup.centeredView}>
          <View style={joinGroup.modalView}>
            <Text>Enter group join code</Text>
            <TextInput
              style={joinGroup.input}
              value={joinCode}
              onChangeText={(text) => {
                setJoinCode(text);
                setError("");
              }}
              returnKeyType="done"
              autoCapitalize="none"
              autoCorrect={false}
            />
            {error ? <Text style={joinGroup.errorText}>{error}</Text> : null}
            <Button title="join group" onPress={handleJoinGroup}></Button>
            <Button title="back" onPress={handleJoinModal}></Button>
          </View>
        </View>
      </Modal>
      <Modal animationType="none" transparent={true} visible={createVisible}>
        <View style={joinGroup.centeredView}>
          <View style={joinGroup.modalView}>
            <Text>Enter new group name</Text>
            <TextInput
              style={joinGroup.input}
              value={groupName}
              onChangeText={setGroupName}
              returnKeyType="done"
              autoCapitalize="none"
              autoCorrect={false}
            />
            {error ? <Text style={joinGroup.errorText}>{error}</Text> : null}
            <Button title="create group" onPress={handleCreateGroup}></Button>
            <Button title="back" onPress={handleCreateModal}></Button>
          </View>
        </View>
      </Modal>

      <View style={joinGroup.container}>
        <View style={joinGroup.textContainer}>
          <Text style={joinGroup.text}>Have a join code?</Text>
          <TouchableOpacity style={joinGroup.button} onPress={handleJoinModal}>
            <Text style={joinGroup.buttonText}>Join a group</Text>
          </TouchableOpacity>
        </View>
        <View style={joinGroup.textContainer}>
          <Text style={joinGroup.text}>
            Make a new group to play with friends and family
          </Text>
          <TouchableOpacity
            style={joinGroup.button}
            onPress={handleCreateModal}
          >
            <Text style={joinGroup.buttonText}>Create a group</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default JoinGroupScreen;
