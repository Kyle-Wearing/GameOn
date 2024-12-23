import { useEffect, useState } from "react";
import { ScrollView, Text } from "react-native";
import { getGroupByGroupId, getUser } from "../../until";

export function GroupsPageScreen({ route }) {
  const { id } = route.params;

  const [name, setName] = useState("");
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const getGroupData = async () => {
      const group = await getGroupByGroupId(id);
      setName(group.groupName);
    };

    getGroupData();
  }, []);

  return (
    <>
      <Text>{name}</Text>
      <ScrollView></ScrollView>
    </>
  );
}
