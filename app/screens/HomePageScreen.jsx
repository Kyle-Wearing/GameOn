import React, { useContext, useEffect, useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { getGroupsByUID, getUser } from "../../until";
import { UserContext } from "../../userContext";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { homePage } from "../styles/homePage";

function HomePageScreen() {
  const { user } = useContext(UserContext);
  const [groups, setGroups] = useState([]);
  const navigation = useNavigation();

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

  function handlePress(id) {
    if (id === "to join groups") {
      navigation.navigate("GameOn", { screen: "Groups" });
    } else {
      navigation.navigate("GroupScreen", { id });
    }
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={homePage.container}>
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
                <Text style={styles.text}>{group.groupName}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default HomePageScreen;
