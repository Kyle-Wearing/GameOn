import { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Modal } from "react-native";
import { SafeAreaView, Text, TextInput } from "react-native";
import { recordScores } from "../styles/recordScores";
import { Button } from "react-native";
import { updateGroupScores } from "../../until";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native";

export function RecordScoresScreen({ route }) {
  const { id, members, name, selected } = route.params;
  const [memberArr, setMemberArr] = useState([]);
  const [scoreModal, setScoreModal] = useState(false);
  const [username, setUsername] = useState("");
  const [scoreInput, setScoreInput] = useState("");
  const [uid, setUid] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const newMembers = members.map((member) => {
      return { username: member.username, uid: member.uid, score: 0 };
    });
    setMemberArr(newMembers);
  }, []);

  function handlePress(uid, username) {
    setUid(uid);
    setUsername(username);
    setScoreModal(true);
  }

  function handleConfirm() {
    setScoreModal(false);
    const index = memberArr.findIndex((member) => {
      return member.uid === uid;
    });
    setMemberArr((currMembers) => {
      const newMembers = [...currMembers];
      newMembers[index].score = scoreInput || "0";
      return newMembers;
    });
    setUid("");
    setScoreInput("");
    setUsername("");
  }

  function handleSubmit() {
    const sortedMembers = memberArr.filter((member) => {
      return member.score !== 0;
    });
    sortedMembers.sort((a, b) => {
      return Number(b.score) - Number(a.score);
    });

    updateGroupScores(sortedMembers, id);
    navigation.pop(2);
  }

  return (
    <SafeAreaView style={recordScores.AndroidSafeArea}>
      <View style={recordScores.header}>
        <TouchableOpacity
          style={recordScores.backIcon}
          onPress={() => {
            navigation.pop();
          }}
        >
          <Ionicons
            name="chevron-back-outline"
            size={30}
            color="black"
          ></Ionicons>
        </TouchableOpacity>
        <View style={recordScores.title}>
          <Text style={recordScores.titleText}>{name}</Text>
        </View>
      </View>
      <Modal animationType="none" transparent={true} visible={scoreModal}>
        <View style={recordScores.centeredView}>
          <View style={recordScores.modalView}>
            <Text style={recordScores.scoreTitle}>
              Enter score for {username}
            </Text>
            <TextInput
              style={recordScores.input}
              placeholder="0"
              placeholderTextColor={"black"}
              keyboardType="numeric"
              value={scoreInput}
              onChangeText={setScoreInput}
            ></TextInput>
            <Button title="confirm" onPress={handleConfirm}></Button>
            <Button
              title="cancel"
              onPress={() => {
                setScoreModal(false);
                setUsername("");
                setUid("");
                setScoreInput("");
              }}
            ></Button>
          </View>
        </View>
      </Modal>
      <View>
        <ScrollView style={recordScores.scrollContainer}>
          {memberArr.map((member) => {
            return (
              <TouchableOpacity
                key={member.uid}
                style={recordScores.playerButton}
                onPress={() => {
                  handlePress(member.uid, member.username);
                }}
              >
                <Text style={recordScores.playerText}>
                  {member.username}: {member.score}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <Button
          title="confirm"
          onPress={() => {
            handleSubmit();
          }}
        ></Button>
      </View>
    </SafeAreaView>
  );
}
