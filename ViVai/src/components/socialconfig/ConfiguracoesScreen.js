import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import axios from '../../services/json';
import { useRouter } from 'expo-router';


const CORES = {
  fundo: '#0D0D0D',
  cartao: '#1C1C1E',
  laranja: '#FF7A00',
  texto: '#FFFFFF',
  textoSecundario: '#9CA3AF'
};


export default function ConfiguracoesScreen() {

  const router = useRouter()

  const [configuracoes, setConfiguracoes] = useState([]);


  // Busca as configurações no JSON Server
  const buscarConfiguracoes = async () => {

    try {

      const resposta = await axios.get('/configuracoes');

      setConfiguracoes(resposta.data);

    } catch (erro) {

      console.log('Erro ao buscar configurações:', erro);

    }

  };


  useEffect(() => {

    buscarConfiguracoes();

  }, []);


  // Mostra os itens de cada categoria
  const mostrarCategoria = (categoria) => {

    const itens = configuracoes.filter(
      (item) => item.categoria === categoria
    );


    return (

      <View style={styles.secao}>

        <Text style={styles.tituloSecao}>
          {categoria}
        </Text>

        <View style={styles.caixa}>

          {itens.map((item) => (

            <TouchableOpacity
              key={item.id}
              style={styles.item}
            >

              <View style={styles.itemEsquerda}>

                <Ionicons
                  name={item.icone}
                  size={20}
                  color={CORES.texto}
                />

                <Text style={styles.textoItem}>
                  {item.nome}
                </Text>

              </View>


              <Ionicons
                name="chevron-forward-outline"
                size={18}
                color="#AAAAAA"
              />

            </TouchableOpacity>

          ))}

        </View>

      </View>

    );

  };


  return (

    <View style={styles.container}>

      <ScrollView
        contentContainerStyle={styles.conteudo}
        showsVerticalScrollIndicator={false}
      >

        {/* Título */}

        <Text style={styles.titulo}>
          Configurações
        </Text>


        {/* Conta */}

        {mostrarCategoria('Conta')}


        {/* Preferências */}

        {mostrarCategoria('Preferências')}


        {/* Sobre */}

        {mostrarCategoria('Sobre')}


        {/* Botão Sair */}

        <TouchableOpacity
          style={styles.botaoSair}
          onPress={() => router.back()}
        >

          <Ionicons
            name="log-out-outline"
            size={19}
            color="#FFFFFF"
          />

          <Text style={styles.textoSair}>
            Sair
          </Text>

        </TouchableOpacity>


      </ScrollView>

    </View>

  );

}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: CORES.fundo
  },


  conteudo: {
    paddingTop: 45,
    paddingHorizontal: 15,
    paddingBottom: 100
  },


  titulo: {
    color: CORES.texto,
    fontSize: 22,
    fontWeight: '500',
    marginBottom: 20
  },


  secao: {
    marginBottom: 23
  },


  tituloSecao: {
    color: CORES.laranja,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 7
  },


  caixa: {
    backgroundColor: CORES.cartao,
    borderRadius: 9,
    overflow: 'hidden'
  },


  item: {
    height: 43,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#282828'
  },


  itemEsquerda: {
    flexDirection: 'row',
    alignItems: 'center'
  },


  textoItem: {
    color: CORES.texto,
    fontSize: 12,
    marginLeft: 10
  },


  botaoSair: {
    height: 40,
    backgroundColor: CORES.laranja,
    borderRadius: 7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5
  },


  textoSair: {
    color: '#FFFFFF',
    fontSize: 13,
    marginLeft: 7
  }

});