import React from "react";

import {
  View,
  Text,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Dimensions,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { BottomNav } from "../bottomnav/BottomNav";

const { width } = Dimensions.get("window");

const GRID_SIZE = width / 3;

export const SocialPerfil = () => {

  const router = useRouter();

  const POSTS = [
    require("../../../assets/montanha.avif"),
    require("../../../assets/sol.jpg"),
    require("../../../assets/praia.avif"),
    require("../../../assets/cidade.jpg"),
    require("../../../assets/cafe.jpg"),
    require("../../../assets/airbnb.jpg"),
  ];

  return (
    <View style={styles.container}>

      <StatusBar
        barStyle="light-content"
        backgroundColor="#101010"
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        {/* CAPA */}
        <ImageBackground
          source={require("../../../assets/montanha.avif")}
          style={styles.cover}
        >

          <View style={styles.topBar}>

            {/* VOLTAR */}
            <TouchableOpacity
              style={styles.topButton}
              onPress={() => router.back()}
            >
              <Ionicons
                name="chevron-back"
                size={26}
                color="#fff"
              />
            </TouchableOpacity>

            {/* TRÊS PONTOS */}
            <TouchableOpacity
              style={styles.topButton}
            >
              <Ionicons
                name="ellipsis-horizontal"
                size={22}
                color="#fff"
              />
            </TouchableOpacity>

          </View>

        </ImageBackground>


        {/* FOTO + ESTATÍSTICAS */}
        <View style={styles.profileRow}>

          <Image
            source={require("../../../assets/pessoa.jpeg")}
            style={styles.avatar}
          />

          <View style={styles.statsRow}>

            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                12
              </Text>

              <Text style={styles.statLabel}>
                Publicações
              </Text>
            </View>


            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                150
              </Text>

              <Text style={styles.statLabel}>
                Seguidores
              </Text>
            </View>


            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                80
              </Text>

              <Text style={styles.statLabel}>
                Seguindo
              </Text>
            </View>

          </View>

        </View>


        {/* INFORMAÇÕES */}
        <View style={styles.infoBlock}>

          <Text style={styles.name}>
            Gustavo Costa
          </Text>

          <Text style={styles.username}>
            @costawrrld
          </Text>

          <Text style={styles.bio}>
            Apaixonado por tecnologia, viagens{"\n"}
            e por boas histórias. ✨
          </Text>

        </View>


        {/* BOTÕES */}
        <View style={styles.buttonsRow}>

          <TouchableOpacity
            style={styles.editButton}
          >
            <Text style={styles.editButtonText}>
              Editar perfil
            </Text>
          </TouchableOpacity>


          <TouchableOpacity
            style={styles.addButton}
          >
            <Ionicons
              name="person-add-outline"
              size={18}
              color="#fff"
            />
          </TouchableOpacity>

        </View>


        {/* ABAS */}
        <View style={styles.tabsRow}>

          <View
            style={[
              styles.tab,
              styles.tabActive
            ]}
          >
            <Ionicons
              name="grid-outline"
              size={22}
              color="#fff"
            />
          </View>


          <View style={styles.tab}>
            <Ionicons
              name="camera-outline"
              size={22}
              color="#8e8e8e"
            />
          </View>


          <View style={styles.tab}>
            <Ionicons
              name="bookmark-outline"
              size={22}
              color="#8e8e8e"
            />
          </View>

        </View>


        {/* GRADE DE PUBLICAÇÕES */}
        <View style={styles.grid}>

          {POSTS.map((imagem, index) => (

            <TouchableOpacity
              key={index}
              activeOpacity={0.8}
              onPress={() => router.push("/vivai/detalhes")}
            >

              <Image
                source={imagem}
                style={styles.gridImage}
              />

            </TouchableOpacity>

          ))}

        </View>

      </ScrollView>


      {/* BOTÃO FLUTUANTE */}
      <TouchableOpacity
        style={styles.botaoCriar}
        onPress={() => router.push("/vivai/criar")}
      >
        <Text style={styles.textoMais}>
          +
        </Text>
      </TouchableOpacity>


      {/* BARRA DE NAVEGAÇÃO */}
      <BottomNav />

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


  /* CAPA */

  cover: {
    width: "100%",
    height: 210,
  },


  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",

    paddingHorizontal: 16,
    paddingTop: 45,
  },


  topButton: {
    width: 40,
    height: 40,

    alignItems: "center",
    justifyContent: "center",
  },


  /* PERFIL */

  profileRow: {
    flexDirection: "row",
    alignItems: "flex-end",

    paddingHorizontal: 16,

    marginTop: -40,
  },


  avatar: {
    width: 86,
    height: 86,

    borderRadius: 43,

    borderWidth: 3,
    borderColor: "#101010",
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


  /* INFORMAÇÕES */

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


  /* BOTÕES */

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


  /* ABAS */

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


  /* GRADE */

  grid: {
    flexDirection: "row",

    flexWrap: "wrap",

    marginTop: 2,
  },


  gridImage: {
    width: GRID_SIZE,
    height: GRID_SIZE,
  },


  /* BOTÃO + */

  botaoCriar: {
    position: "absolute",

    right: 20,
    bottom: 90,

    width: 55,
    height: 55,

    borderRadius: 30,

    backgroundColor: "#D97706",

    justifyContent: "center",
    alignItems: "center",

    zIndex: 100,
    elevation: 10,
  },


  textoMais: {
    color: "white",

    fontSize: 38,

    fontWeight: "300",

    marginBottom: 7,
  },

});