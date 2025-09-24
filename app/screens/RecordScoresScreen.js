import { useEffect, useState } from "react";
import {
  TouchableOpacity,
  View,
  Button,
  Modal,
  SafeAreaView,
  Text,
  TextInput,
  ScrollView,
} from "react-native";
import { recordScores } from "../styles/recordScores";
import { getElo, scoreSession, setSessionScored, updateElo } from "../../until";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

export function RecordScoresScreen({ route }) {
  const { id, members, name, selected, selectedSession } = route.params;
  const [memberArr, setMemberArr] = useState([]);
  const [scoreModal, setScoreModal] = useState(false);
  const [username, setUsername] = useState("");
  const [scoreInput, setScoreInput] = useState("");
  const [user_id, setuser_id] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const newMembers = members.map((member) => {
      return { username: member.username, user_id: member.user_id, score: 0 };
    });
    setMemberArr(newMembers);
  }, []);

  function calculateEloChange(players) {
    let prevScore = null;
    let prevPosition = null;
    const newPlayers = players.map((player, index) => {
      let position;
      if (player.score === prevScore) {
        position = prevPosition;
      } else {
        position = index + 1;
        prevPosition = position;
      }
      prevScore = player.score;

      return {
        ...player,
        position,
      };
    });

    const updatedPlayers = newPlayers.map((player) => {
      const minChange = -players.length * 5;
      const maxChange = players.length * 5;
      const ratio = (player.position - 1) / (players.length - 1 || 1);
      const eloChange = Math.round(maxChange + ratio * (minChange - maxChange));

      return {
        ...player,
        eloChange,
        game_id: selectedSession.game_id,
        group_id: id,
      };
    });

    return updatedPlayers;
  }

  async function handleSubmit() {
    const updated = await setSessionScored(selectedSession.session_id);
    if (updated) {
      const membersToUpdate = memberArr.filter((member) => {
        return member.score;
      });
      const sorted = membersToUpdate.sort((a, b) => b.score - a.score);
      const calculatedScores = calculateEloChange(sorted);
      calculatedScores.forEach((player) => {
        scoreSession(
          selectedSession.session_id,
          player.user_id,
          player.score,
          player.position
        );
      });
      updateElo(calculatedScores, id, selectedSession.game_id);

      navigation.pop(1);
    }
  }

  function handlePress(user_id, username) {
    setuser_id(user_id);
    setUsername(username);
    setScoreModal(true);
  }

  function handleConfirm() {
    setScoreModal(false);
    const index = memberArr.findIndex((member) => {
      return member.user_id === user_id;
    });
    setMemberArr((currMembers) => {
      const newMembers = [...currMembers];
      newMembers[index].score = Number(scoreInput) || 0;
      return newMembers;
    });
    setuser_id("");
    setScoreInput("");
    setUsername("");
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
      <Text style={recordScores.subText}>{selected}</Text>
      <Text style={recordScores.subText}>
        {selectedSession.session_gameName}
      </Text>
      <Text style={recordScores.subText}>Enter Game Scores</Text>
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
                setuser_id("");
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
                key={member.user_id}
                style={recordScores.playerButton}
                onPress={() => {
                  handlePress(member.user_id, member.username);
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
