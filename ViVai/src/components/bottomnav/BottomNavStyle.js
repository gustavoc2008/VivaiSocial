import { StyleSheet } from "react-native";

export const BottomNavStyle = StyleSheet.create({
    container: {
        width: "100%",
        backgroundColor: "#111111",
        borderTopWidth: 1,
        borderColor: "#262626",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        paddingTop: 8,
        paddingHorizontal: 4,
        zIndex: 999,
        elevation: 10,
    },

    item: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 2,
    },

    icon: {
        width: 24,
        height: 24,
        marginBottom: 4,
        tintColor: "#9CA3AF",
        resizeMode: "contain",
    },

    iconAtivo: {
        tintColor: "#D97706",
    },

    text: {
        fontSize: 11,
        color: "#9CA3AF",
        textAlign: "center",
        fontWeight: "500",
    },

    textAtivo: {
        color: "#D97706",
        fontWeight: "700",
    },
});