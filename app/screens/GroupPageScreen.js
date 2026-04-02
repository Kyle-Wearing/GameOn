import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { groupPage } from "../styles/groupPage";
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import { getGroupByGroupId, getGroupName } from "../../until";
import Loading from "./Loading";

export function GroupsPageScreen({ route }) {
  const { id, group_name } = route.params;
  const navigation = useNavigation();
  const [name, setName] = useState(group_name);
  const [members, setMembers] = useState([]);
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(true);

  const DEFAULT_AVATAR = require("../assets/DefaultUserIcon.jpg");

  function handlePressUser(user_id, index) {
    navigation.navigate("UserPerformance", { user_id, id, name, index });
  }

  useFocusEffect(
    React.useCallback(() => {
      setIsLoading(true);
      const getGroupData = async () => {
        const group = await getGroupByGroupId(id);
        const groupName = await getGroupName(id);
        const newMembers = group.map((member) => ({
          username: member.username,
          score: member.avg_elo || 0,
          wins: member.wins || 0,
          avatar_url: member.avatar_url,
          user_id: member.user_id,
        }));
        setMembers(newMembers);
        setName(groupName);
        setIsLoading(false);
      };

      getGroupData();
    }, [isFocused]),
  );

  return (
    <SafeAreaProvider style={groupPage.AndroidSafeArea}>
      <SafeAreaView>
        <View style={groupPage.header}>
          <TouchableOpacity
            style={groupPage.backIcon}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back-outline" size={30} color="black" />
          </TouchableOpacity>
          <View style={groupPage.title}>
            <Text style={groupPage.titleText}>{name}</Text>
          </View>
        </View>

        <View style={groupPage.container}>
          <View style={groupPage.leaderboard}>
            <Text style={groupPage.leaderboardText}>leaderboard</Text>
            {isLoading ? (
              <Loading />
            ) : (
              <ScrollView showsVerticalScrollIndicator={false}>
                {members.map((member, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      style={
                        index === 0
                          ? groupPage.memberCard0
                          : index === 1
                            ? groupPage.memberCard1
                            : index === 2
                              ? groupPage.memberCard2
                              : groupPage.memberCard
                      }
                      onPress={() => handlePressUser(member.user_id, index)}
                    >
                      <View style={groupPage.cardContent}>
                        <View>
                          <Text style={groupPage.username}>
                            {index + 1}: {member.username}
                          </Text>
                          <Text style={groupPage.score}>
                            Rating: {member.score}
                          </Text>
                          <Text style={groupPage.score}>
                            Wins: {member.wins}
                          </Text>
                        </View>
                        <Image
                          source={
                            member.avatar_url
                              ? { uri: member.avatar_url }
                              : DEFAULT_AVATAR
                          }
                          style={groupPage.avatar}
                        />
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            )}
          </View>
        </View>

        <View style={groupPage.buttonContainer}>
          <View style={groupPage.messages}>
            <TouchableOpacity
              style={groupPage.button}
              onPress={() =>
                navigation.navigate("GroupGameScreen", { id, name })
              }
            >
              <Text style={groupPage.buttonText}>Games</Text>
            </TouchableOpacity>
          </View>
          <View style={groupPage.settings}>
            <TouchableOpacity
              style={groupPage.button}
              onPress={() =>
                navigation.navigate("GroupSettingsScreen", {
                  groupName: name,
                  group_id: id,
                })
              }
            >
              <Text style={groupPage.buttonText}>Settings</Text>
            </TouchableOpacity>
          </View>
          <View style={groupPage.calander}>
            <TouchableOpacity
              style={groupPage.button}
              onPress={() =>
                navigation.navigate("GroupCalanderScreen", {
                  id,
                  members,
                  name,
                })
              }
            >
              <Text style={groupPage.buttonText}>Calander</Text>
            </TouchableOpacity>
          </View>
          <View style={groupPage.history}></View>
          <TouchableOpacity
            style={groupPage.button}
            onPress={() => navigation.navigate("GamesPlayed", { id, name })}
          >
            <Text style={groupPage.buttonText}>Game History</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
