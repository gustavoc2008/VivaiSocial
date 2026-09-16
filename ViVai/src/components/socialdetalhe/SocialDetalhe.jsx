import { Image, ScrollView, Text, TouchableOpacity } from "react-native"
import { SocialDetalheStyle } from "./SocialDetalheStyle"
import { View } from "react-native-web"
import { useRouter } from "expo-router"


export const SocialDetalhe = () => {

    const router = useRouter()

    return (
        <ScrollView style={SocialDetalheStyle.container}>

            <TouchableOpacity onPress={() => router.back()}>
                <Image
                    source={require("../../../assets/voltar.png")}
                    style={SocialDetalheStyle.icon}
                />
            </TouchableOpacity>

            <View style={SocialDetalheStyle.view}>
                <Image
                    source={require("../../../assets/ibira.jpg")}
                    style={SocialDetalheStyle.img}
                />
            </View>

            <Text style={SocialDetalheStyle.textP}> Parque Ibirapuera </Text>

            <View style={SocialDetalheStyle.box}>
                <Image
                    source={require("../../../assets/localizacao.png")}
                    style={SocialDetalheStyle.iconL}
                />
                <Text style={SocialDetalheStyle.text}> São Paulo, SP  •  2,3 km </Text>
            </View>

            <Text style={SocialDetalheStyle.description}> Um dos lugares mais incríveis de São Paulo, perfeito {"\n"} para fotos, passeios e momentos de lazer.</Text>

            <Image
                source={require("../../../assets/maps.png")}
                style={SocialDetalheStyle.maps}
            />

            <View style={SocialDetalheStyle.bottomContainer}>

                <TouchableOpacity
                    style={SocialDetalheStyle.buttonStart}
                >
                    <Text style={SocialDetalheStyle.buttonStartText}>
                        Ver no mapa
                    </Text>
                </TouchableOpacity>

            </View>
        </ScrollView>
    )
}