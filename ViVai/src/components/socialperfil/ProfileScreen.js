import React, { useState, useCallback, useMemo } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  Modal,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useRouter, useFocusEffect } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

import { API_URL } from "../../services/json";
import { BottomNav } from "../bottomnav/BottomNav";
import { useAuth } from "../../context/Context";
import { obterContadoresSeguidores } from "../../services/seguidoresService";
import PesquisarUsuariosScreen from "./PesquisarUsuariosScreen";

const fotosPerfil = {
  "pessoa.jpeg": require("../../../assets/pessoa.jpeg"),
  "pessoa2.png": require("../../../assets/pessoa2.png"),
  "beatriz.jpeg": require("../../../assets/beatriz.jpeg"),
  "julia.jpeg": require("../../../assets/julia.jpeg"),
  "lucas.jpeg": require("../../../assets/lucas.jpeg"),
  "maria.jpeg": require("../../../assets/maria.jpeg"),
  "pedro.jpeg": require("../../../assets/pedro.jpeg"),
  "rafael.jpeg": require("../../../assets/rafael.jpeg"),
};

export const SocialPerfil = () => {
  const router = useRouter();
  const { usuarioLogado } = useAuth();

  const [publicacoes, setPublicacoes] = useState([]);
  const [usuarioApi, setUsuarioApi] = useState(null);
  const [totalSeguidores, setTotalSeguidores] = useState(8);
  const [totalSeguindo, setTotalSeguindo] = useState(2);
  const [carregando, setCarregando] = useState(true);
  const [modalPesquisar, setModalPesquisar] = useState(false);

  // Busca dados da API fake
  const carregarDados = async () => {
    try {
      const resPubli = await axios.get(`${API_URL}/publicacoes`);
      setPublicacoes(resPubli.data || []);

      if (usuarioLogado?.id) {
        try {
          const resUser = await axios.get(`${API_URL}/usuarios/${usuarioLogado.id}`);
          if (resUser.data) {
            setUsuarioApi(resUser.data);
          }
        } catch (eUser) {
          console.log("Aviso ao carregar dados do usuário no perfil:", eUser?.message);
        }
      }

      // Busca a quantidade real e sincronizada de seguidores e seguindo
      try {
        const contadores = await obterContadoresSeguidores(usuarioLogado?.id);
        setTotalSeguidores(contadores.totalSeguidores);
        setTotalSeguindo(contadores.totalSeguindo);
      } catch (eSeg) {
        console.log("Aviso ao carregar contadores de seguidores:", eSeg?.message);
      }
    } catch (erro) {
      console.log("Erro ao carregar publicações no perfil:", erro);
    } finally {
      setCarregando(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      carregarDados();
    }, [usuarioLogado?.id])
  );

  const usuarioAtual = usuarioApi || usuarioLogado;

  // Filtra as publicações que pertencem ao usuário conectado
  const publicacoesDoUsuario = useMemo(() => {
    return publicacoes.filter((publi) => {
      if (usuarioAtual?.id && publi.usuarioId && String(publi.usuarioId) === String(usuarioAtual.id)) {
        return true;
      }
      if (
        usuarioAtual?.nome &&
        publi.usuario &&
        publi.usuario.trim().toLowerCase() === usuarioAtual.nome.trim().toLowerCase()
      ) {
        return true;
      }
      if (usuarioAtual?.usuario) {
        const uClean = usuarioAtual.usuario.replace(/^@/, "").toLowerCase();
        if (publi.nomeUsuario && publi.nomeUsuario.replace(/^@/, "").toLowerCase() === uClean) {
          return true;
        }
        if (publi.usuario && publi.usuario.replace(/^@/, "").toLowerCase() === uClean) {
          return true;
        }
      }
      if (!usuarioAtual && publi.usuario === "Gustavo Costa") {
        return true;
      }
      return false;
    });
  }, [publicacoes, usuarioAtual]);

  const getFotoUsuario = (foto) => {
    if (!foto) return require("../../../assets/pessoa.jpeg");
    if (
      typeof foto === "string" &&
      (foto.startsWith("http") ||
        foto.startsWith("file") ||
        foto.startsWith("blob") ||
        foto.startsWith("data:") ||
        foto.includes("/"))
    ) {
      return { uri: foto };
    }
    return fotosPerfil[foto] || require("../../../assets/pessoa.jpeg");
  };

  const getCapaUsuario = (banner) => {
    if (!banner) return require("../../../assets/airbnb.jpg");
    if (
      typeof banner === "string" &&
      (banner.startsWith("http") ||
        banner.startsWith("file") ||
        banner.startsWith("blob") ||
        banner.startsWith("data:") ||
        banner.includes("/"))
    ) {
      return { uri: banner };
    }
    return require("../../../assets/airbnb.jpg");
  };

  const getImagemPublicacao = (imagem) => {
    const img = Array.isArray(imagem) ? imagem[0] : imagem;
    if (!img) return require("../../../assets/cidade.jpg");
    if (
      typeof img === "string" &&
      (img.startsWith("http") ||
        img.startsWith("file") ||
        img.startsWith("blob") ||
        img.startsWith("data:") ||
        img.includes("/"))
    ) {
      return { uri: img };
    }
    return require("../../../assets/cidade.jpg");
  };

  // Abrir Câmera
  const abrirCamera = async () => {
    const permissao = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissao.granted) {
      alert("Precisamos da permissão para acessar a câmera.");
      return;
    }
    const resultado = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });
    if (!resultado.canceled) {
      console.log("Foto tirada:", resultado.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#101010" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* =========================
            CAPA / BANNER
        ========================= */}
        <ImageBackground
          source={getCapaUsuario(usuarioAtual?.banner || usuarioAtual?.capa)}
          style={styles.cover}
        >
          <View style={styles.topBar}>
            {/* TRÊS PONTOS / CONFIGURAÇÕES */}
            <TouchableOpacity
              style={styles.topButton}
              onPress={() => router.push("/vivai/configuracao")}
            >
              <Ionicons name="ellipsis-horizontal" size={22} color="#fff" />
            </TouchableOpacity>
          </View>
        </ImageBackground>

        {/* =========================
            FOTO + ESTATÍSTICAS
        ========================= */}
        <View style={styles.profileRow}>
          <Image
            source={getFotoUsuario(usuarioAtual?.foto)}
            style={styles.avatar}
          />

          <View style={styles.statsRow}>
            {/* PUBLICAÇÕES */}
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {publicacoesDoUsuario.length}
              </Text>
              <Text style={styles.statLabel}>Publicações</Text>
            </View>

            {/* SEGUIDORES */}
            <TouchableOpacity
              onPress={() => router.push({ pathname: "/vivai/seguidores", params: { aba: "seguidores" } })}
            >
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{totalSeguidores}</Text>
                <Text style={styles.statLabel}>Seguidores</Text>
              </View>
            </TouchableOpacity>

            {/* SEGUINDO */}
            <TouchableOpacity
              onPress={() => router.push({ pathname: "/vivai/seguidores", params: { aba: "seguindo" } })}
            >
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{totalSeguindo}</Text>
                <Text style={styles.statLabel}>Seguindo</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* =========================
            INFORMAÇÕES
        ========================= */}
        <View style={styles.infoBlock}>
          <Text style={styles.name}>
            {usuarioAtual?.nome || "Gustavo Costa"}
          </Text>

          <Text style={styles.username}>
            {usuarioAtual?.usuario
              ? usuarioAtual.usuario.startsWith("@")
                ? usuarioAtual.usuario
                : `@${usuarioAtual.usuario}`
              : "@costawrrld"}
          </Text>

          <Text style={styles.bio}>
            {usuarioAtual?.bio ||
              "Apaixonado por tecnologia, viagens\ne por boas histórias. ✨"}
          </Text>
        </View>

        {/* =========================
            BOTÕES
        ========================= */}
        <View style={styles.buttonsRow}>
          <TouchableOpacity
            style={styles.editButton}
            activeOpacity={0.8}
            onPress={() => router.push("/vivai/editarperfil")}
          >
            <Text style={styles.editButtonText}>Editar perfil</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.addButton}
            activeOpacity={0.8}
            onPress={() => setModalPesquisar(true)}
          >
            <Ionicons name="person-add-outline" size={18} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* =========================
            ABAS
        ========================= */}
        <View style={styles.tabsRow}>
          {/* PUBLICAÇÕES DO PERFIL */}
          <TouchableOpacity style={[styles.tab, styles.tabActive]}>
            <Ionicons name="grid-outline" size={22} color="#fff" />
          </TouchableOpacity>

          {/* PUBLICAÇÕES SALVAS */}
          <TouchableOpacity
            style={styles.tab}
            onPress={() => router.push("/vivai/salvas")}
          >
            <Ionicons name="bookmark-outline" size={22} color="#8e8e8e" />
          </TouchableOpacity>
        </View>

        {/* =========================
            GRADE DE PUBLICAÇÕES
        ========================= */}
        {carregando ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#D97706" />
          </View>
        ) : publicacoesDoUsuario.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="images-outline" size={44} color="#666666" />
            <Text style={styles.emptyTitle}>Nenhuma publicação ainda</Text>
            <Text style={styles.emptySubtitle}>
              Suas fotos e momentos publicados aparecerão aqui.
            </Text>
            <TouchableOpacity
              style={styles.btnCriarPrimeira}
              activeOpacity={0.8}
              onPress={() => router.push("/vivai/criar")}
            >
              <Text style={styles.btnCriarPrimeiraTexto}>Criar publicação</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.grid}>
            {publicacoesDoUsuario.map((publi, index) => (
              <TouchableOpacity
                key={publi.id || index}
                activeOpacity={0.8}
                onPress={() =>
                  router.push({
                    pathname: "/vivai/detalhes",
                    params: { id: publi.id },
                  })
                }
                style={styles.gridItem}
              >
                <Image
                  source={getImagemPublicacao(publi.imagem)}
                  style={styles.gridImage}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>

      {/* BARRA DE NAVEGAÇÃO */}
      <BottomNav />

      {/* MODAL PESQUISAR USUÁRIOS */}
      <Modal
        visible={modalPesquisar}
        animationType="slide"
        onRequestClose={() => {
          setModalPesquisar(false);
          carregarDados();
        }}
      >
        <PesquisarUsuariosScreen
          onClose={() => {
            setModalPesquisar(false);
            carregarDados();
          }}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#101010",
  },
  scrollContent: {
    paddingBottom: 110,
  },
  /* =========================
     CAPA
  ========================= */
  cover: {
    width: "100%",
    height: 210,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 16,
    paddingTop: 45,
  },
  topButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  /* =========================
     PERFIL
  ========================= */
  profileRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 16,
    marginTop: -30,
  },
  avatar: {
    width: 86,
    height: 86,
    borderRadius: 43,
    borderWidth: 3,
    borderColor: "#101010",
    backgroundColor: "#1C1C1E",
  },
  statsRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 8,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },
  statLabel: {
    color: "#a8a8a8",
    fontSize: 12,
    marginTop: 2,
  },
  /* =========================
     INFORMAÇÕES
  ========================= */
  infoBlock: {
    paddingHorizontal: 16,
    marginTop: 12,
  },
  name: {
    color: "#fff",
    fontSize: 19,
    fontWeight: "700",
  },
  username: {
    color: "#a8a8a8",
    fontSize: 13,
    marginTop: 2,
  },
  bio: {
    color: "#e2e2e2",
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
  },
  /* =========================
     BOTÕES
  ========================= */
  buttonsRow: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginTop: 16,
  },
  editButton: {
    flex: 1,
    height: 38,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#3a3a3a",
    alignItems: "center",
    justifyContent: "center",
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  addButton: {
    width: 44,
    height: 38,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#3a3a3a",
    marginLeft: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  /* =========================
     ABAS
  ========================= */
  tabsRow: {
    flexDirection: "row",
    marginTop: 20,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingBottom: 10,
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: "#D97706",
  },
  /* =========================
     GRADE
  ========================= */
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 2,
    width: "100%",
  },
  gridItem: {
    width: "33.333%",
    aspectRatio: 1,
    padding: 1,
  },
  gridImage: {
    width: "100%",
    height: "100%",
  },
  loadingContainer: {
    paddingVertical: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyContainer: {
    paddingVertical: 50,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 12,
  },
  emptySubtitle: {
    color: "#777777",
    fontSize: 13,
    textAlign: "center",
    marginTop: 6,
    marginBottom: 20,
  },
  btnCriarPrimeira: {
    backgroundColor: "#D95300",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  btnCriarPrimeiraTexto: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
});