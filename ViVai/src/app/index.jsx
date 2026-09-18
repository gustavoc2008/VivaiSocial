import { ActivityIndicator, View } from "react-native";
import { useEffect } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "../context/Context";

export default function Index() {

    const router = useRouter();

    const { usuarioLogado, carregando } = useAuth();

    useEffect(() => {

        if (carregando) {
            return;
        }

        if (usuarioLogado) {

            router.replace("/vivai/inicio");

        } else {

            router.replace("/vivai/login");

        }

    }, [usuarioLogado, carregando]);

    if (carregando) {

        return (

            <View
                style={{
                    flex: 1,
                    backgroundColor: "#171717",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >

                <ActivityIndicator
                    size="large"
                    color="#D97706"
                />

            </View>

        );

    }
}