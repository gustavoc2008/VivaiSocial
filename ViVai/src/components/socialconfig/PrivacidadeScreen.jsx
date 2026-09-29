import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Switch,
  StatusBar,
  Alert,
  Platform,
  Modal,
  TouchableWithoutFeedback,
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
};

export default function PrivacidadeScreen() {
  const router = useRouter();

  const [contaPrivada, setContaPrivada] = useState(false);
  const [statusAtividade, setStatusAtividade] = useState(true);
  const [permitirMencoes, setPermitirMencoes] = useState(true);
  const [compartilharLocalizacao, setCompartilharLocalizacao] = useState(true);
  const [quemPodeComentar, setQuemPodeComentar] = useState('todos'); // 'todos', 'seguidores'
  const [contasBloqueadas, setContasBloqueadas] = useState([]);
  const [modalBloqueadosVisivel, setModalBloqueadosVisivel] = useState(false);

  // Carregar preferências salvas e contas bloqueadas
  useEffect(() => {
    const carregarPreferencias = async () => {
      try {
        const [dados, bloqueados] = await Promise.all([
          AsyncStorage.getItem('@vivai_privacidade'),
          AsyncStorage.getItem('@vivai_bloqueados'),
        ]);

        if (dados) {
          const config = JSON.parse(dados);
          if (config.contaPrivada !== undefined) setContaPrivada(config.contaPrivada);
          if (config.statusAtividade !== undefined) setStatusAtividade(config.statusAtividade);
          if (config.permitirMencoes !== undefined) setPermitirMencoes(config.permitirMencoes);
          if (config.compartilharLocalizacao !== undefined)
            setCompartilharLocalizacao(config.compartilharLocalizacao);
          if (config.quemPodeComentar) setQuemPodeComentar(config.quemPodeComentar);
        }

        if (bloqueados) {
          const lista = JSON.parse(bloqueados);
          setContasBloqueadas(Array.isArray(lista) ? lista : []);
        }
      } catch (error) {
        console.log('Erro ao carregar preferências de privacidade:', error);
      }
    };

    carregarPreferencias();
  }, []);

  const handleDesbloquearConta = async (nome) => {
    try {
      const novaLista = contasBloqueadas.filter((item) => item !== nome);
      await AsyncStorage.setItem('@vivai_bloqueados', JSON.stringify(novaLista));
      setContasBloqueadas(novaLista);
      if (Platform.OS === 'web') {
        alert(`Conta de ${nome} desbloqueada.`);
      } else {
        Alert.alert('Conta desbloqueada', `Conta de ${nome} foi desbloqueada.`);
      }
    } catch (e) {
      console.log('Erro ao desbloquear conta:', e);
    }
  };

  const salvarPreferencia = async (chave, valor) => {
    try {
      const atual = (await AsyncStorage.getItem('@vivai_privacidade')) || '{}';
      const novo = { ...JSON.parse(atual), [chave]: valor };
      await AsyncStorage.setItem('@vivai_privacidade', JSON.stringify(novo));
    } catch (e) {
      console.log('Erro ao salvar preferência:', e);
    }
  };

  const handleToggleContaPrivada = (val) => {
    setContaPrivada(val);
    salvarPreferencia('contaPrivada', val);
  };

  const handleToggleStatusAtividade = (val) => {
    setStatusAtividade(val);
    salvarPreferencia('statusAtividade', val);
  };

  const handleTogglePermitirMencoes = (val) => {
    setPermitirMencoes(val);
    salvarPreferencia('permitirMencoes', val);
  };

  const handleToggleLocalizacao = (val) => {
    setCompartilharLocalizacao(val);
    salvarPreferencia('compartilharLocalizacao', val);
  };

  const handleSelecionarComentarios = (opcao) => {
    setQuemPodeComentar(opcao);
    salvarPreferencia('quemPodeComentar', opcao);
  };

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
        <Text style={styles.headerTitulo}>Privacidade</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.conteudo}
        showsVerticalScrollIndicator={false}
      >
        {/* Seção Conta */}
        <Text style={styles.tituloSecao}>CONTA</Text>
        <View style={styles.caixa}>
          <View style={styles.itemToggle}>
            <View style={styles.itemInfo}>
              <View style={styles.itemTituloLinha}>
                <Ionicons
                  name="lock-closed-outline"
                  size={18}
                  color={CORES.laranja}
                  style={{ marginRight: 8 }}
                />
                <Text style={styles.itemTitulo}>Conta privada</Text>
              </View>
              <Text style={styles.itemDescricao}>
                Apenas as pessoas que você aprovar poderão ver suas publicações e histórias.
              </Text>
            </View>
            <Switch
              value={contaPrivada}
              onValueChange={handleToggleContaPrivada}
              trackColor={{ false: '#3A3A3C', true: CORES.laranja }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        {/* Seção Interações */}
        <Text style={styles.tituloSecao}>INTERAÇÕES</Text>
        <View style={styles.caixa}>
          <View style={styles.itemToggle}>
            <View style={styles.itemInfo}>
              <View style={styles.itemTituloLinha}>
                <Ionicons
                  name="radio-button-on-outline"
                  size={18}
                  color={CORES.laranja}
                  style={{ marginRight: 8 }}
                />
                <Text style={styles.itemTitulo}>Status de atividade</Text>
              </View>
              <Text style={styles.itemDescricao}>
                Permite que os usuários que você segue vejam quando você esteve ativo por último.
              </Text>
            </View>
            <Switch
              value={statusAtividade}
              onValueChange={handleToggleStatusAtividade}
              trackColor={{ false: '#3A3A3C', true: CORES.laranja }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={styles.divisor} />

          <View style={styles.itemToggle}>
            <View style={styles.itemInfo}>
              <View style={styles.itemTituloLinha}>
                <Ionicons
                  name="at-outline"
                  size={18}
                  color={CORES.laranja}
                  style={{ marginRight: 8 }}
                />
                <Text style={styles.itemTitulo}>Permitir menções</Text>
              </View>
              <Text style={styles.itemDescricao}>
                Permite que qualquer pessoa mencione seu perfil em comentários e legendas.
              </Text>
            </View>
            <Switch
              value={permitirMencoes}
              onValueChange={handleTogglePermitirMencoes}
              trackColor={{ false: '#3A3A3C', true: CORES.laranja }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={styles.divisor} />

          <View style={styles.itemToggle}>
            <View style={styles.itemInfo}>
              <View style={styles.itemTituloLinha}>
                <Ionicons
                  name="location-outline"
                  size={18}
                  color={CORES.laranja}
                  style={{ marginRight: 8 }}
                />
                <Text style={styles.itemTitulo}>Compartilhar localização</Text>
              </View>
              <Text style={styles.itemDescricao}>
                Exibir localização aproximada nos seus pontos turísticos visitados.
              </Text>
            </View>
            <Switch
              value={compartilharLocalizacao}
              onValueChange={handleToggleLocalizacao}
              trackColor={{ false: '#3A3A3C', true: CORES.laranja }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        {/* Seção Quem pode comentar */}
        <Text style={styles.tituloSecao}>QUEM PODE COMENTAR</Text>
        <View style={styles.caixa}>
          <TouchableOpacity
            style={styles.itemOpcao}
            activeOpacity={0.7}
            onPress={() => handleSelecionarComentarios('todos')}
          >
            <Text style={styles.itemTitulo}>Todos</Text>
            {quemPodeComentar === 'todos' && (
              <Ionicons name="checkmark" size={20} color={CORES.laranja} />
            )}
          </TouchableOpacity>

          <View style={styles.divisor} />

          <TouchableOpacity
            style={styles.itemOpcao}
            activeOpacity={0.7}
            onPress={() => handleSelecionarComentarios('seguidores')}
          >
            <Text style={styles.itemTitulo}>Apenas pessoas que você segue</Text>
            {quemPodeComentar === 'seguidores' && (
              <Ionicons name="checkmark" size={20} color={CORES.laranja} />
            )}
          </TouchableOpacity>
        </View>

        {/* Seção Conexões */}
        <Text style={styles.tituloSecao}>CONEXÕES</Text>
        <View style={styles.caixa}>
          <TouchableOpacity
            style={styles.itemLink}
            activeOpacity={0.7}
            onPress={() => {
              if (contasBloqueadas.length === 0) {
                if (Platform.OS === 'web') {
                  alert('Você não possui contas bloqueadas no momento.');
                } else {
                  Alert.alert('Contas bloqueadas', 'Você não possui contas bloqueadas no momento.');
                }
              } else {
                setModalBloqueadosVisivel(true);
              }
            }}
          >
            <View style={styles.itemTituloLinha}>
              <Ionicons
                name="ban-outline"
                size={18}
                color={CORES.textoSecundario}
                style={{ marginRight: 8 }}
              />
              <Text style={styles.itemTitulo}>
                Contas bloqueadas {contasBloqueadas.length > 0 ? `(${contasBloqueadas.length})` : ''}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={CORES.textoSecundario} />
          </TouchableOpacity>
        </View>

        <Text style={styles.notaRodape}>
          Suas preferências de privacidade são salvas automaticamente neste dispositivo.
        </Text>
      </ScrollView>

      {/* Modal de Contas Bloqueadas */}
      <Modal
        visible={modalBloqueadosVisivel}
        transparent
        animationType="fade"
        onRequestClose={() => setModalBloqueadosVisivel(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalBloqueadosVisivel(false)}>
          <View style={styles.overlayModal}>
            <TouchableWithoutFeedback>
              <View style={styles.cardModalBloqueados}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitulo}>Contas bloqueadas</Text>
                  <TouchableOpacity onPress={() => setModalBloqueadosVisivel(false)}>
                    <Ionicons name="close" size={22} color={CORES.texto} />
                  </TouchableOpacity>
                </View>

                <ScrollView style={{ maxHeight: 300 }}>
                  {contasBloqueadas.map((nome, idx) => (
                    <View key={idx} style={styles.itemBloqueado}>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="person-circle-outline" size={28} color={CORES.textoSecundario} />
                        <Text style={styles.nomeBloqueado}>{nome}</Text>
                      </View>
                      <TouchableOpacity
                        style={styles.botaoDesbloquear}
                        onPress={() => handleDesbloquearConta(nome)}
                      >
                        <Text style={styles.textoDesbloquear}>Desbloquear</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </ScrollView>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
    paddingTop: 20,
    paddingBottom: 40,
  },
  tituloSecao: {
    color: CORES.laranja,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 8,
    marginTop: 16,
  },
  caixa: {
    backgroundColor: CORES.cartao,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: CORES.borda,
  },
  itemToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  itemInfo: {
    flex: 1,
    paddingRight: 12,
  },
  itemTituloLinha: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemTitulo: {
    color: CORES.texto,
    fontSize: 14,
    fontWeight: '500',
  },
  itemDescricao: {
    color: CORES.textoSecundario,
    fontSize: 12,
    marginTop: 4,
    lineHeight: 16,
  },
  itemOpcao: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  itemLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  divisor: {
    height: 1,
    backgroundColor: CORES.borda,
    marginLeft: 16,
  },
  notaRodape: {
    color: '#666666',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 24,
    paddingHorizontal: 16,
  },
  overlayModal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  cardModalBloqueados: {
    backgroundColor: CORES.cartao,
    borderRadius: 16,
    padding: 20,
    width: '100%',
    maxWidth: 400,
    borderWidth: 1,
    borderColor: CORES.borda,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: CORES.borda,
  },
  modalTitulo: {
    color: CORES.texto,
    fontSize: 16,
    fontWeight: '600',
  },
  itemBloqueado: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.06)',
  },
  nomeBloqueado: {
    color: CORES.texto,
    fontSize: 14,
    marginLeft: 10,
  },
  botaoDesbloquear: {
    backgroundColor: 'rgba(255, 122, 0, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 122, 0, 0.3)',
  },
  textoDesbloquear: {
    color: CORES.laranja,
    fontSize: 12,
    fontWeight: '600',
  },
});
