import React, { useState, useMemo } from "react";
import {
    View,
    Image,
    ScrollView,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from "react-native";

export const CarrosselImagens = ({ imagens, onPress }) => {
    const [indexAtivo, setIndexAtivo] = useState(0);
    const screenWidth = Dimensions.get("window").width;
    // Largura estimada inicial (94% da tela - 20px de padding interno do card)
    const [largura, setLargura] = useState(screenWidth * 0.94 - 20);

    const listaImagens = useMemo(() => {
        if (!imagens) return [];
        if (Array.isArray(imagens)) {
            return imagens.filter(
                (img) => typeof img === "string" && img.trim().length > 0
            );
        }
        if (typeof imagens === "string" && imagens.trim().length > 0) {
            return [imagens.trim()];
        }
        return [];
    }, [imagens]);

    if (listaImagens.length === 0) return null;

    const altura = largura / 1.5;

    const handleScroll = (event) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        if (largura > 0) {
            const index = Math.round(contentOffsetX / largura);
            if (index !== indexAtivo && index >= 0 && index < listaImagens.length) {
                setIndexAtivo(index);
            }
        }
    };

    const getSource = (item) => {
        if (typeof item === "number") {
            return item;
        }
        if (typeof item === "string") {
            return { uri: item };
        }
        if (item && item.uri) {
            return item;
        }
        return null;
    };

    if (listaImagens.length === 1) {
        const source = getSource(listaImagens[0]);
        if (!source) return null;

        return (
            <View
                style={styles.container}
                onLayout={(e) => {
                    const width = e.nativeEvent.layout.width;
                    if (width > 0 && Math.abs(width - largura) > 1) {
                        setLargura(width);
                    }
                }}
            >
                <TouchableOpacity
                    activeOpacity={onPress ? 0.9 : 1}
                    onPress={() => onPress && onPress(0)}
                    disabled={!onPress}
                >
                    <Image
                        source={source}
                        style={[styles.imagem, { width: largura, height: altura }]}
                    />
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View
            style={styles.container}
            onLayout={(e) => {
                const width = e.nativeEvent.layout.width;
                if (width > 0 && Math.abs(width - largura) > 1) {
                    setLargura(width);
                }
            }}
        >
            <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                nestedScrollEnabled
                directionalLockEnabled
                onScroll={handleScroll}
                scrollEventThrottle={16}
                style={{ width: largura, height: altura }}
            >
                {listaImagens.map((item, index) => {
                    const source = getSource(item);
                    if (!source) return null;
                    return (
                        <TouchableOpacity
                            key={index}
                            activeOpacity={onPress ? 0.9 : 1}
                            onPress={() => onPress && onPress(index)}
                            disabled={!onPress}
                            style={{ width: largura, height: altura }}
                        >
                            <Image
                                source={source}
                                style={[styles.imagem, { width: largura, height: altura }]}
                            />
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>

            {/* Contador de fotos estilo Instagram (ex: 1/3) */}
            <View style={styles.badgeContador}>
                <Text style={styles.textoContador}>
                    {indexAtivo + 1}/{listaImagens.length}
                </Text>
            </View>

            {/* Bolinhas de navegação (dots) */}
            <View style={styles.containerDots} pointerEvents="none">
                {listaImagens.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.dot,
                            index === indexAtivo ? styles.dotAtivo : styles.dotInativo,
                        ]}
                    />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        marginTop: 10,
        borderRadius: 15,
        overflow: "hidden",
        position: "relative",
    },
    imagem: {
        borderRadius: 15,
        resizeMode: "cover",
    },
    badgeContador: {
        position: "absolute",
        top: 10,
        right: 10,
        backgroundColor: "rgba(0, 0, 0, 0.65)",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    textoContador: {
        color: "#FFFFFF",
        fontSize: 12,
        fontWeight: "600",
    },
    containerDots: {
        position: "absolute",
        bottom: 10,
        left: 0,
        right: 0,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    dot: {
        marginHorizontal: 3,
        borderRadius: 4,
    },
    dotAtivo: {
        width: 8,
        height: 8,
        backgroundColor: "#D97706",
    },
    dotInativo: {
        width: 6,
        height: 6,
        backgroundColor: "rgba(255, 255, 255, 0.5)",
    },
});
