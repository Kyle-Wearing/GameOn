import React, { useContext, useEffect, useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  Alert,
  LayoutAnimation,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { getGroupsByUID, pinGroup } from "../../until";
import { UserContext } from "../../userContext";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Loading from "./Loading";
import * as Haptics from "expo-haptics";
import { homePage } from "../styles/homePage";

function HomePageScreen() {
  const { user } = useContext(UserContext);
  const [groups, setGroups] = useState([]);
  const [fullGroups, setFullGroups] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    setIsLoading(true);
    getGroupsByUID(user.uid).then((newGroups) => {
      if (newGroups.length) {
        const sorted = newGroups.sort((a, b) => b.is_pinned - a.is_pinned);
        setFullGroups(sorted);
        setGroups(sorted);
      } else {
        setGroups([
          {
            id: "to join groups",
            name: "you are not in any groups, join or create groups and they will appear here!",
          },
        ]);
      }
      setIsLoading(false);
    });
  }, [isFocused]);

  useEffect(() => {
    if (search) {
      const filteredGroups = fullGroups.filter((group) => {
        const groupName = group.name.trim().toLowerCase();
        return groupName.includes(search.trim().toLowerCase());
      });

      if (filteredGroups.length) {
        setGroups(filteredGroups);
      } else {
        setGroups([
          {
            id: "empty search",
            name: "No groups match that search.",
          },
        ]);
      }
    } else {
      setGroups(fullGroups);
    }
  }, [search, fullGroups]);

  function handlePress(id, group_name) {
    if (id === "to join groups") {
      navigation.navigate("GameOn", { screen: "Groups" });
    } else if (id === "empty search") {
      setSearch("");
    } else {
      navigation.navigate("GroupScreen", { id, group_name });
    }
  }

  const handlePin = async (groupId) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const prevGroups = groups;
    const prevFullGroups = fullGroups;

    const updateList = (list) =>
      list
        .map((g) =>
          g.id === groupId ? { ...g, is_pinned: g.is_pinned === 1 ? 0 : 1 } : g,
        )
        .sort((a, b) => b.is_pinned - a.is_pinned);

    const newGroups = updateList(groups);
    const newFullGroups = updateList(fullGroups);

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    setGroups(newGroups);
    setFullGroups(newFullGroups);

    try {
      await pinGroup(user.uid, groupId);
    } catch (err) {
      console.log("Pin failed:", err);

      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

      setGroups(prevGroups);
      setFullGroups(prevFullGroups);

      Alert.alert("Error", "Failed to update pin");
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={homePage.container}>
        <Text style={homePage.title}>Your Groups</Text>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <View style={homePage.statsRow}>
              <View style={homePage.statCard}>
                <Text style={homePage.statNumber}>{fullGroups.length}</Text>
                <Text style={homePage.statLabel}>Groups</Text>
              </View>

              <View style={homePage.statCard}>
                <Text style={homePage.statNumber}>
                  {fullGroups.filter((g) => g.is_pinned === 1).length}
                </Text>
                <Text style={homePage.statLabel}>Pinned</Text>
              </View>

              <View style={homePage.statCard}>
                <Text style={homePage.statNumber}>{groups.length}</Text>
                <Text style={homePage.statLabel}>Shown</Text>
              </View>
            </View>
            <View style={homePage.searchBar}>
              <Ionicons name="search-outline" size={18} color="#777" />
              <TextInput
                placeholder="Search groups..."
                value={search}
                onChangeText={setSearch}
                style={{ flex: 1, marginLeft: 10 }}
              />
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              {groups.map((group) => {
                return (
                  <TouchableOpacity
                    key={group.id}
                    style={[
                      homePage.groupCard,
                      group.is_pinned === 1 && homePage.pinnedCard,
                    ]}
                    onPress={() => handlePress(group.id, group.name)}
                  >
                    <View style={homePage.groupLeft}>
                      <Ionicons name="people-outline" size={20} color="#555" />
                      <Text style={homePage.groupName}>{group.name}</Text>
                    </View>

                    {group.id.length < 7 && (
                      <TouchableOpacity onPress={() => handlePin(group.id)}>
                        <Ionicons
                          name={group.is_pinned === 1 ? "star" : "star-outline"}
                          size={20}
                          color={group.is_pinned === 1 ? "#4f8cff" : "#aaa"}
                        />
                      </TouchableOpacity>
                    )}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default HomePageScreen;
