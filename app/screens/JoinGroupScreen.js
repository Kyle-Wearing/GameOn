import React, { useState } from "react";
import { View } from "react-native";
import { Modal } from "react-native";
import { Text, SafeAreaView, TextInput, Button } from "react-native";
import { joinGroup } from "../styles/joinGroup";

function JoinGroupScreen() {
  const [joinVisible, setJoinVisible] = useState(false);
  const [createVisible, setCreateVisible] = useState(false);
  const [joinCode, setJoinCode] = useState("");

  function handleCreate() {
    setCreateVisible(!createVisible);
  }

  function handleJoin() {
    setJoinVisible(!joinVisible);
  }

  function handleSubmit() {}

  return (
    <SafeAreaView>
      <Modal animationType="none" transparent={true} visible={joinVisible}>
        <View style={joinGroup.centeredView}>
          <View style={joinGroup.modalView}>
            <Text>Enter group join code</Text>
            <TextInput
              style={joinGroup.input}
              value={joinCode}
              onChangeText={setJoinCode}
              returnKeyType="done"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Button title="join" onPress={handleSubmit}></Button>
            <Button title="back" onPress={handleJoin}></Button>
          </View>
        </View>
      </Modal>
      <Modal animationType="none" transparent={true} visible={createVisible}>
        <View style={joinGroup.centeredView}>
          <Text>here</Text>
          <Button title="back" onPress={handleCreate}></Button>
        </View>
      </Modal>

      <Text>Have a join code?</Text>
      <Button title="Join a group" onPress={handleJoin}></Button>
      <Text>Make a new group to play with friends and family</Text>
      <Button title="Create a group" onPress={handleCreate}></Button>
    </SafeAreaView>
  );
}

export default JoinGroupScreen;
