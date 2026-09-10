import {
    Image,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

import { SocialFormStyle } from "./SocialFormStyle";

import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export const SocialForm = () => {

    const router = useRouter()

    return (
        <SafeAreaView style={{ flex: 1 }}>

            <ScrollView
                style={SocialFormStyle.container}
                contentContainerStyle={SocialFormStyle.contentContainer}
            >

                <View>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Image
                            source={require("../../../assets/voltar.png")}
                            style={SocialFormStyle.img}
                        />
                    </TouchableOpacity>

                    <View style={SocialFormStyle.boxText}>

                        <Text style={SocialFormStyle.text}>
                            Bem-vindo(a) de volta! 👋
                        </Text>

                        <Text style={SocialFormStyle.textMini}>
                            Entre para continuar
                        </Text>

                    </View>



                    <View style={SocialFormStyle.boxInfo}>

                        <Text style={SocialFormStyle.textInfo}>
                            E-mail ou nome de usuário
                        </Text>

                        <View style={SocialFormStyle.boxEmail}>

                            <TextInput
                                style={SocialFormStyle.textEmail}
                                placeholder="exemplo@gmail.com"
                                placeholderTextColor="#8A8A8A"
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />

                        </View>

                    </View>



                    <View style={SocialFormStyle.boxInfo}>

                        <Text style={SocialFormStyle.textInfo}>
                            Senha
                        </Text>

                        <View style={SocialFormStyle.boxEmail}>

                            <TextInput
                                style={SocialFormStyle.textEmail}
                                placeholder="Digite sua senha"
                                placeholderTextColor="#8A8A8A"
                                secureTextEntry={true}
                            />

                            <TouchableOpacity
                                style={SocialFormStyle.eyeButton}
                            >
                                <Image
                                    source={require("../../../assets/exibir.png")}
                                    style={SocialFormStyle.exibir}
                                />
                            </TouchableOpacity>

                        </View>

                    </View>



                    <TouchableOpacity>

                        <View style={SocialFormStyle.boxInfo}>

                            <Text style={SocialFormStyle.textEsqueceu}>
                                Esqueceu sua senha?
                            </Text>

                        </View>

                    </TouchableOpacity>



                    <View style={SocialFormStyle.bottomContainer}>

                        <TouchableOpacity
                            style={SocialFormStyle.buttonStart}
                            onPress={() => router.push("/vivai/inicio")}
                        >
                            <Text style={SocialFormStyle.buttonStartText}>
                                Entrar
                            </Text>
                        </TouchableOpacity>

                    </View>



                    <View style={SocialFormStyle.orContainer}>

                        <View style={SocialFormStyle.orLine} />

                        <Text style={SocialFormStyle.orText}>
                            ou
                        </Text>

                        <View style={SocialFormStyle.orLine} />

                    </View>



                    <View style={SocialFormStyle.bottomContainerG}>

                        <TouchableOpacity
                            style={SocialFormStyle.buttonG}
                        >

                            <Image
                                source={require("../../../assets/google.png")}
                                style={SocialFormStyle.googleImg}
                            />

                            <Text style={SocialFormStyle.buttonStartText}>
                                Entrar com Google
                            </Text>

                        </TouchableOpacity>

                    </View>



                    <View style={SocialFormStyle.boxContainer}>

                        <Text style={SocialFormStyle.textN}>
                            Não tem uma conta?
                        </Text>

                        <TouchableOpacity
                            onPress={() => router.push("/vivai/cadastro")}
                        >
                            <Text style={SocialFormStyle.textC}>
                                Criar Conta
                            </Text>
                        </TouchableOpacity>

                    </View>

                </View> 

            </ScrollView>

        </SafeAreaView>
    );
};