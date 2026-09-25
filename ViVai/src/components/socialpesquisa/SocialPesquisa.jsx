import {
    ActivityIndicator,
    Image,
    RefreshControl,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useCallback, useMemo, useState } from "react";
import { useFocusEffect, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { BottomNav } from "../bottomnav/BottomNav";
import { SocialPesquisaStyle } from "./SocialPesquisaStyle";
import { api } from "../../services/json";
import { fotosLugares, lugaresIniciais } from "../../services/lugaresData";
import { useAuth } from "../../context/Context";
import { criarNotificacaoSeguir } from "../../services/notificacoesService";

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

const categoriasLista = [
    { id: "Viagens", nome: "Viagens", icone: require("../../../assets/aviao.png") },
    { id: "Cidade", nome: "Cidade", icone: require("../../../assets/cidade.png") },
    { id: "Praia", nome: "Praia", icone: require("../../../assets/praia.png") },
    { id: "Natureza", nome: "Natureza", icone: require("../../../assets/arvore.png") },
];

export const SocialPesquisa = () => {
    const router = useRouter();
    const { usuarioLogado } = useAuth();

    const [lugares, setLugares] = useState(lugaresIniciais);
    const [usuarios, setUsuarios] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const [busca, setBusca] = useState("");
    const [categoriaAtiva, setCategoriaAtiva] = useState(null);
    const [mostrarTodosEmAlta, setMostrarTodosEmAlta] = useState(false);
    const [seguindoMap, setSeguindoMap] = useState({});

    const carregarDados = async () => {
        try {
            const [resLugares, resUsers] = await Promise.allSettled([
                api.get("/lugares"),
                api.get("/usuarios"),
            ]);

            if (resLugares.status === "fulfilled" && Array.isArray(resLugares.value.data) && resLugares.value.data.length > 0) {
                const apiLugares = resLugares.value.data;
                const apiIds = new Set(apiLugares.map((l) => String(l.id)));
                const extras = lugaresIniciais.filter((l) => !apiIds.has(String(l.id)));
                setLugares([...apiLugares, ...extras]);
            } else {
                setLugares(lugaresIniciais);
            }

            if (resUsers.status === "fulfilled" && Array.isArray(resUsers.value.data)) {
                setUsuarios(resUsers.value.data);
            }
        } catch (error) {
            console.log("Erro ao carregar dados do Explorar:", error);
            setLugares(lugaresIniciais);
        } finally {
            setCarregando(false);
            setRefreshing(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            carregarDados();
        }, [])
    );

    const onRefresh = () => {
        setRefreshing(true);
        carregarDados();
    };

    const alternarSeguir = (id) => {
        const novoSeguindo = !seguindoMap[id];
        setSeguindoMap((prev) => ({
            ...prev,
            [id]: novoSeguindo,
        }));

        if (novoSeguindo) {
            const userAlvo = usuarios.find((u) => u.id === id);
            if (userAlvo) {
                criarNotificacaoSeguir({
                    usuarioAlvo: userAlvo,
                    usuarioLogado,
                });
            }
        }
    };

    const selecionarCategoria = (categoriaId) => {
        setCategoriaAtiva((atual) => (atual === categoriaId ? null : categoriaId));
    };

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

    const getFotoLugar = (imagem) => {
        if (!imagem) return fotosLugares["ibira.jpg"];
        if (
            typeof imagem === "string" &&
            (imagem.startsWith("http") || imagem.startsWith("file:") || imagem.startsWith("data:"))
        ) {
            return { uri: imagem };
        }
        return fotosLugares[imagem] || fotosLugares["ibira.jpg"];
    };

    // Lugares filtrados por categoria e por termo de busca
    const lugaresFiltrados = useMemo(() => {
        const termo = busca.trim().toLowerCase();
        return lugares.filter((lugar) => {
            if (categoriaAtiva && lugar.categoria !== categoriaAtiva) {
                return false;
            }

            if (termo === "") return true;

            const bateNome = (lugar.nome || "").toLowerCase().includes(termo);
            const bateLoc = (lugar.localizacao || "").toLowerCase().includes(termo);
            const bateCat = (lugar.categoria || "").toLowerCase().includes(termo);
            const bateDesc = (lugar.descricao || "").toLowerCase().includes(termo);
            return bateNome || bateLoc || bateCat || bateDesc;
        });
    }, [lugares, busca, categoriaAtiva]);

    // Quantidade de lugares visíveis (6 por padrão, todos se expandir ou se estiver buscando)
    const lugaresVisiveis = useMemo(() => {
        if (mostrarTodosEmAlta || busca.trim().length > 0 || categoriaAtiva) {
            return lugaresFiltrados;
        }
        return lugaresFiltrados.slice(0, 6);
    }, [lugaresFiltrados, mostrarTodosEmAlta, busca, categoriaAtiva]);

    // Pessoas filtradas
    const usuariosFiltrados = useMemo(() => {
        const termo = busca.trim().toLowerCase();
        if (termo === "") return usuarios;

        return usuarios.filter((user) => {
            const bateNome = (user.nome || "").toLowerCase().includes(termo);
            const bateUser = (user.usuario || "").toLowerCase().includes(termo);
            return bateNome || bateUser;
        });
    }, [usuarios, busca]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#171717" }} edges={["top", "left", "right"]}>
            <View style={SocialPesquisaStyle.container}>
                <ScrollView
                    style={SocialPesquisaStyle.scroll}
                    contentContainerStyle={SocialPesquisaStyle.content}
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
                    <Text style={SocialPesquisaStyle.titulo}>Explorar</Text>

                    {/* Barra de Pesquisa */}
                    <View style={SocialPesquisaStyle.barraPesquisa}>
                        <Image
                            source={require("../../../assets/pesquisar.png")}
                            style={SocialPesquisaStyle.iconPesquisa}
                        />
                        <TextInput
                            style={SocialPesquisaStyle.inputPesquisa}
                            placeholder="Pesquisar lugares, pessoas ou categorias..."
                            placeholderTextColor="#888"
                            value={busca}
                            onChangeText={setBusca}
                            returnKeyType="search"
                        />
                        {busca.length > 0 && (
                            <TouchableOpacity
                                onPress={() => setBusca("")}
                                style={SocialPesquisaStyle.clearSearchBtn}
                            >
                                <Text style={SocialPesquisaStyle.clearSearchText}>✕</Text>
                            </TouchableOpacity>
                        )}
                    </View>

                    {/* Badge informativo de filtro ativo */}
                    {(busca.trim().length > 0 || categoriaAtiva) && (
                        <View style={SocialPesquisaStyle.badgeResultados}>
                            <Text style={SocialPesquisaStyle.badgeResultadosText}>
                                {categoriaAtiva && `Categoria: ${categoriaAtiva}`}
                                {categoriaAtiva && busca.trim().length > 0 && " • "}
                                {busca.trim().length > 0 && `Busca: "${busca.trim()}"`}
                            </Text>
                        </View>
                    )}

                    {/* Seção Em Alta (Lugares em Alta) */}
                    <View style={SocialPesquisaStyle.boxAlta}>
                        <Text style={SocialPesquisaStyle.tituloSecao}>
                            {categoriaAtiva ? `Em alta em ${categoriaAtiva}` : "Em alta"}
                        </Text>

                        {lugaresFiltrados.length > 6 && !categoriaAtiva && busca.trim().length === 0 && (
                            <TouchableOpacity
                                onPress={() => setMostrarTodosEmAlta(!mostrarTodosEmAlta)}
                            >
                                <Text style={SocialPesquisaStyle.verMais}>
                                    {mostrarTodosEmAlta ? "Ver menos" : "Ver mais"}
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>

                    {/* Grade de Lugares em Alta */}
                    {carregando ? (
                        <View style={SocialPesquisaStyle.loadingContainer}>
                            <ActivityIndicator size="large" color="#D97706" />
                        </View>
                    ) : lugaresVisiveis.length === 0 ? (
                        <View style={SocialPesquisaStyle.emptyContainer}>
                            <Text style={SocialPesquisaStyle.emptyText}>
                                Nenhum lugar encontrado para este filtro.
                            </Text>
                        </View>
                    ) : (
                        <View style={SocialPesquisaStyle.gridAlta}>
                            {lugaresVisiveis.map((item) => (
                                <TouchableOpacity
                                    key={item.id}
                                    style={SocialPesquisaStyle.itemGrid}
                                    activeOpacity={0.85}
                                    onPress={() =>
                                        router.push({
                                            pathname: "/vivai/detalhe",
                                            params: { id: item.id, nome: item.nome },
                                        })
                                    }
                                >
                                    <Image
                                        source={getFotoLugar(item.imagem)}
                                        style={SocialPesquisaStyle.imgGrid}
                                    />
                                    {item.distancia && (
                                        <View style={SocialPesquisaStyle.badgeDistancia}>
                                            <Text style={SocialPesquisaStyle.textDistancia}>
                                                {item.distancia}
                                            </Text>
                                        </View>
                                    )}
                                    <View style={SocialPesquisaStyle.overlayNomeLugar}>
                                        <Text
                                            style={SocialPesquisaStyle.textNomeLugar}
                                            numberOfLines={1}
                                        >
                                            {item.nome}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}

                    {/* Categorias */}
                    <Text style={SocialPesquisaStyle.tituloSecao}>Categorias</Text>

                    <View style={SocialPesquisaStyle.boxCategorias}>
                        {categoriasLista.map((cat) => {
                            const ativa = categoriaAtiva === cat.id;
                            return (
                                <TouchableOpacity
                                    key={cat.id}
                                    style={[
                                        SocialPesquisaStyle.boxCat,
                                        ativa && SocialPesquisaStyle.boxCatAtivo,
                                    ]}
                                    onPress={() => selecionarCategoria(cat.id)}
                                    activeOpacity={0.7}
                                >
                                    <Image
                                        source={cat.icone}
                                        style={[
                                            SocialPesquisaStyle.imgCat,
                                            ativa && { tintColor: "#D97706" },
                                        ]}
                                    />
                                    <Text
                                        style={[
                                            SocialPesquisaStyle.textCat,
                                            ativa && SocialPesquisaStyle.textCatAtivo,
                                        ]}
                                    >
                                        {cat.nome}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                    {/* Seção Pessoas que você talvez conheça */}
                    <View style={SocialPesquisaStyle.boxAlta}>
                        <Text style={SocialPesquisaStyle.tituloSecao}>
                            Pessoas que você talvez conheça
                        </Text>

                        <TouchableOpacity onPress={() => router.push("/vivai/seguidores")}>
                            <Text style={SocialPesquisaStyle.verMais}>Ver mais</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Lista de Usuários */}
                    {carregando ? (
                        <View style={SocialPesquisaStyle.loadingContainer}>
                            <ActivityIndicator size="small" color="#D97706" />
                        </View>
                    ) : usuariosFiltrados.length === 0 ? (
                        <View style={SocialPesquisaStyle.emptyContainer}>
                            <Text style={SocialPesquisaStyle.emptyText}>
                                Nenhuma pessoa encontrada.
                            </Text>
                        </View>
                    ) : (
                        usuariosFiltrados.map((user, index) => {
                            const seguindo = !!seguindoMap[user.id];

                            return (
                                <View key={user.id || index}>
                                    <View style={SocialPesquisaStyle.boxFeed}>
                                        <TouchableOpacity
                                            onPress={() => router.push("/vivai/perfil")}
                                            activeOpacity={0.8}
                                        >
                                            <Image
                                                source={getFotoUsuario(user.foto)}
                                                style={SocialPesquisaStyle.imgP}
                                            />
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={SocialPesquisaStyle.boxText}
                                            onPress={() => router.push("/vivai/perfil")}
                                            activeOpacity={0.8}
                                        >
                                            <Text style={SocialPesquisaStyle.textName}>
                                                {user.nome}
                                            </Text>
                                            <Text style={SocialPesquisaStyle.textHora}>
                                                @{user.usuario}
                                            </Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={[
                                                SocialPesquisaStyle.buttonStart,
                                                seguindo && SocialPesquisaStyle.buttonSeguindo,
                                            ]}
                                            onPress={() => alternarSeguir(user.id)}
                                            activeOpacity={0.7}
                                        >
                                            <Text
                                                style={[
                                                    SocialPesquisaStyle.buttonStartText,
                                                    seguindo &&
                                                        SocialPesquisaStyle.buttonSeguindoText,
                                                ]}
                                            >
                                                {seguindo ? "Seguindo" : "Seguir"}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>

                                    {index < usuariosFiltrados.length - 1 && (
                                        <View style={SocialPesquisaStyle.divisao} />
                                    )}
                                </View>
                            );
                        })
                    )}
                </ScrollView>
            </View>

            <BottomNav />
        </SafeAreaView>
    );
};