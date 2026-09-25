import { useCallback, useMemo, useState } from "react";
import {
    ActivityIndicator,
    Image,
    Pressable,
    RefreshControl,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { BottomNav } from "../bottomnav/BottomNav";
import { NotificacoesStyle } from "./NotificacoesStyle";
import { notificacoesIniciais } from "./notificacoesData";
import { api } from "../../services/json";

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

const icones = {
    curtida: require("../../../assets/coracao.png"),
    comentario: require("../../../assets/comentario.png"),
    seguir: require("../../../assets/AdicionarAmigo.png"),
    salvar: require("../../../assets/salvar.png"),
};

const coresBadgeTipo = {
    curtida: "#EF4444",
    comentario: "#3B82F6",
    seguir: "#D97706",
    salvar: "#EAB308",
};

export const SocialNotificacoes = () => {
    const router = useRouter();

    const [lista, setLista] = useState(notificacoesIniciais);
    const [carregando, setCarregando] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [abaAtiva, setAbaAtiva] = useState("todas"); // 'todas' | 'naoLidas'

    const carregarNotificacoes = async () => {
        try {
            const res = await api.get("/notificacoes");
            if (Array.isArray(res.data) && res.data.length > 0) {
                setLista(res.data);
            } else {
                setLista(notificacoesIniciais);
            }
        } catch (error) {
            console.log("Erro ao carregar notificações da API:", error);
            setLista(notificacoesIniciais);
        } finally {
            setCarregando(false);
            setRefreshing(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            carregarNotificacoes();
        }, [])
    );

    const onRefresh = () => {
        setRefreshing(true);
        carregarNotificacoes();
    };

    const marcarTodasComoLidas = async () => {
        const atualizadas = lista.map((n) => ({ ...n, lida: true }));
        setLista(atualizadas);

        // Atualiza individualmente no json-server as que estavam não lidas
        try {
            const naoLidas = lista.filter((n) => !n.lida);
            await Promise.allSettled(
                naoLidas.map((n) => api.patch(`/notificacoes/${n.id}`, { lida: true }))
            );
        } catch (err) {
            console.log("Erro ao marcar notificações como lidas na API:", err);
        }
    };

    const abrirNotificacao = async (item) => {
        // Marca como lida
        if (!item.lida) {
            setLista((prev) =>
                prev.map((n) => (n.id === item.id ? { ...n, lida: true } : n))
            );
            try {
                await api.patch(`/notificacoes/${item.id}`, { lida: true });
            } catch (err) {
                // Silencioso
            }
        }

        // Navegação contextual
        if (item.publicacaoId) {
            router.push({
                pathname: "/vivai/detalhes",
                params: { id: item.publicacaoId },
            });
        } else if (item.tipo === "seguir") {
            router.push("/vivai/perfil");
        }
    };

    const getFotoUsuario = (foto) => {
        if (!foto) return null;
        if (
            typeof foto === "string" &&
            (foto.startsWith("http") || foto.startsWith("file:") || foto.startsWith("data:"))
        ) {
            return { uri: foto };
        }
        return fotosPerfil[foto] || null;
    };

    const totalNaoLidas = useMemo(() => {
        return lista.filter((n) => !n.lida).length;
    }, [lista]);

    const listaFiltrada = useMemo(() => {
        if (abaAtiva === "naoLidas") {
            return lista.filter((n) => !n.lida);
        }
        return lista;
    }, [lista, abaAtiva]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#171717" }} edges={["top", "left", "right"]}>
            <View style={NotificacoesStyle.container}>
                {/* Header */}
                <View style={NotificacoesStyle.header}>
                    <View style={NotificacoesStyle.headerLeft}>
                        <TouchableOpacity
                            onPress={() => router.back()}
                            style={NotificacoesStyle.backButton}
                            activeOpacity={0.7}
                        >
                            <Image
                                source={require("../../../assets/voltar.png")}
                                style={NotificacoesStyle.backIcon}
                            />
                        </TouchableOpacity>
                        <Text style={NotificacoesStyle.titulo}>Notificações</Text>
                    </View>

                    {totalNaoLidas > 0 ? (
                        <Pressable hitSlop={10} onPress={marcarTodasComoLidas}>
                            <Text style={NotificacoesStyle.marcar}>Marcar todas como lidas</Text>
                        </Pressable>
                    ) : (
                        <Text style={NotificacoesStyle.marcarDesabilitado}>Tudo lido</Text>
                    )}
                </View>

                {/* Abas de filtro: Todas / Não lidas */}
                <View style={NotificacoesStyle.tabsContainer}>
                    <TouchableOpacity
                        style={[
                            NotificacoesStyle.tab,
                            abaAtiva === "todas" && NotificacoesStyle.tabAtiva,
                        ]}
                        onPress={() => setAbaAtiva("todas")}
                        activeOpacity={0.7}
                    >
                        <Text
                            style={[
                                NotificacoesStyle.tabTexto,
                                abaAtiva === "todas" && NotificacoesStyle.tabTextoAtivo,
                            ]}
                        >
                            Todas
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            NotificacoesStyle.tab,
                            abaAtiva === "naoLidas" && NotificacoesStyle.tabAtiva,
                        ]}
                        onPress={() => setAbaAtiva("naoLidas")}
                        activeOpacity={0.7}
                    >
                        <Text
                            style={[
                                NotificacoesStyle.tabTexto,
                                abaAtiva === "naoLidas" && NotificacoesStyle.tabTextoAtivo,
                            ]}
                        >
                            Não lidas
                        </Text>
                        {totalNaoLidas > 0 && (
                            <View style={NotificacoesStyle.tabBadge}>
                                <Text style={NotificacoesStyle.tabBadgeTexto}>
                                    {totalNaoLidas}
                                </Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>

                {/* Lista de Notificações */}
                {carregando ? (
                    <View style={NotificacoesStyle.loadingContainer}>
                        <ActivityIndicator size="large" color="#D97706" />
                    </View>
                ) : listaFiltrada.length === 0 ? (
                    <View style={NotificacoesStyle.emptyContainer}>
                        <Image
                            source={require("../../../assets/notificacao.png")}
                            style={NotificacoesStyle.emptyIcon}
                        />
                        <Text style={NotificacoesStyle.emptyText}>
                            {abaAtiva === "naoLidas"
                                ? "Nenhuma notificação não lida"
                                : "Nenhuma notificação por enquanto"}
                        </Text>
                        <Text style={NotificacoesStyle.emptySubtext}>
                            {abaAtiva === "naoLidas"
                                ? "Você já leu todas as suas notificações recentes!"
                                : "Quando alguém curtir, comentar ou seguir você, aparecerá aqui."}
                        </Text>
                    </View>
                ) : (
                    <ScrollView
                        style={NotificacoesStyle.lista}
                        contentContainerStyle={NotificacoesStyle.listaContent}
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                                tintColor="#D97706"
                                colors={["#D97706"]}
                            />
                        }
                    >
                        {listaFiltrada.map((item) => {
                            const fotoSource = getFotoUsuario(item.foto);
                            const inicial = item.inicial || (item.nome ? item.nome.charAt(0).toUpperCase() : "U");
                            const corAvatar = item.cor || "#D97706";
                            const corBadge = coresBadgeTipo[item.tipo] || "#D97706";

                            return (
                                <TouchableOpacity
                                    key={item.id}
                                    style={[
                                        NotificacoesStyle.notificacao,
                                        !item.lida && NotificacoesStyle.notificacaoNaoLida,
                                    ]}
                                    activeOpacity={0.75}
                                    onPress={() => abrirNotificacao(item)}
                                >
                                    {/* Avatar com Badge de Tipo (curtida, comentário, seguir) */}
                                    <View style={NotificacoesStyle.avatarContainer}>
                                        {fotoSource ? (
                                            <Image
                                                source={fotoSource}
                                                style={NotificacoesStyle.avatarImg}
                                            />
                                        ) : (
                                            <View
                                                style={[
                                                    NotificacoesStyle.avatarInicial,
                                                    { backgroundColor: corAvatar },
                                                ]}
                                            >
                                                <Text style={NotificacoesStyle.avatarInicialTexto}>
                                                    {inicial}
                                                </Text>
                                            </View>
                                        )}

                                        {icones[item.tipo] && (
                                            <View
                                                style={[
                                                    NotificacoesStyle.tipoIconeBadge,
                                                    { backgroundColor: corBadge },
                                                ]}
                                            >
                                                <Image
                                                    source={icones[item.tipo]}
                                                    style={[
                                                        NotificacoesStyle.tipoIcone,
                                                        { tintColor: "#FFFFFF" },
                                                    ]}
                                                />
                                            </View>
                                        )}
                                    </View>

                                    {/* Conteúdo textual */}
                                    {item.tipo === "comentario" ? (
                                        <View style={NotificacoesStyle.conteudo}>
                                            <Text style={NotificacoesStyle.mensagem} numberOfLines={1}>
                                                <Text style={NotificacoesStyle.nome}>{item.nome}</Text>
                                                {" comentou:"}
                                            </Text>
                                            <View style={NotificacoesStyle.comentarioBox}>
                                                <Text style={NotificacoesStyle.comentarioTexto} numberOfLines={2}>
                                                    “{item.comentarioTexto || (item.mensagem?.includes("comentou:") ? item.mensagem.replace(/^comentou:\s*[“"]?|["”]?$/g, "").trim() : item.mensagem)}”
                                                </Text>
                                            </View>
                                            <Text style={NotificacoesStyle.tempo}>{item.tempo}</Text>
                                        </View>
                                    ) : (
                                        <View style={NotificacoesStyle.conteudo}>
                                            <Text style={NotificacoesStyle.mensagem} numberOfLines={2}>
                                                <Text style={NotificacoesStyle.nome}>{item.nome}</Text>
                                                {` ${item.mensagem}`}
                                            </Text>
                                            <Text style={NotificacoesStyle.tempo}>{item.tempo}</Text>
                                        </View>
                                    )}

                                    {/* Thumbnail da publicação */}
                                    {item.publicacaoImagem ? (
                                        <Image
                                            source={{ uri: item.publicacaoImagem }}
                                            style={NotificacoesStyle.publiThumbnail}
                                        />
                                    ) : null}

                                    {/* Ponto indicador de não lida */}
                                    {!item.lida && <View style={NotificacoesStyle.ponto} />}
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>
                )}
            </View>
            <BottomNav />
        </SafeAreaView>
    );
};

export default SocialNotificacoes;
