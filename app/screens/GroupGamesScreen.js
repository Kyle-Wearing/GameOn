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
import {
  addGameToGroup,
  createGame,
  getGames,
  getGroupGames,
} from "../../until";
import Loading from "./Loading";

export function GroupGameScreen({ route }) {
  const navigation = useNavigation();
  const { id, name } = route.params;
  const [games, setGames] = useState([]);
  const [newGameVisible, setNewGameVisible] = useState(false);
  const [newGameName, setNewGameName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [modalStep, setModalStep] = useState("select");
  const [selectedGame, setSelectedGame] = useState({});
  const [availableGames, setAvailableGames] = useState([]);

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

  async function handleAddGame() {
    if (selectedGame.game_id) {
      const added = await addGameToGroup(id, selectedGame.game_id);
      if (added === 200) {
        setGames((currGames) => {
          currGames.push({
            game_name: selectedGame.name,
            game_id: selectedGame.game_id,
          });
          return currGames;
        });
        setAvailableGames((currGames) => {
          return currGames.filter((game) => {
            return game.game_id !== selectedGame.game_id;
          });
        });
        setNewGameVisible(false);
        setSelectedGame({});
      }
    } else {
      setError("Must Select A Game");
    }
  }

  function handlePress(game_name, game_id) {
    navigation.navigate("GameRankingScreen", { game_name, game_id, id, name });
  }

  useEffect(() => {
    setIsLoading(true);
    getGroupGames(id).then((fetchedGames) => {
      setGames(fetchedGames);
      setIsLoading(false);
      getGames().then((res) => {
        const idsToRemove = new Set(fetchedGames.map((game) => game.game_id));

        const filteredGames = res.filter(
          (game) => !idsToRemove.has(game.game_id)
        );

        setAvailableGames(filteredGames);
      });
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
              {modalStep === "select" ? (
                <>
                  <Text style={gamesPage.eventTitle}>Select Game</Text>
                  <ScrollView style={gamesPage.modalGameList}>
                    <TouchableOpacity
                      style={gamesPage.modalGameItem}
                      onPress={() => {
                        setSelectedGame({});
                        setError("");
                        setModalStep("create");
                      }}
                    >
                      <Text style={gamesPage.modalCreateNewGameText}>
                        Create New Game?
                      </Text>
                    </TouchableOpacity>
                    {availableGames.map((game) => {
                      const isSelected = selectedGame.game_id === game.game_id;
                      return (
                        <TouchableOpacity
                          key={game.game_id}
                          style={[
                            gamesPage.modalGameItem,
                            isSelected && gamesPage.modalSelectedGameItem,
                          ]}
                          onPress={() => {
                            setSelectedGame(game);
                          }}
                        >
                          <Text
                            style={[
                              gamesPage.modalGameTitle,
                              isSelected && gamesPage.modalSelectedGameTitle,
                            ]}
                          >
                            {game.name}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </ScrollView>

                  <Button title="Add Game To Group" onPress={handleAddGame} />
                  {error ? (
                    <Text style={gamesPage.errorText}>{error}</Text>
                  ) : null}
                  <Button
                    title="Cancel"
                    onPress={() => {
                      setSelectedGame({});
                      setNewGameVisible(false);
                    }}
                  />
                </>
              ) : (
                <>
                  <Text>Enter Name Of Game</Text>
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
                  />
                  {error ? (
                    <Text style={gamesPage.errorText}>{error}</Text>
                  ) : null}
                  <Button
                    title="Add Game"
                    onPress={() => {
                      handleNewGame();
                      setModalStep("select");
                    }}
                  />
                  <Button
                    title="Back"
                    onPress={() => {
                      setModalStep("select");
                      setNewGameName("");
                      setError("");
                    }}
                  />
                </>
              )}
            </View>
          </View>
        </Modal>

        <TouchableOpacity
          style={[gamesPage.addButton]}
          onPress={() => setNewGameVisible(true)}
        >
          <Text style={gamesPage.addButtonText}>Add New Game</Text>
        </TouchableOpacity>

        {isLoading ? (
          <Loading />
        ) : !games.length ? (
          <TouchableOpacity
            key={"no games"}
            style={gamesPage.gameItem}
            onPress={() => {
              setNewGameVisible(true);
            }}
          >
            <Text style={gamesPage.gameItemText}>
              {"Add Games To Group To Start Scoring"}
            </Text>
          </TouchableOpacity>
        ) : (
          <ScrollView style={{ paddingVertical: 10, flex: 1 }}>
            {games.map((game) => (
              <TouchableOpacity
                key={game.game_id}
                style={gamesPage.gameItem}
                onPress={() => {
                  handlePress(game.game_name, game.game_id);
                }}
              >
                <Text style={gamesPage.gameItemText}>{game.game_name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}
