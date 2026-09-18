import {
    Image,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { SocialCriarStyle } from "./SocialCriarStyle";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";

export const SocialCriar = () => {

    const router = useRouter();

    const [descricao, setDescricao] = useState("");
    const [imagens, setImagens] = useState([]);

    const fazerPubli = async () => {

        if (descricao.trim() === "" || imagens.length === 0) {
            alert("Adicione uma imagem e coloque uma descrição!");
            return;
        }

        try {

            const novaPublicacao = {
                usuario: "Gustavo Costa",
                tempo: "Agora",
                descricao: descricao,
                imagem: imagens,
                curtidas: 0,
                comentarios: 0,
                listaComentarios: []
            };

            console.log("ENVIANDO PUBLICAÇÃO...");

            const resposta = await axios.post(
                "http://localhost:3000/publicacoes",
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

        <SafeAreaView style={{ flex: 1 }}>

            <ScrollView
                style={SocialCriarStyle.container}
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

                <View>

                    <TouchableOpacity
                        onPress={() =>
                            router.push(
                                "/vivai/localizacao"
                            )
                        }
                    >

                        <View
                            style={
                                SocialCriarStyle.viewT
                            }
                        >

                            <Image
                                source={require("../../../assets/localizacao.png")}
                                style={
                                    SocialCriarStyle.icon
                                }
                            />

                            <Text
                                style={
                                    SocialCriarStyle.text2
                                }
                            >
                                Adicionar localização
                            </Text>

                        </View>

                    </TouchableOpacity>

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