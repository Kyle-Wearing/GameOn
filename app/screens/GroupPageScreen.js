import React, { useState } from "react";
import { SafeAreaView, Text } from "react-native";
import { getGroupByGroupId } from "../../until";
import { groupPage } from "../styles/groupPage";
import { View } from "react-native";
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import { ScrollView } from "react-native";
import { TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SafeAreaProvider } from "react-native-safe-area-context";

export function GroupsPageScreen({ route }) {
  const { id } = route.params;
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [members, setMembers] = useState([]);
  const isFocused = useIsFocused();

  useFocusEffect(
    React.useCallback(() => {
      const getGroupData = async () => {
        const group = await getGroupByGroupId(id);
        setName(group[0].group_name);
        const newMembers = group.map((member) => {
          return { username: member.username, score: "0", wins: "0" };
        });
        setMembers(newMembers);
      };

      getGroupData();
    }, [id])
  );

  return (
    <SafeAreaProvider style={groupPage.AndroidSafeArea}>
      <SafeAreaView>
        <View style={groupPage.header}>
          <TouchableOpacity
            style={groupPage.backIcon}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons
              name="chevron-back-outline"
              size={30}
              color="black"
            ></Ionicons>
          </TouchableOpacity>
          <View style={groupPage.title}>
            <Text style={groupPage.titleText}>{name}</Text>
          </View>
        </View>
        <View style={groupPage.container}>
          <View style={groupPage.leaderboard}>
            <Text style={groupPage.leaderboardText}>leaderboard</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              {members.map((member, index) => {
                return (
                  <View
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
                  >
                    <Text style={groupPage.username}>
                      {index + 1}: {member.username}
                    </Text>
                    <View style={groupPage.statsContainer}>
                      <Text style={groupPage.score}>score: {member.score}</Text>
                      <Text style={groupPage.score}>wins: {member.wins}</Text>
                    </View>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </View>
        <View style={groupPage.buttonContainer}>
          <View style={groupPage.messages}>
            <TouchableOpacity
              style={groupPage.button}
              onPress={() =>
                navigation.navigate("GroupGameScreen", {
                  id,
                  name,
                })
              }
            >
              <Text style={groupPage.buttonText}>Games</Text>
            </TouchableOpacity>
          </View>
          <View style={groupPage.settings}>
            <TouchableOpacity
              style={groupPage.button}
              onPress={() => {
                navigation.navigate("GroupSettingsScreen", {
                  groupName: name,
                  groupMembers: members,
                  group_id: id,
                });
              }}
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
            onPress={() => alert("to be added")}
          >
            <Text style={groupPage.buttonText}>Game History</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
