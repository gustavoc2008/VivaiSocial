import {
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    StatusBar,
} from "react-native";

import { useCallback, useState } from "react";
import { useFocusEffect, useRouter } from "expo-router";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import { API_URL } from "../../services/json";

import { SocialInicioStyle } from "./SocialInicioStyle";
import { BottomNav } from "../bottomnav/BottomNav";
import { CarrosselImagens } from "../carrossel/CarrosselImagens";
import { useAuth } from "../../context/Context";
import {
    criarNotificacaoCurtida,
    criarNotificacaoSalvar,
} from "../../services/notificacoesService";
import { abrirNoMaps } from "../../services/mapsService";
import { ModalImagemExpandida } from "../modalimagem/ModalImagemExpandida";
import { ToastNotificacao } from "../toast/ToastNotificacao";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ModalOpcoesPublicacao } from "../modalopcoes/ModalOpcoesPublicacao";

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

export const SocialInicio = () => {
    const router = useRouter();
    const { usuarioLogado } = useAuth();

    const [publicacoes, setPublicacoes] = useState([]);
    const [usuarios, setUsuarios] = useState([]);

    // Estado do Modal de Imagem Expandida em alta resolução
    const [modalImagem, setModalImagem] = useState({
        visivel: false,
        imagens: [],
        indexInicial: 0,
        publicacao: null,
    });

    // Estado do Toast de Notificação
    const [toast, setToast] = useState({
        visivel: false,
        mensagem: "",
        submensagem: "",
    });

    // Estado do Modal de Opções da Publicação (Bloquear e Reportar)
    const [modalOpcoes, setModalOpcoes] = useState({
        visivel: false,
        publicacao: null,
    });
    const [usuariosBloqueados, setUsuariosBloqueados] = useState([]);

    const getDados = async () => {
        try {
            const [respostaPublicacoes, respostaUsuarios, salvosBloqueados] = await Promise.all([
                axios.get(`${API_URL}/publicacoes`),
                axios.get(`${API_URL}/usuarios`),
                AsyncStorage.getItem("@vivai_bloqueados"),
            ]);

            const bloqueados = salvosBloqueados ? JSON.parse(salvosBloqueados) : [];
            setUsuariosBloqueados(bloqueados);

            // Filtra as publicações removendo contas bloqueadas
            const publicacoesFiltradas = (respostaPublicacoes.data || []).filter(
                (item) =>
                    !bloqueados.includes(item.usuario) &&
                    !bloqueados.includes(String(item.usuarioId))
            );

            setPublicacoes(publicacoesFiltradas);
            setUsuarios(respostaUsuarios.data || []);
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

            const publiAtualizada = {
                ...publicacao,
                curtidas: novasCurtidas,
                curtido: novoEstado,
            };

            setPublicacoes((prev) =>
                prev.map((item) =>
                    item.id === id ? publiAtualizada : item
                )
            );

            // Atualiza também se a modal estiver aberta
            setModalImagem((prev) =>
                prev.publicacao?.id === id
                    ? { ...prev, publicacao: publiAtualizada }
                    : prev
            );

            // Dispara notificação na hora quando curtir
            if (novoEstado) {
                criarNotificacaoCurtida({
                    publicacao: publiAtualizada,
                    usuarioLogado,
                });
            }
        } catch (error) {
            console.log("Erro ao curtir publicação:", error);
        }
    };

    const salvarPubli = async (id) => {
        try {
            const publicacao = publicacoes.find((item) => item.id === id);
            if (!publicacao) return;

            const novoEstado = !publicacao.salvo;

            await axios.patch(`${API_URL}/publicacoes/${id}`, {
                salvo: novoEstado,
            });

            const publiAtualizada = {
                ...publicacao,
                salvo: novoEstado,
            };

            setPublicacoes((prev) =>
                prev.map((item) =>
                    item.id === id ? publiAtualizada : item
                )
            );

            // Atualiza também se a modal estiver aberta
            setModalImagem((prev) =>
                prev.publicacao?.id === id
                    ? { ...prev, publicacao: publiAtualizada }
                    : prev
            );

            if (novoEstado) {
                // Dispara notificação no feed/central de notificações
                criarNotificacaoSalvar({
                    publicacao: publiAtualizada,
                    usuarioLogado,
                });

                // Exibe toast na tela
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

    // Bloquear Conta
    const handleBloquearConta = async (publi) => {
        const nomeUsuario = publi.usuario;
        const idUsuario = publi.usuarioId ? String(publi.usuarioId) : null;

        try {
            const salvo = (await AsyncStorage.getItem("@vivai_bloqueados")) || "[]";
            const lista = JSON.parse(salvo);
            const novaLista = [...new Set([...lista, nomeUsuario, idUsuario].filter(Boolean))];

            await AsyncStorage.setItem("@vivai_bloqueados", JSON.stringify(novaLista));
            setUsuariosBloqueados(novaLista);

            // Remove imediatamente do feed todas as publicações deste usuário
            setPublicacoes((prev) =>
                prev.filter(
                    (p) => p.usuario !== nomeUsuario && String(p.usuarioId) !== idUsuario
                )
            );

            setToast({
                visivel: true,
                mensagem: `Conta de ${nomeUsuario} bloqueada 🚫`,
                submensagem: "Você não verá mais publicações deste perfil no seu feed.",
            });
        } catch (erro) {
            console.log("Erro ao salvar conta bloqueada:", erro);
        }
    };

    // Reportar Publicação
    const handleReportarPublicacao = (publi, motivo) => {
        // Oculta a publicação reportada do feed do usuário
        setPublicacoes((prev) => prev.filter((p) => p.id !== publi.id));

        setToast({
            visivel: true,
            mensagem: "Publicação reportada com sucesso! 🛡️",
            submensagem: `Motivo: ${motivo}. Analisaremos este conteúdo.`,
        });
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#171717" }} edges={["top", "left", "right"]}>
            <StatusBar barStyle="light-content" backgroundColor="#171717" />
            {/* TOAST DE NOTIFICAÇÃO AO SALVAR */}
            <ToastNotificacao
                visivel={toast.visivel}
                mensagem={toast.mensagem}
                submensagem={toast.submensagem}
                onClose={() => setToast((prev) => ({ ...prev, visivel: false }))}
            />

            {/* MODAL DE IMAGEM EXPANDIDA EM ALTA RESOLUÇÃO */}
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
                onCurtir={(id) => curtirPubli(id)}
                onSalvar={(id) => salvarPubli(id)}
                onComentar={(id) =>
                    router.push({
                        pathname: "/vivai/detalhes",
                        params: { id },
                    })
                }
            />

            {/* MODAL DE OPÇÕES DA PUBLICAÇÃO (BLOQUEAR E REPORTAR) */}
            <ModalOpcoesPublicacao
                visivel={modalOpcoes.visivel}
                publicacao={modalOpcoes.publicacao}
                onClose={() => setModalOpcoes({ visivel: false, publicacao: null })}
                onBloquearConta={handleBloquearConta}
                onReportarPublicacao={handleReportarPublicacao}
            />

            {/* ÁREA DE CONTEÚDO PRINCIPAL */}
            <View style={{ flex: 1, position: "relative" }}>
                <ScrollView
                    style={SocialInicioStyle.container}
                    contentContainerStyle={{ paddingBottom: 90 }}
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

                        return (
                            <View key={item.id} style={SocialInicioStyle.containerFeed}>

                                {/* USUÁRIO E FOTO DE PERFIL */}
                                <View style={SocialInicioStyle.boxFeed}>
                                    <TouchableOpacity onPress={() => router.push("/vivai/perfil")}>
                                        <Image
                                            source={
                                                usuario?.foto?.startsWith?.("http") || usuario?.foto?.startsWith?.("file:")
                                                    ? { uri: usuario.foto }
                                                    : fotosPerfil[usuario?.foto] || fotosPerfil["pessoa.jpeg"]
                                            }
                                            style={SocialInicioStyle.imgP}
                                        />
                                    </TouchableOpacity>

                                    <View style={SocialInicioStyle.boxText}>
                                        <Text style={SocialInicioStyle.textName}>{item.usuario}</Text>
                                        
                                        {item.localizacao ? (
                                            <TouchableOpacity
                                                activeOpacity={0.7}
                                                onPress={() => abrirNoMaps(item)}
                                                style={SocialInicioStyle.boxLocalizacao}
                                            >
                                                <Image
                                                    source={require("../../../assets/localizacao.png")}
                                                    style={SocialInicioStyle.iconLocFeed}
                                                />
                                                <Text
                                                    style={SocialInicioStyle.textLocalizacao}
                                                    numberOfLines={1}
                                                    ellipsizeMode="tail"
                                                >
                                                    {item.localizacao}
                                                </Text>
                                            </TouchableOpacity>
                                        ) : null}

                                        <Text style={SocialInicioStyle.textHora}>{item.tempo}</Text>
                                    </View>

                                    <TouchableOpacity
                                        style={SocialInicioStyle.botaoPontos}
                                        activeOpacity={0.7}
                                        onPress={() =>
                                            setModalOpcoes({
                                                visivel: true,
                                                publicacao: item,
                                            })
                                        }
                                    >
                                        <Image
                                            source={require("../../../assets/pontos.png")}
                                            style={SocialInicioStyle.iconP}
                                        />
                                    </TouchableOpacity>
                                </View>

                                {/* TEXTO E FOTO DA PUBLICAÇÃO */}
                                <View style={SocialInicioStyle.boxPubli}>
                                    {item.descricao && (
                                        <TouchableOpacity
                                            activeOpacity={0.8}
                                            onPress={() =>
                                                router.push({
                                                    pathname: "/vivai/detalhes",
                                                    params: { id: item.id },
                                                })
                                            }
                                        >
                                            <Text style={SocialInicioStyle.textDesc}>
                                                {item.descricao}
                                            </Text>
                                        </TouchableOpacity>
                                    )}

                                    {/* Carrossel de fotos: ao tocar, expande em tela cheia com estilo original */}
                                    <View style={{ position: "relative" }}>
                                        <CarrosselImagens
                                            imagens={item.imagem}
                                            onPress={(indexClicado) => {
                                                setModalImagem({
                                                    visivel: true,
                                                    imagens: item.imagem,
                                                    indexInicial: typeof indexClicado === "number" ? indexClicado : 0,
                                                    publicacao: {
                                                        ...item,
                                                        usuarioFoto: usuario?.foto,
                                                    },
                                                });
                                            }}
                                        />

                                        {/* Badge discreta indicando Maps apenas quando tiver localização */}
                                        {item.localizacao ? (
                                            <TouchableOpacity
                                                activeOpacity={0.85}
                                                onPress={() => abrirNoMaps(item)}
                                                style={SocialInicioStyle.badgeMaps}
                                            >
                                                <Image
                                                    source={require("../../../assets/localizacao.png")}
                                                    style={SocialInicioStyle.badgeMapsIcon}
                                                />
                                                <Text style={SocialInicioStyle.badgeMapsText} numberOfLines={1}>
                                                    Ver no Maps
                                                </Text>
                                            </TouchableOpacity>
                                        ) : null}
                                    </View>
                                </View>

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

                                    {/* BOTÃO SALVAR PUBLICAÇÃO */}
                                    <TouchableOpacity
                                        onPress={() => salvarPubli(item.id)}
                                        activeOpacity={0.7}
                                    >
                                        <Image
                                            source={require("../../../assets/salvar.png")}
                                            style={[
                                                SocialInicioStyle.icons,
                                                item.salvo && SocialInicioStyle.iconSalvo,
                                            ]}
                                        />
                                    </TouchableOpacity>
                                </View>

                            </View>
                        );
                    })}
                </ScrollView>

                {/* BOTÃO FLUTUANTE DE CRIAR */}
                <TouchableOpacity
                    style={SocialInicioStyle.botaoCriar}
                    onPress={() => router.push("/vivai/criar")}
                    activeOpacity={0.8}
                    hitSlop={8}
                >
                    <Ionicons name="add" size={32} color="#FFFFFF" />
                </TouchableOpacity>
            </View>

            {/* NAVBAR FIXA E RESPONSIVA */}
            <BottomNav />
        </SafeAreaView>
    );
};