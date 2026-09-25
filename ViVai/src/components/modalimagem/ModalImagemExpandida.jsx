import React, { useState, useEffect } from "react";
import {
    Modal,
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    StyleSheet,
    StatusBar,
    SafeAreaView,
} from "react-native";
import { abrirNoMaps } from "../../services/mapsService";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

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

export const ModalImagemExpandida = ({
    visivel,
    imagens = [],
    indexInicial = 0,
    publicacao = null,
    onClose,
    onCurtir,
    onSalvar,
    onComentar,
}) => {
    const [indexAtivo, setIndexAtivo] = useState(indexInicial);

    useEffect(() => {
        if (visivel) {
            setIndexAtivo(indexInicial || 0);
        }
    }, [visivel, indexInicial]);

    if (!visivel) return null;

    const listaImagens = Array.isArray(imagens)
        ? imagens.filter((img) => typeof img === "string" && img.trim().length > 0)
        : typeof imagens === "string" && imagens.trim().length > 0
        ? [imagens.trim()]
        : [];

    const handleScroll = (event) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(contentOffsetX / SCREEN_WIDTH);
        if (index !== indexAtivo && index >= 0 && index < listaImagens.length) {
            setIndexAtivo(index);
        }
    };

    const fotoAutor = publicacao?.usuarioFoto?.startsWith?.("http") ||
        publicacao?.usuarioFoto?.startsWith?.("file:") ||
        publicacao?.usuarioFoto?.startsWith?.("blob:")
        ? { uri: publicacao.usuarioFoto }
        : fotosPerfil[publicacao?.usuarioFoto] || fotosPerfil["pessoa.jpeg"];

    return (
        <Modal
            visible={visivel}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
            statusBarTranslucent={true}
        >
            <StatusBar barStyle="light-content" backgroundColor="#050505" />
            <SafeAreaView style={styles.overlay}>
                {/* TOPO: Informações do Autor e Botão Fechar */}
                <View style={styles.header}>
                    <View style={styles.authorBox}>
                        <Image source={fotoAutor} style={styles.authorAvatar} />
                        <View style={styles.authorText}>
                            <Text style={styles.authorName} numberOfLines={1}>
                                {publicacao?.usuario || "ViVai"}
                            </Text>
                            <View style={styles.metaRow}>
                                <Text style={styles.authorTime}>
                                    {publicacao?.tempo || "Agora"}
                                </Text>
                                {publicacao?.localizacao ? (
                                    <TouchableOpacity
                                        activeOpacity={0.7}
                                        onPress={() => abrirNoMaps(publicacao)}
                                        style={styles.headerLocPill}
                                    >
                                        <Image
                                            source={require("../../../assets/localizacao.png")}
                                            style={styles.headerLocIcon}
                                        />
                                        <Text
                                            style={styles.headerLocText}
                                            numberOfLines={1}
                                        >
                                            {publicacao.localizacao}
                                        </Text>
                                    </TouchableOpacity>
                                ) : null}
                            </View>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={styles.closeBtn}
                        onPress={onClose}
                        activeOpacity={0.8}
                        hitSlop={12}
                    >
                        <Text style={styles.closeBtnText}>✕</Text>
                    </TouchableOpacity>
                </View>

                {/* CENTRO: Imagem em Alta Resolução ou Galeria Deslizável */}
                <View style={styles.centerContainer}>
                    {listaImagens.length <= 1 ? (
                        <View style={styles.singleImageContainer}>
                            <Image
                                source={{ uri: listaImagens[0] }}
                                style={styles.fullImage}
                                resizeMode="contain"
                            />
                        </View>
                    ) : (
                        <View style={styles.carouselContainer}>
                            <ScrollView
                                horizontal
                                pagingEnabled
                                showsHorizontalScrollIndicator={false}
                                onScroll={handleScroll}
                                scrollEventThrottle={16}
                                style={{ width: SCREEN_WIDTH }}
                            >
                                {listaImagens.map((imgUri, idx) => (
                                    <View key={idx} style={styles.carouselSlide}>
                                        <Image
                                            source={{ uri: imgUri }}
                                            style={styles.fullImage}
                                            resizeMode="contain"
                                        />
                                    </View>
                                ))}
                            </ScrollView>

                            {/* Contador de Imagens Flutuante */}
                            <View style={styles.counterBadge}>
                                <Text style={styles.counterText}>
                                    {indexAtivo + 1} / {listaImagens.length}
                                </Text>
                            </View>

                            {/* Indicadores de bolinhas */}
                            <View style={styles.dotsContainer}>
                                {listaImagens.map((_, dotIdx) => (
                                    <View
                                        key={dotIdx}
                                        style={[
                                            styles.dot,
                                            dotIdx === indexAtivo && styles.dotAtivo,
                                        ]}
                                    />
                                ))}
                            </View>
                        </View>
                    )}
                </View>

                {/* RODAPÉ: Descrição e Ações Rápidas */}
                <View style={styles.footer}>
                    {publicacao?.descricao ? (
                        <View style={styles.descBox}>
                            <Text style={styles.descText} numberOfLines={3}>
                                <Text style={styles.descAuthor}>
                                    {publicacao?.usuario}{" "}
                                </Text>
                                {publicacao.descricao}
                            </Text>
                        </View>
                    ) : null}

                    {/* Botões de Ação na Imagem Expandida */}
                    <View style={styles.actionsRow}>
                        <TouchableOpacity
                            style={styles.actionBtn}
                            onPress={() => onCurtir && onCurtir(publicacao?.id)}
                            activeOpacity={0.7}
                        >
                            <Image
                                source={require("../../../assets/coracao.png")}
                                style={[
                                    styles.actionIcon,
                                    publicacao?.curtido && { tintColor: "#EF4444" },
                                ]}
                            />
                            <Text style={styles.actionText}>
                                {publicacao?.curtidas || 0}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.actionBtn}
                            onPress={() => {
                                onClose();
                                if (onComentar) onComentar(publicacao?.id);
                            }}
                            activeOpacity={0.7}
                        >
                            <Image
                                source={require("../../../assets/comentario.png")}
                                style={styles.actionIcon}
                            />
                            <Text style={styles.actionText}>
                                {publicacao?.comentarios || 0}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.actionBtn}
                            onPress={() => onSalvar && onSalvar(publicacao?.id)}
                            activeOpacity={0.7}
                        >
                            <Image
                                source={require("../../../assets/salvar.png")}
                                style={[
                                    styles.actionIcon,
                                    publicacao?.salvo && { tintColor: "#FFD000" },
                                ]}
                            />
                        </TouchableOpacity>

                        <View style={{ flex: 1 }} />

                        {publicacao?.localizacao ? (
                            <TouchableOpacity
                                style={styles.mapsBtn}
                                activeOpacity={0.8}
                                onPress={() => abrirNoMaps(publicacao)}
                            >
                                <Image
                                    source={require("../../../assets/localizacao.png")}
                                    style={styles.mapsBtnIcon}
                                />
                                <Text style={styles.mapsBtnText}>Abrir no Maps</Text>
                            </TouchableOpacity>
                        ) : null}
                    </View>
                </View>
            </SafeAreaView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(8, 8, 8, 0.97)",
        justifyContent: "space-between",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingTop: 45,
        paddingBottom: 12,
        backgroundColor: "rgba(10, 10, 10, 0.85)",
        borderBottomWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.08)",
        zIndex: 10,
    },
    authorBox: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        marginRight: 10,
    },
    authorAvatar: {
        width: 42,
        height: 42,
        borderRadius: 21,
        borderWidth: 2,
        borderColor: "#D97706",
    },
    authorText: {
        marginLeft: 10,
        flex: 1,
    },
    authorName: {
        color: "#FFFFFF",
        fontSize: 15,
        fontWeight: "bold",
    },
    metaRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 2,
    },
    authorTime: {
        color: "#9CA3AF",
        fontSize: 12,
    },
    headerLocPill: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 8,
        backgroundColor: "rgba(217, 119, 6, 0.15)",
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 12,
        borderWidth: 0.8,
        borderColor: "rgba(217, 119, 6, 0.4)",
        maxWidth: 160,
    },
    headerLocIcon: {
        width: 11,
        height: 11,
        tintColor: "#D97706",
        marginRight: 4,
        resizeMode: "contain",
    },
    headerLocText: {
        color: "#D97706",
        fontSize: 11,
        fontWeight: "600",
    },
    closeBtn: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: "rgba(255, 255, 255, 0.12)",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.2)",
    },
    closeBtnText: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "bold",
        lineHeight: 20,
    },
    centerContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    singleImageContainer: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT * 0.62,
        justifyContent: "center",
        alignItems: "center",
    },
    carouselContainer: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT * 0.62,
        justifyContent: "center",
        alignItems: "center",
    },
    carouselSlide: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT * 0.62,
        justifyContent: "center",
        alignItems: "center",
    },
    fullImage: {
        width: "100%",
        height: "100%",
    },
    counterBadge: {
        position: "absolute",
        top: 14,
        right: 18,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.2)",
    },
    counterText: {
        color: "#FFFFFF",
        fontSize: 12,
        fontWeight: "600",
    },
    dotsContainer: {
        position: "absolute",
        bottom: 12,
        flexDirection: "row",
        alignSelf: "center",
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: "rgba(255, 255, 255, 0.35)",
        marginHorizontal: 3,
    },
    dotAtivo: {
        backgroundColor: "#D97706",
        width: 16,
    },
    footer: {
        backgroundColor: "rgba(12, 12, 12, 0.92)",
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 24,
        borderTopWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.08)",
    },
    descBox: {
        marginBottom: 12,
    },
    descText: {
        color: "#E5E7EB",
        fontSize: 14,
        lineHeight: 20,
    },
    descAuthor: {
        color: "#FFFFFF",
        fontWeight: "bold",
    },
    actionsRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    actionBtn: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 24,
    },
    actionIcon: {
        width: 24,
        height: 24,
        tintColor: "#FFFFFF",
        resizeMode: "contain",
    },
    actionText: {
        color: "#FFFFFF",
        marginLeft: 8,
        fontSize: 14,
        fontWeight: "500",
    },
    mapsBtn: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#D97706",
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
        shadowColor: "#D97706",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 4,
    },
    mapsBtnIcon: {
        width: 14,
        height: 14,
        tintColor: "#FFFFFF",
        marginRight: 6,
        resizeMode: "contain",
    },
    mapsBtnText: {
        color: "#FFFFFF",
        fontSize: 13,
        fontWeight: "bold",
    },
});
