import { StyleSheet } from "react-native"

export const NotificacoesStyle = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#171717",
    },

    header: {
        height: 55,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
    },

    title: {
        fontSize: 22,
        fontWeight: "600",
        color: "#FFFFFF",
    },

    markAll: {
        fontSize: 13,
        color: "#D97706",
        fontWeight: "500",
    },

    notification: {
        minHeight: 100,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 18,
    },

    notificationIcon: {
        width: 35,
        height: 35,
        resizeMode: "contain",
        marginRight: 10,
    },

    avatar: {
        width: 38,
        height: 38,
        borderRadius: 100,
    },

    notificationText: {
        flex: 1,
        marginLeft: 12,
        paddingRight: 8,
    },

    textNotification: {
        fontSize: 16,
        color: "#FFFFFF",
        lineHeight: 23,
    },

    name: {
        fontWeight: "700",
        color: "#FFFFFF",
    },

    time: {
        fontSize: 14,
        color: "#FFFFFF",
        opacity: 0.55,
        marginTop: 2,
    },

    unread: {
        width: 12,
        height: 12,
        borderRadius: 100,
        backgroundColor: "#D97706",
    },

    bottomBar: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 75,
        backgroundColor: "#171717",
        borderTopWidth: 1,
        borderTopColor: "#333333",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },

    bottomButton: {
        alignItems: "center",
        justifyContent: "center",
        width: 70,
    },

    bottomIcon: {
        width: 25,
        height: 25,
        tintColor: "#FFFFFF",
    },

    activeIcon: {
        tintColor: "#D97706",
    },

    bottomText: {
        fontSize: 10,
        color: "#FFFFFF",
        marginTop: 4,
        textAlign: "center",
    },

    activeText: {
        fontSize: 10,
        color: "#D97706",
        marginTop: 4,
        textAlign: "center",
    },

})