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
        width: "95%",
        backgroundColor: "#262626",
        borderRadius: 10,
        alignSelf: "center",
        padding: 10,
        margin: 10,
        paddingBottom: 20,

        // Permite posicionar elementos nos cantos
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
        borderRadius: 100,
        borderWidth: 2,
    },

    boxText: {
        flexDirection: "column",
        marginLeft: 10,
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
    },

    imgPaisagem: {
        width: "100%",
        height: 200,
        borderRadius: 15,
        marginTop: 10,
    },

    // Área dos ícones
    boxIcons: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
        marginLeft: 5,
    },

    // Grupo: ícone + número
    iconGroup: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 30,
    },

    // Empurra o salvar para o canto direito
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

    // Comentário


    botaoCriar: {
        position: "absolute",

        right: 20,
        bottom: 90,

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
        marginBottom: 7
    },
});