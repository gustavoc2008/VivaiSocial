import { StyleSheet } from "react-native";

export const SocialPesquisaStyle = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#171717",
    },

    scroll: {
        flex: 1,
    },

    content: {
        paddingHorizontal: 20,
        paddingTop: 15,
        paddingBottom: 100,
    },

    titulo: {
        fontSize: 20,
        fontWeight: "500",
        color: "white",
        marginBottom: 10,
    },

    barraPesquisa: {
        width: "100%",
        height: 40,

        backgroundColor: "#171717",

        borderWidth: 1,
        borderColor: "#3A3A3A",

        borderRadius: 8,

        flexDirection: "row",
        alignItems: "center",

        paddingHorizontal: 8,
    },

    iconPesquisa: {
        width: 18,
        height: 18,
        tintColor: "white",
        marginRight: 7,
    },

    inputPesquisa: {
        flex: 1,
        height: "100%",
        color: "white",
        fontSize: 11,
        paddingVertical: 0,
        paddingHorizontal: 0,
    },

    boxAlta: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
    },

    tituloSecao: {
        color: "white",
        fontSize: 16,
        fontWeight: "500",
        marginTop: 15,
        marginBottom: 10,
    },

    verMais: {
        color: "#D97706",
        fontSize: 16,
        fontWeight: "500",
        marginTop: 15,
        marginBottom: 10,
    },

    boxImg: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    boxImg2: {
        flexDirection: "row",
        marginTop: 10,
        justifyContent: "space-between",
    },

    imgAlta: {
        width: 100,
        height: 100,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#3A3A3A",
    },

    boxCategorias: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginTop: 5,
    },

    boxCat: {
        width: 75,
        height: 75,

        backgroundColor: "#262626",

        borderRadius: 12,

        alignItems: "center",
        justifyContent: "center",

        borderWidth: 1,
        borderColor: "#303030",
    },

    imgCat: {
        width: 30,
        height: 30,

        tintColor: "#D97706",

        borderRadius: 50,

        marginBottom: 6,
    },

    textCat: {
        fontSize: 16,
        fontWeight: "400",
        color: "white",
        textAlign: "center",
    },

    /* =========================
       PESSOAS
    ========================= */

    boxFeed: {
        width: "100%",

        flexDirection: "row",
        alignItems: "center",

        marginTop: 5,
    },

    imgP: {
        width: 55,
        height: 55,

        borderRadius: 100,
    },

    boxText: {
        marginLeft: 12,
    },

    textName: {
        fontSize: 16,
        color: "white",
        fontWeight: "400",
    },

    textHora: {
        fontSize: 14,
        color: "white",
        fontWeight: "400",
        opacity: 0.5,
        marginTop: 2,
    },

    /* BOTÃO SEGUIR */

    buttonStart: {
        width: 90,
        height: 45,

        backgroundColor: "#D97706",

        justifyContent: "center",
        alignItems: "center",

        borderRadius: 12,

        marginLeft: "auto",
    },

    buttonStartText: {
        fontSize: 18,
        fontWeight: "600",
        color: "#FFFFFF",
    },

    divisao: {
        width: "100%",
        height: 1,
        backgroundColor: "#3A3A3A",
        marginTop: 20,
        marginBottom: 15,
    },

});