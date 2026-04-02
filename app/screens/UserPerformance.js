import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { getUserPerformance } from "../../until";
import Loading from "./Loading";
import { UserPerformancePage } from "../styles/userPerformance";

const DEFAULT_AVATAR = require("../assets/DefaultUserIcon.jpg");

export const UserPerformance = ({ route }) => {
  const { user_id, id, name, index } = route.params;
  const [userData, setUserData] = useState({});
  const [userGames, setUserGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    getUserPerformance(user_id, id).then((res) => {
      setUserData(res.user);
      setUserGames(res.games || []);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <Loading />;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <View style={UserPerformancePage.header}>
        <TouchableOpacity
          style={UserPerformancePage.backIcon}
          onPress={() => navigation.pop()}
        >
          <Ionicons name="chevron-back-outline" size={30} color="black" />
        </TouchableOpacity>
        <View style={UserPerformancePage.title}>
          <Text style={UserPerformancePage.titleText}>{name}</Text>
        </View>
      </View>

      <ScrollView style={UserPerformancePage.container}>
        <View
          style={
            index === 0
              ? UserPerformancePage.summaryCard0
              : index === 1
                ? UserPerformancePage.summaryCard1
                : index === 2
                  ? UserPerformancePage.summaryCard2
                  : UserPerformancePage.summaryCard
          }
        >
          <View style={UserPerformancePage.cardContent}>
            <View style={{ flex: 1 }}>
              <Text style={UserPerformancePage.username}>
                {userData.username}
              </Text>
              <Text style={UserPerformancePage.stat}>
                ⭐ Average Rating: {userData.avg_elo}
              </Text>
              <Text style={UserPerformancePage.stat}>
                🏆 Total Wins: {userData.wins}
              </Text>
            </View>

            <Image
              source={
                userData.avatar_url
                  ? { uri: userData.avatar_url }
                  : DEFAULT_AVATAR
              }
              style={UserPerformancePage.avatarRight}
            />
          </View>
        </View>

        {userGames.map((item, idx) => (
          <View key={idx} style={UserPerformancePage.gameCard}>
            <Text style={UserPerformancePage.gameName}>{item.game_name}</Text>
            <Text>Rating: {item.avg_elo}</Text>
            <Text>Wins: {item.wins}</Text>
            <Text>High Score: {item.highest_score}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
