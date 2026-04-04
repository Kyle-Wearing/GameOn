import React, { useContext, useEffect, useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  Alert,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { getGroupsByUID, pinGroup } from "../../until";
import { UserContext } from "../../userContext";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { homePage } from "../styles/homePage";
import Ionicons from "react-native-vector-icons/Ionicons";
import Loading from "./Loading";

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
        <Text style={homePage.titleText}>Your Groups</Text>

        <View style={homePage.searchBar}>
          <View style={homePage.input}>
            <TouchableOpacity style={homePage.iconButton}>
              <Ionicons name="search-outline" size={20} color="black" />
            </TouchableOpacity>

            <TextInput
              style={{ fontSize: 16, flex: 1 }}
              placeholder="Search"
              value={search}
              onChangeText={(text) => setSearch(text)}
              returnKeyType="done"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
        </View>

        {isLoading ? (
          <Loading />
        ) : (
          <ScrollView style={homePage.scrollContainer}>
            {groups.map((group) => {
              const isFake =
                group.id === "to join groups" || group.id === "empty search";

              return (
                <TouchableOpacity
                  key={group.id}
                  style={homePage.groupButton}
                  onPress={() => handlePress(group.id, group.name)}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={homePage.groupText}>{group.name}</Text>

                    {!isFake && (
                      <TouchableOpacity onPress={() => handlePin(group.id)}>
                        <Ionicons
                          name={group.is_pinned === 1 ? "star" : "star-outline"}
                          size={20}
                          color="blue"
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default HomePageScreen;
