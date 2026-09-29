import {
    ActivityIndicator,
    Alert,
    Image,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Location from "expo-location";

import { SocialLocStyle } from "./SocialLocStyle";
import { fotosLugares, getFotoLugar, lugaresIniciais } from "../../services/lugaresData";
import { setLocalizacaoParaPublicacao } from "../../services/localizacaoStore";

export const SocialLoc = () => {
    const router = useRouter();

    const [busca, setBusca] = useState("");
    const [buscandoOnline, setBuscandoOnline] = useState(false);
    const [resultadosOnline, setResultadosOnline] = useState([]);
    const [obtendoLoc, setObtendoLoc] = useState(false);

    // Efeito para busca dinâmica de qualquer localização digitada pelo usuário
    useEffect(() => {
        const termo = busca.trim();

        if (termo.length < 2) {
            setResultadosOnline([]);
            setBuscandoOnline(false);
            return;
        }

        const timer = setTimeout(async () => {
            try {
                setBuscandoOnline(true);

                // 1. Tenta buscar pelo serviço público do OpenStreetMap (Nominatim em português)
                const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
                    termo
                )}&format=json&addressdetails=1&limit=6&accept-language=pt-BR`;

                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 4000);

                const res = await fetch(url, {
                    headers: { "User-Agent": "VivaiSocialApp/1.0" },
                    signal: controller.signal,
                });
                clearTimeout(timeoutId);

                if (res.ok) {
                    const dados = await res.json();

                    if (Array.isArray(dados) && dados.length > 0) {
                        const formatados = dados.map((item, idx) => {
                            const addr = item.address || {};
                            const titulo =
                                item.name ||
                                addr.attraction ||
                                addr.tourism ||
                                addr.amenity ||
                                addr.suburb ||
                                addr.city ||
                                item.display_name.split(",")[0];

                            const subtitulo = [
                                addr.suburb || addr.neighbourhood,
                                addr.city || addr.town || addr.municipality,
                                addr.state,
                                addr.country,
                            ]
                                .filter(Boolean)
                                .join(", ");

                            return {
                                id: `online-${item.place_id || idx}`,
                                nome: titulo,
                                localizacao: subtitulo || item.display_name,
                                latitude: parseFloat(item.lat),
                                longitude: parseFloat(item.lon),
                                online: true,
                            };
                        });

                        setResultadosOnline(formatados);
                        setBuscandoOnline(false);
                        return;
                    }
                }

                // 2. Fallback pelo expo-location geocodeAsync
                const geocoded = await Location.geocodeAsync(termo);
                if (geocoded && geocoded.length > 0) {
                    const formatados = await Promise.all(
                        geocoded.slice(0, 3).map(async (pos, idx) => {
                            let sub = termo;
                            try {
                                const rev = await Location.reverseGeocodeAsync({
                                    latitude: pos.latitude,
                                    longitude: pos.longitude,
                                });
                                if (rev && rev.length > 0) {
                                    const r = rev[0];
                                    sub = [r.district, r.city, r.region, r.country]
                                        .filter(Boolean)
                                        .join(", ");
                                }
                            } catch (_) {}

                            return {
                                id: `geo-${idx}`,
                                nome: termo,
                                localizacao: sub,
                                latitude: pos.latitude,
                                longitude: pos.longitude,
                                online: true,
                            };
                        })
                    );
                    setResultadosOnline(formatados);
                } else {
                    setResultadosOnline([]);
                }
            } catch (err) {
                console.log("Busca de localização online:", err?.message || err);
                setResultadosOnline([]);
            } finally {
                setBuscandoOnline(false);
            }
        }, 400);

        return () => clearTimeout(timer);
    }, [busca]);

    // Usa a localização real do dispositivo via GPS
    const usarMinhaLocalizacao = async () => {
        try {
            setObtendoLoc(true);

            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== "granted") {
                Alert.alert(
                    "Permissão necessária",
                    "Precisamos de permissão para acessar sua localização atual."
                );
                setObtendoLoc(false);
                return;
            }

            const posicao = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Balanced,
            });

            const { latitude, longitude } = posicao.coords;

            let nomeLocal = "Minha localização";
            let enderecoFormatado = "São Paulo, SP";

            try {
                const resultadoGeo = await Location.reverseGeocodeAsync({
                    latitude,
                    longitude,
                });

                if (resultadoGeo && resultadoGeo.length > 0) {
                    const info = resultadoGeo[0];
                    const rua = info.street || info.name || "";
                    const bairro = info.district || info.subregion || "";
                    const cidade = info.city || info.subregion || "São Paulo";
                    const estado = info.region || "SP";

                    if (bairro && cidade) {
                        nomeLocal = `${bairro}, ${cidade}`;
                    } else if (cidade) {
                        nomeLocal = `${cidade}, ${estado}`;
                    } else if (rua) {
                        nomeLocal = rua;
                    }

                    enderecoFormatado = [rua, bairro, cidade ? `${cidade} - ${estado}` : estado]
                        .filter(Boolean)
                        .join(", ");
                }
            } catch (errGeo) {
                console.log("Erro na geocodificação reversa:", errGeo);
            }

            setLocalizacaoParaPublicacao({
                nome: nomeLocal,
                endereco: enderecoFormatado || `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
                latitude,
                longitude,
            });

            router.replace({
                pathname: "/vivai/criar",
                params: {
                    localizacao: nomeLocal,
                    endereco: enderecoFormatado,
                },
            });
        } catch (error) {
            console.log("Erro ao obter localização real:", error);
            Alert.alert(
                "Localização indisponível",
                "Não foi possível obter sua localização atual. Verifique se o GPS está ativado."
            );
        } finally {
            setObtendoLoc(false);
        }
    };

    // Adiciona o lugar selecionado diretamente à publicação
    const selecionarLugarDireto = (nome, endereco) => {
        setLocalizacaoParaPublicacao({
            nome,
            endereco: endereco || "Localização selecionada",
        });

        router.replace({
            pathname: "/vivai/criar",
            params: {
                localizacao: nome,
                endereco: endereco || "Localização selecionada",
            },
        });
    };

    // Filtra os lugares locais cadastrados
    const lugaresLocaisFiltrados = lugaresIniciais.filter((l) =>
        busca.trim() === ""
            ? true
            : l.nome.toLowerCase().includes(busca.toLowerCase()) ||
              l.localizacao.toLowerCase().includes(busca.toLowerCase())
    );

    const termoBusca = busca.trim();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#171717" }}>
            <ScrollView
                style={SocialLocStyle.container}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                {/* CABEÇALHO */}
                <View style={SocialLocStyle.boxNew}>
                    <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
                        <Image
                            source={require("../../../assets/voltar.png")}
                            style={SocialLocStyle.icon}
                        />
                    </TouchableOpacity>

                    <Text style={SocialLocStyle.text}>Adicionar localização</Text>
                </View>

                {/* BARRA DE PESQUISA DINÂMICA */}
                <View style={SocialLocStyle.barraPesquisa}>
                    <Image
                        source={require("../../../assets/pesquisar.png")}
                        style={SocialLocStyle.iconPesquisa}
                    />

                    <TextInput
                        style={SocialLocStyle.inputPesquisa}
                        placeholder="Buscar cidade, bairro, ponto turístico..."
                        placeholderTextColor="#888"
                        value={busca}
                        onChangeText={setBusca}
                        autoCapitalize="sentences"
                        returnKeyType="search"
                    />

                    {buscandoOnline && (
                        <ActivityIndicator
                            size="small"
                            color="#D97706"
                            style={{ marginRight: 6 }}
                        />
                    )}

                    {busca.length > 0 && (
                        <TouchableOpacity
                            onPress={() => setBusca("")}
                            style={SocialLocStyle.botaoLimparBusca}
                            activeOpacity={0.7}
                        >
                            <Text style={SocialLocStyle.textoLimparBusca}>✕</Text>
                        </TouchableOpacity>
                    )}
                </View>

                {/* OPÇÃO DE USAR O NOME EXATO DIGITADO (Personalizado) */}
                {termoBusca.length > 0 && (
                    <TouchableOpacity
                        style={SocialLocStyle.cardCustomLocation}
                        activeOpacity={0.8}
                        onPress={() => selecionarLugarDireto(termoBusca, "Local personalizado")}
                    >
                        <View style={SocialLocStyle.customLocationIconBox}>
                            <Image
                                source={require("../../../assets/localizacao.png")}
                                style={[SocialLocStyle.iconPesquisa, { tintColor: "#D97706", marginRight: 0 }]}
                            />
                        </View>
                        <View style={SocialLocStyle.customLocationInfo}>
                            <Text style={SocialLocStyle.customLocationTitle} numberOfLines={1}>
                                Usar "{termoBusca}"
                            </Text>
                            <Text style={SocialLocStyle.customLocationSub}>
                                Adicionar como localização personalizada
                            </Text>
                        </View>
                        <View style={SocialLocStyle.botaoAdicionar}>
                            <Text style={SocialLocStyle.botaoAdicionarTexto}>Adicionar</Text>
                        </View>
                    </TouchableOpacity>
                )}

                {/* BOTÃO USAR MINHA LOCALIZAÇÃO REAL VIA GPS */}
                <TouchableOpacity
                    onPress={usarMinhaLocalizacao}
                    activeOpacity={0.8}
                    disabled={obtendoLoc}
                >
                    <View style={SocialLocStyle.barraLoc}>
                        <Image
                            source={require("../../../assets/localizacao.png")}
                            style={[SocialLocStyle.iconPesquisa, { tintColor: "#D97706" }]}
                        />

                        <View style={SocialLocStyle.inputLoc}>
                            <Text style={SocialLocStyle.textM}>
                                {obtendoLoc
                                    ? "Detectando localização real via GPS..."
                                    : "Usar minha localização"}
                            </Text>
                        </View>

                        {obtendoLoc ? (
                            <ActivityIndicator size="small" color="#D97706" />
                        ) : (
                            <Image
                                source={require("../../../assets/avancar.png")}
                                tintColor={"white"}
                            />
                        )}
                    </View>
                </TouchableOpacity>

                {/* RESULTADOS DA PESQUISA ONLINE (Caso o usuário tenha digitado um lugar novo) */}
                {resultadosOnline.length > 0 && (
                    <>
                        <View style={SocialLocStyle.boxT}>
                            <Text style={SocialLocStyle.textP}>Resultados da busca</Text>
                        </View>

                        <View style={SocialLocStyle.listaLocais}>
                            {resultadosOnline.map((item, index) => (
                                <View key={item.id}>
                                    <View style={SocialLocStyle.viewI}>
                                        <View style={SocialLocStyle.iconBoxPin}>
                                            <Image
                                                source={require("../../../assets/localizacao.png")}
                                                style={SocialLocStyle.iconPin}
                                            />
                                        </View>

                                        <TouchableOpacity
                                            style={SocialLocStyle.viewInf}
                                            activeOpacity={0.7}
                                            onPress={() =>
                                                selecionarLugarDireto(item.nome, item.localizacao)
                                            }
                                        >
                                            <Text style={SocialLocStyle.textNome} numberOfLines={1}>
                                                {item.nome}
                                            </Text>
                                            <Text style={SocialLocStyle.textLocal} numberOfLines={1}>
                                                {item.localizacao}
                                            </Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={SocialLocStyle.botaoAdicionar}
                                            activeOpacity={0.8}
                                            onPress={() =>
                                                selecionarLugarDireto(item.nome, item.localizacao)
                                            }
                                        >
                                            <Text style={SocialLocStyle.botaoAdicionarTexto}>
                                                Adicionar
                                            </Text>
                                        </TouchableOpacity>
                                    </View>

                                    {index < resultadosOnline.length - 1 && (
                                        <View style={SocialLocStyle.divisao} />
                                    )}
                                </View>
                            ))}
                        </View>
                    </>
                )}

                {/* LUGARES PRÓXIMOS / CADASTRADOS */}
                <View style={SocialLocStyle.boxT}>
                    <Text style={SocialLocStyle.textP}>
                        {termoBusca ? "Pontos turísticos encontrados" : "Lugares próximos"}
                    </Text>
                </View>

                <View style={SocialLocStyle.listaLocais}>
                    {lugaresLocaisFiltrados.length === 0 && resultadosOnline.length === 0 && termoBusca ? (
                        <View style={SocialLocStyle.emptyBusca}>
                            <Text style={SocialLocStyle.emptyBuscaTexto}>
                                Nenhum ponto turístico encontrado com esse nome.{"\n"}Você pode usar a opção acima para adicionar "{termoBusca}".
                            </Text>
                        </View>
                    ) : (
                        lugaresLocaisFiltrados.map((item, index) => {
                            const imgSource = getFotoLugar(item.imagem);

                            return (
                                <View key={item.id}>
                                    <TouchableOpacity
                                        style={SocialLocStyle.viewI}
                                        activeOpacity={0.7}
                                        onPress={() =>
                                            router.push({
                                                pathname: "/vivai/detalhe",
                                                params: { id: item.id, origem: "criar" },
                                            })
                                        }
                                    >
                                        <Image source={imgSource} style={SocialLocStyle.imgAlta} />

                                        <View style={SocialLocStyle.viewInf}>
                                            <Text style={SocialLocStyle.textNome}>{item.nome}</Text>
                                            <Text style={SocialLocStyle.textLocal}>
                                                {item.localizacao}
                                            </Text>
                                        </View>

                                        <Text style={SocialLocStyle.textDistancia}>
                                            {item.distancia || "2,3 km"}
                                        </Text>

                                        <TouchableOpacity
                                            style={SocialLocStyle.botaoAdicionar}
                                            activeOpacity={0.8}
                                            onPress={() =>
                                                selecionarLugarDireto(
                                                    item.nome,
                                                    item.cidade || item.localizacao || "São Paulo, SP"
                                                )
                                            }
                                        >
                                            <Text style={SocialLocStyle.botaoAdicionarTexto}>
                                                Adicionar
                                            </Text>
                                        </TouchableOpacity>
                                    </TouchableOpacity>

                                    {index < lugaresLocaisFiltrados.length - 1 && (
                                        <View style={SocialLocStyle.divisao} />
                                    )}
                                </View>
                            );
                        })
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SocialLoc;