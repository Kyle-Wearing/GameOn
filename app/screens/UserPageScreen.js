import React, { useContext, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Button,
  TextInput,
  Modal,
  Alert,
  ActivityIndicator,
} from "react-native";
import { UserContext } from "../../userContext";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { uploadToCloudinary, updateUser } from "../../until";
import { userSettings } from "../styles/userSettings";

const DEFAULT_AVATAR = require("../assets/DefaultUserIcon.jpg");

export default function UserPageScreen() {
  const { user, setUser } = useContext(UserContext);
  const navigation = useNavigation();

  const [editVisible, setEditVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  const logOut = () => {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Log Out",
        style: "destructive",
        onPress: async () => {
          await AsyncStorage.multiRemove(["USERID", "USERNAME", "AVATARURL"]);
          setUser({});
          navigation.navigate("LogIn");
        },
      },
    ]);
  };

  const handleConfirmUsername = async () => {
    if (!username) return setError("Must enter a username");
    try {
      await updateUser(user.uid, username, user.avatar_url);
      await AsyncStorage.setItem("USERNAME", username);
      setUser((curr) => ({ ...curr, username }));
      setEditVisible(false);
      setUsername("");
      setError("");
    } catch (err) {
      console.log("Username update error:", err);
      setError("Failed to update username");
    }
  };

  const pickAvatar = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission required",
        "We need access to your gallery to pick an image.",
      );
      return null;
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });

      if (result.canceled) return null;
      return result.assets[0].uri;
    } catch (err) {
      console.log("ImagePicker error:", err);
      return null;
    }
  };

  const handleChangeAvatar = async () => {
    const uri = await pickAvatar();
    if (!uri) return;

    setUploading(true);
    try {
      const url = await uploadToCloudinary(uri);
      if (url) {
        await updateUser(user.uid, user.username, url);
        await AsyncStorage.setItem("AVATARURL", url);
        setUser((curr) => ({ ...curr, avatar_url: url }));
      }
    } catch (err) {
      console.log("Avatar update error:", err);
    }
    setUploading(false);
  };

  return (
    <SafeAreaView style={userSettings.container}>
      <View style={userSettings.profileContainer}>
        <TouchableOpacity onPress={handleChangeAvatar}>
          <Image
            source={user.avatar_url ? { uri: user.avatar_url } : DEFAULT_AVATAR}
            style={userSettings.avatar}
          />
          {uploading && (
            <ActivityIndicator
              size="small"
              color="#007bff"
              style={userSettings.uploadIndicator}
            />
          )}
        </TouchableOpacity>
        <Text style={userSettings.text}>Username: {user.username}</Text>
        <View style={userSettings.buttonGroup}>
          <Button title="Edit Username" onPress={() => setEditVisible(true)} />
          <View style={{ height: 10 }} />
          <Button title="Log Out" onPress={logOut} color="red" />
        </View>
      </View>
      <Modal animationType="fade" transparent visible={editVisible}>
        <View style={userSettings.centeredView}>
          <View style={userSettings.modalView}>
            <Text style={userSettings.label}>Username</Text>
            <TextInput
              style={userSettings.input}
              placeholder={user.username}
              placeholderTextColor="gray"
              autoCapitalize="none"
              autoCorrect={false}
              value={username}
              onChangeText={(text) => {
                setUsername(text);
                setError("");
              }}
              returnKeyType="done"
            />
            {error ? <Text style={userSettings.errorText}>{error}</Text> : null}
            <View style={{ marginTop: 15, width: "100%" }}>
              <Button title="Confirm" onPress={handleConfirmUsername} />
              <View style={{ height: 10 }} />
              <Button
                title="Cancel"
                onPress={() => {
                  setEditVisible(false);
                  setUsername("");
                  setError("");
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
