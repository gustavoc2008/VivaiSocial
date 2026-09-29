import React, { useState, useEffect, useMemo, useCallback, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
  StatusBar,
  Platform,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import { api } from '../../services/json';
import { useAuth } from '../../context/Context';
import {
  obterMapaSeguindo,
  alternarSeguirUsuario,
  SEGUIDORES_INICIAIS,
} from '../../services/seguidoresService';
import { criarNotificacaoSeguir } from '../../services/notificacoesService';

const fotosPerfil = {
  "pessoa.jpeg": require("../../../assets/pessoa.jpeg"),
  "pessoa2.png": require("../../../assets/pessoa2.png"),
  "beatriz.jpeg": require("../../../assets/beatriz.jpeg"),
  "julia.jpeg": require("../../../assets/julia.jpeg"),
  "lucas.jpeg": require("../../../assets/lucas.jpeg"),
  "maria.jpeg": require("../../../assets/maria.jpeg"),
  "pedro.jpeg": require("../../../assets/pedro.jpeg"),
  "rafael.jpeg": require("../../../assets/rafael.jpeg"),
};

export default function PesquisarUsuariosScreen({ onClose }) {
  const router = useRouter();
  const insetsContext = useContext(SafeAreaInsetsContext);
  const insets = insetsContext || { top: 0, bottom: 0, left: 0, right: 0 };
  const { usuarioLogado } = useAuth();

  const [busca, setBusca] = useState('');
  const [usuarios, setUsuarios] = useState(SEGUIDORES_INICIAIS);
  const [mapaSeguindo, setMapaSeguindo] = useState({});
  const [carregando, setCarregando] = useState(false);
  const [errosFoto, setErrosFoto] = useState({});

  const handleVoltar = () => {
    if (onClose) {
      onClose();
    } else {
      try {
        router.back();
      } catch (e) {
        console.log('Erro ao voltar:', e);
      }
    }
  };

  // Espaçamento superior seguro para entalhe / status bar em todos os aparelhos
  const topPadding = useMemo(() => {
    const rawTop = insets?.top || 0;
    if (Platform.OS === 'android') {
      const statusBarH = StatusBar.currentHeight || 0;
      return Math.max(rawTop, statusBarH, 24) + 10;
    }
    if (Platform.OS === 'ios') {
      return (rawTop > 0 ? rawTop : 44) + 8;
    }
    return Math.max(rawTop, 16);
  }, [insets?.top]);

  const bottomPadding = useMemo(() => {
    const rawBottom = insets?.bottom || 0;
    return Math.max(rawBottom, Platform.OS === 'android' ? 16 : 24) + 20;
  }, [insets?.bottom]);

  // Carrega mapa de seguindo e usuários com segurança
  const carregarDados = useCallback(async () => {
    try {
      // 1. Carrega quem já está seguindo
      try {
        const mapaSeg = await obterMapaSeguindo(usuarioLogado?.id);
        if (mapaSeg) {
          setMapaSeguindo(mapaSeg);
        }
      } catch (errSeg) {
        console.log('Erro ao carregar mapa de seguindo:', errSeg);
      }

      // 2. Tenta buscar da API com timeout curto para não travar conexões instáveis
      let listaApi = [];
      try {
        const resUsers = await api.get('/usuarios', { timeout: 3500 });
        if (Array.isArray(resUsers?.data)) {
          listaApi = resUsers.data;
        }
      } catch (errApi) {
        // API offline ou endereço local não alcançável no celular, usa fallback sem quebrar
      }

      const listaIds = new Set();
      const todos = [];

      // Adiciona da API se existir
      listaApi.forEach((u) => {
        const idStr = String(u.id || u.usuario || u.nome);
        const ehProprioUsuario =
          (usuarioLogado?.id && String(usuarioLogado.id) === String(u.id)) ||
          (usuarioLogado?.usuario && usuarioLogado.usuario === u.usuario);

        if (!ehProprioUsuario && !listaIds.has(idStr)) {
          listaIds.add(idStr);
          todos.push({
            id: u.id,
            nome: u.nome || 'Usuário',
            user: u.usuario ? (u.usuario.startsWith('@') ? u.usuario : `@${u.usuario}`) : '@usuario',
            foto: u.foto || null,
            inicial: u.nome ? u.nome.charAt(0).toUpperCase() : 'U',
            cor: '#4a4b59',
          });
        }
      });

      // Adiciona dos seguidores iniciais como sugestões
      SEGUIDORES_INICIAIS.forEach((u) => {
        const idStr = String(u.id || u.user || u.nome);
        if (!listaIds.has(idStr)) {
          listaIds.add(idStr);
          todos.push(u);
        }
      });

      if (todos.length > 0) {
        setUsuarios(todos);
      }
    } catch (error) {
      console.log('Erro ao carregar usuários:', error);
    } finally {
      setCarregando(false);
    }
  }, [usuarioLogado?.id, usuarioLogado?.usuario]);

  useEffect(() => {
    carregarDados();
  }, [carregarDados]);

  // Filtragem em tempo real por nome ou @user
  const usuariosFiltrados = useMemo(() => {
    const termo = busca.trim().toLowerCase().replace('@', '');
    if (!termo) return usuarios;

    return usuarios.filter((u) => {
      const nomeMatch = (u.nome || '').toLowerCase().includes(termo);
      const userMatch = (u.user || '').toLowerCase().replace('@', '').includes(termo);
      return nomeMatch || userMatch;
    });
  }, [usuarios, busca]);

  // Alterna o estado de seguir
  const alternarSeguir = async (usuarioAlvo) => {
    try {
      const idKey = String(usuarioAlvo.id || usuarioAlvo.user || usuarioAlvo.nome);
      const estaSeguindo = !!mapaSeguindo[idKey];

      // Atualização otimista imediata na interface
      setMapaSeguindo((prev) => ({
        ...prev,
        [idKey]: !estaSeguindo,
      }));

      const res = await alternarSeguirUsuario(usuarioAlvo, usuarioLogado?.id);
      if (res && res.estaSeguindo) {
        try {
          await criarNotificacaoSeguir({
            usuarioAlvo,
            usuarioLogado,
          });
        } catch (_) {}
      }
    } catch (err) {
      console.log('Erro ao alternar seguir no pesquisar:', err);
    }
  };

  const getFoto = (foto) => {
    if (!foto || typeof foto !== 'string') return null;
    const f = foto.trim();
    if (!f) return null;

    if (fotosPerfil[f]) {
      return fotosPerfil[f];
    }

    // Blob URL não é suportado pelo Image nativo no Android e causa crash
    if (f.startsWith('blob:')) {
      return null;
    }

    if (f.startsWith('http://') || f.startsWith('https://') || f.startsWith('data:image/')) {
      return { uri: f };
    }

    if (f.startsWith('file://')) {
      return { uri: f };
    }

    return null;
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#17181b" />

      <View style={styles.contentWrapper}>
        {/* Header */}
        <View style={[styles.header, { paddingTop: topPadding }]}>
          <TouchableOpacity
            style={styles.botaoVoltar}
            onPress={handleVoltar}
            activeOpacity={0.7}
            hitSlop={{ top: 14, bottom: 14, left: 14, right: 14 }}
          >
            <Ionicons name="chevron-back" size={26} color="#f3f5f5" />
          </TouchableOpacity>
          <Text style={styles.tituloHeader}>Pesquisar Usuários</Text>
          <TouchableOpacity
            style={styles.botaoVoltar}
            onPress={handleVoltar}
            activeOpacity={0.7}
            hitSlop={{ top: 14, bottom: 14, left: 14, right: 14 }}
          >
            <Ionicons name="close" size={24} color="#a0a0a0" />
          </TouchableOpacity>
        </View>

        {/* Barra de Pesquisa */}
        <View style={styles.boxBusca}>
          <View style={styles.campoBusca}>
            <Ionicons name="search" size={18} color="#8e9297" style={styles.iconeBusca} />
            <TextInput
              style={styles.inputBusca}
              placeholder="Pesquisar por nome ou @usuario..."
              placeholderTextColor="#71767b"
              value={busca}
              onChangeText={setBusca}
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="while-editing"
            />
            {busca.length > 0 && (
              <TouchableOpacity
                onPress={() => setBusca('')}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons name="close-circle" size={18} color="#8e9297" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Subtítulo / Seção */}
        <View style={styles.boxSubtitulo}>
          <Text style={styles.textoSubtitulo}>
            {busca.trim() ? `Resultados da busca (${usuariosFiltrados.length})` : 'Sugestões para você'}
          </Text>
        </View>

        {/* Lista de Usuários */}
        <ScrollView
          style={styles.scrollLista}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.scrollContent, { paddingBottom: bottomPadding }]}
          keyboardShouldPersistTaps="handled"
        >
          {carregando ? (
            <View style={styles.boxCarregando}>
              <ActivityIndicator size="small" color="#f28b2d" />
            </View>
          ) : usuariosFiltrados.length === 0 ? (
            <View style={styles.boxVazio}>
              <Ionicons name="person-outline" size={44} color="#555" />
              <Text style={styles.textoVazioTitulo}>Nenhum usuário encontrado</Text>
              <Text style={styles.textoVazioDesc}>
                Não encontramos nenhum perfil correspondente a "{busca}".
              </Text>
            </View>
          ) : (
            usuariosFiltrados.map((item) => {
              const idKey = String(item.id || item.user || item.nome);
              const seguindo = !!mapaSeguindo[idKey];
              const falhouFoto = !!errosFoto[idKey];
              const fotoSource = !falhouFoto ? getFoto(item.foto) : null;

              return (
                <View key={idKey} style={styles.cardUsuario}>
                  {/* Foto ou Avatar */}
                  {fotoSource ? (
                    <Image
                      source={fotoSource}
                      style={styles.avatarImg}
                      onError={() => setErrosFoto((prev) => ({ ...prev, [idKey]: true }))}
                    />
                  ) : (
                    <View style={[styles.avatarCirculo, { backgroundColor: item.cor || '#4a4b59' }]}>
                      <Text style={styles.avatarTexto}>
                        {item.inicial || (item.nome ? item.nome.charAt(0).toUpperCase() : 'U')}
                      </Text>
                    </View>
                  )}

                  {/* Informações */}
                  <View style={styles.dadosUsuario}>
                    <Text style={styles.nomeUsuario} numberOfLines={1} ellipsizeMode="tail">
                      {item.nome}
                    </Text>
                    <Text style={styles.handleUsuario} numberOfLines={1} ellipsizeMode="tail">
                      {item.user}
                    </Text>
                  </View>

                  {/* Botão Seguir / Seguindo */}
                  <TouchableOpacity
                    style={[styles.botaoAcao, seguindo ? styles.botaoSeguindo : styles.botaoSeguir]}
                    activeOpacity={0.8}
                    onPress={() => alternarSeguir(item)}
                  >
                    <Text
                      style={[styles.textoBotao, seguindo ? styles.textoBotaoSeguindo : styles.textoBotaoSeguir]}
                      numberOfLines={1}
                    >
                      {seguindo ? 'Seguindo' : 'Seguir'}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#17181b',
  },
  contentWrapper: {
    flex: 1,
    width: '100%',
    maxWidth: 680,
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  botaoVoltar: {
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 36,
  },
  tituloHeader: {
    color: '#f3f5f5',
    fontSize: 20,
    fontWeight: '700',
  },
  boxBusca: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  campoBusca: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#26292e',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  iconeBusca: {
    marginRight: 8,
  },
  inputBusca: {
    flex: 1,
    color: '#ffffff',
    fontSize: 15,
    paddingVertical: 0,
  },
  boxSubtitulo: {
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 6,
  },
  textoSubtitulo: {
    color: '#9ca3af',
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  scrollLista: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 4,
    flexGrow: 1,
  },
  cardUsuario: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 70,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.07)',
  },
  avatarImg: {
    width: 46,
    height: 46,
    borderRadius: 23,
    marginRight: 12,
  },
  avatarCirculo: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  avatarTexto: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '700',
  },
  dadosUsuario: {
    flex: 1,
    justifyContent: 'center',
    marginRight: 10,
  },
  nomeUsuario: {
    color: '#f3f5f5',
    fontSize: 16,
    fontWeight: '600',
  },
  handleUsuario: {
    color: '#8e9297',
    fontSize: 13,
    marginTop: 2,
  },
  botaoAcao: {
    minWidth: 88,
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  botaoSeguir: {
    backgroundColor: '#f28b2d',
  },
  botaoSeguindo: {
    backgroundColor: '#2a2d31',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
  },
  textoBotao: {
    fontSize: 13,
    fontWeight: '700',
  },
  textoBotaoSeguir: {
    color: '#ffffff',
  },
  textoBotaoSeguindo: {
    color: '#e5e7eb',
  },
  boxCarregando: {
    paddingVertical: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxVazio: {
    paddingVertical: 60,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  textoVazioTitulo: {
    color: '#d1d5db',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 12,
  },
  textoVazioDesc: {
    color: '#6b7280',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 4,
    maxWidth: 280,
  },
});
