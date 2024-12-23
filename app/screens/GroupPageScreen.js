import { useEffect, useState } from "react";
import { Text } from "react-native";
import { getGroupByGroupId } from "../../until";

export function GroupsPageScreen({ route }) {
  const { id } = route.params;

  const [name, setName] = useState("");

  useEffect(() => {
    getGroupByGroupId(id).then((group) => {
      setName(group.groupName);
    });
  }, []);

  return <Text>{name}</Text>;
}
