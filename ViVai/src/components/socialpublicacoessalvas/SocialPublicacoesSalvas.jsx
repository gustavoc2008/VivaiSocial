import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useFocusEffect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { API_URL } from "../../services/json";
import { BottomNav } from "../bottomnav/BottomNav";

const { width } = Dimensions.get("window");
const itemWidth = (width - 24) / 2;

export default function PublicacoesSalvas() {
  const router = useRouter();

  const [publicacoes, setPublicacoes] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const carregarPublicacoesSalvas = async () => {
    try {
      const res = await axios.get(`${API_URL}/publicacoes`);
      if (Array.isArray(res.data)) {
        const salvas = res.data.filter((item) => item.salvo === true);
        setPublicacoes(salvas);
      }
    } catch (error) {
      console.log("Erro ao carregar publicações salvas:", error);
    } finally {
      setCarregando(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      carregarPublicacoesSalvas();
    }, [])
  );

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#080b0d" }}
      edges={["top", "left", "right"]}
    >
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
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
            hitSlop={10}
          >
            <Ionicons name="chevron-back" size={26} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.title}>Publicações salvas</Text>

          <View style={{ width: 36 }} />
        </View>

        {/* CONTEÚDO PRINCIPAL */}
        <View style={{ flex: 1 }}>
          {carregando ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#D97706" />
            </View>
          ) : publicacoes.length === 0 ? (
            <View style={styles.emptyContainer}>
              <View style={styles.emptyIconCircle}>
                <Image
                  source={require("../../../assets/salvar.png")}
                  style={styles.emptyIcon}
                />
              </View>
              <Text style={styles.emptyTitle}>Nenhuma publicação salva</Text>
              <Text style={styles.emptySubtitle}>
                Quando você encontrar viagens e fotos incríveis no feed, toque no
                ícone de salvar para guardar aqui.
              </Text>
              <TouchableOpacity
                style={styles.exploreBtn}
                activeOpacity={0.8}
                onPress={() => router.push("/vivai/inicio")}
              >
                <Text style={styles.exploreBtnText}>Explorar publicações</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <ScrollView
              contentContainerStyle={styles.grid}
              showsVerticalScrollIndicator={false}
            >
              {publicacoes.map((post) => {
                const imgUri = Array.isArray(post.imagem)
                  ? post.imagem[0]
                  : post.imagem;

                return (
                  <TouchableOpacity
                    key={post.id}
                    style={styles.post}
                    activeOpacity={0.85}
                    onPress={() =>
                      router.push({
                        pathname: "/vivai/detalhes",
                        params: { id: post.id },
                      })
                    }
                  >
                    <Image
                      source={{ uri: imgUri }}
                      style={styles.postImage}
                    />

                    <View style={styles.overlay} />

                    <View style={styles.bottomInfo}>
                      <View style={styles.likes}>
                        <Ionicons
                          name="heart"
                          size={15}
                          color="#EF4444"
                        />
                        <Text style={styles.likesText}>
                          {post.curtidas || 0}
                        </Text>
                      </View>

                      <Image
                        source={require("../../../assets/salvar.png")}
                        style={styles.salvoBadgeIcon}
                      />
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          )}
        </View>

        {/* BARRA DE NAVEGAÇÃO FIXA E RESPONSIVA */}
        <BottomNav />
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#080b0d",
  },

  header: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },

  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
  },

  title: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 36,
  },

  emptyIconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "rgba(217, 119, 6, 0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "rgba(217, 119, 6, 0.3)",
  },

  emptyIcon: {
    width: 32,
    height: 32,
    tintColor: "#FFD000",
    resizeMode: "contain",
  },

  emptyTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },

  emptySubtitle: {
    color: "#9CA3AF",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 24,
  },

  exploreBtn: {
    backgroundColor: "#D97706",
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 24,
    shadowColor: "#D97706",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 5,
  },

  exploreBtnText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },

  grid: {
    paddingHorizontal: 8,
    paddingTop: 12,
    paddingBottom: 24,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  post: {
    width: itemWidth,
    height: itemWidth * 1.35,
    borderRadius: 14,
    marginBottom: 10,
    overflow: "hidden",
    position: "relative",
    backgroundColor: "#181818",
  },

  postImage: {
    width: "100%",
    height: "100%",
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.2)",
  },

  bottomInfo: {
    position: "absolute",
    bottom: 8,
    left: 8,
    right: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.55)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },

  likes: {
    flexDirection: "row",
    alignItems: "center",
  },

  likesText: {
    color: "#fff",
    fontSize: 12,
    marginLeft: 4,
    fontWeight: "600",
  },

  salvoBadgeIcon: {
    width: 14,
    height: 14,
    tintColor: "#FFD000",
    resizeMode: "contain",
  },
});