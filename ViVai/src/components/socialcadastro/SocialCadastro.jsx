import { Image, Text, View } from "react-native"
import { SocialCadastroStyle } from "./SocialCadastroStyle"
import { ScrollView } from "react-native"


export const SocialCadastro = () => {
    return (
        <ScrollView
            style={SocialCadastroStyle.container}
            contentContainerStyle={SocialCadastroStyle.contentContainer}
        >
            <View>
                <Image
                    source={require("../../../assets/voltar.png")}
                    style={SocialCadastroStyle.img}
                />

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
    )
}