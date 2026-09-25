import { StyleSheet } from "react-native";

export const NotificacoesStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#171717",
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingTop: 10,
        paddingBottom: 12,
    },

    headerLeft: {
        flexDirection: "row",
        alignItems: "center",
    },

    backButton: {
        padding: 4,
        marginRight: 8,
    },

    backIcon: {
        width: 24,
        height: 24,
        tintColor: "#FFFFFF",
    },

    titulo: {
        color: "#FFFFFF",
        fontSize: 22,
        fontWeight: "700",
        letterSpacing: -0.3,
    },

    marcar: {
        color: "#D97706",
        fontSize: 12,
        fontWeight: "600",
    },

    marcarDesabilitado: {
        color: "#555555",
        fontSize: 12,
        fontWeight: "500",
    },

    tabsContainer: {
        flexDirection: "row",
        paddingHorizontal: 16,
        marginBottom: 10,
    },

    tab: {
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 20,
        backgroundColor: "#262626",
        borderWidth: 1,
        borderColor: "#333333",
        flexDirection: "row",
        alignItems: "center",
        marginRight: 8,
    },

    tabAtiva: {
        backgroundColor: "rgba(217, 119, 6, 0.15)",
        borderColor: "#D97706",
    },

    tabTexto: {
        color: "#888888",
        fontSize: 13,
        fontWeight: "500",
    },

    tabTextoAtivo: {
        color: "#D97706",
        fontWeight: "700",
    },

    tabBadge: {
        backgroundColor: "#D97706",
        borderRadius: 10,
        paddingHorizontal: 6,
        paddingVertical: 1,
        marginLeft: 6,
    },

    tabBadgeTexto: {
        color: "#FFFFFF",
        fontSize: 10,
        fontWeight: "700",
    },

    lista: {
        flex: 1,
    },

    listaContent: {
        paddingBottom: 100,
    },

    notificacao: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 13,
        borderBottomWidth: 1,
        borderBottomColor: "#222222",
    },

    notificacaoNaoLida: {
        backgroundColor: "rgba(217, 119, 6, 0.05)",
    },

    avatarContainer: {
        position: "relative",
        marginRight: 12,
    },

    avatarImg: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: "#262626",
    },

    avatarInicial: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: "center",
        justifyContent: "center",
    },

    avatarInicialTexto: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "700",
    },

    tipoIconeBadge: {
        position: "absolute",
        bottom: -2,
        right: -2,
        width: 20,
        height: 20,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1.5,
        borderColor: "#171717",
    },

    tipoIcone: {
        width: 11,
        height: 11,
        resizeMode: "contain",
    },

    conteudo: {
        flex: 1,
        justifyContent: "center",
    },

    mensagem: {
        color: "#D4D4D4",
        fontSize: 14,
        lineHeight: 20,
    },

    nome: {
        color: "#FFFFFF",
        fontWeight: "700",
    },

    tempo: {
        color: "#888888",
        fontSize: 12,
        marginTop: 4,
    },

    comentarioBox: {
        backgroundColor: "#222222",
        borderLeftWidth: 3,
        borderLeftColor: "#D97706",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 4,
        marginTop: 5,
        marginBottom: 3,
    },

    comentarioTexto: {
        color: "#F3F4F6",
        fontSize: 13,
        fontStyle: "italic",
        lineHeight: 18,
    },

    publiThumbnail: {
        width: 44,
        height: 44,
        borderRadius: 6,
        backgroundColor: "#262626",
        marginLeft: 10,
    },

    ponto: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#D97706",
        marginLeft: 8,
    },

    emptyContainer: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 100,
        paddingHorizontal: 24,
    },

    emptyIcon: {
        width: 52,
        height: 52,
        tintColor: "#444444",
        marginBottom: 14,
    },

    emptyText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 4,
        textAlign: "center",
    },

    emptySubtext: {
        color: "#888888",
        fontSize: 13,
        textAlign: "center",
    },

    loadingContainer: {
        paddingVertical: 50,
        alignItems: "center",
        justifyContent: "center",
    },
});

export const styles = NotificacoesStyle;
export default NotificacoesStyle;