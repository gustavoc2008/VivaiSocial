import {
    Image,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SocialCriarStyle } from "./SocialCriarStyle";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export const SocialCriar = () => {
    const router = useRouter();

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={SocialCriarStyle.container}>
                <View style={SocialCriarStyle.boxNew}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Image
                            source={require("../../../assets/voltar.png")}
                            style={SocialCriarStyle.icon}
                        />
                    </TouchableOpacity>

                    <Text style={SocialCriarStyle.text}>Nova Publicação</Text>
                </View>

                <View style={SocialCriarStyle.boxImg}>
                    <View style={SocialCriarStyle.boxImage}>
                        <Image
                            source={require("../../../assets/cafe.jpg")}
                            style={SocialCriarStyle.img}
                        />
                        <TouchableOpacity style={SocialCriarStyle.buttonX}>
                            <Text style={SocialCriarStyle.textX}>✕</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={SocialCriarStyle.boxImage}>
                        <Image
                            source={require("../../../assets/airbnb.jpg")}
                            style={SocialCriarStyle.img}
                        />
                        <TouchableOpacity style={SocialCriarStyle.buttonX}>
                            <Text style={SocialCriarStyle.textX}>✕</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={SocialCriarStyle.boxImageAdd}>
                        <Text style={SocialCriarStyle.textM}>+</Text>
                    </TouchableOpacity>
                </View>

                <View style={SocialCriarStyle.boxP}>
                    <TextInput
                        style={SocialCriarStyle.inputP}
                        placeholder="O que você está pensando?"
                        placeholderTextColor="#888"
                        maxLength={500}
                        multiline
                    />
                    <Text style={SocialCriarStyle.textN}>0/500</Text>
                </View>

                <View>
                    <TouchableOpacity onPress={() => router.push("/vivai/localizacao")}>
                        <View style={SocialCriarStyle.viewT}>
                            <Image
                                source={require("../../../assets/localizacao.png")}
                                style={SocialCriarStyle.icon}
                            />
                            <Text style={SocialCriarStyle.text2}>Adicionar localização</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View style={SocialCriarStyle.viewT}>
                            <Image
                                source={require("../../../assets/perfil.png")}
                                style={SocialCriarStyle.icon}
                            />
                            <Text style={SocialCriarStyle.text2}>Marcar pessoas</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View style={SocialCriarStyle.viewT}>
                            <Image
                                source={require("../../../assets/enquete.png")}
                                style={SocialCriarStyle.icon}
                            />
                            <Text style={SocialCriarStyle.text2}>Adicionar enquete</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={SocialCriarStyle.bottomContainer}>
                    <TouchableOpacity
                        style={SocialCriarStyle.buttonStart}
                        onPress={() => router.push("/vivai/inicio")}
                    >
                        <Text style={SocialCriarStyle.buttonStartText}>Publicar</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
