import { SafeAreaView, Text } from "react-native";
import { groupCalander } from "../styles/groupCalander";
import { Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { View } from "react-native";
import { TouchableOpacity } from "react-native";

export function GroupCalanderScreen({ route }) {
  const { id, members, name } = route.params;
  const navigation = useNavigation();

  function handleScore() {
    navigation.navigate("RecordScoresScreen", { id, members, name });
  }

  return (
    <SafeAreaView style={groupCalander.container}>
      <View style={groupCalander.header}>
        <TouchableOpacity
          style={groupCalander.backIcon}
          onPress={() => {
            navigation.pop();
          }}
        >
          <Ionicons
            name="chevron-back-outline"
            size={30}
            color="black"
          ></Ionicons>
        </TouchableOpacity>
        <View style={groupCalander.title}>
          <Text style={groupCalander.titleText}>{name}</Text>
        </View>
      </View>
      <View style={groupCalander.button}>
        <Button title={"record scores"} onPress={handleScore}></Button>
      </View>
    </SafeAreaView>
  );
}
