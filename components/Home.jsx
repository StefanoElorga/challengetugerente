import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Home = () => {
  const [email, setEmail] = useState("");
  const [userSearched, setUserSearched] = useState({});
  const navigation = useNavigation();

  const showUserSearched = () => {
    setUserSearched({});
    Keyboard.dismiss();
    if (email.length > 0) {
      axios
        .get("https://jsonplaceholder.typicode.com/users", { method: "GET" })
        .then((response) => {
          if (
            response.data.some(
              (user) => user.email.toLowerCase() === email.toLowerCase()
            )
          ) {
            setUserSearched(
              response.data.filter(
                (user) => user.email.toLowerCase() === email.toLowerCase()
              )[0]
            );
          }
        });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>buscá a tu amigos</Text>
      <TextInput
        style={styles.searchInput}
        placeholder={"Email del usuario..."}
        onChangeText={(valueEmail) => {
          setEmail(valueEmail);
        }}
        defaultValue={""}
      ></TextInput>
      <TouchableOpacity
        onPress={() => showUserSearched()}
        style={styles.searchButton}
      >
        <Text style={styles.textButton}>Buscar</Text>
      </TouchableOpacity>
      {userSearched.name !== undefined ? (
        <View style={styles.containerResults}>
          <TouchableOpacity
            style={styles.results}
            onPress={() =>
              navigation.navigate("UserPosts", { userId: userSearched.id })
            }
          >
            <Text style={styles.resultText}>{userSearched.name}</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "gray",
    alignItems: "center",
    width: windowWidth / 1,
    height: windowHeight / 1,
    paddingTop: windowHeight * 0.2,
  },
  searchInput: {
    backgroundColor: "white",
    width: windowWidth / 2,
    height: windowHeight / 15,
    marginTop: windowHeight * 0.05,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 19,
    borderWidth: 2,
    borderColor: "black",
  },
  titleText: {
    fontSize: 30,
    color: "white",
  },
  keyboard: {
    flex: 1,
  },
  searchButton: {
    backgroundColor: "black",
    borderWidth: 3,
    borderColor: "white",
    width: windowWidth / 2.8,
    height: windowHeight / 18,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: windowHeight * 0.02,
  },
  textButton: {
    color: "white",
    fontSize: 20,
  },
  containerResults: {
    width: windowWidth / 2,
    height: windowHeight / 2.1,
    marginTop: windowHeight * 0.02,
  },
  results: {
    backgroundColor: "rgb(171, 169, 167)",
    width: "100%",
    height: windowHeight / 20,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  resultText: {
    color: "white",
    fontSize: 18,
    fontWeight: "500",
  },
});

export default Home;
