import { StyleSheet } from "react-native";


export const SocialPerfilStyle = StyleSheet.create({
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