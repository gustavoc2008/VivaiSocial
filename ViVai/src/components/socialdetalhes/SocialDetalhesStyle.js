import { StyleSheet } from "react-native";


export const SocialDetalhesStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#171717"
    },

    boxIcon: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },

    icon: {
        width: 35,
        height: 35,
        tintColor: "white",
        margin: 20
    },

    containerFeed: {
        alignItems: "left",
        padding: 10,
        margin: 10,
        marginLeft: 15,
        paddingBottom: 20,

        position: "relative",
    },

    boxFeed: {
        flexDirection: "row",
        alignItems: "center",
    },

    imgP: {
        width: 55,
        height: 55,
        borderRadius: 100,
    },

    boxText: {
        flexDirection: "column",
        marginLeft: 12,
        flex: 1,
        justifyContent: "center",
    },

    textName: {
        fontSize: 16,
        color: "white",
        fontWeight: "600",
    },

    boxLocalizacao: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 2,
        marginBottom: 2,
        alignSelf: "flex-start",
    },

    iconLocFeed: {
        width: 13,
        height: 13,
        tintColor: "#D97706",
        marginRight: 4,
        resizeMode: "contain",
    },

    textLocalizacao: {
        fontSize: 13,
        color: "#D97706",
        fontWeight: "500",
        flexShrink: 1,
    },

    textHora: {
        fontSize: 12,
        color: "#9CA3AF",
        fontWeight: "400",
    },

    badgeMaps: {
        position: "absolute",
        bottom: 12,
        right: 12,
        backgroundColor: "rgba(23, 23, 23, 0.85)",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "rgba(217, 119, 6, 0.6)",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 4,
    },

    badgeMapsIcon: {
        width: 12,
        height: 12,
        tintColor: "#D97706",
        marginRight: 5,
        resizeMode: "contain",
    },

    badgeMapsText: {
        color: "#FFFFFF",
        fontSize: 12,
        fontWeight: "600",
    },

    boxPubli: {
        marginTop: 10,
    },

    textDesc: {
        fontSize: 14,
        color: "white",
        fontWeight: "400",
        marginTop: 5
    },

    imgPaisagem: {
        width: "100%",
        height: 200,
        borderRadius: 15,
        marginTop: 10,
    },

    boxIcons: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
        marginLeft: 5,
    },

    iconGroup: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 30,
    },

    iconSpacer: {
        flex: 1,
    },

    icons: {
        width: 24,
        height: 24,
        tintColor: "white",
    },

    iconSalvo: {
        tintColor: "#FFD000",
    },

    iconText: {
        marginLeft: 10,
        color: "#fff",
        fontSize: 16,
        fontWeight: "500",
    },

    boxComent: {
        width: "100%",
        minHeight: 80,
        flexDirection: "row",
        alignItems: "center",
        padding: 5,
        marginTop: 10
    },

    boxComentTexto: {
        flex: 1,
        marginLeft: 10,
    },

    boxComentLike: {
        marginLeft: "auto",
        paddingRight: 10,
    },

    text: {
        color: "white",
        fontSize: 18,
        fontWeight: "500"
    },

    imgC: {
        width: 24,
        height: 24,
        tintColor: "white",
    },

    divisao: {
        width: "100%",
        height: 1,
        backgroundColor: "#3A3A3A",
        marginTop: 20,
        marginBottom: 15,
    },

    barraComentario: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,

        height: 65,

        backgroundColor: "#171717",

        flexDirection: "row",
        alignItems: "center",

        paddingHorizontal: 20,
        paddingBottom: 5,

        borderTopWidth: 1,
        borderTopColor: "#3A3A3A",
    },

    inputComentario: {
        flex: 1,

        height: 48,

        backgroundColor: "#262626",

        borderWidth: 1,
        borderColor: "#515151",

        borderRadius: 12,

        paddingHorizontal: 15,

        color: "white",

        fontSize: 15,
    },

    botaoEnviar: {
        width: 45,
        height: 45,

        marginLeft: 10,

        justifyContent: "center",
        alignItems: "center",
    },

    iconEnviar: {
        width: 28,
        height: 28,

        tintColor: "#D97706",
    },
})