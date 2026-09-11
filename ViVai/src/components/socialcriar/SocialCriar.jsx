import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native"
import { BottomNav } from "../bottomnav/BottomNav"
import { SocialCriarStyle } from "./SocialCriarStyle"
import { useRouter } from "expo-router"


export const SocialCriar = () => {

    const router = useRouter()

    return (
        <ScrollView style={SocialCriarStyle.container}>
            <View style={SocialCriarStyle.boxNew}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Image
                        source={require("../../../assets/voltar.png")}
                        style={SocialCriarStyle.icon}
                    />
                </TouchableOpacity>

                <Text style={SocialCriarStyle.text}> Nova Publicação </Text>
            </View>

            <View style={SocialCriarStyle.boxImg}>
                <View style={SocialCriarStyle.boxImage}>
                    <Image
                        source={require("../../../assets/montanha.avif")}
                        style={SocialCriarStyle.img}
                    />
                </View>

                <View style={SocialCriarStyle.boxImage}>
                    <Image
                        source={require("../../../assets/montanha.avif")}
                        style={SocialCriarStyle.img}
                    />
                </View>

                <View style={SocialCriarStyle.boxImage}>
                    <Text style={SocialCriarStyle.textM}> + </Text>
                </View>
            </View>

            <View style={SocialCriarStyle.boxP}>

                <TextInput
                    style={SocialCriarStyle.inputP}
                    placeholder="O que você está pensando?"
                    placeholderTextColor="#888"
                    maxLength={500}
                    multiline
                />

                <Text style={SocialCriarStyle.textN}>
                    0/500
                </Text>

            </View>

            <View>
                <Image
                    source={require("../../../assets/localizacao.png")}
                />
            </View>
        </ScrollView>
        // <BottomNav/>
    )
}