import {
    Image,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    StatusBar,
} from "react-native";

import { SocialCriarStyle } from "./SocialCriarStyle";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { API_URL } from "../../services/json";
import { useAuth } from "../../context/Context";
import {
    getLocalizacaoParaPublicacao,
    limparLocalizacaoParaPublicacao,
    subscribeLocalizacao,
} from "../../services/localizacaoStore";

export const SocialCriar = () => {

    const router = useRouter();
    const params = useLocalSearchParams();
    const { usuarioLogado } = useAuth();

    const [descricao, setDescricao] = useState("");
    const [imagens, setImagens] = useState([]);
    const [localizacaoSelecionada, setLocalizacaoSelecionada] = useState(() => {
        const guardada = getLocalizacaoParaPublicacao();
        if (guardada) return guardada;
        if (params.localizacao) {
            return {
                nome: params.localizacao,
                endereco: params.endereco || "",
            };
        }
        return null;
    });

    useEffect(() => {
        const unsubscribe = subscribeLocalizacao((loc) => {
            setLocalizacaoSelecionada(loc);
        });

        if (params.localizacao) {
            setLocalizacaoSelecionada({
                nome: params.localizacao,
                endereco: params.endereco || "",
            });
        }

        return () => unsubscribe();
    }, [params.localizacao, params.endereco]);

    const fazerPubli = async () => {

        if (descricao.trim() === "" || imagens.length === 0) {
            alert("Adicione uma imagem e coloque uma descrição!");
            return;
        }

        try {

            const novaPublicacao = {
                usuario: usuarioLogado?.nome || "Gustavo Costa",
                usuarioId: usuarioLogado?.id || null,
                nomeUsuario: usuarioLogado?.usuario || null,
                tempo: "Agora",
                descricao: descricao,
                imagem: imagens,
                localizacao: localizacaoSelecionada ? localizacaoSelecionada.nome : null,
                endereco: localizacaoSelecionada?.endereco || null,
                latitude: localizacaoSelecionada?.latitude ?? null,
                longitude: localizacaoSelecionada?.longitude ?? null,
                curtidas: 0,
                comentarios: 0,
                listaComentarios: []
            };

            console.log("ENVIANDO PUBLICAÇÃO...");

            const resposta = await axios.post(
                `${API_URL}/publicacoes`,
                novaPublicacao,
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    maxContentLength: Infinity,
                    maxBodyLength: Infinity
                }
            );

            console.log("PUBLICAÇÃO CRIADA:", resposta.data);

            alert("Publicado com sucesso!");

            setDescricao("");
            setImagens([]);
            setLocalizacaoSelecionada(null);
            limparLocalizacaoParaPublicacao();

            router.push("/vivai/inicio");

        } catch (error) {

            console.log("ERRO AO PUBLICAR:", error);

            if (error.response) {
                console.log(
                    "RESPOSTA DO SERVIDOR:",
                    error.response.data
                );
            }
        }
    };

    const escolherImagem = async () => {

        const resposta =
            await ImagePicker.launchImageLibraryAsync({

                mediaTypes: ["images"],

                allowsMultipleSelection: true,

                quality: 0.3,

                base64: true
            });

        if (!resposta.canceled) {

            const novasImagens =
                resposta.assets
                    .filter((item) => item.base64)
                    .map(
                        (item) =>
                            `data:image/jpeg;base64,${item.base64}`
                    );

            setImagens([
                ...imagens,
                ...novasImagens
            ]);
        }
    };

    return (

        <SafeAreaView style={{ flex: 1, backgroundColor: "#171717" }} edges={["top", "bottom", "left", "right"]}>
            <StatusBar barStyle="light-content" backgroundColor="#171717" />

            <ScrollView
                style={SocialCriarStyle.container}
                contentContainerStyle={{ paddingBottom: 40 }}
                showsVerticalScrollIndicator={false}
            >

                {/* CABEÇALHO */}

                <View
                    style={SocialCriarStyle.boxNew}
                >

                    <TouchableOpacity
                        onPress={() => router.back()}
                    >

                        <Image
                            source={require("../../../assets/voltar.png")}
                            style={SocialCriarStyle.icon}
                        />

                    </TouchableOpacity>

                    <Text
                        style={SocialCriarStyle.text}
                    >
                        Nova Publicação
                    </Text>

                </View>


                {/* IMAGENS */}

                <View
                    style={SocialCriarStyle.boxImg}
                >

                    {imagens.map(
                        (imagem, index) => (

                            <View
                                style={SocialCriarStyle.boxImage}
                                key={index}
                            >

                                <Image
                                    source={{ uri: imagem }}
                                    style={SocialCriarStyle.img}
                                />

                                <TouchableOpacity
                                    style={
                                        SocialCriarStyle.buttonX
                                    }
                                    onPress={() => {

                                        const novasImagens =
                                            imagens.filter(
                                                (_, i) =>
                                                    i !== index
                                            );

                                        setImagens(
                                            novasImagens
                                        );
                                    }}
                                >

                                    <Text
                                        style={
                                            SocialCriarStyle.textX
                                        }
                                    >
                                        ✕
                                    </Text>

                                </TouchableOpacity>

                            </View>

                        )
                    )}

                    {/* ADICIONAR IMAGEM */}

                    <TouchableOpacity
                        style={
                            SocialCriarStyle.boxImageAdd
                        }
                        onPress={escolherImagem}
                    >

                        <Text
                            style={
                                SocialCriarStyle.textM
                            }
                        >
                            +
                        </Text>

                    </TouchableOpacity>

                </View>


                {/* DESCRIÇÃO */}

                <View
                    style={SocialCriarStyle.boxP}
                >

                    <TextInput
                        style={
                            SocialCriarStyle.inputP
                        }
                        placeholder="O que você está pensando?"
                        placeholderTextColor="#888"
                        maxLength={500}
                        multiline
                        value={descricao}
                        onChangeText={setDescricao}
                    />

                    <Text
                        style={SocialCriarStyle.textN}
                    >
                        {descricao.length}/500
                    </Text>

                </View>


                {/* LOCALIZAÇÃO */}

                <View style={SocialCriarStyle.boxLocalizacao}>

                    {localizacaoSelecionada ? (
                        <View style={SocialCriarStyle.cardLocalizacaoSelecionada}>
                            <View style={SocialCriarStyle.localizacaoInfo}>
                                <Image
                                    source={require("../../../assets/localizacao.png")}
                                    style={SocialCriarStyle.iconLocalizacaoAtiva}
                                />
                                <View style={SocialCriarStyle.localizacaoTextos}>
                                    <Text style={SocialCriarStyle.localizacaoNome} numberOfLines={1}>
                                        {localizacaoSelecionada.nome}
                                    </Text>
                                    {localizacaoSelecionada.endereco ? (
                                        <Text style={SocialCriarStyle.localizacaoSub} numberOfLines={1}>
                                            {localizacaoSelecionada.endereco}
                                        </Text>
                                    ) : null}
                                </View>
                            </View>

                            <TouchableOpacity
                                onPress={() => {
                                    setLocalizacaoSelecionada(null);
                                    limparLocalizacaoParaPublicacao();
                                }}
                                style={SocialCriarStyle.removerLocalizacao}
                                activeOpacity={0.7}
                            >
                                <Text style={SocialCriarStyle.removerTexto}>✕</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <TouchableOpacity
                            onPress={() =>
                                router.push({
                                    pathname: "/vivai/localizacao",
                                    params: { origem: "criar" }
                                })
                            }
                            activeOpacity={0.7}
                        >
                            <View style={SocialCriarStyle.viewT}>
                                <Image
                                    source={require("../../../assets/localizacao.png")}
                                    style={SocialCriarStyle.icon}
                                />
                                <Text style={SocialCriarStyle.text2}>
                                    Adicionar localização
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )}

                </View>


                {/* BOTÃO PUBLICAR */}

                <View
                    style={
                        SocialCriarStyle.bottomContainer
                    }
                >

                    <TouchableOpacity
                        style={
                            SocialCriarStyle.buttonStart
                        }
                        onPress={fazerPubli}
                    >

                        <Text
                            style={
                                SocialCriarStyle.buttonStartText
                            }
                        >
                            Publicar
                        </Text>

                    </TouchableOpacity>

                </View>

            </ScrollView>

        </SafeAreaView>
    );
};