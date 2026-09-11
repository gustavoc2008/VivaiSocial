import { StyleSheet } from "react-native";


export const GuiaStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#171717",
        paddingHorizontal: 20,
    },

    content: {
        paddingBottom: 24,
    },

    header: {
        paddingTop: 20,
        paddingBottom: 22,
    },

    titulo: {
        fontSize: 24,
        fontWeight: "600",
        color: "#FFFFFF",
    },

    subtitulo: {
        fontSize: 15,
        color: "#FFFFFF",
        opacity: 0.7,
        marginTop: 5,
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
        width: "100%",
        minHeight: 70,
        backgroundColor: "#262626",
        borderRadius: 12,
        marginBottom: 12,
        paddingHorizontal: 15,
        flexDirection: "row",
        alignItems: "center",
    },

    itemOpen: {
        backgroundColor: "#303030",
    },

    iconBox: {
        width: 45,
        height: 45,
        borderRadius: 10,
        backgroundColor: "#333333",
        justifyContent: "center",
        alignItems: "center",
    },

    icon: {
        width: 24,
        height: 24,
        tintColor: "#D97706",
    },

    topicIcon: {
        color: "#D97706",
        fontSize: 20,
        fontWeight: "700",
    },

    itemText: {
        flex: 1,
        marginLeft: 15,
    },

    itemTitle: {
        fontSize: 17,
        fontWeight: "600",
        color: "#FFFFFF",
    },

    itemDescription: {
        fontSize: 13,
        color: "#FFFFFF",
        opacity: 0.6,
        marginTop: 4,
    },

    arrow: {
        fontSize: 30,
        color: "#D97706",
        fontWeight: "300",
        marginLeft: 10,
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
