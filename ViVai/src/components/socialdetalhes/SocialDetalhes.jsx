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
import { API_URL } from "../../services/json";
import { CarrosselImagens } from "../carrossel/CarrosselImagens";
import { useAuth } from "../../context/Context";
import {
    criarNotificacaoCurtida,
    criarNotificacaoComentario,
    criarNotificacaoSalvar,
} from "../../services/notificacoesService";
import { abrirNoMaps } from "../../services/mapsService";
import { ModalImagemExpandida } from "../modalimagem/ModalImagemExpandida";
import { ToastNotificacao } from "../toast/ToastNotificacao";

const fotosPerfil = {
    "pessoa.jpeg": require("../../../assets/pessoa.jpeg"),
    "pessoa2.png": require("../../../assets/pessoa2.png"),
    "beatriz.jpeg": require("../../../assets/beatriz.jpeg"),
    "julia.jpeg": require("../../../assets/julia.jpeg"),
    "lucas.jpeg": require("../../../assets/lucas.jpeg"),
    "maria.jpeg": require("../../../assets/maria.jpeg"),
    "pedro.jpeg": require("../../../assets/pedro.jpeg"),
    "rafael.jpeg": require("../../../assets/rafael.jpeg"),
};

export const SocialDetalhes = () => {

    const { id } = useLocalSearchParams();
    const { usuarioLogado } = useAuth();

    const [publicacao, setPublicacao] = useState(null);
    const [usuarios, setUsuarios] = useState([]);
    const [comentario, setComentario] = useState("");

    const [modalImagem, setModalImagem] = useState({
        visivel: false,
        imagens: [],
        indexInicial: 0,
        publicacao: null,
    });

    const [toast, setToast] = useState({
        visivel: false,
        mensagem: "",
        submensagem: "",
    });

    const getFotoUsuario = (foto) => {
        if (!foto) return fotosPerfil["pessoa.jpeg"];
        if (
            typeof foto === "string" &&
            (foto.startsWith("http") || foto.startsWith("file:") || foto.startsWith("data:"))
        ) {
            return { uri: foto };
        }
        return fotosPerfil[foto] || fotosPerfil["pessoa.jpeg"];
    };

    const getPublicacao = async () => {

        try {

            const resposta = await axios.get(
                `${API_URL}/publicacoes/${id}`
            );

            setPublicacao(resposta.data);

            try {
                const resUsers = await axios.get(`${API_URL}/usuarios`);
                setUsuarios(resUsers.data || []);
            } catch (errUsers) {
                console.log("Erro ao carregar usuários:", errUsers);
            }

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
                `${API_URL}/publicacoes/${id}`,
                {
                    curtidas: novasCurtidas,
                    curtido: novoEstado
                }
            );

            const publiAtualizada = {
                ...publicacao,
                curtidas: novasCurtidas,
                curtido: novoEstado
            };

            setPublicacao(publiAtualizada);

            // Cria notificação na hora ao curtir
            if (novoEstado) {
                criarNotificacaoCurtida({
                    publicacao: publiAtualizada,
                    usuarioLogado
                });
            }

        } catch (error) {
            console.log(error);
        }
    };

    const salvarPubli = async () => {
        try {
            if (!publicacao) return;

            const novoEstado = !publicacao.salvo;
            await axios.patch(`${API_URL}/publicacoes/${publicacao.id}`, {
                salvo: novoEstado,
            });

            const publiAtualizada = {
                ...publicacao,
                salvo: novoEstado,
            };

            setPublicacao(publiAtualizada);

            // Atualiza se a modal estiver aberta
            setModalImagem((prev) =>
                prev.publicacao?.id === publicacao.id
                    ? { ...prev, publicacao: publiAtualizada }
                    : prev
            );

            if (novoEstado) {
                criarNotificacaoSalvar({
                    publicacao: publiAtualizada,
                    usuarioLogado,
                });

                setToast({
                    visivel: true,
                    mensagem: "Publicação salva com sucesso! 📌",
                    submensagem: "Disponível nas suas publicações salvas",
                });
            } else {
                setToast({
                    visivel: true,
                    mensagem: "Publicação removida dos salvos",
                    submensagem: "",
                });
            }
        } catch (error) {
            console.log("Erro ao salvar publicação:", error);
        }
    };


    const enviarComentario = async () => {

        if (comentario.trim() == "") {

            alert("Digite algo para comentar!");
            return;

        }

        try {

            const textoComentario = comentario.trim();
            const nomeUsuario = usuarioLogado?.nome || "Maria Eduarda";

            // Pega os comentários que já existem
            const comentariosAtuais =
                publicacao?.listaComentarios || [];


            // Cria o novo comentário
            const novoComentario = {

                id: Date.now(),

                usuario: nomeUsuario,

                texto: textoComentario,

                tempo: "Agora"

            };


            // Junta os comentários antigos com o novo comentário
            const novosComentarios = [
                ...comentariosAtuais,
                novoComentario
            ];


            // Atualiza o banco
            await axios.patch(

                `${API_URL}/publicacoes/${id}`,

                {
                    comentarios: novosComentarios.length,

                    listaComentarios: novosComentarios
                }

            );


            // Atualiza a tela imediatamente
            const publiAtualizada = {

                ...publicacao,

                comentarios: novosComentarios.length,

                listaComentarios: novosComentarios

            };

            setPublicacao(publiAtualizada);


            // Limpa o campo
            setComentario("");

            // Cria notificação na hora com o texto real do comentário
            criarNotificacaoComentario({
                publicacao: publiAtualizada,
                usuarioLogado,
                textoComentario
            });


        } catch (error) {

            console.log(error);

        }

    };


    useEffect(() => {

        getPublicacao();

    }, []);


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#171717" }}>
            <ToastNotificacao
                visivel={toast.visivel}
                mensagem={toast.mensagem}
                submensagem={toast.submensagem}
                onClose={() => setToast((prev) => ({ ...prev, visivel: false }))}
            />

            <ModalImagemExpandida
                visivel={modalImagem.visivel}
                imagens={modalImagem.imagens}
                indexInicial={modalImagem.indexInicial}
                publicacao={modalImagem.publicacao}
                onClose={() =>
                    setModalImagem({
                        visivel: false,
                        imagens: [],
                        indexInicial: 0,
                        publicacao: null,
                    })
                }
                onCurtir={() => curtirPubli()}
                onSalvar={() => salvarPubli()}
            />

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
                            source={getFotoUsuario(
                                usuarios.find((u) => u.nome === publicacao?.usuario)?.foto
                            )}
                            style={SocialDetalhesStyle.imgP}
                        />

                        <View style={SocialDetalhesStyle.boxText}>
                            <Text style={SocialDetalhesStyle.textName}>
                                {publicacao?.usuario}
                            </Text>

                            {publicacao?.localizacao ? (
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    onPress={() => abrirNoMaps(publicacao)}
                                    style={SocialDetalhesStyle.boxLocalizacao}
                                >
                                    <Image
                                        source={require("../../../assets/localizacao.png")}
                                        style={SocialDetalhesStyle.iconLocFeed}
                                    />
                                    <Text
                                        style={SocialDetalhesStyle.textLocalizacao}
                                        numberOfLines={1}
                                        ellipsizeMode="tail"
                                    >
                                        {publicacao.localizacao}
                                    </Text>
                                </TouchableOpacity>
                            ) : null}

                            <Text style={SocialDetalhesStyle.textHora}>
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


                        {/* Carrossel de fotos estilo Instagram */}
                        <View style={{ position: "relative" }}>
                            <CarrosselImagens
                                imagens={publicacao?.imagem}
                                onPress={(indexClicado) => {
                                    setModalImagem({
                                        visivel: true,
                                        imagens: publicacao?.imagem,
                                        indexInicial: typeof indexClicado === "number" ? indexClicado : 0,
                                        publicacao: {
                                            ...publicacao,
                                            usuarioFoto: usuarios.find((u) => u.nome === publicacao?.usuario)?.foto,
                                        },
                                    });
                                }}
                            />

                            {/* Badge discreta e elegante sobre a foto indicando Maps */}
                            {publicacao?.localizacao ? (
                                <TouchableOpacity
                                    activeOpacity={0.85}
                                    onPress={() => abrirNoMaps(publicacao)}
                                    style={SocialDetalhesStyle.badgeMaps}
                                >
                                    <Image
                                        source={require("../../../assets/localizacao.png")}
                                        style={SocialDetalhesStyle.badgeMapsIcon}
                                    />
                                    <Text style={SocialDetalhesStyle.badgeMapsText} numberOfLines={1}>
                                        Ver no Maps
                                    </Text>
                                </TouchableOpacity>
                            ) : null}
                        </View>


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
                            <TouchableOpacity onPress={salvarPubli} activeOpacity={0.7}>
                                <Image
                                    source={require("../../../assets/salvar.png")}
                                    style={[
                                        SocialDetalhesStyle.icons,
                                        publicacao?.salvo && { tintColor: "#FFD000" },
                                    ]}
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
                            (item, index) => {
                                const autorComentario = usuarios.find((u) => u.nome === item.usuario);
                                const fotoComent = getFotoUsuario(autorComentario?.foto);

                                return (
                                <View
                                    key={item.id || index}
                                    style={
                                        SocialDetalhesStyle.boxComent
                                    }
                                >

                                    <Image
                                        source={fotoComent}
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

                            );
                        })}

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