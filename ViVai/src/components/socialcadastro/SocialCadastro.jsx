import { Image, Text, TouchableOpacity, View } from "react-native"
import { SocialCadastroStyle } from "./SocialCadastroStyle"
import { ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useRouter } from "expo-router"
import { TextInput } from "react-native"
import { useState } from "react"
import axios from "axios"


export const SocialCadastro = () => {

    const router = useRouter()

    const [nome, setNome] = useState("")
    const [usuario, setUsuario] = useState("")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [foto, setFoto] = useState("")
    const [mostrarSenha, setMostrarSenha] = useState(false)


    const fazerCadastro = async () => {
        if (
            nome == "" ||
            usuario == "" ||
            email == "" ||
            senha == ""
        ) {
            alert(
                "Preencha todos os campos!"
            )

            return
        }


        try {
            await axios.post("http://localhost:3000/usuarios",
                {
                    nome: nome,
                    usuario: usuario,
                    email: email,
                    senha: senha
                }
            )

            alert(
                "Conta criado com sucesso!"
            )

            router.push("/vivai/login")

        } catch (error) {
            console.log("Erro ao criar a conta", error);
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView
                style={SocialCadastroStyle.container}
                contentContainerStyle={SocialCadastroStyle.contentContainer}
            >
                <TouchableOpacity onPress={() => router.back()}>
                    <Image
                        source={require("../../../assets/voltar.png")}
                        style={SocialCadastroStyle.img}
                    />
                </TouchableOpacity>

                <View style={SocialCadastroStyle.boxText}>

                    <Text style={SocialCadastroStyle.text}>
                        Criar sua Conta
                    </Text>

                    <Text style={SocialCadastroStyle.textMini}>
                        É rápido e fácil.
                    </Text>

                </View>

                <View style={SocialCadastroStyle.boxCamera}>
                    <Image
                        source={require("../../../assets/camera.png")}
                        style={SocialCadastroStyle.camera}
                    />
                </View>

                <Text style={SocialCadastroStyle.textEsqueceu}> Adicionar foto </Text>

                <View style={SocialCadastroStyle.boxInfo}>

                    <Text style={SocialCadastroStyle.textInfo}>
                        Nome Completo
                    </Text>

                    <View style={SocialCadastroStyle.boxEmail}>

                        <TextInput
                            style={SocialCadastroStyle.textEmail}
                            placeholder="Digite seu nome"
                            placeholderTextColor="#8A8A8A"
                            value={nome}
                            onChangeText={setNome}
                        />

                    </View>

                </View>


                <View style={SocialCadastroStyle.boxInfo}>

                    <Text style={SocialCadastroStyle.textInfo}>
                        Nome de usuário
                    </Text>

                    <View style={SocialCadastroStyle.boxEmail}>

                        <TextInput
                            style={SocialCadastroStyle.textEmail}
                            placeholder="Digite seu nome de usuário"
                            placeholderTextColor="#8A8A8A"
                            value={usuario}
                            onChangeText={setUsuario}
                        />

                    </View>

                </View>


                <View style={SocialCadastroStyle.boxInfo}>

                    <Text style={SocialCadastroStyle.textInfo}>
                        E-mail
                    </Text>

                    <View style={SocialCadastroStyle.boxEmail}>

                        <TextInput
                            style={SocialCadastroStyle.textEmail}
                            placeholder="Digite seu e-mail"
                            placeholderTextColor="#8A8A8A"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={email}
                            onChangeText={setEmail}
                        />

                    </View>

                </View>


                <View style={SocialCadastroStyle.boxInfo}>

                    <Text style={SocialCadastroStyle.textInfo}>
                        Senha
                    </Text>

                    <View style={SocialCadastroStyle.boxEmail}>

                        <TextInput
                            style={SocialCadastroStyle.textEmail}
                            placeholder="Crie sua senha"
                            placeholderTextColor="#8A8A8A"
                            secureTextEntry={!mostrarSenha}
                            value={senha}
                            onChangeText={setSenha}
                        />

                        <TouchableOpacity
                            style={SocialCadastroStyle.eyeButton}
                            onPress={() => setMostrarSenha(!mostrarSenha)}
                        >
                            <Image
                                source={require("../../../assets/exibir.png")}
                                style={SocialCadastroStyle.exibir}
                            />
                        </TouchableOpacity>

                    </View>

                </View>


                <View style={SocialCadastroStyle.bottomContainer}>

                    <TouchableOpacity
                        style={SocialCadastroStyle.buttonStart}
                        onPress={fazerCadastro}
                    >
                        <Text style={SocialCadastroStyle.buttonStartText}>
                            Criar conta
                        </Text>
                    </TouchableOpacity>

                </View>


                <View style={SocialCadastroStyle.boxContainer}>

                    <Text style={SocialCadastroStyle.textN}>
                        Já possui uma conta?
                    </Text>

                    <TouchableOpacity
                        onPress={() => router.push("/vivai/login")}
                    >
                        <Text style={SocialCadastroStyle.textC}>
                            Entrar
                        </Text>
                    </TouchableOpacity>

                </View>

            </ScrollView>
        </SafeAreaView>
    )
}