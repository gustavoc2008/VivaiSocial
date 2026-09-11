import { StyleSheet } from "react-native";

export const SocialCriarStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#171717",
    },

    boxNew: {
        flexDirection: "row",
        alignItems: "center",
    },

    icon: {
        width: 35,
        height: 35,
        tintColor: "white",
        margin: 20,
    },

    text: {
        fontSize: 24,
        fontWeight: "600",
        color: "white",
        marginLeft: 20,
    },

    boxImage: {
        width: 100,
        height: 150,

        borderWidth: 2,
        borderColor: "#3A3A3A",
        borderRadius: 10,

        overflow: "hidden",
        alignItems: "center",
    },

    boxImg: {
        flexDirection: "row",
        // gap: 15,
        justifyContent: "space-between",
        margin: 20
    },

    img: {
        width: "100%",
        height: "100%",
    },

    textM: {
        fontSize: 80,
        fontWeight: "100",
        color: "white",
        marginTop: 10
    },

    boxP: {
        width: "90%",
        height: 110,

        alignSelf: "center",

        borderWidth: 1,
        borderColor: "#3A3A3A",
        borderRadius: 10,

        padding: 10,

        position: "relative",
    },

    inputP: {
        flex: 1,

        color: "white",
        fontSize: 16,

        textAlignVertical: "top",

        padding: 0,
    },

    textN: {
        position: "absolute",

        right: 10,
        bottom: 8,

        fontSize: 16,
        color: "white",
        opacity: 0.5,
    },
})