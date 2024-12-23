import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text } from "react-native";
import { getGroupByGroupId } from "../../until";
import { groupPage } from "../styles/groupPage";
import { View } from "react-native";

export function GroupsPageScreen({ route }) {
  const { id } = route.params;

  const [name, setName] = useState("");
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const getGroupData = async () => {
      const group = await getGroupByGroupId(id);
      setMembers(group.members);
      setName(group.groupName);
    };

    getGroupData();
  }, []);

  return (
    <SafeAreaView style={groupPage.container}>
      <Text>{name}</Text>
      <View>
        {members.map((member) => {
          return <Text key={member.uid}>{member.username}</Text>;
        })}
      </View>
    </SafeAreaView>
  );
}
