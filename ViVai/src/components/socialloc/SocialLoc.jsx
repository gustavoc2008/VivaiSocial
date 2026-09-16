import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

import { SocialLocStyle } from "./SocialLocStyle";

import { useRouter } from "expo-router";


export const SocialLoc = () => {

  const router = useRouter();

  return (

    <ScrollView style={SocialLocStyle.container}>

      <View style={SocialLocStyle.boxNew}>

        <TouchableOpacity onPress={() => router.back()}>

          <Image
            source={require("../../../assets/voltar.png")}
            style={SocialLocStyle.icon}
          />

        </TouchableOpacity>

        <Text style={SocialLocStyle.text}>
          Adicionar localização
        </Text>

      </View>


      <View style={SocialLocStyle.barraPesquisa}>

        <Image
          source={require("../../../assets/pesquisar.png")}
          style={SocialLocStyle.iconPesquisa}
        />

        <TextInput
          style={SocialLocStyle.inputPesquisa}
          placeholder="Buscar lugar..."
          placeholderTextColor="#888"
        />

      </View>


      <TouchableOpacity>

        <View style={SocialLocStyle.barraLoc}>

          <Image
            source={require("../../../assets/localizacao.png")}
            style={SocialLocStyle.iconPesquisa}
          />

          <View style={SocialLocStyle.inputLoc}>

            <Text style={SocialLocStyle.textM}>
              Usar minha localização
            </Text>

          </View>

          <Image
            source={require("../../../assets/avancar.png")}
            tintColor={"white"}
          />

        </View>

      </TouchableOpacity>


      <View style={SocialLocStyle.boxT}>

        <Text style={SocialLocStyle.textP}>
          Lugares próximos
        </Text>

      </View>


      <View style={SocialLocStyle.listaLocais}>

        <TouchableOpacity style={SocialLocStyle.viewI}>

          <Image
            source={require("../../../assets/ibira.jpg")}
            style={SocialLocStyle.imgAlta}
          />

          <View style={SocialLocStyle.viewInf}>

            <Text style={SocialLocStyle.textNome}>
              Parque Ibirapuera
            </Text>

            <Text style={SocialLocStyle.textLocal}>
              São Paulo, SP
            </Text>

          </View>

          <Text style={SocialLocStyle.textDistancia}>
            2,3 km
          </Text>

        </TouchableOpacity>

        <View style={SocialLocStyle.divisao} />


        <TouchableOpacity style={SocialLocStyle.viewI}>

          <Image
            source={require("../../../assets/paulista.jpg")}
            style={SocialLocStyle.imgAlta}
          />

          <View style={SocialLocStyle.viewInf}>

            <Text style={SocialLocStyle.textNome}>
              Avenida Paulista
            </Text>

            <Text style={SocialLocStyle.textLocal}>
              São Paulo, SP
            </Text>

          </View>

          <Text style={SocialLocStyle.textDistancia}>
            3,1 km
          </Text>

        </TouchableOpacity>

        <View style={SocialLocStyle.divisao} />


        <TouchableOpacity style={SocialLocStyle.viewI}>

          <Image
            source={require("../../../assets/masp.jpg")}
            style={SocialLocStyle.imgAlta}
          />

          <View style={SocialLocStyle.viewInf}>

            <Text style={SocialLocStyle.textNome}>
              MASP
            </Text>

            <Text style={SocialLocStyle.textLocal}>
              São Paulo, SP
            </Text>

          </View>

          <Text style={SocialLocStyle.textDistancia}>
            3,4 km
          </Text>

        </TouchableOpacity>

        <View style={SocialLocStyle.divisao} />


        <TouchableOpacity style={SocialLocStyle.viewI}>

          <Image
            source={require("../../../assets/povo.jpg")}
            style={SocialLocStyle.imgAlta}
          />

          <View style={SocialLocStyle.viewInf}>

            <Text style={SocialLocStyle.textNome}>
              Parque do Povo
            </Text>

            <Text style={SocialLocStyle.textLocal}>
              São Paulo, SP
            </Text>

          </View>

          <Text style={SocialLocStyle.textDistancia}>
            4,2 km
          </Text>

        </TouchableOpacity>

        <View style={SocialLocStyle.divisao} />


        <TouchableOpacity style={SocialLocStyle.viewI}>

          <Image
            source={require("../../../assets/iguatemi.jpg")}
            style={SocialLocStyle.imgAlta}
          />

          <View style={SocialLocStyle.viewInf}>

            <Text style={SocialLocStyle.textNome}>
              Shopping Iguatemi
            </Text>

            <Text style={SocialLocStyle.textLocal}>
              São Paulo, SP
            </Text>

          </View>

          <Text style={SocialLocStyle.textDistancia}>
            5,0 km
          </Text>

        </TouchableOpacity>

      </View>

    </ScrollView>

  );

};  