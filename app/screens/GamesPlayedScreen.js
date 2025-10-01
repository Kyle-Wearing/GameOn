import { SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native";
import { Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { gamesPlayed } from "../styles/gamesPlayed";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { getSessions } from "../../until";
import Loading from "./Loading";

export function GamesPlayedScreen({ route }) {
  const { id, name } = route.params;
  const navigation = useNavigation();
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getSessions(id).then((res) => {
      setSessions(res);
      setIsLoading(false);
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={gamesPlayed.header}>
        <TouchableOpacity
          style={gamesPlayed.backIcon}
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
        <View style={gamesPlayed.title}>
          <Text style={gamesPlayed.titleText}>{name}</Text>
        </View>
      </View>

      {isLoading ? (
        <Loading />
      ) : (
        <ScrollView style={gamesPlayed.container}>
          {sessions.map((session) => {
            const date = session.played_at.split("-").reverse().join("/");
            return (
              <TouchableOpacity
                key={session.session_id}
                style={
                  session.scored ? gamesPlayed.scoredCard : gamesPlayed.card
                }
              >
                <Text style={gamesPlayed.gameName}>
                  Game: {session.game_name}
                </Text>
                <Text style={gamesPlayed.date}>Date: {date}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
