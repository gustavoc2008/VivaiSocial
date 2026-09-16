import { StyleSheet } from "react-native"

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#17181b",
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 18,
        paddingTop: 12,
        paddingBottom: 8,
    },

    titulo: {
        color: "#f3f5f5",
        fontSize: 26,
        fontWeight: "700",
        letterSpacing: -0.4,
    },

    marcar: {
        color: "#f28b2d",
        fontSize: 12,
        fontWeight: "600",
        marginLeft: 12,
    },

    lista: {
        flex: 1,
    },

    listaContent: {
        paddingBottom: 8,
    },

    notificacao: {
        minHeight: 86,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 10,
    },

    iconeContainer: {
        width: 34,
        height: 34,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
    },

    icone: {
        width: 26,
        height: 26,
        resizeMode: "contain",
        tintColor: "#f28931",
    },

    avatar: {
        width: 42,
        height: 42,
        borderRadius: 21,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.14)",
    },

    avatarTexto: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "700",
    },

    conteudo: {
        flex: 1,
        justifyContent: "center",
    },

    mensagem: {
        color: "#d8d8d8",
        fontSize: 17,
        lineHeight: 24,
        fontWeight: "500",
    },

    nome: {
        color: "#f4f4f4",
        fontWeight: "700",
    },

    tempo: {
        color: "#b8b8b8",
        fontSize: 14,
        marginTop: 4,
    },

    ponto: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: "#f28b2d",
        marginLeft: 10,
    },

})

export const NotificacoesStyle = styles;
export default styles;