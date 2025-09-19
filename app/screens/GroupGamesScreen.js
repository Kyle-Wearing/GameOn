import { useNavigation } from "@react-navigation/native";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { gamesPage } from "../styles/gamesPage";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useEffect, useState } from "react";
import { getGroupGames } from "../../until";

export function GroupGameScreen({ route }) {
  const navigation = useNavigation();
  const { id } = route.params;
  const [games, setGames] = useState([]);

  useEffect(() => {
    getGroupGames(id).then((res) => {
      setGames(res);
    });
  }, []);
  return (
    <SafeAreaView>
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
      <ScrollView>
        {games.map((game) => {
          return <Text key={game.game_id}>{game.game_name}</Text>;
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
