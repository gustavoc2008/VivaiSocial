import { StyleSheet } from "react-native";


export const SocialDetalheStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#171717",
    },

    view: {
        margin: 5,
        marginTop: 20,
        alignItems: "center"
    },

    img: {
        width: "95%",
        height: 200,
        borderRadius: 10
    },

    icon: {
        width: 35,
        height: 35,
        tintColor: "white",
        margin: 20,
        marginLeft: 10
    },

    box: {
        flexDirection: "row",
        margin: 10
    },

    textP: {
        fontSize: 20,
        color: "white",
        fontWeight: "600",
        margin: 10
    },

    iconL: {
        tintColor: "white"
    },

    text: {
        fontSize: 16,
        color: "white",
    },

    description: {
        fontSize: 14,
        color: "white",
        margin: 10
    },

    maps: {
        width: "95%",
        height: 130,
        borderRadius: 5,
        alignSelf: "center",
        marginTop: 10
    },

    bottomContainer: {
        alignItems: "center",
        paddingBottom: 40,
        paddingHorizontal: 25,
        marginTop: 30,
    },

    buttonStart: {
        width: "110%",
        height: 55,
        backgroundColor: "#D97706",
        justifyContent: "center",
        borderRadius: 10,
        alignItems: "center",
        marginBottom: 15,
    },

    buttonStartText: {
        fontSize: 18,
        fontWeight: "600",
        color: "#FFFFFF",
    },
})