import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [usuarioLogado, setUsuarioLogado] = useState(null);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {

        const verificarLogin = async () => {

            try {

                const usuarioSalvo =
                    await AsyncStorage.getItem("usuarioLogado");

                if (usuarioSalvo) {
                    setUsuarioLogado(JSON.parse(usuarioSalvo));
                }

            } catch (error) {

                console.log("Erro ao recuperar login:", error);

            } finally {

                setCarregando(false);

            }
        };

        verificarLogin();

    }, []);

    const login = async (usuario) => {

        try {

            setUsuarioLogado(usuario);

            await AsyncStorage.setItem(
                "usuarioLogado",
                JSON.stringify(usuario)
            );

        } catch (error) {

            console.log("Erro ao salvar login:", error);

        }
    };

    const logout = async () => {

        try {

            setUsuarioLogado(null);

            await AsyncStorage.removeItem("usuarioLogado");

        } catch (error) {

            console.log("Erro ao sair da conta:", error);

        }
    };

    const atualizarUsuario = async (dadosAtualizados) => {
        try {
            const usuarioBase = usuarioLogado || {};
            const novoUsuario = { ...usuarioBase, ...dadosAtualizados };
            setUsuarioLogado(novoUsuario);
            await AsyncStorage.setItem(
                "usuarioLogado",
                JSON.stringify(novoUsuario)
            );
            return novoUsuario;
        } catch (error) {
            console.log("Erro ao atualizar dados do usuário:", error);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                usuarioLogado,
                login,
                logout,
                atualizarUsuario,
                carregando
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};