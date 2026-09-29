import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  StatusBar,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CORES = {
  fundo: '#0D0D0D',
  cartao: '#1C1C1E',
  laranja: '#FF7A00',
  texto: '#FFFFFF',
  textoSecundario: '#9CA3AF',
  borda: '#282828',
  inputBg: '#1C1C1E',
};

const IDIOMAS = [
  { id: 'pt-BR', nome: 'Português (Brasil)', nativo: 'Português', bandeira: '🇧🇷' },
  { id: 'en-US', nome: 'Inglês (Estados Unidos)', nativo: 'English (US)', bandeira: '🇺🇸' },
  { id: 'es-ES', nome: 'Espanhol', nativo: 'Español', bandeira: '🇪🇸' },
  { id: 'fr-FR', nome: 'Francês', nativo: 'Français', bandeira: '🇫🇷' },
  { id: 'de-DE', nome: 'Alemão', nativo: 'Deutsch', bandeira: '🇩🇪' },
  { id: 'it-IT', nome: 'Italiano', nativo: 'Italiano', bandeira: '🇮🇹' },
  { id: 'ja-JP', nome: 'Japonês', nativo: '日本語', bandeira: '🇯🇵' },
];

export default function IdiomaScreen() {
  const router = useRouter();
  const [idiomaSelecionado, setIdiomaSelecionado] = useState('pt-BR');
  const [busca, setBusca] = useState('');
  const [aviso, setAviso] = useState('');

  useEffect(() => {
    const carregarIdioma = async () => {
      try {
        const salvo = await AsyncStorage.getItem('@vivai_idioma');
        if (salvo) {
          setIdiomaSelecionado(salvo);
        }
      } catch (e) {
        console.log('Erro ao carregar idioma:', e);
      }
    };
    carregarIdioma();
  }, []);

  const handleSelecionarIdioma = async (id, nome) => {
    setIdiomaSelecionado(id);
    setAviso(`Idioma definido como: ${nome}`);
    try {
      await AsyncStorage.setItem('@vivai_idioma', id);
    } catch (e) {
      console.log('Erro ao salvar idioma:', e);
    }

    setTimeout(() => {
      setAviso('');
    }, 3000);
  };

  const idiomasFiltrados = IDIOMAS.filter((item) =>
    item.nome.toLowerCase().includes(busca.toLowerCase()) ||
    item.nativo.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" backgroundColor={CORES.fundo} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.botaoVoltar}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={24} color={CORES.texto} />
        </TouchableOpacity>
        <Text style={styles.headerTitulo}>Idioma</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.conteudo}
        showsVerticalScrollIndicator={false}
      >
        {/* Barra de Pesquisa */}
        <View style={styles.pesquisaBox}>
          <Ionicons name="search-outline" size={18} color={CORES.textoSecundario} style={{ marginRight: 8 }} />
          <TextInput
            style={styles.pesquisaInput}
            value={busca}
            onChangeText={setBusca}
            placeholder="Buscar idioma..."
            placeholderTextColor="#666666"
            clearButtonMode="while-editing"
          />
          {busca ? (
            <TouchableOpacity onPress={() => setBusca('')}>
              <Ionicons name="close-circle" size={18} color={CORES.textoSecundario} />
            </TouchableOpacity>
          ) : null}
        </View>

        {aviso ? (
          <View style={styles.avisoBox}>
            <Ionicons name="checkmark-circle" size={18} color="#10B981" />
            <Text style={styles.avisoTexto}>{aviso}</Text>
          </View>
        ) : null}

        {/* Lista de Idiomas */}
        <Text style={styles.tituloSecao}>IDIOMAS DISPONÍVEIS</Text>
        <View style={styles.caixa}>
          {idiomasFiltrados.map((item, index) => {
            const selecionado = item.id === idiomaSelecionado;

            return (
              <View key={item.id}>
                <TouchableOpacity
                  style={styles.itemIdioma}
                  activeOpacity={0.7}
                  onPress={() => handleSelecionarIdioma(item.id, item.nome)}
                >
                  <View style={styles.itemEsquerda}>
                    <Text style={styles.bandeira}>{item.bandeira}</Text>
                    <View style={styles.infoIdioma}>
                      <Text style={[styles.nomeIdioma, selecionado && styles.nomeSelecionado]}>
                        {item.nome}
                      </Text>
                      <Text style={styles.nativoIdioma}>{item.nativo}</Text>
                    </View>
                  </View>

                  {selecionado ? (
                    <Ionicons name="checkmark-circle" size={22} color={CORES.laranja} />
                  ) : (
                    <Ionicons name="ellipse-outline" size={20} color="#444444" />
                  )}
                </TouchableOpacity>

                {index < idiomasFiltrados.length - 1 && <View style={styles.divisor} />}
              </View>
            );
          })}
        </View>

        <Text style={styles.notaRodape}>
          O idioma selecionado será aplicado às legendas, menus e informações do aplicativo ViVai.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CORES.fundo,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: CORES.borda,
  },
  botaoVoltar: {
    padding: 6,
    borderRadius: 8,
  },
  headerTitulo: {
    color: CORES.texto,
    fontSize: 17,
    fontWeight: '600',
  },
  conteudo: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 40,
  },
  pesquisaBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: CORES.inputBg,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: CORES.borda,
    paddingHorizontal: 12,
    height: 42,
    marginBottom: 16,
  },
  pesquisaInput: {
    flex: 1,
    color: CORES.texto,
    fontSize: 14,
  },
  avisoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
  },
  avisoTexto: {
    color: '#10B981',
    fontSize: 13,
    marginLeft: 8,
    fontWeight: '500',
  },
  tituloSecao: {
    color: CORES.laranja,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  caixa: {
    backgroundColor: CORES.cartao,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: CORES.borda,
  },
  itemIdioma: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  itemEsquerda: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bandeira: {
    fontSize: 24,
    marginRight: 12,
  },
  infoIdioma: {
    justifyContent: 'center',
  },
  nomeIdioma: {
    color: CORES.texto,
    fontSize: 14,
    fontWeight: '500',
  },
  nomeSelecionado: {
    color: CORES.laranja,
    fontWeight: '600',
  },
  nativoIdioma: {
    color: CORES.textoSecundario,
    fontSize: 12,
    marginTop: 2,
  },
  divisor: {
    height: 1,
    backgroundColor: CORES.borda,
    marginLeft: 52,
  },
  notaRodape: {
    color: '#666666',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 24,
    paddingHorizontal: 16,
  },
});
