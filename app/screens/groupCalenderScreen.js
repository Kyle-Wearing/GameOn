import { Modal, SafeAreaView, ScrollView, Text, TextInput } from "react-native";
import { groupCalander } from "../styles/groupCalander";
import { Button, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useEffect, useState } from "react";
import { Calendar } from "react-native-calendars";
import {
  createGame,
  getGroupCalendar,
  getGroupGames,
  sheduleGame,
} from "../../until";

export function GroupCalanderScreen({ route }) {
  const { id, members, name } = route.params;
  const navigation = useNavigation();

  function handleScore() {
    navigation.navigate("RecordScoresScreen", { id, members, name, selected });
  }

  function handleUnshedule() {}

  async function handleAddGame() {
    if (gameInput) {
      const { game_id } = await createGame(id, gameInput);
      const sessionId = await sheduleGame(id, game_id, selected);

      if (sessionId) {
        const newSession = {
          session_id: sessionId.session_id,
          game_id,
          game_name: gameInput,
          group_id: id,
          played_at: selected,
        };
        setAvailableGames((curr) => {
          const newGames = [...curr];
          newGames.push({ game_id, game_name: gameInput, group_id: id });
          return newGames;
        });
        addSessionToGrouped(savedGames, newSession);
        setSelectGameVisible(false);
        setModalStep("select");
        setGameInput("");
      } else {
        setError("Something Went Wrong");
      }
    } else {
      setError("Must Enter Game");
    }
  }

  async function handleAddSession() {
    if (selectedGameId) {
      const sessionId = await sheduleGame(id, selectedGameId, selected);
      if (sessionId) {
        const newSession = {
          session_id: sessionId.session_id,
          game_id: selectedGameId,
          game_name: selectedGameName,
          group_id: id,
          played_at: selected,
        };
        addSessionToGrouped(savedGames, newSession);
        setSelectGameVisible(false);
        setSelectedGameId(null);
      } else {
        setError("Something Went Wrong");
      }
    } else {
      setError("Must Select Game");
    }
  }

  const [selected, setSelected] = useState(getTodaysDate());
  const [selectedDates, setSelectedDates] = useState({});
  const [savedGames, setSavedGames] = useState([]);
  const [selectGameVisibile, setSelectGameVisible] = useState(false);
  const [gameInput, setGameInput] = useState("");
  const [error, setError] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSession, setSelectedSession] = useState({});
  const [availableGames, setAvailableGames] = useState([]);
  const [selectedGameId, setSelectedGameId] = useState(null);
  const [selectedGameName, setSelectedGameName] = useState("");
  const [modalStep, setModalStep] = useState("select");

  function getTodaysDate() {
    return new Date().toLocaleDateString().split("/").reverse().join("-");
  }

  function normalizeSessions(sessions) {
    const grouped = {};

    sessions.forEach((session) => {
      const date = session.played_at;

      if (!grouped[date]) {
        grouped[date] = [];
      }

      grouped[date].push(session);
    });
    return grouped;
  }

  function addSessionToGrouped(grouped, newSession) {
    const date = newSession.played_at;

    const updated = { ...grouped };
    if (!updated[date]) {
      updated[date] = [];
    }
    updated[date] = [...updated[date], newSession];

    setSavedGames(updated);
  }

  const gameColourMap = {};
  function getColourForGame(game_id) {
    const colours = ["#FF5733", "#33C1FF", "#9B59B6", "#27AE60", "#F1C40F"];
    if (!gameColourMap[game_id]) {
      const index = Object.keys(gameColourMap).length % colours.length;
      gameColourMap[game_id] = colours[index];
    }

    return gameColourMap[game_id];
  }

  function buildMarkedDates(grouped, selected) {
    const marked = {};
    Object.entries(grouped).forEach(([date, sessions]) => {
      marked[date] = {
        dots: sessions.map((session) => {
          return {
            key: `${session.session_id}`,
            color: getColourForGame(session.game_id),
          };
        }),
      };
    });

    if (selected) {
      const existing = marked[selected] || { dots: [] };

      marked[selected] = {
        ...existing,
        selected: true,
        disableTouchEvent: true,
        dots: existing.dots.map((dot) => ({
          ...dot,
          selectedDotColor: "white",
        })),
      };
    }
    return marked;
  }

  useEffect(() => {
    getGroupCalendar(id).then((dates) => {
      const grouped = normalizeSessions(Object.values(dates));
      setSavedGames(grouped);
    });
    getGroupGames(id).then((games) => {
      setAvailableGames(games);
    });
  }, []);

  useEffect(() => {
    const marked = buildMarkedDates(savedGames, selected);
    setSelectedDates(marked);
  }, [selected, savedGames]);

  return (
    <SafeAreaView style={groupCalander.container}>
      <Modal animationType="none" transparent={true} visible={modalVisible}>
        <View style={groupCalander.centeredView}>
          <View style={groupCalander.modalView}>
            <Text>{selectedSession.session_gameName}</Text>
            <Button title="unshedule game" onPress={handleUnshedule}></Button>
            <Button title="record scores" onPress={handleScore}></Button>
            <Button
              title="cancel"
              onPress={() => {
                setModalVisible(false);
              }}
            ></Button>
          </View>
        </View>
      </Modal>
      <View style={groupCalander.header}>
        <TouchableOpacity
          style={groupCalander.backIcon}
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
        <View style={groupCalander.title}>
          <Text style={groupCalander.titleText}>{name}</Text>
        </View>
      </View>
      <SafeAreaView>
        <Modal
          animationType="none"
          transparent={true}
          visible={selectGameVisibile}
        >
          <View style={groupCalander.centeredView}>
            <View style={groupCalander.modalView}>
              {modalStep === "select" ? (
                <>
                  <Text>Select Game</Text>
                  <ScrollView style={groupCalander.gameList}>
                    <TouchableOpacity
                      style={groupCalander.gameItem}
                      onPress={() => {
                        setModalStep("create");
                        setGameInput("");
                        setError("");
                      }}
                    >
                      <Text style={groupCalander.createNewGameText}>
                        Create New Game?
                      </Text>
                    </TouchableOpacity>
                    {availableGames.map((game) => {
                      const isSelected = selectedGameId === game.game_id;
                      return (
                        <TouchableOpacity
                          key={game.game_id}
                          style={[
                            groupCalander.gameItem,
                            isSelected && groupCalander.selectedGameItem,
                          ]}
                          onPress={() => {
                            setSelectedGameId(game.game_id);
                            setSelectedGameName(game.game_name);
                            setError("");
                          }}
                        >
                          <Text
                            style={[
                              groupCalander.gameTitle,
                              isSelected && groupCalander.selectedGameTitle,
                            ]}
                          >
                            {game.game_name}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </ScrollView>

                  <Button title="Schedule Game" onPress={handleAddSession} />
                  {error ? (
                    <Text style={groupCalander.errorText}>{error}</Text>
                  ) : null}
                  <Button
                    title="Cancel"
                    onPress={() => {
                      setSelectGameVisible(false);
                      setSelectedGameId(null);
                      setModalStep("select");
                    }}
                  />
                </>
              ) : (
                <>
                  <Text>Enter Name Of Game</Text>
                  <TextInput
                    style={groupCalander.input}
                    value={gameInput}
                    onChangeText={(text) => {
                      setGameInput(text);
                      setError("");
                    }}
                    returnKeyType="done"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  {error ? (
                    <Text style={groupCalander.errorText}>{error}</Text>
                  ) : null}
                  <Button title="Add Game" onPress={handleAddGame} />
                  <Button
                    title="Back"
                    onPress={() => {
                      setModalStep("select");
                    }}
                  />
                </>
              )}
            </View>
          </View>
        </Modal>
        <View>
          <Calendar
            style={groupCalander.calendar}
            theme={{
              backgroundColor: "#ffffff",
              calendarBackground: "#ffffff",
              textSectionTitleColor: "#b6c1cd",
              selectedDayBackgroundColor: "#00adf5",
              selectedDayTextColor: "#ffffff",
              todayTextColor: "#00adf5",
              dayTextColor: "#2d4150",
              textDisabledColor: "#dd99ee",
            }}
            onDayPress={(day) => {
              setSelected(day.dateString);
            }}
            enableSwipeMonths={true}
            markingType={"multi-dot"}
            markedDates={selectedDates}
          />
        </View>
      </SafeAreaView>
      <View style={groupCalander.button}>
        <Button
          title={"Add Game"}
          onPress={() => {
            setSelectGameVisible(true);
          }}
        />
      </View>
      <Text style={groupCalander.dateText}>
        {selected.split("-").reverse().join(" / ")}
      </Text>
      <ScrollView style={groupCalander.eventList}>
        {savedGames[selected] ? (
          savedGames[selected].map((game, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={groupCalander.eventItem}
                onPress={() => {
                  setSelectedSession({
                    session_id: game.session_id,
                    session_gameName: game.game_name,
                  });
                  setModalVisible(true);
                }}
              >
                <Text style={groupCalander.eventTitle}>{game.game_name}</Text>
              </TouchableOpacity>
            );
          })
        ) : (
          <View style={groupCalander.eventItem}>
            <Text style={groupCalander.eventTitle}>No Games Sheduled</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
