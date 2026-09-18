import {
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { useCallback, useState } from "react";
import { useFocusEffect, useRouter } from "expo-router";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";

import { SocialInicioStyle } from "./SocialInicioStyle";
import { BottomNav } from "../bottomnav/BottomNav";


export const SocialInicio = () => {
    const router = useRouter();

    const [publicacoes, setPublicacoes] = useState([]);
    const [usuarios, setUsuarios] = useState([]);

    const getDados = async () => {
        try {
            const respostaPublicacoes = await axios.get(`${API_URL}/publicacoes`);
            const respostaUsuarios = await axios.get(`${API_URL}/usuarios`);

            setPublicacoes(respostaPublicacoes.data);
            setUsuarios(respostaUsuarios.data);
        } catch (error) {
            console.log("Erro ao buscar dados:", error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            getDados();
        }, [])
    );

    const curtirPubli = async (id) => {
        try {
            const publicacao = publicacoes.find((item) => item.id === id);
            if (!publicacao) return;

            const novoEstado = !publicacao.curtido;
            const novasCurtidas = novoEstado
                ? (publicacao.curtidas || 0) + 1
                : Math.max((publicacao.curtidas || 0) - 1, 0);

            await axios.patch(`${API_URL}/publicacoes/${id}`, {
                curtidas: novasCurtidas,
                curtido: novoEstado,
            });

            setPublicacoes((prev) =>
                prev.map((item) =>
                    item.id === id
                        ? { ...item, curtidas: novasCurtidas, curtido: novoEstado }
                        : item
                )
            );
        } catch (error) {
            console.log("Erro ao curtir publicação:", error);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#171717" }}>
            <ScrollView
                style={SocialInicioStyle.container}
                contentContainerStyle={{ paddingBottom: 130 }}
                showsVerticalScrollIndicator={false}
            >
                {/* HEADER */}
                <View style={SocialInicioStyle.boxHeader}>
                    <Text style={SocialInicioStyle.title}>
                        Vi<Text style={SocialInicioStyle.titleVai}>vaí</Text>
                    </Text>

                    <TouchableOpacity onPress={() => router.push("/vivai/notificacoes")}>
                        <Image
                            source={require("../../../assets/notificacao.png")}
                            style={SocialInicioStyle.iconN}
                        />
                    </TouchableOpacity>
                </View>

                {/* FEED DE PUBLICAÇÕES */}
                {publicacoes.map((item) => {
                    const usuario = usuarios.find((u) => u.nome === item.usuario);

                    // Pega a URL da foto da publicação vinda da lista 'imagem' do db.json
                    const urlImagemPost = Array.isArray(item.imagem) ? item.imagem[0] : item.imagem;

                    return (
                        <View key={item.id} style={SocialInicioStyle.containerFeed}>

                            {/* USUÁRIO E FOTO DE PERFIL */}
                            <View style={SocialInicioStyle.boxFeed}>
                                <TouchableOpacity onPress={() => router.push("/vivai/perfil")}>
                                    <Image
                                        source={
                                            usuario?.foto && fotosPerfil[usuario.foto]
                                                ? fotosPerfil[usuario.foto]
                                                : fotosPerfil["pessoa.jpeg"]
                                        }
                                        style={SocialInicioStyle.imgP}
                                    />
                                </TouchableOpacity>

                                <View style={SocialInicioStyle.boxText}>
                                    <Text style={SocialInicioStyle.textName}>{item.usuario}</Text>
                                    <Text style={SocialInicioStyle.textHora}>{item.tempo}</Text>
                                </View>

                                <TouchableOpacity style={SocialInicioStyle.botaoPontos}>
                                    <Image
                                        source={require("../../../assets/pontos.png")}
                                        style={SocialInicioStyle.iconP}
                                    />
                                </TouchableOpacity>
                            </View>

                            {/* TEXTO E FOTO DA PUBLICAÇÃO */}
                            <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={() =>
                                    router.push({
                                        pathname: "/vivai/detalhes",
                                        params: { id: item.id },
                                    })
                                }
                            >
                                <View style={SocialInicioStyle.boxPubli}>
                                    {item.descricao && (
                                        <Text style={SocialInicioStyle.textDesc}>
                                            {item.descricao}
                                        </Text>
                                    )}

                                    {/* Imagem do Unsplash vinda do JSON */}
                                    {urlImagemPost && (
                                        <Image
                                            source={{ uri: urlImagemPost }}
                                            style={SocialInicioStyle.imgPaisagem}
                                        />
                                    )}
                                </View>
                            </TouchableOpacity>

                            {/* BOTÕES DE AÇÃO */}
                            <View style={SocialInicioStyle.boxIcons}>
                                <TouchableOpacity onPress={() => curtirPubli(item.id)}>
                                    <View style={SocialInicioStyle.iconGroup}>
                                        <Image
                                            source={require("../../../assets/coracao.png")}
                                            style={[
                                                SocialInicioStyle.icons,
                                                item.curtido && { tintColor: "red" },
                                            ]}
                                        />
                                        <Text style={SocialInicioStyle.iconText}>
                                            {item.curtidas || 0}
                                        </Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() =>
                                        router.push({
                                            pathname: "/vivai/detalhes",
                                            params: { id: item.id },
                                        })
                                    }
                                >
                                    <View style={SocialInicioStyle.iconGroup}>
                                        <Image
                                            source={require("../../../assets/comentario.png")}
                                            style={SocialInicioStyle.icons}
                                        />
                                        <Text style={SocialInicioStyle.iconText}>
                                            {item.comentarios || 0}
                                        </Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity>
                                    <Image
                                        source={require("../../../assets/enviar.png")}
                                        style={SocialInicioStyle.icons}
                                    />
                                </TouchableOpacity>

                                <View style={SocialInicioStyle.iconSpacer} />

                                <TouchableOpacity>
                                    <Image
                                        source={require("../../../assets/salvar.png")}
                                        style={SocialInicioStyle.icons}
                                    />
                                </TouchableOpacity>
                            </View>

                        </View>
                    );
                })}
            </ScrollView>

            {/* BOTÃO FLUTUANTE DE CRIAR */}
            <View style={SocialInicioStyle.bottomArea}>

                <TouchableOpacity
                    style={SocialInicioStyle.botaoCriar}
                    onPress={() => router.push("/vivai/criar")}
                >
                    <Text style={SocialInicioStyle.textoMais}>+</Text>
                </TouchableOpacity>

                <BottomNav />

            </View>

            <BottomNav />
        </SafeAreaView>
    );
};