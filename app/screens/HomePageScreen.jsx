import React, { useContext, useEffect, useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { getGroupsByUID, getUser } from "../../until";
import { UserContext } from "../../userContext";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { homePage } from "../styles/homePage";
import { TextInput } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

function HomePageScreen() {
  const { user } = useContext(UserContext);
  const [groups, setGroups] = useState([]);
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const [fullGroups, setFullGroups] = useState([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    getGroupsByUID(user.uid).then((newGroups) => {
      const groupArr = [];
      for (const group in newGroups) {
        groupArr.push({
          group_id: group,
          groupName: newGroups[group].groupName,
        });
      }
      if (groupArr.length) {
        setFullGroups(groupArr);
        setGroups(groupArr);
      } else {
        setGroups([
          {
            group_id: "to join groups",
            groupName:
              "you are not in any groups, join or create groups and they will appear here!",
          },
        ]);
      }
    });
  }, [isFocused]);

  useEffect(() => {
    if (search) {
      const filteredGroups = fullGroups.filter((group) => {
        const groupName = group.groupName.trim();
        return groupName.includes(search.trim());
      });
      if (filteredGroups.length) {
        setGroups(filteredGroups);
      } else {
        setGroups([
          {
            group_id: "empty search",
            groupName: "No groups match that search.",
          },
        ]);
      }
    } else {
      setGroups(fullGroups);
    }
  }, [search]);

  function handlePress(id) {
    if (id === "to join groups") {
      navigation.navigate("GameOn", { screen: "Groups" });
    } else if (id === "empty search") {
      setSearch("");
    } else {
      navigation.navigate("GroupScreen", { id });
    }
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={homePage.container}>
        <Text style={homePage.titleText}>Your Groups</Text>
        <View style={homePage.searchBar}>
          <View style={homePage.input}>
            <TouchableOpacity style={homePage.iconButton}>
              <Ionicons
                name="search-outline"
                size={20}
                color={"black"}
              ></Ionicons>
            </TouchableOpacity>
            <TextInput
              style={{ fontSize: 16, flex: 1 }}
              placeholder="Search"
              value={search}
              onChangeText={(text) => {
                setSearch(text);
              }}
              returnKeyType="done"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
        </View>
        <ScrollView style={homePage.scrollContainer}>
          {groups.map((group) => {
            return (
              <TouchableOpacity
                key={group.group_id}
                style={homePage.groupButton}
                onPress={() => {
                  handlePress(group.group_id);
                }}
              >
                <Text style={homePage.groupText}>{group.groupName}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default HomePageScreen;
