import {
    Image,
    Linking,
    Platform,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SocialDetalheStyle } from "./SocialDetalheStyle";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { api } from "../../services/json";
import { fotosLugares, lugaresIniciais } from "../../services/lugaresData";
import { setLocalizacaoParaPublicacao } from "../../services/localizacaoStore";

export const SocialDetalhe = () => {
    const router = useRouter();
    const { id, nome, origem } = useLocalSearchParams();
    const modoCriar = origem === "criar";

    // Encontra o lugar local correspondente por id ou nome para garantir coordenadas e endereço imediatos
    const getLocalPlace = () => {
        if (id) {
            const byId = lugaresIniciais.find((l) => String(l.id) === String(id));
            if (byId) return byId;
        }
        if (nome) {
            const byName = lugaresIniciais.find(
                (l) => l.nome.toLowerCase() === String(nome).toLowerCase()
            );
            if (byName) return byName;
        }
        return lugaresIniciais[0];
    };

    const [lugar, setLugar] = useState(getLocalPlace);
    const [mapaComErro, setMapaComErro] = useState(false);

    useEffect(() => {
        setMapaComErro(false);
        const local = getLocalPlace();
        setLugar(local);

        const carregarLugar = async () => {
            const targetId = id || local.id;
            try {
                const res = await api.get(`/lugares/${targetId}`);
                if (res.data && res.data.nome) {
                    setLugar({
                        ...local,
                        ...res.data,
                        latitude: res.data.latitude !== undefined ? res.data.latitude : local.latitude,
                        longitude: res.data.longitude !== undefined ? res.data.longitude : local.longitude,
                        endereco: res.data.endereco || local.endereco,
                        pontoReferencia: res.data.pontoReferencia || local.pontoReferencia,
                    });
                }
            } catch (err) {
                setLugar(local);
            }
        };

        carregarLugar();
    }, [id, nome]);

    const getFotoLugar = (img) => {
        if (!img) return fotosLugares["ibira.jpg"];
        if (
            typeof img === "string" &&
            (img.startsWith("http") || img.startsWith("file:") || img.startsWith("data:"))
        ) {
            return { uri: img };
        }
        return fotosLugares[img] || fotosLugares["ibira.jpg"];
    };

    const getMapaUrl = () => {
        const local = getLocalPlace();
        const lat = (lugar && lugar.latitude !== undefined) ? lugar.latitude : local.latitude;
        const lng = (lugar && lugar.longitude !== undefined) ? lugar.longitude : local.longitude;
        if (lat === undefined || lng === undefined) {
            return null;
        }
        return `https://static-maps.yandex.ru/1.x/?ll=${lng},${lat}&z=15&l=map&size=650,260&pt=${lng},${lat},pm2orgm`;
    };

    const abrirNoMaps = async () => {
        const local = getLocalPlace();
        const dadosLugar = {
            ...local,
            ...lugar,
            latitude: (lugar && lugar.latitude !== undefined) ? lugar.latitude : local.latitude,
            longitude: (lugar && lugar.longitude !== undefined) ? lugar.longitude : local.longitude,
        };

        const lat = dadosLugar.latitude;
        const lng = dadosLugar.longitude;
        const nomeLugar = dadosLugar.nome;
        const enderecoLugar = dadosLugar.endereco || dadosLugar.localizacao;

        // Query completa com nome e endereço do lugar (ex: "MASP - Museu de Arte, Av. Paulista, 1578 - Bela Vista")
        const queryTermo = encodeURIComponent(`${nomeLugar}, ${enderecoLugar}`);
        const coords = `${lat},${lng}`;

        // URL universal do Google Maps com query precisa do lugar
        const universalUrl = `https://www.google.com/maps/search/?api=1&query=${queryTermo}`;

        // Esquemas nativos por plataforma:
        // Android: geo:lat,lng?q=lat,lng(Nome) abre o app do Google Maps com pino e nome exato do lugar
        // iOS: maps:0,0?q=Nome&ll=lat,lng abre o Apple Maps centralizado nas coordenadas com o nome do lugar
        const nativeScheme = Platform.select({
            ios: `maps:0,0?q=${encodeURIComponent(nomeLugar)}&ll=${coords}`,
            android: `geo:${coords}?q=${coords}(${encodeURIComponent(nomeLugar)})`,
            default: universalUrl,
        });

        try {
            const canOpen = await Linking.canOpenURL(nativeScheme);
            if (canOpen) {
                await Linking.openURL(nativeScheme);
            } else {
                await Linking.openURL(universalUrl);
            }
        } catch (err) {
            console.log("Erro ao abrir app de mapas:", err);
            await Linking.openURL(universalUrl);
        }
    };

    const adicionarLocalizacaoPubli = () => {
        setLocalizacaoParaPublicacao({
            id: lugar.id,
            nome: lugar.nome,
            endereco: lugar.cidade || lugar.endereco || "São Paulo, SP",
        });

        router.replace({
            pathname: "/vivai/criar",
            params: {
                localizacao: lugar.nome,
                endereco: lugar.cidade || lugar.endereco || "São Paulo, SP",
            },
        });
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#171717" }}>
            <ScrollView style={SocialDetalheStyle.container} showsVerticalScrollIndicator={false}>
                <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
                    <Image
                        source={require("../../../assets/voltar.png")}
                        style={SocialDetalheStyle.icon}
                    />
                </TouchableOpacity>

                <View style={SocialDetalheStyle.view}>
                    <Image
                        source={getFotoLugar(lugar.imagem)}
                        style={SocialDetalheStyle.img}
                        resizeMode="cover"
                    />
                </View>

                {lugar.categoria && (
                    <View style={SocialDetalheStyle.badgeCat}>
                        <Text style={SocialDetalheStyle.badgeCatText}>{lugar.categoria}</Text>
                    </View>
                )}

                <Text style={SocialDetalheStyle.textP}>{lugar.nome}</Text>

                <View style={SocialDetalheStyle.box}>
                    <Image
                        source={require("../../../assets/localizacao.png")}
                        style={SocialDetalheStyle.iconL}
                    />
                    <Text style={SocialDetalheStyle.text}> {lugar.localizacao} </Text>
                </View>

                <Text style={SocialDetalheStyle.description}>{lugar.descricao}</Text>

                {(lugar.horario || lugar.entrada) && (
                    <View style={SocialDetalheStyle.infoCard}>
                        {lugar.horario && (
                            <View style={lugar.entrada ? SocialDetalheStyle.infoRow : SocialDetalheStyle.infoRowLast}>
                                <View style={SocialDetalheStyle.infoDot} />
                                <Text style={SocialDetalheStyle.infoLabel}>Horário:</Text>
                                <Text style={SocialDetalheStyle.infoVal}>{lugar.horario}</Text>
                            </View>
                        )}
                        {lugar.entrada && (
                            <View style={SocialDetalheStyle.infoRowLast}>
                                <View style={SocialDetalheStyle.infoDot} />
                                <Text style={SocialDetalheStyle.infoLabel}>Entrada:</Text>
                                <Text style={SocialDetalheStyle.infoVal}>{lugar.entrada}</Text>
                            </View>
                        )}
                    </View>
                )}

                <Text style={SocialDetalheStyle.tituloSecao}>Localização</Text>

                {/* Mapa dinâmico da localização real do lugar */}
                <TouchableOpacity
                    style={SocialDetalheStyle.mapaContainer}
                    activeOpacity={0.85}
                    onPress={abrirNoMaps}
                >
                    <Image
                        source={
                            !mapaComErro && getMapaUrl()
                                ? { uri: getMapaUrl() }
                                : require("../../../assets/maps.png")
                        }
                        style={SocialDetalheStyle.maps}
                        resizeMode="cover"
                        onError={() => setMapaComErro(true)}
                    />
                    <View style={SocialDetalheStyle.mapaOverlayBadge}>
                        <Image
                            source={require("../../../assets/localizacao.png")}
                            style={{ width: 12, height: 12, tintColor: "#D97706", marginRight: 4 }}
                        />
                        <Text style={SocialDetalheStyle.mapaOverlayBadgeText}>
                            Toque para navegar
                        </Text>
                    </View>
                </TouchableOpacity>

                {/* Card com endereço real e detalhes de acesso */}
                {lugar.endereco && (
                    <View style={SocialDetalheStyle.cardEndereco}>
                        <View style={SocialDetalheStyle.enderecoHeader}>
                            <Image
                                source={require("../../../assets/localizacao.png")}
                                style={SocialDetalheStyle.enderecoIcon}
                            />
                            <Text style={SocialDetalheStyle.enderecoTitulo}>Endereço Real</Text>
                        </View>
                        <Text style={SocialDetalheStyle.enderecoTexto}>{lugar.endereco}</Text>
                        <Text style={SocialDetalheStyle.enderecoBairro}>
                            {lugar.bairro && `${lugar.bairro} • `}
                            {lugar.cidade || "São Paulo, SP"}
                            {lugar.cep && ` • CEP ${lugar.cep}`}
                        </Text>
                        {lugar.pontoReferencia && (
                            <View style={SocialDetalheStyle.enderecoRefBox}>
                                <Text style={SocialDetalheStyle.enderecoRefText}>
                                    Ponto de referência: {lugar.pontoReferencia}
                                </Text>
                            </View>
                        )}
                    </View>
                )}

                {/* Botão de Ação: Adicionar à publicação se vindo de Criar, ou Ver no mapa se navegação normal */}
                <View style={SocialDetalheStyle.bottomContainer}>
                    {modoCriar ? (
                        <TouchableOpacity
                            style={[
                                SocialDetalheStyle.buttonStart,
                                { backgroundColor: "#D97706" },
                            ]}
                            onPress={adicionarLocalizacaoPubli}
                            activeOpacity={0.85}
                        >
                            <Image
                                source={require("../../../assets/localizacao.png")}
                                style={[
                                    SocialDetalheStyle.buttonStartIcon,
                                    { tintColor: "#FFFFFF" },
                                ]}
                            />
                            <Text
                                style={[
                                    SocialDetalheStyle.buttonStartText,
                                    { color: "#FFFFFF" },
                                ]}
                            >
                                Adicionar à publicação
                            </Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            style={SocialDetalheStyle.buttonStart}
                            onPress={abrirNoMaps}
                            activeOpacity={0.85}
                        >
                            <Image
                                source={require("../../../assets/localizacao.png")}
                                style={SocialDetalheStyle.buttonStartIcon}
                            />
                            <Text style={SocialDetalheStyle.buttonStartText}>
                                Ver no mapa
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};