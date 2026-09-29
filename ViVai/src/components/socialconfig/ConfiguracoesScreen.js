import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import axios from '../../services/json';
import { useAuth } from '../../context/Context';

const CORES = {
  fundo: '#0D0D0D',
  cartao: '#1C1C1E',
  laranja: '#FF7A00',
  texto: '#FFFFFF',
  textoSecundario: '#9CA3AF',
  borda: '#282828',
};

const CONFIGURACOES_PADRAO = [
  {
    id: '1',
    categoria: 'Conta',
    nome: 'Privacidade',
    icone: 'lock-closed-outline',
    rota: '/vivai/privacidade',
  },
  {
    id: '2',
    categoria: 'Conta',
    nome: 'Trocar senha',
    icone: 'key-outline',
    rota: '/vivai/trocarsenha',
  },
  {
    id: '3',
    categoria: 'Preferências',
    nome: 'Idioma',
    icone: 'globe-outline',
    rota: '/vivai/idioma',
  },
  {
    id: '4',
    categoria: 'Sobre',
    nome: 'Termos de uso',
    icone: 'document-text-outline',
    rota: '/vivai/termos',
  },
  {
    id: '5',
    categoria: 'Sobre',
    nome: 'Política de privacidade',
    icone: 'shield-checkmark-outline',
    rota: '/vivai/politica',
  },
  {
    id: '6',
    categoria: 'Sobre',
    nome: 'Sobre a ViVai',
    icone: 'information-circle-outline',
    rota: '/vivai/sobre',
  },
];

export default function ConfiguracoesScreen() {
  const router = useRouter();
  const { logout } = useAuth();
  const [configuracoes, setConfiguracoes] = useState(CONFIGURACOES_PADRAO);

  // Busca as configurações no JSON Server e filtra notificações, tema e editar perfil
  const buscarConfiguracoes = async () => {
    try {
      const resposta = await axios.get('/configuracoes');
      if (Array.isArray(resposta.data) && resposta.data.length > 0) {
        const filtradas = resposta.data
          .filter(
            (item) =>
              item.nome !== 'Editar perfil' &&
              item.nome !== 'Notificações' &&
              item.nome !== 'Tema'
          )
          .map((item) => {
            // Normalizar nome antigo se vier do banco
            if (item.nome === 'Sobre o MiniSocial') {
              return { ...item, nome: 'Sobre a ViVai', rota: '/vivai/sobre' };
            }
            if (item.nome === 'Senha') {
              return { ...item, nome: 'Trocar senha', rota: '/vivai/trocarsenha' };
            }
            return item;
          });

        if (filtradas.length > 0) {
          setConfiguracoes(filtradas);
        }
      }
    } catch (erro) {
      console.log('Aviso ao carregar configurações da API (usando padrão):', erro?.message);
    }
  };

  useEffect(() => {
    buscarConfiguracoes();
  }, []);

  const handleNavegar = (item) => {
    if (item.rota) {
      router.push(item.rota);
      return;
    }

    switch (item.nome) {
      case 'Privacidade':
        router.push('/vivai/privacidade');
        break;
      case 'Trocar senha':
      case 'Senha':
        router.push('/vivai/trocarsenha');
        break;
      case 'Idioma':
        router.push('/vivai/idioma');
        break;
      case 'Termos de uso':
        router.push('/vivai/termos');
        break;
      case 'Política de privacidade':
        router.push('/vivai/politica');
        break;
      case 'Sobre a ViVai':
      case 'Sobre o MiniSocial':
        router.push('/vivai/sobre');
        break;
      default:
        break;
    }
  };

  const handleSair = async () => {
    if (logout) {
      await logout();
    }
    router.replace('/vivai');
  };

  // Mostra os itens de cada categoria
  const mostrarCategoria = (categoria) => {
    const itens = configuracoes.filter((item) => item.categoria === categoria);
    if (itens.length === 0) return null;

    return (
      <View style={styles.secao}>
        <Text style={styles.tituloSecao}>{categoria.toUpperCase()}</Text>

        <View style={styles.caixa}>
          {itens.map((item, index) => (
            <TouchableOpacity
              key={item.id || index}
              style={[
                styles.item,
                index === itens.length - 1 && { borderBottomWidth: 0 },
              ]}
              activeOpacity={0.7}
              onPress={() => handleNavegar(item)}
            >
              <View style={styles.itemEsquerda}>
                <View style={styles.iconeContainer}>
                  <Ionicons name={item.icone} size={19} color={CORES.texto} />
                </View>
                <Text style={styles.textoItem}>{item.nome}</Text>
              </View>

              <Ionicons
                name="chevron-forward-outline"
                size={18}
                color={CORES.textoSecundario}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" backgroundColor={CORES.fundo} />

      {/* Header com botão voltar */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.botaoVoltar}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={24} color={CORES.texto} />
        </TouchableOpacity>
        <Text style={styles.headerTitulo}>Configurações</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.conteudo}
        showsVerticalScrollIndicator={false}
      >
        {/* Conta */}
        {mostrarCategoria('Conta')}

        {/* Preferências */}
        {mostrarCategoria('Preferências')}

        {/* Sobre */}
        {mostrarCategoria('Sobre')}

        {/* Botão Sair */}
        <TouchableOpacity
          style={styles.botaoSair}
          activeOpacity={0.85}
          onPress={handleSair}
        >
          <Ionicons name="log-out-outline" size={20} color="#FFFFFF" />
          <Text style={styles.textoSair}>Sair da conta</Text>
        </TouchableOpacity>

        <Text style={styles.versaoTexto}>ViVai • Versão 1.0.0</Text>
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
    fontSize: 18,
    fontWeight: '600',
  },
  conteudo: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 60,
  },
  secao: {
    marginBottom: 22,
  },
  tituloSecao: {
    color: CORES.laranja,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.6,
    marginBottom: 8,
  },
  caixa: {
    backgroundColor: CORES.cartao,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: CORES.borda,
  },
  item: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: CORES.borda,
  },
  itemEsquerda: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconeContainer: {
    width: 28,
    alignItems: 'center',
  },
  textoItem: {
    color: CORES.texto,
    fontSize: 13,
    fontWeight: '500',
    marginLeft: 8,
  },
  botaoSair: {
    height: 46,
    backgroundColor: '#DC2626',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  textoSair: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  versaoTexto: {
    color: '#555555',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 20,
  },
});