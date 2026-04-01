import { SafeAreaView, TouchableOpacity, View } from "react-native";
import { Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { gamesPlayed } from "../styles/gamesPlayed";
import { useNavigation } from "@react-navigation/native";

export function GameScoreScreen({ route }) {
  const { id, name } = route.params;
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={gamesPlayed.header}>
        <TouchableOpacity
          style={gamesPlayed.backIcon}
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
        <View style={gamesPlayed.title}>
          <Text style={gamesPlayed.titleText}>{name}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
