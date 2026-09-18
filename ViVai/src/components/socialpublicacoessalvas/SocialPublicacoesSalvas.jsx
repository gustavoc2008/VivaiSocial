import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { BottomNav } from "../bottomnav/BottomNav";

const { width } = Dimensions.get("window");

const posts = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1500534623283-312aade485b7",
    likes: 124,
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1500534623283-312aade485b7",
    likes: 96,
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df",
    likes: 203,
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    likes: 204,
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b",
    likes: 56,
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1500534623283-312aade485b7",
    likes: 89,
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1500534623283-312aade485b7",
    likes: 112,
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee",
    likes: 45,
  },
];

export default function PublicacoesSalvas() {
  const router = useRouter();

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

  }, []);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
        },
      ]}
    >

      {/* CABEÇALHO */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={28} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.title}>Publicações salvas</Text>

        <View style={{ width: 28 }} />
      </View>

      {/* POSTS */}
      <ScrollView
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
      >
        {posts.map((post) => (
          <TouchableOpacity
            key={post.id}
            style={styles.post}
            activeOpacity={0.9}
          >
            <Image
              source={{ uri: post.image }}
              style={styles.postImage}
            />

            <View style={styles.overlay} />

            <View style={styles.bottomInfo}>

              <View style={styles.likes}>
                <Ionicons
                  name="heart-outline"
                  size={17}
                  color="#fff"
                />

                <Text style={styles.likesText}>
                  {post.likes}
                </Text>
              </View>

              <Ionicons
                name="bookmark-outline"
                size={20}
                color="#fff"
              />

            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>


    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#080b0d",
  },

  header: {
    height: 90,
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 18,
    paddingBottom: 15,
    justifyContent: "space-between",
  },

  title: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "500",
  },

  grid: {
    paddingHorizontal: 8,
    paddingTop: 5,
    paddingBottom: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  post: {
    width: (width - 24) / 2,
    height: (width - 24) / 2,
    marginBottom: 8,
    borderRadius: 7,
    overflow: "hidden",
    backgroundColor: "#222",
  },

  postImage: {
    width: "100%",
    height: "100%",
  },

  overlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 60,
    backgroundColor: "rgba(0,0,0,0.25)",
  },

  bottomInfo: {
    position: "absolute",
    left: 8,
    right: 8,
    bottom: 7,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  likes: {
    flexDirection: "row",
    alignItems: "center",
  },

  likesText: {
    color: "#fff",
    fontSize: 12,
    marginLeft: 4,
  },

  bottomMenu: {
    height: 72,
    borderTopWidth: 1,
    borderTopColor: "#25292b",
    backgroundColor: "#080b0d",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: 5,
  },

  menuItem: {
    alignItems: "center",
    justifyContent: "center",
  },

  menuText: {
    color: "#aaa",
    fontSize: 9,
    marginTop: 3,
  },

  activeText: {
    color: "#f28c00",
  },
});