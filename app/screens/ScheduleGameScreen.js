import { useEffect, useState } from "react";
import { TouchableOpacity, View, Modal, SafeAreaView, Text, TextInput, Button, ScrollView } from "react-native";
import { scheduleGame } from "../styles/scheduleGame";
import Ionicons from "react-native-vector-icons/Ionicons"
import { useNavigation } from "@react-navigation/native";
import DatePicker from "react-native-date-picker";

export function ScheduleGameScreen({ route }) {
    const { name } = route.params
    const navigation = useNavigation()
    const [gameModal, setGameModal] = useState()
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)

    return (<SafeAreaView style={scheduleGame.AndroidSafeArea}>
       <View style={scheduleGame.header}>
        <TouchableOpacity
                  style={scheduleGame.backIcon}
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
                <View style={scheduleGame.title}>
                  <Text style={scheduleGame.titleText}>{name}</Text>
                </View>
              </View>
             <Modal animationType="none" transparent={true} visible={gameModal}>
                     <View style={scheduleGame.centeredView}>
                       <View style={scheduleGame.modalView}>
                         <Text style={scheduleGame.scoreTitle}>
                           Enter next game date for {name}
                         </Text>
                         <TextInput
                           style={scheduleGame.input}
                           placeholder="0"
                           placeholderTextColor={"black"}
                           keyboardType="numeric"
                        //    value={scoreInput}
                        //    onChangeText={setScoreInput}
                         ></TextInput>
                         <Button title="confirm"></Button>
                         <Button
                           title="cancel"
                           onPress={() => {
                             setGameModal(false);
                           }}
                         ></Button>
                       </View>
                     </View>
                   </Modal>
                   <View>
                          
                           <Button
                             title="Open"
                             onPress={() => {
                               setOpen(true);
                             }}
                           />
                           <DatePicker
                           modal
                           open={open}
                           date={date}
                           onConfirm={(date) => {
                            setOpen(false)
                            setDate(date)
                           }}
                           onCancel={() => {
                            setOpen(false)
                           }}/>
                         </View>
    </SafeAreaView>);
}