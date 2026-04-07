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
          {sessions.length ? (
            sessions.map((session) => {
              const date = new Date(session.played_at).toLocaleString();
              const gameName = session.game_name;
              const session_id = session.session_id;
              return (
                <TouchableOpacity
                  key={session.session_id}
                  onPress={() => {
                    navigation.navigate("GameScores", {
                      id,
                      name,
                      date,
                      gameName,
                      session_id,
                    });
                  }}
                  style={
                    session.scored ? gamesPlayed.scoredCard : gamesPlayed.card
                  }
                >
                  <Text style={gamesPlayed.gameName}>Game: {gameName}</Text>
                  <Text style={gamesPlayed.date}>Date: {date}</Text>
                </TouchableOpacity>
              );
            })
          ) : (
            <Text style={gamesPlayed.card}>No Games Have Been Played Yet</Text>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
