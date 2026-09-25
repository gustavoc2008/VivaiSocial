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

    gridAlta: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        width: "100%",
        marginTop: 5,
    },

    itemGrid: {
        width: "31.5%",
        aspectRatio: 1,
        marginBottom: 10,
        borderRadius: 10,
        overflow: "hidden",
        position: "relative",
        borderWidth: 1,
        borderColor: "#3A3A3A",
        backgroundColor: "#262626",
    },

    imgGrid: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },

    overlayNomeLugar: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "rgba(0, 0, 0, 0.75)",
        paddingVertical: 3,
        paddingHorizontal: 4,
        alignItems: "center",
        justifyContent: "center",
    },

    textNomeLugar: {
        color: "#FFFFFF",
        fontSize: 10,
        fontWeight: "600",
        textAlign: "center",
    },

    badgeDistancia: {
        position: "absolute",
        top: 5,
        right: 5,
        backgroundColor: "rgba(217, 119, 6, 0.85)",
        borderRadius: 4,
        paddingHorizontal: 4,
        paddingVertical: 2,
    },

    textDistancia: {
        color: "#FFFFFF",
        fontSize: 9,
        fontWeight: "700",
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

        borderWidth: 1.5,
        borderColor: "#303030",
    },

    boxCatAtivo: {
        borderColor: "#D97706",
        backgroundColor: "rgba(217, 119, 6, 0.15)",
    },

    imgCat: {
        width: 30,
        height: 30,

        tintColor: "#D97706",

        borderRadius: 50,

        marginBottom: 6,
    },

    textCat: {
        fontSize: 14,
        fontWeight: "400",
        color: "white",
        textAlign: "center",
    },

    textCatAtivo: {
        color: "#D97706",
        fontWeight: "600",
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
        width: 85,
        height: 38,

        backgroundColor: "#D97706",

        justifyContent: "center",
        alignItems: "center",

        borderRadius: 10,

        marginLeft: "auto",
    },

    buttonStartText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#FFFFFF",
    },

    buttonSeguindo: {
        backgroundColor: "#262626",
        borderWidth: 1,
        borderColor: "#4A4A4A",
    },

    buttonSeguindoText: {
        color: "#D4D4D4",
    },

    divisao: {
        width: "100%",
        height: 1,
        backgroundColor: "#3A3A3A",
        marginTop: 15,
        marginBottom: 15,
    },

    clearSearchBtn: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        justifyContent: "center",
        alignItems: "center",
    },

    clearSearchText: {
        color: "#888888",
        fontSize: 14,
        fontWeight: "bold",
    },

    emptyContainer: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 25,
        width: "100%",
    },

    emptyText: {
        color: "#888888",
        fontSize: 14,
        textAlign: "center",
    },

    loadingContainer: {
        paddingVertical: 30,
        alignItems: "center",
        justifyContent: "center",
    },

    badgeResultados: {
        backgroundColor: "rgba(217, 119, 6, 0.2)",
        borderColor: "#D97706",
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 8,
        marginTop: 10,
        marginBottom: 5,
    },

    badgeResultadosText: {
        color: "#D97706",
        fontSize: 12,
        fontWeight: "500",
    },

});