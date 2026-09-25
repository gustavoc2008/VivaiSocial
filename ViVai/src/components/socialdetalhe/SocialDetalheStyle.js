import { StyleSheet } from "react-native";

export const SocialDetalheStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#171717",
    },

    view: {
        margin: 5,
        marginTop: 10,
        alignItems: "center",
    },

    img: {
        width: "95%",
        height: 220,
        borderRadius: 12,
        backgroundColor: "#262626",
    },

    icon: {
        width: 35,
        height: 35,
        tintColor: "white",
        margin: 20,
        marginLeft: 15,
    },

    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginHorizontal: 15,
        marginTop: 10,
    },

    badgeCat: {
        backgroundColor: "rgba(217, 119, 6, 0.15)",
        borderColor: "#D97706",
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
        alignSelf: "flex-start",
        marginHorizontal: 15,
        marginTop: 12,
        marginBottom: 4,
    },

    badgeCatText: {
        color: "#D97706",
        fontSize: 12,
        fontWeight: "600",
        textTransform: "uppercase",
        letterSpacing: 0.5,
    },

    textP: {
        fontSize: 22,
        color: "white",
        fontWeight: "700",
        marginHorizontal: 15,
        marginTop: 6,
    },

    box: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 15,
        marginTop: 8,
    },

    iconL: {
        width: 18,
        height: 18,
        tintColor: "#D97706",
        marginRight: 6,
    },

    text: {
        fontSize: 15,
        color: "#D4D4D4",
        fontWeight: "400",
    },

    description: {
        fontSize: 14,
        color: "#CCCCCC",
        lineHeight: 22,
        marginHorizontal: 15,
        marginTop: 12,
    },

    infoCard: {
        backgroundColor: "#262626",
        borderRadius: 10,
        marginHorizontal: 15,
        marginTop: 16,
        padding: 14,
        borderWidth: 1,
        borderColor: "#333333",
    },

    infoRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },

    infoRowLast: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 0,
    },

    infoDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#D97706",
        marginRight: 10,
    },

    infoLabel: {
        color: "#888888",
        fontSize: 13,
        fontWeight: "500",
        width: 65,
    },

    infoVal: {
        color: "#FFFFFF",
        fontSize: 13,
        fontWeight: "500",
        flex: 1,
    },

    tituloSecao: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
        marginHorizontal: 15,
        marginTop: 20,
        marginBottom: 8,
    },

    mapaContainer: {
        width: "95%",
        height: 160,
        borderRadius: 12,
        alignSelf: "center",
        marginTop: 6,
        borderWidth: 1,
        borderColor: "#333333",
        backgroundColor: "#222222",
        overflow: "hidden",
        position: "relative",
    },

    maps: {
        width: "100%",
        height: "100%",
    },

    mapaOverlayBadge: {
        position: "absolute",
        bottom: 8,
        right: 8,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        borderRadius: 6,
        paddingHorizontal: 8,
        paddingVertical: 4,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 0.5,
        borderColor: "#D97706",
    },

    mapaOverlayBadgeText: {
        color: "#D97706",
        fontSize: 11,
        fontWeight: "600",
    },

    cardEndereco: {
        backgroundColor: "#262626",
        borderRadius: 10,
        marginHorizontal: 15,
        marginTop: 12,
        padding: 14,
        borderWidth: 1,
        borderColor: "#333333",
    },

    enderecoHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 6,
    },

    enderecoIcon: {
        width: 16,
        height: 16,
        tintColor: "#D97706",
        marginRight: 6,
    },

    enderecoTitulo: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "600",
    },

    enderecoTexto: {
        color: "#E5E5E5",
        fontSize: 13,
        lineHeight: 19,
        fontWeight: "400",
    },

    enderecoBairro: {
        color: "#999999",
        fontSize: 12,
        marginTop: 3,
    },

    enderecoRefBox: {
        backgroundColor: "rgba(217, 119, 6, 0.1)",
        borderRadius: 6,
        paddingHorizontal: 8,
        paddingVertical: 5,
        marginTop: 8,
        borderLeftWidth: 3,
        borderLeftColor: "#D97706",
    },

    enderecoRefText: {
        color: "#D97706",
        fontSize: 11,
        fontWeight: "500",
    },

    bottomContainer: {
        alignItems: "center",
        paddingBottom: 40,
        paddingHorizontal: 20,
        marginTop: 20,
    },

    buttonStart: {
        width: "100%",
        height: 52,
        backgroundColor: "#D97706",
        justifyContent: "center",
        borderRadius: 10,
        alignItems: "center",
        flexDirection: "row",
    },

    buttonStartIcon: {
        width: 20,
        height: 20,
        tintColor: "#FFFFFF",
        marginRight: 8,
    },

    buttonStartText: {
        fontSize: 17,
        fontWeight: "600",
        color: "#FFFFFF",
    },
});