import { StyleSheet } from "react-native";

export const BottomNavStyle = StyleSheet.create({

    container: {
        height: 75,
        width: "100%",
        backgroundColor: "#111111",
        borderTopWidth: 1,
        borderColor: "#333333",

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",

        paddingHorizontal: 2,
    },

    item: {
        flex: 1,
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        minWidth: 0,
    },

    icon: {
        width: 24,
        height: 24,
        marginBottom: 5,
        tintColor: "#FFFFFF",
        resizeMode: "contain",
    },

    iconAtivo: {
        tintColor: "#E87D18",
    },

    text: {
        width: "100%",
        fontSize: 11,
        color: "#FFFFFF",
        textAlign: "center",
    },

    textAtivo: {
        color: "#E87D18",
    },

});