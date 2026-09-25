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
        width: 52,
        height: 52,
        borderRadius: 26,
        borderWidth: 2,
        borderColor: "#FFFFFF",
    },

    boxText: {
        flexDirection: "column",
        marginLeft: 12,
        flex: 1,
        paddingRight: 45,
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
        right: 18,
        bottom: 16,

        width: 56,
        height: 56,

        borderRadius: 28,
        backgroundColor: "#D97706",

        justifyContent: "center",
        alignItems: "center",

        zIndex: 999,
        elevation: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.35,
        shadowRadius: 6,
    },
});