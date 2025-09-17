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
      setRefresh(refresh * -1);
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
  const [refresh, setRefresh] = useState(1);

  const dot = { color: "blue", selectedDotColor: "white" };
  function getTodaysDate() {
    return new Date().toLocaleDateString().split("/").reverse().join("-");
  }

  useEffect(() => {
    const daySelected = {
      [selected]: {
        selected: true,
        disableTouchEvent: true,
        selectedDotColor: "white",
      },
    };

    getGroupCalendar(id).then((res) => {
      if (!res) {
        res = [];
      }
      setSavedGames([]);
      const games = {};
      Object.entries(res).forEach((date) => {
        games[date[0]] = date[1];
        daySelected[date[0]] = { dots: [dot] };
        if (date[0] === selected) {
          daySelected[date[0]].selected = true;
          setSavedGames(games);
        }
      });

      setSelectedDates(daySelected);
    });
  }, [selected, refresh]);

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
      <ScrollView style={groupCalander.eventList}>
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
      </ScrollView>
    </SafeAreaView>
  );
}
