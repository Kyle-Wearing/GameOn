import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserPerformancePage } from "../styles/userPerformance";
import { useEffect, useState } from "react";
import { getUserPerformance } from "../../until";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import Loading from "./Loading";

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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={UserPerformancePage.header}>
        <TouchableOpacity
          style={UserPerformancePage.backIcon}
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
        <View style={UserPerformancePage.title}>
          <Text style={UserPerformancePage.titleText}>{name}</Text>
        </View>
      </View>
      {isLoading ? (
        <Loading />
      ) : (
        <View style={UserPerformancePage.container}>
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

          <ScrollView>
            {userGames.map((item, index) => {
              return (
                <View key={index} style={UserPerformancePage.gameCard}>
                  <Text style={UserPerformancePage.gameName}>
                    {item.game_name}
                  </Text>
                  <Text>Rating: {item.avg_elo}</Text>
                  <Text>Wins: {item.wins}</Text>
                  <Text>High Score: {item.highest_score}</Text>
                </View>
              );
            })}
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
};
