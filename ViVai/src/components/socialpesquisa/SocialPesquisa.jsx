import {
    Image,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

import { BottomNav } from "../bottomnav/BottomNav";
import { SocialPesquisaStyle } from "./SocialPesquisaStyle";
import { SafeAreaView } from "react-native-safe-area-context";

export const SocialPesquisa = () => {

    return (
        <SafeAreaView style={{ flex: 1 }}>

            <View style={SocialPesquisaStyle.container}>

                <ScrollView
                    style={SocialPesquisaStyle.scroll}
                    contentContainerStyle={SocialPesquisaStyle.content}
                >

                    <Text style={SocialPesquisaStyle.titulo}>
                        Explorar
                    </Text>

                    <View style={SocialPesquisaStyle.barraPesquisa}>

                        <Image
                            source={require("../../../assets/pesquisar.png")}
                            style={SocialPesquisaStyle.iconPesquisa}
                        />

                        <TextInput
                            style={SocialPesquisaStyle.inputPesquisa}
                            placeholder="Pesquisar lugares, pessoas ou hashtags..."
                            placeholderTextColor="#888"
                        />

                    </View>

                    <View style={SocialPesquisaStyle.boxAlta}>

                        <Text style={SocialPesquisaStyle.tituloSecao}>
                            Em alta
                        </Text>

                        <TouchableOpacity>
                            <Text style={SocialPesquisaStyle.verMais}>
                                Ver mais
                            </Text>
                        </TouchableOpacity>

                    </View>

                    <View style={SocialPesquisaStyle.boxImg}>

                        <TouchableOpacity>
                            <Image
                                source={require("../../../assets/montanha.avif")}
                                style={SocialPesquisaStyle.imgAlta}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Image
                                source={require("../../../assets/sol.jpg")}
                                style={SocialPesquisaStyle.imgAlta}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Image
                                source={require("../../../assets/praia.avif")}
                                style={SocialPesquisaStyle.imgAlta}
                            />
                        </TouchableOpacity>

                    </View>

                    <View style={SocialPesquisaStyle.boxImg2}>

                        <TouchableOpacity>
                            <Image
                                source={require("../../../assets/cidade.jpg")}
                                style={SocialPesquisaStyle.imgAlta}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Image
                                source={require("../../../assets/cafe.jpg")}
                                style={SocialPesquisaStyle.imgAlta}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Image
                                source={require("../../../assets/airbnb.jpg")}
                                style={SocialPesquisaStyle.imgAlta}
                            />
                        </TouchableOpacity>

                    </View>

                    <Text style={SocialPesquisaStyle.tituloSecao}>
                        Categorias
                    </Text>

                    <View style={SocialPesquisaStyle.boxCategorias}>

                        <TouchableOpacity style={SocialPesquisaStyle.boxCat}>

                            <Image
                                source={require("../../../assets/aviao.png")}
                                style={SocialPesquisaStyle.imgCat}
                            />

                            <Text style={SocialPesquisaStyle.textCat}>
                                Viagens
                            </Text>

                        </TouchableOpacity>

                        <TouchableOpacity style={SocialPesquisaStyle.boxCat}>

                            <Image
                                source={require("../../../assets/cidade.png")}
                                style={SocialPesquisaStyle.imgCat}
                            />

                            <Text style={SocialPesquisaStyle.textCat}>
                                Cidade
                            </Text>

                        </TouchableOpacity>

                        <TouchableOpacity style={SocialPesquisaStyle.boxCat}>

                            <Image
                                source={require("../../../assets/praia.png")}
                                style={SocialPesquisaStyle.imgCat}
                            />

                            <Text style={SocialPesquisaStyle.textCat}>
                                Praia
                            </Text>

                        </TouchableOpacity>

                        <TouchableOpacity style={SocialPesquisaStyle.boxCat}>

                            <Image
                                source={require("../../../assets/arvore.png")}
                                style={SocialPesquisaStyle.imgCat}
                            />

                            <Text style={SocialPesquisaStyle.textCat}>
                                Natureza
                            </Text>

                        </TouchableOpacity>

                    </View>

                    <View style={SocialPesquisaStyle.boxAlta}>

                        <Text style={SocialPesquisaStyle.tituloSecao}>
                            Pessoas que você talvez conheça
                        </Text>

                        <TouchableOpacity>
                            <Text style={SocialPesquisaStyle.verMais}>
                                Ver mais
                            </Text>
                        </TouchableOpacity>

                    </View>

                    <View style={SocialPesquisaStyle.boxFeed}>

                        <Image
                            source={require("../../../assets/pessoa.jpeg")}
                            style={SocialPesquisaStyle.imgP}
                        />

                        <View style={SocialPesquisaStyle.boxText}>

                            <Text style={SocialPesquisaStyle.textName}>
                                Gustavo Costa
                            </Text>

                            <Text style={SocialPesquisaStyle.textHora}>
                                @costawrrld
                            </Text>

                        </View>

                        <TouchableOpacity
                            style={SocialPesquisaStyle.buttonStart}
                        >

                            <Text style={SocialPesquisaStyle.buttonStartText}>
                                Seguir
                            </Text>

                        </TouchableOpacity>

                    </View>

                    <View style={SocialPesquisaStyle.divisao} />

                    <View style={SocialPesquisaStyle.boxFeed}>

                        <Image
                            source={require("../../../assets/pessoa2.png")}
                            style={SocialPesquisaStyle.imgP}
                        />

                        <View style={SocialPesquisaStyle.boxText}>

                            <Text style={SocialPesquisaStyle.textName}>
                                Maria Eduarda
                            </Text>

                            <Text style={SocialPesquisaStyle.textHora}>
                                @cordeiro_makk
                            </Text>

                        </View>

                        <TouchableOpacity
                            style={SocialPesquisaStyle.buttonStart}
                        >

                            <Text style={SocialPesquisaStyle.buttonStartText}>
                                Seguir
                            </Text>

                        </TouchableOpacity>

                    </View>

                    <View style={SocialPesquisaStyle.divisao} />

                </ScrollView>

                <BottomNav />

            </View>

        </SafeAreaView>
    );
};