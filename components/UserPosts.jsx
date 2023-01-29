import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const UserPosts = (props) => {
  const [posts, setPost] = useState([]);
  const [photosPost, setPhotosPost] = useState([]);
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts", { method: "GET" })
      .then((response) =>
        response.data.filter(
          (post) => post.userId === props.route.params.userId
        )
      )
      .then((response) => setPost(response));

    if (posts.length > 0 && photosPost.length < 1) {
      axios
        .get("https://jsonplaceholder.typicode.com/photos", {
          method: "GET",
        })
        .then((response) =>
          response.data.filter((photo) => photo.albumId === posts.id)
        )
        .then((response) => setPhotosPost(response));
    }
  }, [posts, photosPost]);

  const postmap = posts.map((post, i) => (
    <View key={i} style={styles.containerPost}>
      <Image source={{ uri: photosPost[0].thumbnailUrl }} />
      <Text>{post.title}</Text>
    </View>
  ));
  return <View>{postmap}</View>;
};

export default UserPosts;

const styles = StyleSheet.create({
  containerPost: {
    backgroundColor: "red",
  },
});
