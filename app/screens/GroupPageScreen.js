import { useEffect, useState } from "react";
import { SafeAreaView, Text, TextInput } from "react-native";
import { getGroupByGroupId } from "../../until";
import { groupPage } from "../styles/groupPage";
import { View } from "react-native";
import { Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

export function GroupsPageScreen({ route }) {
  const { id } = route.params;
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const getGroupData = async () => {
      const group = await getGroupByGroupId(id);
      const memberArr = [];
      for (const member in group.members) {
        memberArr.push({
          uid: member,
          username: group.members[member].username,
        });
      }
      setName(group.groupName);
      setMembers(memberArr);
    };

    getGroupData();
  }, []);

  return (
    <SafeAreaView style={groupPage.container}>
      <Text>{name}</Text>
      <Text>group id</Text>
      <TextInput value={id}></TextInput>
      <View>
        {members.map((member) => {
          return <Text key={member.uid}>{member.username}</Text>;
        })}
      </View>
      <Button
        title="go back"
        onPress={() => {
          navigation.goBack();
        }}
      ></Button>
    </SafeAreaView>
  );
}
