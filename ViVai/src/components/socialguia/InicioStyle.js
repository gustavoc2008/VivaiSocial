import { StyleSheet } from "react-native";


export const GuiaStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#17181b",
        paddingHorizontal: 18,
    },

    content: {
        paddingBottom: 16,
    },

    header: {
        paddingTop: 12,
        paddingBottom: 20,
    },

    titulo: {
        color: "#f4f5f6",
        fontSize: 34,
        fontWeight: "700",
        letterSpacing: -0.7,
    },

    subtitulo: {
        color: "#d8d8d8",
        fontSize: 17,
        lineHeight: 26,
        marginTop: 6,
        opacity: 0.85,
    },

    boxText: {
        alignItems: "center",
        marginTop: 30,
        marginBottom: 30,
    },

    text: {
        fontSize: 24,
        fontWeight: "600",
        color: "white",
    },

    textMini: {
        fontSize: 16,
        color: "white",
        fontWeight: "350",
        opacity: 0.7,
        marginTop: 8,
        textAlign: "center",
    },

    item: {
        minHeight: 90,
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
        marginBottom: 2,
    },

    itemOpen: {
        backgroundColor: "#303030",
    },

    iconBox: {
        width: 56,
        height: 56,
        borderRadius: 14,
        backgroundColor: "#24262a",
        borderWidth: 1,
        borderColor: "#3a3d41",
        justifyContent: "center",
        alignItems: "center",
    },

    icone: {
        width: 28,
        height: 28,
        resizeMode: "contain",
        tintColor: "#f4f5f6",
    },

    iconeInicio: {
        tintColor: "#f28b2d",
    },

    topicIcon: {
        color: "#D97706",
        fontSize: 20,
        fontWeight: "700",
    },

    itemText: {
        flex: 1,
        marginLeft: 18,
    },

    itemTitle: {
        color: "#f2f2f2",
        fontSize: 19,
        fontWeight: "600",
    },

    itemDescription: {
        color: "#b9b9b9",
        fontSize: 15,
        marginTop: 4,
    },

    arrow: {
        color: "#f1f1f1",
        fontSize: 35,
        fontWeight: "300",
        marginLeft: 12,
        lineHeight: 35,
    },

    bottomBar: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 75,
        backgroundColor: "#262626",
        borderTopWidth: 1,
        borderTopColor: "#3A3A3A",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        paddingHorizontal: 5,
    },

    bottomButton: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        minWidth: 0,
    },

    bottomIcon: {
        width: 23,
        height: 23,
        tintColor: "#FFFFFF",
        alignSelf: "center",
    },

    bottomText: {
        fontSize: 10,
        color: "#FFFFFF",
        marginTop: 4,
        textAlign: "center",
    },
})
