import { ImageBackground } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useEffect } from "react";
import { UserContext } from "../../userContext";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export function LoadingScreen() {
  const { user, setUser } = useContext(UserContext);
  const navigation: any = useNavigation();

  useEffect(() => {
    _fetchData();
  }, [user.uid]);

  const _fetchData = async () => {
    try {
      const fetchedUserUid = await AsyncStorage.getItem("USERID");
      const fetchedUserName = await AsyncStorage.getItem("USERNAME");
      if (fetchedUserUid && fetchedUserName) {
        setUser({ uid: fetchedUserUid, username: fetchedUserName });
        setTimeout(() => {
          navigation.navigate("GameOn");
        }, 1000);
      } else {
        setTimeout(() => {
          navigation.navigate("LogIn");
        }, 1000);
      }
    } catch (err) {
      console.log(err);
      navigation.navigate("LogIn");
    }
  };
  return (
    <ImageBackground
      source={require("../assets/GameOnScreen.jpg")}
      resizeMode="contain"
      style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#1F8F92",
      }}
    >
      <ActivityIndicator
        size="large"
        color="white"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: height * 0.2,
        }}
      />
    </ImageBackground>
  );
}
