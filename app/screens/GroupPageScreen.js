import React, { useEffect, useState } from "react";
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

export function GroupsPageScreen({ route }) {
  const { id } = route.params;
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [members, setMembers] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const getGroupData = async () => {
      const group = await getGroupByGroupId(id.slice(1));
      const memberArr = [];
      for (const member in group.members) {
        memberArr.push({
          uid: member,
          username: group.members[member].username,
          wins: group.members[member].wins,
          score: group.members[member].score,
        });
      }
      setName(group.groupName);
      memberArr.sort((a, b) => b.score - a.score);
      setMembers(memberArr);
    };

    getGroupData();
  }, [isFocused]);

  return (
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
          <ScrollView>
            {members.map((member, index) => {
              return (
                <View
                  key={member.uid}
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
            onPress={() => alert("to be added")}
          >
            <Text style={groupPage.buttonText}>messages</Text>
          </TouchableOpacity>
        </View>
        <View style={groupPage.settings}>
          <TouchableOpacity style={groupPage.button}>
            <Text
              style={groupPage.buttonText}
              onPress={() => {
                navigation.navigate("GroupSettingsScreen", {
                  groupName: name,
                  groupMembers: members,
                  group_id: id,
                });
              }}
            >
              settings
            </Text>
          </TouchableOpacity>
        </View>
        <View style={groupPage.calander}>
          <TouchableOpacity
            style={groupPage.button}
            onPress={() =>
              navigation.navigate("GroupCalanderScreen", { id, members, name })
            }
          >
            <Text style={groupPage.buttonText}>calander</Text>
          </TouchableOpacity>
        </View>
        <View style={groupPage.history}></View>
        <TouchableOpacity
          style={groupPage.button}
          onPress={() => alert("to be added")}
        >
          <Text style={groupPage.buttonText}>game history</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
