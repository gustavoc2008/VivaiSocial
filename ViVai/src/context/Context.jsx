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

    return (
        <AuthContext.Provider
            value={{
                usuarioLogado,
                login,
                logout,
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