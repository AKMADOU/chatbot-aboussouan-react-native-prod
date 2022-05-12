import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Input } from "react-native-elements";
import { Fontisto } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Divider } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { API_URL } from "../utils/http";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Speech from "expo-speech";

export async function Ajouter_word({ word, ...data }) {
  let formdata = new FormData();
  if (word) {
    let parts = word.split("/");
    let filename = parts[parts.length - 1];
    parts = filename.split(".");
    formdata.append("word", {
      uri: word,
      name: `${new Date().getTime()}.${parts[parts.length - 1]}`,
      type: "multipart/form-data",
    });
  }

  Object.keys(data).map((k) => {
    formdata.append(k, data[k]);
  });

  const options = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  return axios.post(`${API_URL}/api/urlbyword/`, formdata, options);
}

export async function Ajouter_audio({ audio, ...data }) {
  let formdata = new FormData();
  if (audio) {
    let parts = audio.split("/");
    let filename = parts[parts.length - 1];
    parts = filename.split(".");
    formdata.append("audio", {
      uri: audio,
      name: `${new Date().getTime()}.${parts[parts.length - 1]}`,
      type: "multipart/form-data",
    });
  }

  Object.keys(data).map((k) => {
    formdata.append(k, data[k]);
  });

  const options = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  return axios.post(`${API_URL}/api/audiobyword/`, formdata, options);
}

export default function ({ navigation }) {
  const [speaking, setSpeaking] = React.useState(false);
  const speak = async (text) => {
    await Speech.stop();
    if (speaking) {
      setSpeaking(false);
      if (speaking == text) return;
    }

    setSpeaking(text);
    Speech.speak(text, {
      onDone: () => setSpeaking(false),
      onError: () => setSpeaking(false),
    });
  };

  const [data, setData] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [recording, setRecording] = React.useState();
  const [loading, setLoading] = React.useState(false);
  // const [result, setResult] = React.useState("");
  const doSearch = async () => {
    setLoading(true);
    // setResult("");
    try {
      const Result = await axios.post(`${API_URL}/api/urlbyword/`, {
        word: search,
      });
      // if (Result.data > 0) {
      setData(Result.data);
      // } else {
      //   setResult("Pas de résultat trouvé");
      // }
    } catch (ex) {}
    // setResult(false);
  };

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
  const submit1 = async (audio) => {
    setLoading(true);

    // Envoyer les donnees
    const data = {
      audio: audio,
    };
    console.log(data);

    try {
      const Result = await Ajouter_audio(data);
      setData(Result.data);
      console.log(Result.data);
    } catch (ex) {}
    setLoading(false);
  };
  async function stopRecording() {
    console.log("Stopping recording..");
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    submit1(uri);
    setRecording(undefined);
  }
  return (
    <View style={{ flex: 1, backgroundColor: "#F9F9F9" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
        }}
      ></View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",

          backgroundColor: "#66acae",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            marginTop: 10,
            justifyContent: "center",
          }}
        >
          <View style={styles.avatar}>
            <MaterialCommunityIcons name="robot" size={40} color="yellow" />
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("Chatbot")}>
            <View>
              <Text
                style={{
                  marginTop: 25,
                  marginLeft: 8,
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                Aboussouan
              </Text>
            </View>
          </TouchableOpacity>
          <View style={{ marginTop: 25, marginLeft: 140 }}>
            <Fontisto
              name="question"
              size={24}
              color="white"
              title="audio"
              onPress={() =>
                speak(
                  " Cette application est une conception d'un Chatbot en Wolof intelligent et basé sur des données collectées dans le but d'aider et d'informer les citoyens sénégalais sur les faits et démarches administratives. L'objectif de ce projet c'est de rendre les informations sûres et de ladministration sénégalaise accessibles à tous les sénégalais qu'ils soient alphabétisés ou non."
                )
              }
            />

            <Text style={{ marginLeft: -25, color: "white" }}>Description</Text>
          </View>
        </View>
      </View>
      <Text
        style={{
          marginTop: 1,
          marginLeft: 18,
          fontWeight: "bold",
          color: "red",
          opacity: 1,
        }}
      >
        Résultats de la recherche
      </Text>
      {/* <Text>{result}</Text> */}
      <ScrollView>
        {!loading &&
          data.map((item) => {
            return (
              <Ressource
                navigation={navigation}
                url={item.Url}
                the_word={item.Word}
                demarche={item.Résultat}
                id={item.id}
                key={item.id}
                speak={speak}
              />
            );
          })}
        {loading && (
          <View style={[styles.Container, styles.horizontal]}>
            <Text style={{ marginTop: 85, fontWeight: "bold" }}>
              Veuilliez patienter, {"\n"}
              Vore recherche est en cours...
            </Text>
            <ActivityIndicator />
            <ActivityIndicator size="large" color="#00ff00" />

            <ActivityIndicator size="large" color="yellow" />
            <ActivityIndicator size="large" color="red" />
          </View>
        )}
      </ScrollView>
      <View
        style={{
          flexDirection: "row",

          justifyContent: "space-between",

          alignItems: "center",
          paddingHorizontal: 18,
          marginVertical: 10,
        }}
      >
        <View>
          <TextInput
            value={search}
            multiline={true}
            containerStyle={{ flex: 1 }}
            onChangeText={(value) => {
              setSearch(value);
            }}
            placeholder="Ajouter un message"
            style={styles.container}
          />
        </View>

        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <TouchableOpacity onPress={() => submit1()}>
            {search.length <= 0 && (
              <View>
                <MaterialCommunityIcons
                  name="microphone-outline"
                  size={24}
                  color="white"
                  title={recording ? "Stop Recording" : "Start Recording"}
                  onPress={recording ? stopRecording : startRecording}
                  style={{
                    backgroundColor: recording ? "red" : "#009688",
                    width: 40,
                    height: 40,

                    // backgroundColor: "#009688",
                    borderRadius: 20,
                    paddingHorizontal: 8,
                    paddingVertical: 7,

                    justifyContent: "flex-end",
                  }}
                />
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => doSearch()}>
            {search.length >= 1 && (
              <View style={styles.ionicon}>
                <Ionicons name="send-outline" size={18} color="white" />
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

function Ressource({ url, demarche, the_word, navigation, id, speak }) {
  return (
    <View>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={() => WebBrowser.openBrowserAsync(url)}>
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <MaterialIcons
              name="public"
              size={20}
              color="#009688"
              style={{ marginTop: 20, marginLeft: 18 }}
            />
            <View>
              <Text style={{ marginTop: 20, marginLeft: 20, color: "#009688" }}>
                {url}
              </Text>
            </View>
            <TouchableOpacity>
              <View style={{ marginTop: 15, marginLeft: 18 }}>
                <MaterialCommunityIcons
                  name="text-to-speech"
                  size={24}
                  color="#009688"
                  title="audio"
                  onPress={() => speak(demarche)}
                />
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
      <Text style={{ color: "blue", marginTop: 20, marginLeft: 20 }}>
        {the_word}
      </Text>
      <Text style={{ color: "black", marginTop: 20, marginLeft: 20 }}>
        {demarche}
      </Text>
      <Divider orientation="horizontal" style={{ marginTop: 20 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 280,
    borderRadius: 45,
    padding: 12,
    fontSize: 16,
    borderBottomWidth: 0,
    backgroundColor: "#EAEAEA",
  },
  Container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  ionicon: {
    width: 40,
    height: 40,
    backgroundColor: "#009688",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 30,
  },
  avatar: {
    width: 60,
    height: 60,
    backgroundColor: "#009688",
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 7,

    marginLeft: 20,
  },
});
