import { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { rankingPage } from "../styles/rankingPage";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { getElo } from "../../until";
import Loading from "./Loading";

const DEFAULT_AVATAR = require("../assets/DefaultUserIcon.jpg");

export function GameRankingScreen({ route }) {
  const { id, game_id, game_name, name } = route.params;
  const navigation = useNavigation();
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isFocused = useIsFocused();

  useEffect(() => {
    getElo(id, game_id).then((res) => {
      setMembers(res);
      setIsLoading(false);
    });
  }, [isFocused]);

  function handlePressUser(user_id, index) {
    navigation.navigate("UserPerformance", { user_id, id, name, index });
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={rankingPage.header}>
        <TouchableOpacity
          style={rankingPage.backIcon}
          onPress={() => navigation.pop()}
        >
          <Ionicons name="chevron-back-outline" size={30} color="black" />
        </TouchableOpacity>
        <View style={rankingPage.title}>
          <Text style={rankingPage.titleText}>{name}</Text>
        </View>
      </View>

      <Text style={[rankingPage.titleText, { marginVertical: 10 }]}>
        {game_name}
      </Text>

      <View style={rankingPage.container}>
        <View style={rankingPage.leaderboard}>
          <Text style={rankingPage.leaderboardText}>Leaderboard</Text>
          {isLoading ? (
            <Loading />
          ) : (
            <ScrollView showsVerticalScrollIndicator={false}>
              {members.map((member, index) => (
                <TouchableOpacity
                  onPress={() => handlePressUser(member.user_id, index)}
                  key={index}
                  style={
                    index === 0
                      ? rankingPage.memberCard0
                      : index === 1
                        ? rankingPage.memberCard1
                        : index === 2
                          ? rankingPage.memberCard2
                          : rankingPage.memberCard
                  }
                >
                  <View style={rankingPage.cardContent}>
                    <View style={{ flex: 1 }}>
                      <Text style={rankingPage.username}>
                        {index + 1}: {member.username}
                      </Text>
                      <Text style={rankingPage.score}>
                        Score: {member.avg_elo || 0}
                      </Text>
                      <Text style={rankingPage.score}>
                        Wins: {member.wins || 0}
                      </Text>
                    </View>
                    <Image
                      source={
                        member.avatar_url
                          ? { uri: member.avatar_url }
                          : DEFAULT_AVATAR
                      }
                      style={rankingPage.avatar}
                    />
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
