import React from "react";

import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function FotosPerfil() {

    const router = useRouter();

    const POSTS = [
        require("../../../assets/cafe.jpg"),
        require("../../../assets/sol.jpg"),
        require("../../../assets/cidade.jpg"),
        require("../../../assets/cidade.jpg"),
        require("../../../assets/cafe.jpg"),
        require("../../../assets/airbnb.jpg"),
        require("../../../assets/sol.jpg"),
        require("../../../assets/cafe.jpg"),
        require("../../../assets/cidade.jpg"),
    ];

    return (
        <View style={styles.container}>

            {/* CABEÇALHO */}
            <View style={styles.header}>

                <TouchableOpacity
                    onPress={() => router.back()}
                    style={styles.backButton}
                >
                    <Ionicons
                        name="chevron-back"
                        size={27}
                        color="#fff"
                    />
                </TouchableOpacity>

                <Text style={styles.title}>
                    Publicações
                </Text>

                <View style={styles.headerSpace} />

            </View>


            {/* GRADE */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.grid}
            >

                {POSTS.map((imagem, index) => (

                    <TouchableOpacity
                        key={index}
                        style={styles.post}
                        activeOpacity={0.8}
                        onPress={() => router.push("/vivai/detalhes")}
                    >

                        <Image
                            source={imagem}
                            style={styles.image}
                            resizeMode="cover"
                        />

                    </TouchableOpacity>

                ))}

            </ScrollView>

        </View>
    );
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#101010",
    },


    /* CABEÇALHO */

    header: {
        height: 90,

        flexDirection: "row",
        alignItems: "flex-end",

        justifyContent: "space-between",

        paddingHorizontal: 16,
        paddingBottom: 15,

        borderBottomWidth: 1,
        borderBottomColor: "#252525",
    },


    backButton: {
        width: 40,
        height: 40,

        alignItems: "center",
        justifyContent: "center",
    },


    title: {
        color: "#fff",

        fontSize: 17,
        fontWeight: "600",
    },


    headerSpace: {
        width: 40,
    },


    /* GRADE */

    grid: {
        flexDirection: "row",
        flexWrap: "wrap",

        width: "100%",

        paddingTop: 2,
    },


    post: {
        width: "33.333%",
        aspectRatio: 1,
    },


    image: {
        width: "100%",
        height: "100%",
    },

});