import { useMemo, useState, useEffect, useCallback } from 'react';
import {
  Pressable,
  ScrollView,
  Text,
  View,
  StatusBar,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams, useFocusEffect } from 'expo-router';
import styles from './SeguidoresStyle';
import { useAuth } from '../../context/Context';
import { criarNotificacaoSeguir } from '../../services/notificacoesService';
import {
  carregarDadosSeguidores,
  alternarSeguirUsuario,
} from '../../services/seguidoresService';

export default function Seguidores() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const { usuarioLogado } = useAuth();

  const [abaAtiva, setAbaAtiva] = useState(
    params?.aba === 'seguindo' ? 'seguindo' : 'seguidores'
  );
  const [dadosSeguidores, setDadosSeguidores] = useState({ seguidores: [], seguindo: [] });
  const [carregando, setCarregando] = useState(true);

  const carregarListas = async () => {
    try {
      const dados = await carregarDadosSeguidores(usuarioLogado?.id);
      setDadosSeguidores(dados);
    } catch (e) {
      console.log('Erro ao carregar listas de seguidores:', e);
    } finally {
      setCarregando(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      carregarListas();
    }, [usuarioLogado?.id])
  );

  useEffect(() => {
    if (params?.aba === 'seguindo' || params?.aba === 'seguidores') {
      setAbaAtiva(params.aba);
    }
  }, [params?.aba]);

  // Garante que o topo NUNCA colida ou suba para cima da barra de status / entalhe
  const topPadding = useMemo(() => {
    if (Platform.OS === 'android') {
      const statusBarH = StatusBar.currentHeight || 0;
      return Math.max(insets?.top || 0, statusBarH) + 12;
    }
    if (Platform.OS === 'ios') {
      const iosTop = insets?.top || 0;
      return (iosTop > 0 ? iosTop : 44) + 8;
    }
    return Math.max(insets?.top || 0, 16);
  }, [insets?.top]);

  const bottomPadding = useMemo(() => {
    return Math.max(insets?.bottom || 0, Platform.OS === 'android' ? 16 : 24) + 16;
  }, [insets?.bottom]);

  // A lista exibida reflete exatamente a quantidade de seguidores ou de pessoas seguindo
  const lista = useMemo(() => {
    if (abaAtiva === 'seguidores') {
      return dadosSeguidores.seguidores || [];
    }
    return dadosSeguidores.seguindo || [];
  }, [abaAtiva, dadosSeguidores]);

  const alternarSeguir = async (usuario) => {
    try {
      const res = await alternarSeguirUsuario(usuario, usuarioLogado?.id);
      if (res && res.dados) {
        setDadosSeguidores(res.dados);
        if (res.estaSeguindo) {
          criarNotificacaoSeguir({
            usuarioAlvo: usuario,
            usuarioLogado,
          });
        }
      }
    } catch (error) {
      console.log('Erro ao alternar seguir:', error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#17181b" />

      <View style={styles.contentWrapper}>
        {/* Header com botão de voltar funcional e espaçamento seguro superior */}
        <View style={[styles.header, { paddingTop: topPadding }]}>
          <Pressable
            onPress={() => router.back()}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            style={styles.voltarPressable}
          >
            <Text style={styles.voltar}>‹</Text>
          </Pressable>
          <Text style={styles.titulo}>Seguidores</Text>
        </View>

        {/* Abas de navegação interna */}
        <View style={styles.tabs}>
          <Pressable
            style={[styles.tab, abaAtiva === 'seguidores' && styles.tabAtiva]}
            onPress={() => setAbaAtiva('seguidores')}
          >
            <Text
              style={[styles.tabText, abaAtiva === 'seguidores' && styles.tabTextAtiva]}
              numberOfLines={1}
            >
              Seguidores
            </Text>
          </Pressable>

          <Pressable
            style={[styles.tab, abaAtiva === 'seguindo' && styles.tabAtiva]}
            onPress={() => setAbaAtiva('seguindo')}
          >
            <Text
              style={[styles.tabText, abaAtiva === 'seguindo' && styles.tabTextAtiva]}
              numberOfLines={1}
            >
              Seguindo
            </Text>
          </Pressable>
        </View>

        {/* Lista de usuários sincronizada com a quantidade real */}
        <ScrollView
          style={styles.lista}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.listaContent, { paddingBottom: bottomPadding }]}
        >
          {carregando ? (
            <View style={styles.vazioContainer}>
              <ActivityIndicator size="small" color="#f28b2d" />
            </View>
          ) : lista.length === 0 ? (
            <View style={styles.vazioContainer}>
              <Text style={styles.vazioTexto}>
                {abaAtiva === 'seguidores'
                  ? 'Você ainda não tem seguidores.'
                  : 'Você ainda não segue ninguém.'}
              </Text>
            </View>
          ) : (
            lista.map((usuario) => (
              <View key={`${usuario.id || usuario.nome}-${usuario.user}`} style={styles.item}>
                <View style={[styles.avatar, { backgroundColor: usuario.cor || '#4a4b59' }]}>
                  <Text style={styles.avatarTexto}>
                    {usuario.inicial || (usuario.nome ? usuario.nome.charAt(0).toUpperCase() : 'U')}
                  </Text>
                </View>

                <View style={styles.dados}>
                  <Text style={styles.nome} numberOfLines={1} ellipsizeMode="tail">
                    {usuario.nome}
                  </Text>
                  <Text style={styles.usuario} numberOfLines={1} ellipsizeMode="tail">
                    {usuario.user}
                  </Text>
                </View>

                <Pressable
                  onPress={() => alternarSeguir(usuario)}
                  style={[styles.botao, usuario.seguindo ? styles.botaoSeguindo : styles.botaoSeguir]}
                >
                  <Text style={styles.botaoTexto} numberOfLines={1}>
                    {usuario.seguindo ? 'Seguindo' : 'Seguir'}
                  </Text>
                </Pressable>
              </View>
            ))
          )}
        </ScrollView>
      </View>
    </View>
  );
}