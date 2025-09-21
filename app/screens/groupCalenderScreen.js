import { Modal, SafeAreaView, ScrollView, Text, TextInput } from "react-native";
import { groupCalander } from "../styles/groupCalander";
import { Button, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useEffect, useState } from "react";
import { Calendar } from "react-native-calendars";
import { getGroupCalendar, sheduleGame } from "../../until";

export function GroupCalanderScreen({ route }) {
  const { id, members, name } = route.params;
  const navigation = useNavigation();

  function handleScore() {
    navigation.navigate("RecordScoresScreen", { id, members, name, selected });
  }

  async function handleAddGame() {
    if (gameInput) {
      await sheduleGame(id, selected, gameInput);
      setAddGameVisible(false);
      setGameInput("");
    } else {
      setError("Must Enter Game");
    }
  }

  const [selected, setSelected] = useState(getTodaysDate());
  const [selectedDates, setSelectedDates] = useState({});
  const [savedGames, setSavedGames] = useState([]);
  const [addGameVisibile, setAddGameVisible] = useState(false);
  const [gameInput, setGameInput] = useState("");
  const [error, setError] = useState("");

  // const dot = { color: "blue", selectedDotColor: "white" };

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

  function getColourForGame(game_id) {
    const colours = ["#FF5733", "#33C1FF", "#9B59B6", "#27AE60", "#F1C40F"];
    return colours[game_id % colours.length];
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
      setSavedGames(dates);
    });
  }, []);

  useEffect(() => {
    const grouped = normalizeSessions(Object.values(savedGames));
    const marked = buildMarkedDates(grouped, selected);

    setSelectedDates(marked);
  }, [selected, savedGames]);

  return (
    <SafeAreaView style={groupCalander.container}>
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
          visible={addGameVisibile}
        >
          <View style={groupCalander.centeredView}>
            <View style={groupCalander.modalView}>
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
              <Button title="Add Game" onPress={handleAddGame}></Button>
              <Button
                title="Cancel"
                onPress={() => {
                  setAddGameVisible(false);
                  setGameInput("");
                }}
              ></Button>
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
        <Button title={"record scores"} onPress={handleScore} />
        <Button
          title={"Add Game"}
          onPress={() => {
            setAddGameVisible(true);
          }}
        />
      </View>
      <Text style={groupCalander.dateText}>
        {selected.split("-").reverse().join(" / ")}
      </Text>
      {/* <ScrollView style={groupCalander.eventList}>
        {savedGames[selected] ? (
          savedGames[selected].map((game, index) => {
            return (
              <View key={index} style={groupCalander.eventItem}>
                <Text style={groupCalander.eventTitle}>{game}</Text>
              </View>
            );
          })
        ) : (
          <View style={groupCalander.eventItem}>
            <Text style={groupCalander.eventTitle}>No Games Sheduled</Text>
          </View>
        )}
      </ScrollView> */}
    </SafeAreaView>
  );
}
