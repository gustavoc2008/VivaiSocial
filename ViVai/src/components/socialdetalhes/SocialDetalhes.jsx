import {
    Image,
    ScrollView,
    TouchableOpacity,
    View,
    Text,
    TextInput
} from "react-native";

import { SocialDetalhesStyle } from "./SocialDetalhesStyle";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import { useEffect, useState } from "react";
import axios from "axios";

export const SocialDetalhes = () => {

    const { id } = useLocalSearchParams();

    const [publicacao, setPublicacao] = useState(null);
    const [comentario, setComentario] = useState("");

    const getPublicacao = async () => {

        try {

            const resposta = await axios.get(
                `http://localhost:3000/publicacoes/${id}`
            );

            setPublicacao(resposta.data);

        } catch (error) {

            console.log(error);

        }
    };


    const curtirPubli = async () => {
        try {

            const novoEstado = !publicacao.curtido;

            const novasCurtidas = novoEstado
                ? (publicacao?.curtidas || 0) + 1
                : Math.max((publicacao?.curtidas || 0) - 1, 0);

            await axios.patch(
                `http://localhost:3000/publicacoes/${id}`,
                {
                    curtidas: novasCurtidas,
                    curtido: novoEstado
                }
            );

            setPublicacao({
                ...publicacao,
                curtidas: novasCurtidas,
                curtido: novoEstado
            });

        } catch (error) {
            console.log(error);
        }
    };


    const enviarComentario = async () => {

        if (comentario.trim() == "") {

            alert("Digite algo para comentar!");
            return;

        }

        try {

            // Pega os comentários que já existem
            const comentariosAtuais =
                publicacao?.listaComentarios || [];


            // Cria o novo comentário
            const novoComentario = {

                id: Date.now(),

                usuario: "Maria Eduarda",

                texto: comentario,

                tempo: "Agora"

            };


            // Junta os comentários antigos
            // com o novo comentário
            const novosComentarios = [
                ...comentariosAtuais,
                novoComentario
            ];


            // Atualiza o banco
            await axios.patch(

                `http://localhost:3000/publicacoes/${id}`,

                {
                    comentarios: novosComentarios.length,

                    listaComentarios: novosComentarios
                }

            );


            // Atualiza a tela imediatamente
            setPublicacao({

                ...publicacao,

                comentarios: novosComentarios.length,

                listaComentarios: novosComentarios

            });


            // Limpa o campo
            setComentario("");


        } catch (error) {

            console.log(error);

        }

    };


    useEffect(() => {

        getPublicacao();

    }, []);


    return (

        <SafeAreaView style={{ flex: 1 }}>

            <ScrollView
                style={SocialDetalhesStyle.container}
                contentContainerStyle={{
                    paddingBottom: 90
                }}
            >

                {/* BOTÃO VOLTAR */}

                <View style={SocialDetalhesStyle.boxIcon}>

                    <TouchableOpacity
                        onPress={() => router.back()}
                    >

                        <Image
                            source={require("../../../assets/voltar.png")}
                            style={SocialDetalhesStyle.icon}
                        />

                    </TouchableOpacity>

                </View>


                {/* PUBLICAÇÃO */}

                <View style={SocialDetalhesStyle.containerFeed}>

                    <View style={SocialDetalhesStyle.boxFeed}>

                        <Image
                            source={require("../../../assets/pessoa.jpeg")}
                            style={SocialDetalhesStyle.imgP}
                        />

                        <View style={SocialDetalhesStyle.boxText}>

                            <Text
                                style={SocialDetalhesStyle.textName}
                            >
                                {publicacao?.usuario}
                            </Text>

                            <Text
                                style={SocialDetalhesStyle.textHora}
                            >
                                {publicacao?.tempo}
                            </Text>

                        </View>

                    </View>


                    <View style={SocialDetalhesStyle.boxPubli}>

                        <Text
                            style={SocialDetalhesStyle.textDesc}
                        >
                            {publicacao?.descricao}
                        </Text>


                        {publicacao?.imagem?.[0] && (
                            <Image
                                source={{
                                    uri: publicacao.imagem[0]
                                }}
                                style={SocialDetalhesStyle.imgPaisagem}
                            />
                        )}


                        {/* ÍCONES */}

                        <View style={SocialDetalhesStyle.boxIcons}>

                            {/* CURTIDAS */}

                            <TouchableOpacity onPress={curtirPubli}>

                                <View
                                    style={
                                        SocialDetalhesStyle.iconGroup
                                    }
                                >

                                    <Image
                                        source={require("../../../assets/coracao.png")}
                                        style={[
                                            SocialDetalhesStyle.icons,
                                            publicacao?.curtido && {
                                                tintColor: "red"
                                            }
                                        ]}
                                    />

                                    <Text
                                        style={
                                            SocialDetalhesStyle.iconText
                                        }
                                    >
                                        {publicacao?.curtidas || 0}
                                    </Text>

                                </View>

                            </TouchableOpacity>


                            {/* COMENTÁRIOS */}

                            <TouchableOpacity>

                                <View
                                    style={
                                        SocialDetalhesStyle.iconGroup
                                    }
                                >

                                    <Image
                                        source={require("../../../assets/comentario.png")}
                                        style={
                                            SocialDetalhesStyle.icons
                                        }
                                    />

                                    <Text
                                        style={
                                            SocialDetalhesStyle.iconText
                                        }
                                    >
                                        {publicacao?.listaComentarios?.length || 0}
                                    </Text>

                                </View>

                            </TouchableOpacity>


                            {/* ENVIAR */}

                            <TouchableOpacity>

                                <Image
                                    source={require("../../../assets/enviar.png")}
                                    style={
                                        SocialDetalhesStyle.icons
                                    }
                                />

                            </TouchableOpacity>


                            <View
                                style={
                                    SocialDetalhesStyle.iconSpacer
                                }
                            />


                            {/* SALVAR */}

                            <TouchableOpacity>

                                <Image
                                    source={require("../../../assets/salvar.png")}
                                    style={
                                        SocialDetalhesStyle.icons
                                    }
                                />

                            </TouchableOpacity>

                        </View>


                        {/* DIVISÃO */}

                        <View
                            style={
                                SocialDetalhesStyle.divisao
                            }
                        />


                        {/* TÍTULO */}

                        <Text
                            style={SocialDetalhesStyle.text}
                        >
                            Comentários
                        </Text>


                        {/* LISTA DE COMENTÁRIOS */}

                        {publicacao?.listaComentarios?.map(
                            (item, index) => (

                                <View
                                    key={item.id || index}
                                    style={
                                        SocialDetalhesStyle.boxComent
                                    }
                                >

                                    <Image
                                        source={require("../../../assets/pessoa.jpeg")}
                                        style={
                                            SocialDetalhesStyle.imgP
                                        }
                                    />

                                    <View
                                        style={
                                            SocialDetalhesStyle.boxComentTexto
                                        }
                                    >

                                        <Text
                                            style={
                                                SocialDetalhesStyle.textName
                                            }
                                        >
                                            {item.usuario}
                                        </Text>

                                        <Text
                                            style={
                                                SocialDetalhesStyle.textHora
                                            }
                                        >
                                            {item.tempo}
                                        </Text>

                                        <Text
                                            style={
                                                SocialDetalhesStyle.textDesc
                                            }
                                        >
                                            {item.texto}
                                        </Text>

                                    </View>


                                    {/* CORAÇÃO DO COMENTÁRIO */}

                                    <TouchableOpacity
                                        style={
                                            SocialDetalhesStyle.boxComentLike
                                        }
                                    >

                                        <Image
                                            source={require("../../../assets/coracao.png")}
                                            style={
                                                SocialDetalhesStyle.imgC
                                            }
                                        />

                                    </TouchableOpacity>

                                </View>

                            )
                        )}

                    </View>

                </View>

            </ScrollView>


            {/* BARRA DE COMENTÁRIO */}

            <View
                style={
                    SocialDetalhesStyle.barraComentario
                }
            >

                <TextInput
                    style={
                        SocialDetalhesStyle.inputComentario
                    }
                    placeholder="Adicione um comentário..."
                    placeholderTextColor="#888"
                    value={comentario}
                    onChangeText={setComentario}
                />


                <TouchableOpacity
                    style={
                        SocialDetalhesStyle.botaoEnviar
                    }
                    onPress={enviarComentario}
                >

                    <Image
                        source={require("../../../assets/enviar.png")}
                        style={
                            SocialDetalhesStyle.iconEnviar
                        }
                    />

                </TouchableOpacity>

            </View>

        </SafeAreaView>

    );
};  