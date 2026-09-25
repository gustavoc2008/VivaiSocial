import React, { useEffect, useRef } from "react";
import {
    Animated,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
} from "react-native";
import { useRouter } from "expo-router";

export const ToastNotificacao = ({
    visivel,
    mensagem = "Publicação salva com sucesso!",
    submensagem = "Disponível na sua aba de salvos",
    tipo = "sucesso", // 'sucesso' | 'info'
    onClose,
    mostrarBotaoVer = true,
}) => {
    const router = useRouter();
    const translateY = useRef(new Animated.Value(-100)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (visivel) {
            Animated.parallel([
                Animated.spring(translateY, {
                    toValue: 0,
                    tension: 70,
                    friction: 9,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 250,
                    useNativeDriver: true,
                }),
            ]).start();

            const timer = setTimeout(() => {
                fechar();
            }, 3500);

            return () => clearTimeout(timer);
        } else {
            fechar();
        }
    }, [visivel]);

    const fechar = () => {
        Animated.parallel([
            Animated.timing(translateY, {
                toValue: -100,
                duration: 250,
                useNativeDriver: true,
            }),
            Animated.timing(opacity, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start(() => {
            if (onClose) onClose();
        });
    };

    if (!visivel) return null;

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    transform: [{ translateY }],
                    opacity,
                },
            ]}
        >
            <View style={styles.card}>
                <View style={styles.iconContainer}>
                    <Image
                        source={require("../../../assets/salvar.png")}
                        style={styles.icon}
                    />
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.titulo}>{mensagem}</Text>
                    {submensagem ? (
                        <Text style={styles.subtitulo}>{submensagem}</Text>
                    ) : null}
                </View>

                {mostrarBotaoVer && (
                    <TouchableOpacity
                        style={styles.botaoVer}
                        activeOpacity={0.8}
                        onPress={() => {
                            fechar();
                            router.push("/vivai/salvas");
                        }}
                    >
                        <Text style={styles.botaoVerTexto}>Ver</Text>
                    </TouchableOpacity>
                )}

                <TouchableOpacity
                    style={styles.botaoFechar}
                    hitSlop={10}
                    onPress={fechar}
                >
                    <Text style={styles.textoFechar}>✕</Text>
                </TouchableOpacity>
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 50,
        left: 16,
        right: 16,
        zIndex: 9999,
        elevation: 9999,
        alignItems: "center",
    },
    card: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#1F1F1F",
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "rgba(217, 119, 6, 0.4)",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 10,
        width: "100%",
    },
    iconContainer: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: "rgba(217, 119, 6, 0.2)",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
        borderWidth: 1,
        borderColor: "#D97706",
    },
    icon: {
        width: 18,
        height: 18,
        tintColor: "#FFD000",
        resizeMode: "contain",
    },
    textContainer: {
        flex: 1,
        justifyContent: "center",
    },
    titulo: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "600",
    },
    subtitulo: {
        color: "#9CA3AF",
        fontSize: 12,
        marginTop: 2,
    },
    botaoVer: {
        backgroundColor: "#D97706",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        marginLeft: 8,
    },
    botaoVerTexto: {
        color: "#FFFFFF",
        fontSize: 12,
        fontWeight: "bold",
    },
    botaoFechar: {
        marginLeft: 10,
        padding: 4,
    },
    textoFechar: {
        color: "#9CA3AF",
        fontSize: 14,
    },
});
