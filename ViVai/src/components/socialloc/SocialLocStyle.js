import { StyleSheet } from "react-native";


export const SocialLocStyle = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#171717",
    },


    // CABEÇALHO

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
        fontSize: 18,
        fontWeight: "400",
        color: "white",
    },


    // BARRA DE PESQUISA

    barraPesquisa: {
        width: "90%",
        height: 40,

        backgroundColor: "#171717",

        borderWidth: 1,
        borderColor: "#3A3A3A",

        borderRadius: 8,

        flexDirection: "row",
        alignItems: "center",
        alignSelf: "center",

        paddingHorizontal: 8,
    },

    iconPesquisa: {
        width: 18,
        height: 18,
        tintColor: "white",
        marginRight: 7,
    },

    inputPesquisa: {
        flex: 1,
        height: "100%",
        color: "white",
        fontSize: 16,
    },


    // LOCALIZAÇÃO

    barraLoc: {
        width: "90%",
        height: 50,

        backgroundColor: "#171717",

        borderWidth: 1,
        borderColor: "#3A3A3A",

        borderRadius: 8,

        flexDirection: "row",
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "space-between",

        paddingHorizontal: 8,
        marginTop: 20,
    },

    inputLoc: {
        flex: 1,
        height: "100%",
        justifyContent: "center",
    },

    textM: {
        color: "white",
        fontSize: 16,
    },


    // TÍTULO "LUGARES PRÓXIMOS"

    boxT: {
        width: "90%",
        alignSelf: "center",

        marginTop: 20,
        marginBottom: 5,
    },

    textP: {
        fontSize: 18,
        fontWeight: "600",
        color: "white",
    },


    // LISTA

    listaLocais: {
        width: "90%",
        alignSelf: "center",
        paddingBottom: 40
    },  

    viewI: {
        width: "100%",

        flexDirection: "row",
        alignItems: "center",

        paddingVertical: 10,
    },

    imgAlta: {
        width: 70,
        height: 70,

        borderRadius: 7,
    },

    viewInf: {
        flex: 1,

        marginLeft: 14,

        justifyContent: "center",
    },

    textNome: {
        color: "white",

        fontSize: 16,
        fontWeight: "600",

        marginBottom: 6,
    },

    textLocal: {
        color: "white",

        fontSize: 14,

        opacity: 0.55,
    },

    textDistancia: {
        color: "white",

        fontSize: 14,

        opacity: 0.65,

        marginLeft: 10,
    },

    divisao: {
        width: "100%",
        height: 1,

        backgroundColor: "#2A2A2A",
    },

});