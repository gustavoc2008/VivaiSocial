import {
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from "react-native";

import { BottomNav } from "../bottomnav/BottomNav";
import { SocialInicioStyle } from "./SocialInicioStyle";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useState } from "react";

export const SocialInicio = () => {

    const [curtido1, setCurtido1] = useState(false);
    const [salvo1, setSalvo1] = useState(false);

    const [curtido2, setCurtido2] = useState(false);
    const [salvo2, setSalvo2] = useState(false);

    return (

        <SafeAreaView style={{ flex: 1 }}>

            <View style={SocialInicioStyle.container}>

                <ScrollView
                    style={{ flex: 1 }}
                    contentContainerStyle={{ paddingBottom: 120 }}
                >

                    {/* HEADER */}
                    <View style={SocialInicioStyle.boxHeader}>

                        <Text style={SocialInicioStyle.title}>
                            Vi
                            <Text style={SocialInicioStyle.titleVai}>
                                vaí
                            </Text>
                        </Text>

                        <Image
                            source={require("../../../assets/notificacao.png")}
                            style={SocialInicioStyle.iconN}
                        />

                    </View>


                    {/* ================= POST 1 ================= */}

                    <View style={SocialInicioStyle.containerFeed}>

                        <View style={SocialInicioStyle.boxFeed}>

                            <Image
                                source={require("../../../assets/pessoa.jpeg")}
                                style={SocialInicioStyle.imgP}
                            />

                            <View style={SocialInicioStyle.boxText}>

                                <Text style={SocialInicioStyle.textName}>
                                    Gustavo Costa
                                </Text>

                                <Text style={SocialInicioStyle.textHora}>
                                    Há 2 horas
                                </Text>

                            </View>

                            <TouchableOpacity
                                style={SocialInicioStyle.botaoPontos}
                            >
                                <Image
                                    source={require("../../../assets/pontos.png")}
                                    style={SocialInicioStyle.iconP}
                                />
                            </TouchableOpacity>

                        </View>


                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => router.push("/vivai/detalhes")}
                        >

                            <View style={SocialInicioStyle.boxPubli}>

                                <Text style={SocialInicioStyle.textDesc}>
                                    Aproveitando o final de semana
                                </Text>

                                <Text style={SocialInicioStyle.textDesc}>
                                    Dias leves são os melhores.
                                </Text>

                                <Image
                                    source={require("../../../assets/helipa.jpg")}
                                    style={SocialInicioStyle.imgPaisagem}
                                />

                            </View>

                        </TouchableOpacity>


                        {/* ÍCONES POST 1 */}

                        <View style={SocialInicioStyle.boxIcons}>

                            <TouchableOpacity
                                onPress={() => setCurtido1(!curtido1)}
                            >
                                <View style={SocialInicioStyle.iconGroup}>

                                    <Image
                                        source={require("../../../assets/coracao.png")}
                                        style={[
                                            SocialInicioStyle.icons,
                                            curtido1 && {
                                                tintColor: "#FF0000"
                                            }
                                        ]}
                                    />

                                    <Text style={SocialInicioStyle.iconText}>
                                        24
                                    </Text>

                                </View>
                            </TouchableOpacity>


                            <TouchableOpacity>

                                <View style={SocialInicioStyle.iconGroup}>

                                    <Image
                                        source={require("../../../assets/comentario.png")}
                                        style={SocialInicioStyle.icons}
                                    />

                                    <Text style={SocialInicioStyle.iconText}>
                                        5
                                    </Text>

                                </View>

                            </TouchableOpacity>


                            <TouchableOpacity>

                                <Image
                                    source={require("../../../assets/enviar.png")}
                                    style={SocialInicioStyle.icons}
                                />

                            </TouchableOpacity>


                            <View style={SocialInicioStyle.iconSpacer} />


                            <TouchableOpacity
                                onPress={() => setSalvo1(!salvo1)}
                            >

                                <Image
                                    source={require("../../../assets/salvar.png")}
                                    style={[
                                        SocialInicioStyle.icons,
                                        salvo1 && {
                                            tintColor: "#FFD700"
                                        }
                                    ]}
                                />

                            </TouchableOpacity>

                        </View>

                    </View>


                    {/* ================= POST 2 ================= */}

                    <View style={SocialInicioStyle.containerFeed}>

                        <View style={SocialInicioStyle.boxFeed}>

                            <Image
                                source={require("../../../assets/pessoa.jpeg")}
                                style={SocialInicioStyle.imgP}
                            />

                            <View style={SocialInicioStyle.boxText}>

                                <Text style={SocialInicioStyle.textName}>
                                    Gustavo Costa
                                </Text>

                                <Text style={SocialInicioStyle.textHora}>
                                    Há 3 horas
                                </Text>

                            </View>

                            <TouchableOpacity
                                style={SocialInicioStyle.botaoPontos}
                            >
                                <Image
                                    source={require("../../../assets/pontos.png")}
                                    style={SocialInicioStyle.iconP}
                                />
                            </TouchableOpacity>

                        </View>


                        {/* ÁREA CLICÁVEL DO POST 2 */}

                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => router.push("/vivai/detalhes")}
                        >

                            <View style={SocialInicioStyle.boxPubli}>

                                <Text style={SocialInicioStyle.textDesc}>
                                    Conhecendo lugares novos
                                </Text>

                                <Text style={SocialInicioStyle.textDesc}>
                                    Cada lugar tem uma história.
                                </Text>

                                <Image
                                    source={require("../../../assets/cidade.jpg")}
                                    style={SocialInicioStyle.imgPaisagem}
                                />

                            </View>

                        </TouchableOpacity>


                        {/* ÍCONES POST 2 */}

                        <View style={SocialInicioStyle.boxIcons}>

                            <TouchableOpacity
                                onPress={() => setCurtido2(!curtido2)}
                            >

                                <View style={SocialInicioStyle.iconGroup}>

                                    <Image
                                        source={require("../../../assets/coracao.png")}
                                        style={[
                                            SocialInicioStyle.icons,
                                            curtido2 && {
                                                tintColor: "#FF0000"
                                            }
                                        ]}
                                    />

                                    <Text style={SocialInicioStyle.iconText}>
                                        18
                                    </Text>

                                </View>

                            </TouchableOpacity>


                            <TouchableOpacity>

                                <View style={SocialInicioStyle.iconGroup}>

                                    <Image
                                        source={require("../../../assets/comentario.png")}
                                        style={SocialInicioStyle.icons}
                                    />

                                    <Text style={SocialInicioStyle.iconText}>
                                        3
                                    </Text>

                                </View>

                            </TouchableOpacity>


                            <TouchableOpacity>

                                <Image
                                    source={require("../../../assets/enviar.png")}
                                    style={SocialInicioStyle.icons}
                                />

                            </TouchableOpacity>


                            <View style={SocialInicioStyle.iconSpacer} />


                            <TouchableOpacity
                                onPress={() => setSalvo2(!salvo2)}
                            >

                                <Image
                                    source={require("../../../assets/salvar.png")}
                                    style={[
                                        SocialInicioStyle.icons,
                                        salvo2 && {
                                            tintColor: "#FFD700"
                                        }
                                    ]}
                                />

                            </TouchableOpacity>

                        </View>

                    </View>

                </ScrollView>


                {/* BOTÃO + */}

                <TouchableOpacity
                    style={SocialInicioStyle.botaoCriar}
                    onPress={() => router.push("/vivai/criar")}
                >

                    <Text style={SocialInicioStyle.textoMais}>
                        +
                    </Text>

                </TouchableOpacity>


                {/* NAVBAR */}

                <BottomNav />

            </View>

        </SafeAreaView>
    );
};