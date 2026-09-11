import {
    Image,
    ScrollView,
    TouchableOpacity,
    View,
    Text,
    TextInput
} from "react-native";

import { SocialDetalhesStyle } from "./SocialDetalhesStyle";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";


export const SocialDetalhes = () => {

    return (

        <SafeAreaView style={{ flex: 1 }}>

            <ScrollView
                style={SocialDetalhesStyle.container}
                contentContainerStyle={{
                    paddingBottom: 90
                }}
            >

                <View style={SocialDetalhesStyle.boxIcon}>

                    <TouchableOpacity onPress={() => router.back()}>

                        <Image
                            source={require("../../../assets/voltar.png")}
                            style={SocialDetalhesStyle.icon}
                        />

                    </TouchableOpacity>


                    <TouchableOpacity>

                        <Image
                            source={require("../../../assets/pontos.png")}
                            style={SocialDetalhesStyle.icon}
                        />

                    </TouchableOpacity>

                </View>


                <View style={SocialDetalhesStyle.containerFeed}>

                    <View style={SocialDetalhesStyle.boxFeed}>

                        <Image
                            source={require("../../../assets/pessoa.jpeg")}
                            style={SocialDetalhesStyle.imgP}
                        />

                        <View style={SocialDetalhesStyle.boxText}>

                            <Text style={SocialDetalhesStyle.textName}>
                                Gustavo Costa
                            </Text>

                            <Text style={SocialDetalhesStyle.textHora}>
                                Há 2 horas
                            </Text>

                        </View>

                    </View>

                    <View style={SocialDetalhesStyle.boxPubli}>

                        <Text style={SocialDetalhesStyle.textDesc}>
                            Aproveitando o final de semana
                        </Text>

                        <Text style={SocialDetalhesStyle.textDesc}>
                            Dias leves são os melhores.
                        </Text>


                        <Image
                            source={require("../../../assets/helipa.jpg")}
                            style={SocialDetalhesStyle.imgPaisagem}
                        />


                        <View style={SocialDetalhesStyle.boxIcons}>

                            <TouchableOpacity>

                                <View style={SocialDetalhesStyle.iconGroup}>

                                    <Image
                                        source={require("../../../assets/coracao.png")}
                                        style={SocialDetalhesStyle.icons}
                                    />

                                    <Text style={SocialDetalhesStyle.iconText}>
                                        24
                                    </Text>

                                </View>

                            </TouchableOpacity>


                            <TouchableOpacity>

                                <View style={SocialDetalhesStyle.iconGroup}>

                                    <Image
                                        source={require("../../../assets/comentario.png")}
                                        style={SocialDetalhesStyle.icons}
                                    />

                                    <Text style={SocialDetalhesStyle.iconText}>
                                        5
                                    </Text>

                                </View>

                            </TouchableOpacity>


                            <TouchableOpacity>

                                <Image
                                    source={require("../../../assets/enviar.png")}
                                    style={SocialDetalhesStyle.icons}
                                />

                            </TouchableOpacity>


                            <View style={SocialDetalhesStyle.iconSpacer} />


                            <TouchableOpacity>

                                <Image
                                    source={require("../../../assets/salvar.png")}
                                    style={SocialDetalhesStyle.icons}
                                />

                            </TouchableOpacity>

                        </View>


                        <View style={SocialDetalhesStyle.divisao} />


                        <Text style={SocialDetalhesStyle.text}>
                            Comentários
                        </Text>


                        <View style={SocialDetalhesStyle.boxComent}>

                            <Image
                                source={require("../../../assets/pessoa2.png")}
                                style={SocialDetalhesStyle.imgP}
                            />

                            <View style={SocialDetalhesStyle.boxComentTexto}>

                                <Text style={SocialDetalhesStyle.textName}>
                                    Maria Eduarda
                                </Text>

                                <Text style={SocialDetalhesStyle.textHora}>
                                    Há 1 hora
                                </Text>

                                <Text style={SocialDetalhesStyle.textDesc}>
                                    Que lugar lindo! 😍
                                </Text>

                            </View>

                            <TouchableOpacity
                                style={SocialDetalhesStyle.boxComentLike}
                            >

                                <Image
                                    source={require("../../../assets/coracao.png")}
                                    style={SocialDetalhesStyle.imgC}
                                />

                            </TouchableOpacity>

                        </View>


                        <View style={SocialDetalhesStyle.boxComent}>

                            <Image
                                source={require("../../../assets/pessoa.jpeg")}
                                style={SocialDetalhesStyle.imgP}
                            />

                            <View style={SocialDetalhesStyle.boxComentTexto}>

                                <Text style={SocialDetalhesStyle.textName}>
                                    Carlos Lima
                                </Text>

                                <Text style={SocialDetalhesStyle.textHora}>
                                    Há 30 min
                                </Text>

                                <Text style={SocialDetalhesStyle.textDesc}>
                                    Perfeito demais! 👋
                                </Text>

                            </View>

                            <TouchableOpacity
                                style={SocialDetalhesStyle.boxComentLike}
                            >

                                <Image
                                    source={require("../../../assets/coracao.png")}
                                    style={SocialDetalhesStyle.imgC}
                                />

                            </TouchableOpacity>

                        </View>

                    </View>

                </View>

            </ScrollView>


            <View style={SocialDetalhesStyle.barraComentario}>

                <TextInput
                    style={SocialDetalhesStyle.inputComentario}
                    placeholder="Adicione um comentário..."
                    placeholderTextColor="#888"
                />

                <TouchableOpacity
                    style={SocialDetalhesStyle.botaoEnviar}
                >

                    <Image
                        source={require("../../../assets/enviar.png")}
                        style={SocialDetalhesStyle.iconEnviar}
                    />

                </TouchableOpacity>

            </View>
        </SafeAreaView>

    );

};