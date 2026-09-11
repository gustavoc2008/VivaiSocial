import { StyleSheet } from "react-native";


export const SocialCadastroStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#171717",
    },

    contentContainer: {
        paddingBottom: 30,
    },

    img: {
        width: 35,
        height: 35,
        tintColor: "white",
        margin: 20
    },

    boxText: {
        alignItems: "center",
        marginTop: -20
    },

    text: {
        fontSize: 24,
        fontWeight: "600",
        color: "white",
    },

    textMini: {
        fontSize: 18,
        color: "white",
        fontWeight: "350",
        opacity: 0.7,
        marginTop: 6,
        left: 3,
    },

    boxCamera: {
        backgroundColor: "#262626",
        width: 100,
        height: 100,
        borderRadius: "100%",
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30
    },

    camera: {
        width: 50,
        height: 50,
        tintColor: "white"
    },

    textEsqueceu: {
        fontSize: 14,
        fontWeight: "500",
        color: "#D97706",
        textAlign: "center",
        marginTop: 10
    },

    boxInfo: {
        left: 20,
    },

    textInfo: {
        fontSize: 16,
        color: "white",
        fontWeight: "600",
        marginTop: 30,
        left: 8,
    },

    boxEmail: {
        width: "85%",
        height: 45,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#3A3A3A",
        left: 6,
        marginTop: 10,
        paddingHorizontal: 9,
        flexDirection: "row",
        alignItems: "center",
    },

    textEmail: {
        flex: 1,
        fontSize: 16,
        color: "#FFFFFF",
        padding: 0,
        margin: 0,
    },

    eyeButton: {
        width: 35,
        height: 35,
        justifyContent: "center",
        alignItems: "center",
    },

    exibir: {
        width: 20,
        height: 20,
        tintColor: "#FFFFFF",
    },

    bottomContainer: {
        alignItems: "center",
        paddingBottom: 40,
        paddingHorizontal: 25,
        marginTop: 30,
    },

    buttonStart: {
        width: "100%",
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

    boxContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        marginBottom: 20,
    },

    textN: {
        fontSize: 16,
        color: "white",
    },

    textC: {
        fontSize: 16,
        color: "#D97706",
        marginLeft: 5,
    },
})