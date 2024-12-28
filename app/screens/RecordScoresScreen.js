import { useState } from "react";
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
  const { id, members, name } = route.params;
  const [scoresInput, setScoresInput] = useState(false);
  const [positions, setPositions] = useState([]);
  const [membersArr, setMembersArr] = useState(members);
  const navigation = useNavigation();

  function handleConfirmPlayers() {
    setScoresInput(true);
  }

  function handleScores() {
    updateGroupScores(positions, id);
    setScoresInput(false);
    navigation.navigate("GroupScreen", { id });
  }

  function handlePress(uid) {
    setMembersArr(
      membersArr.filter((member) => {
        return member.uid !== uid;
      })
    );
    setPositions((currPositions) => {
      currPositions.push(uid);
      return currPositions;
    });
  }

  return (
    <SafeAreaView>
      <View style={recordScores.header}>
        <TouchableOpacity
          style={recordScores.backIcon}
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
        <View style={recordScores.title}>
          <Text style={recordScores.titleText}>{name}</Text>
        </View>
      </View>
      <Modal animationType="none" transparent={true} visible={scoresInput}>
        <View style={recordScores.centeredView}>
          <View style={recordScores.modalView}>
            <Text style={recordScores.scoreTitle}>
              Select players in order 1st to last
            </Text>
            <ScrollView style={recordScores.scrollContainer}>
              {membersArr.map((member) => {
                return (
                  <TouchableOpacity
                    style={recordScores.playerButton}
                    onPress={() => handlePress(member.uid)}
                    key={member.uid}
                  >
                    <Text style={recordScores.playerText}>
                      {member.username}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
            <Button
              title="reset"
              onPress={() => {
                setMembersArr(members);
                setPositions([]);
              }}
            ></Button>
            <Button title="confirm scores" onPress={handleScores}></Button>
            <Button
              title="cancel"
              onPress={() => {
                setMembersArr(members);
                setPositions([]);
                setScoresInput(false);
              }}
            ></Button>
          </View>
        </View>
      </Modal>
      <View style={recordScores.container}>
        <View style={recordScores.textContainer}>
          <TouchableOpacity
            style={recordScores.button}
            onPress={handleConfirmPlayers}
          >
            <Text style={recordScores.buttonText}>input scores</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
