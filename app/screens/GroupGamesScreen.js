import { useNavigation } from "@react-navigation/native";
import {
  Button,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { gamesPage } from "../styles/gamesPage";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useEffect, useState } from "react";
import { createGame, getGroupGames } from "../../until";

export function GroupGameScreen({ route }) {
  const navigation = useNavigation();
  const { id, name } = route.params;
  const [games, setGames] = useState([]);
  const [newGameVisible, setNewGameVisible] = useState(false);
  const [newGameName, setNewGameName] = useState("");
  const [error, setError] = useState("");

  async function handleNewGame() {
    if (newGameName) {
      const { game_id, already_exists } = await createGame(id, newGameName);
      if (game_id && !already_exists) {
        games.push({ game_id, game_name: newGameName });
        setNewGameVisible(false);
        setNewGameName("");
      } else if (already_exists) {
        setNewGameVisible(false);
        setNewGameName("");
      } else {
        setError("Something went wrong");
      }
    } else {
      setError("Must enter game name");
    }
  }

  useEffect(() => {
    getGroupGames(id).then((res) => {
      setGames(res);
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={gamesPage.header}>
        <TouchableOpacity
          style={gamesPage.backIcon}
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
        <View style={gamesPage.title}>
          <Text style={gamesPage.titleText}>{name}</Text>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <Modal animationType="none" transparent={true} visible={newGameVisible}>
          <View style={gamesPage.centeredView}>
            <View style={gamesPage.modalView}>
              <Text>Enter New Game Name</Text>
              <TextInput
                style={gamesPage.input}
                value={newGameName}
                onChangeText={(text) => {
                  setNewGameName(text);
                  setError("");
                }}
                returnKeyType="done"
                autoCapitalize="none"
                autoCorrect={false}
              ></TextInput>
              {error ? <Text style={gamesPage.errorText}>{error}</Text> : null}
              <Button title="Add Game" onPress={handleNewGame}></Button>
              <Button
                title="Back"
                onPress={() => {
                  setNewGameName("");
                  setNewGameVisible(false);
                }}
              ></Button>
            </View>
          </View>
        </Modal>

        <TouchableOpacity
          style={[gamesPage.addButton]}
          onPress={() => setNewGameVisible(true)}
        >
          <Text style={gamesPage.addButtonText}>Add New Game</Text>
        </TouchableOpacity>

        <ScrollView style={{ paddingVertical: 10, flex: 1 }}>
          {games.map((game) => (
            <TouchableOpacity key={game.game_id} style={gamesPage.gameItem}>
              <Text style={gamesPage.gameItemText}>{game.game_name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
