import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Divider } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";
import { Audio } from "expo-av";

import {
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  Input,
} from "react-native";

export default function () {
  const [recording, setRecording] = React.useState();

  async function startRecording() {
    try {
      console.log("Requesting permissions..");
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      console.log("Starting recording..");
      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    console.log("Stopping recording..");
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    console.log("Recording stopped and stored at", uri);
  }
  const [text, onChangeText] = React.useState("");
  return (
    <View
      style={{
        flex: 1,
        //alignItems: "center",
        //paddingHorizontal: 10,
        backgroundColor: "#fff",
      }}
    >
      <View
        style={{
          flex: 1,
          padding: 10,
          width: "90%",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <View>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
            multiline={true}
            placeholder="Ajouter un message"
          />
        </View>

        {text.length <= 0 && (
          <View style={styles.icon}>
            <MaterialCommunityIcons
              name="microphone-outline"
              size={20}
              color="white"
              title={recording ? "Stop Recording" : "Start Recording"}
              onPress={recording ? stopRecording : startRecording}
            />
          </View>
        )}
        {text.length > 1 && (
          <View style={styles.ionicon}>
            <Ionicons name="send-outline" size={20} color="white" />
          </View>
        )}
      </View>

      <Text
        style={{
          textTransform: "uppercase",
          fontSize: 25,
          marginTop: 45,
          textAlign: "center",
        }}
      >
        extrait de naissance
      </Text>

      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <View
          style={{
            padding: 10,
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          {/* <TouchableOpacity
            style={{
              backgroundColor: "#E5E5E5",
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              padding: 15,
              width: "45%",
              marginVertical: 10,
            }}
            onPress={() =>
              this.props.navigation.navigate("Posez vos questions à Aboussouan")
            }
          >
            <Text
              style={{
                color: "black",
                //textTransform: "uppercase",
                fontSize: 12,
                lineHeight: 15,
                width: 80,
                textAlign: "center",
              }}
            >
              Ouvrir le chatbot
            </Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    margin: 12,
    borderWidth: 2,
    width: 200,
    padding: 12,
    borderRadius: 12,
  },

  icon: {
    width: 40,
    height: 40,
    backgroundColor: "#009688",
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 7,
    marginTop: 12,
    justifyContent: "flex-end",
  },
  ionicon: {
    width: 40,
    height: 40,
    backgroundColor: "#009688",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 12,
    justifyContent: "flex-end",
  },

  avatar: {
    width: 60,
    height: 60,
    backgroundColor: "#009688",
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 7,
    marginTop: 50,
    marginLeft: 25,
  },
});
