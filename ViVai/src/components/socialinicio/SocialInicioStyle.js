import { StyleSheet } from "react-native";

export const SocialInicioStyle = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#171717",
    },

    boxHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginHorizontal: 20,
        marginTop: 20,
    },

    title: {
        fontSize: 40,
        fontWeight: "bold",
        color: "#FFFFFF",
        letterSpacing: 1,
    },

    titleVai: {
        color: "#D97706",
    },

    iconN: {
        width: 35,
        height: 35,
        tintColor: "white",
    },

    containerFeed: {
        width: "94%",
        alignSelf: "center",
        backgroundColor: "#262626",
        borderRadius: 10,
        padding: 10,
        marginVertical: 8,
        paddingBottom: 20,
        position: "relative",
    },

    boxFeed: {
        flexDirection: "row",
        alignItems: "center",
        position: "relative",
    },

    imgP: {
        width: 55,
        height: 55,
        borderRadius: 27.5,
        borderWidth: 2,
        borderColor: "#FFFFFF",
    },

    boxText: {
        flexDirection: "column",
        marginLeft: 10,
        flex: 1,
        paddingRight: 45,
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
    },

    botaoPontos: {
        position: "absolute",
        right: 0,
        top: 5,
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
    },

    iconP: {
        width: 25,
        height: 25,
        tintColor: "white",
    },

    boxPubli: {
        marginTop: 10,
    },

    textDesc: {
        fontSize: 14,
        color: "white",
        fontWeight: "400",
        marginHorizontal: 5,
    },

    imgPaisagem: {
        width: "100%",
        aspectRatio: 1.5,
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

    iconCurtido: {
        tintColor: "#EF0000",
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

    bottomArea: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
    },

    botaoCriar: {
        position: "absolute",
        right: 20,
        bottom: 100,

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