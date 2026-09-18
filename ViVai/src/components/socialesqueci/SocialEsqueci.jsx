import {
    Image,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useState } from "react";
import axios from "axios";

import { SocialEsqueciStyle } from "./SocialEsqueciStyle";

export const SocialEsqueci = () => {

    const router = useRouter();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");

    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);


    const redefinirSenha = async () => {

        // Verifica se os campos estão preenchidos
        if (
            email.trim() == "" ||
            senha.trim() == "" ||
            confirmarSenha.trim() == ""
        ) {
            alert("Preencha todos os campos.");
            return;
        }


        // Verifica se as senhas são iguais
        if (senha != confirmarSenha) {
            alert("As senhas não coincidem.");
            return;
        }


        try {

            // Busca os usuários
            const resposta = await axios.get(
                "http://localhost:3000/usuarios"
            );


            // Procura o usuário pelo e-mail
            const usuario = resposta.data.find(
                (item) => item.email == email
            );


            // Se não encontrar
            if (!usuario) {

                alert("Não encontramos uma conta com esse e-mail.");

                return;
            }


            // Atualiza a senha no json-server
            await axios.patch(
                `http://localhost:3000/usuarios/${usuario.id}`,
                {
                    senha: senha
                }
            );


            // Mensagem de sucesso
            alert("Senha alterada com sucesso!");


            // Volta para o login
            router.push("/vivai/login");


        } catch (error) {

            console.log(
                "Erro ao redefinir senha:",
                error
            );

            alert(
                "Não foi possível alterar a senha."
            );
        }
    };


    return (

        <SafeAreaView style={{ flex: 1 }}>

            <ScrollView
                style={SocialEsqueciStyle.container}
                contentContainerStyle={
                    SocialEsqueciStyle.contentContainer
                }
            >

                {/* BOTÃO VOLTAR */}

                <TouchableOpacity
                    onPress={() => router.back()}
                >

                    <Image
                        source={require("../../../assets/voltar.png")}
                        style={SocialEsqueciStyle.img}
                    />

                </TouchableOpacity>


                {/* TÍTULO */}

                <View style={SocialEsqueciStyle.boxText}>

                    <Text style={SocialEsqueciStyle.text}>
                        Esqueceu sua senha?
                    </Text>

                    <Text style={SocialEsqueciStyle.textMini}>
                        Crie uma nova senha para sua conta.
                    </Text>

                </View>


                {/* E-MAIL */}

                <View style={SocialEsqueciStyle.boxInfo}>

                    <Text style={SocialEsqueciStyle.textInfo}>
                        E-mail
                    </Text>

                    <View style={SocialEsqueciStyle.boxEmail}>

                        <TextInput
                            style={SocialEsqueciStyle.textEmail}
                            placeholder="Digite seu e-mail"
                            placeholderTextColor="#8A8A8A"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            value={email}
                            onChangeText={setEmail}
                        />

                    </View>

                </View>


                {/* NOVA SENHA */}

                <View style={SocialEsqueciStyle.boxInfo}>

                    <Text style={SocialEsqueciStyle.textInfo}>
                        Nova senha
                    </Text>

                    <View style={SocialEsqueciStyle.boxEmail}>

                        <TextInput
                            style={SocialEsqueciStyle.textEmail}
                            placeholder="Digite sua nova senha"
                            placeholderTextColor="#8A8A8A"
                            secureTextEntry={!mostrarSenha}
                            value={senha}
                            onChangeText={setSenha}
                        />

                        <TouchableOpacity
                            style={SocialEsqueciStyle.eyeButton}
                            onPress={() =>
                                setMostrarSenha(!mostrarSenha)
                            }
                        >

                            <Image
                                source={require("../../../assets/exibir.png")}
                                style={SocialEsqueciStyle.exibir}
                            />

                        </TouchableOpacity>

                    </View>

                </View>


                {/* CONFIRMAR SENHA */}

                <View style={SocialEsqueciStyle.boxInfo}>

                    <Text style={SocialEsqueciStyle.textInfo}>
                        Confirme sua senha
                    </Text>

                    <View style={SocialEsqueciStyle.boxEmail}>

                        <TextInput
                            style={SocialEsqueciStyle.textEmail}
                            placeholder="Confirme sua senha"
                            placeholderTextColor="#8A8A8A"
                            secureTextEntry={!mostrarConfirmarSenha}
                            value={confirmarSenha}
                            onChangeText={setConfirmarSenha}
                        />

                        <TouchableOpacity
                            style={SocialEsqueciStyle.eyeButton}
                            onPress={() =>
                                setMostrarConfirmarSenha(
                                    !mostrarConfirmarSenha
                                )
                            }
                        >

                            <Image
                                source={require("../../../assets/exibir.png")}
                                style={SocialEsqueciStyle.exibir}
                            />

                        </TouchableOpacity>

                    </View>

                </View>


                {/* BOTÃO */}

                <View style={SocialEsqueciStyle.bottomContainer}>

                    <TouchableOpacity
                        style={SocialEsqueciStyle.buttonStart}
                        onPress={redefinirSenha}
                    >

                        <Text
                            style={SocialEsqueciStyle.buttonStartText}
                        >
                            Alterar senha
                        </Text>

                    </TouchableOpacity>

                </View>


                {/* VOLTAR PARA LOGIN */}

                <View style={SocialEsqueciStyle.boxContainer}>

                    <Text style={SocialEsqueciStyle.textN}>
                        Lembrou sua senha?
                    </Text>

                    <TouchableOpacity
                        onPress={() =>
                            router.push("/vivai/login")
                        }
                    >

                        <Text style={SocialEsqueciStyle.textC}>
                            Entrar
                        </Text>

                    </TouchableOpacity>

                </View>

            </ScrollView>

        </SafeAreaView>
    );
};