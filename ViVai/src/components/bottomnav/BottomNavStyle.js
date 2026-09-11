import { StyleSheet } from "react-native";

export const BottomNavStyle = StyleSheet.create({

    container: {
        height: 75,
        backgroundColor: "#111111",
        borderWidth: 1,
        borderColor: "#333333",

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",

        paddingHorizontal: 5,
    },

    item: {
        flex: 1,
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    },

    icon: {
        width: 25,
        height: 25,
        marginBottom: 5,
        tintColor: "#FFFFFF",
        resizeMode: "contain",
    },

    iconAtivo: {
        tintColor: "#E87D18",
    },

    text: {
        fontSize: 12,
        color: "#FFFFFF",
        textAlign: "center",
    },

    textAtivo: {
        color: "#E87D18",
    },

});