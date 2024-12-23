import { useEffect, useState } from "react";
import { ScrollView, Text } from "react-native";
import { getGroupByGroupId } from "../../until";

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
    <>
      <Text>{name}</Text>
      <ScrollView>
        {members.map((member) => {
          return <Text key={member.uid}>{member.username}</Text>;
        })}
      </ScrollView>
    </>
  );
}
