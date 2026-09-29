import React from 'react';
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

const CORES = {
  fundo: '#0D0D0D',
  cartao: '#1C1C1E',
  laranja: '#FF7A00',
  texto: '#FFFFFF',
  textoSecundario: '#9CA3AF',
  borda: '#282828',
};

const SECOES_TERMOS = [
  {
    numero: '1',
    titulo: 'Aceitação dos Termos',
    icone: 'checkmark-circle-outline',
    conteudo:
      'Ao criar uma conta ou utilizar o aplicativo ViVai, você concorda expressamente com estes Termos de Uso e com nossa Política de Privacidade. O ViVai é uma plataforma social voltada ao compartilhamento de vivências, fotografias, roteiros e recomendações de pontos turísticos.',
  },
  {
    numero: '2',
    titulo: 'Cadastro e Responsabilidade',
    icone: 'person-outline',
    conteudo:
      'Você é responsável por manter a confidencialidade das credenciais de acesso da sua conta e por todas as atividades nela realizadas. É proibido criar contas falsas, se passar por outra pessoa ou fornecer dados fraudulentos.',
  },
  {
    numero: '3',
    titulo: 'Conteúdo e Pontos Turísticos',
    icone: 'images-outline',
    conteudo:
      'Você mantém a titularidade das fotografias e textos publicados no ViVai, concedendo à plataforma uma licença não exclusiva para exibição, recomendação e distribuição aos demais usuários do aplicativo. Não é permitido publicar fotos de propriedade alheia sem autorização.',
  },
  {
    numero: '4',
    titulo: 'Diretrizes da Comunidade',
    icone: 'heart-outline',
    conteudo:
      'A comunidade ViVai preza pelo respeito mútuo. É terminantemente proibido publicar conteúdo ofensivo, discriminatório, incitação à violência, spam ou violação de privacidade de outros indivíduos.',
  },
  {
    numero: '5',
    titulo: 'Localização e Informações Turísticas',
    icone: 'map-outline',
    conteudo:
      'As informações de horários, preços de ingressos e localizações de pontos turísticos são colaborativas e informativas. O ViVai busca mantê-las atualizadas, mas não se responsabiliza por eventuais alterações nos estabelecimentos parceiros ou públicos.',
  },
  {
    numero: '6',
    titulo: 'Modificações dos Termos',
    icone: 'newspaper-outline',
    conteudo:
      'Estes termos podem ser atualizados periodicamente para refletir melhorias no app ou exigências legais. Notificaremos os usuários sobre mudanças substanciais diretamente pelo aplicativo.',
  },
];

export default function TermosUsoScreen() {
  const router = useRouter();

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
        <Text style={styles.headerTitulo}>Termos de uso</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.conteudo}
        showsVerticalScrollIndicator={false}
      >
        {/* Banner do Topo */}
        <View style={styles.bannerTopo}>
          <View style={styles.badgeVersao}>
            <Text style={styles.badgeVersaoTexto}>Versão 1.2 • Setembro 2026</Text>
          </View>
          <Text style={styles.tituloPrincipal}>Termos e Condições de Uso da ViVai</Text>
          <Text style={styles.subtituloPrincipal}>
            Por favor, leia atentamente as condições que regem a navegação e a utilização dos serviços na plataforma ViVai Social.
          </Text>
        </View>

        {/* Tópicos dos Termos */}
        {SECOES_TERMOS.map((secao) => (
          <View key={secao.numero} style={styles.cardSecao}>
            <View style={styles.cardHeader}>
              <View style={styles.iconeBox}>
                <Ionicons name={secao.icone} size={18} color={CORES.laranja} />
              </View>
              <Text style={styles.cardTitulo}>
                {secao.numero}. {secao.titulo}
              </Text>
            </View>
            <Text style={styles.cardTexto}>{secao.conteudo}</Text>
          </View>
        ))}

        {/* Botão de Entendido */}
        <TouchableOpacity
          style={styles.botaoEntendido}
          activeOpacity={0.85}
          onPress={() => router.back()}
        >
          <Ionicons name="checkmark-done" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
          <Text style={styles.botaoEntendidoTexto}>Compreendi e concordo</Text>
        </TouchableOpacity>

        <Text style={styles.notaRodape}>
          Dúvidas sobre os termos? Entre em contato pelo e-mail suporte@vivai.app
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
  bannerTopo: {
    backgroundColor: CORES.cartao,
    padding: 18,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: CORES.borda,
    marginBottom: 20,
  },
  badgeVersao: {
    backgroundColor: 'rgba(255, 122, 0, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  badgeVersaoTexto: {
    color: CORES.laranja,
    fontSize: 11,
    fontWeight: '600',
  },
  tituloPrincipal: {
    color: CORES.texto,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },
  subtituloPrincipal: {
    color: CORES.textoSecundario,
    fontSize: 13,
    lineHeight: 18,
  },
  cardSecao: {
    backgroundColor: CORES.cartao,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: CORES.borda,
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconeBox: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 122, 0, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  cardTitulo: {
    color: CORES.texto,
    fontSize: 14,
    fontWeight: '600',
  },
  cardTexto: {
    color: '#D1D5DB',
    fontSize: 13,
    lineHeight: 19,
  },
  botaoEntendido: {
    backgroundColor: CORES.laranja,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    borderRadius: 12,
    marginTop: 16,
  },
  botaoEntendidoTexto: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  notaRodape: {
    color: '#666666',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 20,
    paddingHorizontal: 16,
  },
});
