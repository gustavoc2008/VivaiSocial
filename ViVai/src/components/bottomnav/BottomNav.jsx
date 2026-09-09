import { Image, Text, TouchableOpacity, View } from "react-native";
import { useRouter, usePathname } from "expo-router";

import { BottomNavStyle } from "./BottomNavStyle";

export const BottomNav = () => {

    const router = useRouter();
    const pathname = usePathname();

    const menu = [
        {
            nome: "Início",
            rota: "/vivai/inicio",
            icone: require("../../../assets/inicio.png"),
        },

        {
            nome: "Explorar",
            rota: "/vivai/pesquisa",
            icone: require("../../../assets/pesquisar.png"),
        },

        {
            nome: "Criar",
            rota: "/vivai/criar",
            icone: require("../../../assets/criar.png"),
        },

        {
            nome: "Notificações",
            rota: "/vivai/notificacoes",
            icone: require("../../../assets/notificacao.png"),
        },

        {
            nome: "Perfil",
            rota: "/vivai/perfil",
            icone: require("../../../assets/perfil.png"),
        },
    ];

    return (
        <View style={BottomNavStyle.container}>

            {menu.map((item) => {

                const ativo = pathname === item.rota;

                return (
                    <TouchableOpacity
                        key={item.nome}
                        style={BottomNavStyle.item}
                        onPress={() => router.push(item.rota)}
                    >

                        <Image
                            source={item.icone}
                            style={[
                                BottomNavStyle.icon,
                                ativo && BottomNavStyle.iconAtivo
                            ]}
                        />

                        <Text
                            style={[
                                BottomNavStyle.text,
                                ativo && BottomNavStyle.textAtivo
                            ]}
                        >
                            {item.nome}
                        </Text>

                    </TouchableOpacity>
                );
            })}

        </View>
    );
};