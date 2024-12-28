import React, { useContext, useEffect, useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { Text, View, StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { getGroupsByUID } from "../../until";
import { UserContext } from "../../userContext";
import { useIsFocused, useNavigation } from "@react-navigation/native";

function HomePageScreen() {
  const { user } = useContext(UserContext);
  const [groups, setGroups] = useState([]);
  const navigate = useNavigation();

  const isFocused = useIsFocused();

  useEffect(() => {
    if (user.groups) {
      getGroupsByUID(user.uid).then((newGroups) => {
        const groupArr = [];
        for (const group in newGroups) {
          groupArr.push({
            group_id: group,
            groupName: newGroups[group].groupName,
          });
        }
        setGroups(groupArr);
      });
    }
  }, [isFocused]);

  function handlePress(id) {
    navigate.navigate("GroupScreen", { id });
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          {groups.map((group) => {
            return (
              <TouchableOpacity
                key={group.group_id}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 10,
    margin: 10,
  },
  text: {
    fontSize: 40,
  },
  topScores: {
    fontSize: 20,
  },
});

export default HomePageScreen;
