import { Image, Text, TouchableOpacity, View } from "react-native";
import { useRouter, usePathname } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { BottomNavStyle } from "./BottomNavStyle";

export const BottomNav = () => {
    const router = useRouter();
    const pathname = usePathname();
    const insets = useSafeAreaInsets();

    // Garante espaçamento inferior adequado para iPhone (Home Bar) e Android (Gestos)
    const bottomPadding = Math.max(insets.bottom, 8);
    const containerHeight = 60 + bottomPadding;

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
        <View
            style={[
                BottomNavStyle.container,
                {
                    height: containerHeight,
                    paddingBottom: bottomPadding,
                },
            ]}
        >
            {menu.map((item) => {
                const ativo = pathname === item.rota || pathname.startsWith(item.rota);

                return (
                    <TouchableOpacity
                        key={item.nome}
                        style={BottomNavStyle.item}
                        activeOpacity={0.7}
                        onPress={() => router.push(item.rota)}
                    >
                        <Image
                            source={item.icone}
                            style={[
                                BottomNavStyle.icon,
                                ativo && BottomNavStyle.iconAtivo,
                            ]}
                        />

                        <Text
                            style={[
                                BottomNavStyle.text,
                                ativo && BottomNavStyle.textAtivo,
                            ]}
                            numberOfLines={1}
                        >
                            {item.nome}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};