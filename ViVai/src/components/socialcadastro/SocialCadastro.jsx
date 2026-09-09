import { Image, Text, TouchableOpacity, View } from "react-native"
import { SocialCadastroStyle } from "./SocialCadastroStyle"
import { ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useRouter } from "expo-router"


export const SocialCadastro = () => {

    const router = useRouter()

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView
                style={SocialCadastroStyle.container}
                contentContainerStyle={SocialCadastroStyle.contentContainer}
            >
                <View>
                    <TouchableOpacity onPress={() => router.push("/vivai/login")}>
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
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}