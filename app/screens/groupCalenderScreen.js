import { SafeAreaView, Text } from "react-native";
import { groupCalander } from "../styles/groupCalander";
import { Button, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useEffect, useState } from "react";
import { Calendar, Agenda } from "react-native-calendars";

export function GroupCalanderScreen({ route }) {
  const { id, members, name } = route.params;
  const navigation = useNavigation();

  function handleScore() {
    navigation.navigate("RecordScoresScreen", { id, members, name });
  }

  const [selected, setSelected] = useState(getTodaysDate());
  const [selectedDates, setSelectedDates] = useState({});

  const dot = { key: "workout", color: "blue", selectedDotColor: "white" };
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
    const apiCall = [
      {
        "2025-03-25": { dots: [dot] },
      },
    ];
    apiCall.forEach((date) => {
      if (Object.keys(date)[0] === selected) {
        Object.values(date)[0].selected = true;
      }
      daySelected[Object.keys(date)[0]] = Object.values(date)[0];
    });
    setSelectedDates(daySelected);
  }, [selected]);

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
      </View>
    </SafeAreaView>
  );
}
