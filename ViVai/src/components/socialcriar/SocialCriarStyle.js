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

    text2: {
        fontSize: 18,
        fontWeight: "400",
        color: "white",
        marginLeft: 5,
    },

    boxImg: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        width: "90%",
        alignSelf: "center",
        marginBottom: 20,
    },

    scrollImagens: {
        flex: 1,
    },

    boxImage: {
        width: 105,
        aspectRatio: 2 / 3,
        borderWidth: 2,
        borderColor: "#3A3A3A",
        borderRadius: 10,
        overflow: "hidden",
        position: "relative",
        marginBottom: 10,
    },

    boxImageAdd: {
        width: 105,
        aspectRatio: 2 / 3,
        borderWidth: 2,
        borderColor: "#3A3A3A",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
    },

    img: {
        width: "100%",
        height: "100%",
    },

    textM: {
        fontSize: 40,
        fontWeight: "200",
        color: "white",
        textAlign: "center",
        includeFontPadding: false,
    },

    buttonX: {
        position: "absolute",
        top: 8,
        right: 8,
        width: 26,
        height: 26,
        borderRadius: 13,
        backgroundColor: "rgba(23, 23, 23, 0.85)",
        alignItems: "center",
        justifyContent: "center",
    },

    textX: {
        color: "white",
        fontSize: 14,
        fontWeight: "600",
        textAlign: "center",
        includeFontPadding: false,
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

    viewT: {
        flexDirection: "row",
        alignItems: "center",
    },

    bottomContainer: {
        width: "90%",
        alignSelf: "center",
        marginTop: 20,
        marginBottom: 30,
    },

    buttonStart: {
        width: "100%",
        paddingVertical: 14,
        borderRadius: 10,
        backgroundColor: "#D97706",
        alignItems: "center",
    },

    buttonStartText: {
        color: "white",
        fontSize: 17,
        fontWeight: "600",
    },
});