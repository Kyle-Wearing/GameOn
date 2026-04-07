import { SafeAreaView, TouchableOpacity, View } from "react-native";
import { Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { getGameScores } from "../../until";
import { useEffect, useState } from "react";
import { gameScore } from "../styles/gameScore";

export function GameScoreScreen({ route }) {
  const { id, name, date, gameName, session_id } = route.params;
  const navigation = useNavigation();
  const [gameScores, setGameScores] = useState([]);
  const [playedAt, setPlayedAt] = useState(date);

  useEffect(() => {
    getGameScores(session_id).then((scores) => {
      setGameScores(scores);

      const formatedDate = new Date(scores[0].played_at);
      setPlayedAt(formatedDate.toLocaleString());
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={gameScore.header}>
        <TouchableOpacity
          style={gameScore.backIcon}
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
        <View style={gameScore.title}>
          <Text style={gameScore.titleText}>{name}</Text>
        </View>
      </View>
      <View style={gameScore.card}>
        <Text style={gameScore.gameName}>{gameName}</Text>
        <Text style={gameScore.date}>{playedAt}</Text>

        {gameScores.length ? (
          gameScores.map((score, index) => {
            return (
              <View key={score.user_id} style={gameScore.row}>
                <Text style={gameScore.position}>{index + 1}.</Text>

                <Text style={gameScore.username}>{score.username}</Text>

                <Text style={gameScore.score}>{score.score}</Text>
              </View>
            );
          })
        ) : (
          <Text style={gameScore.noScores}>No scores yet</Text>
        )}
      </View>
    </SafeAreaView>
  );
}
