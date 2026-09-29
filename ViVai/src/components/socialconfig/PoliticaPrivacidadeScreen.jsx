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

const SECOES_POLITICA = [
  {
    numero: '1',
    titulo: 'Quais Dados Coletamos',
    icone: 'document-lock-outline',
    conteudo:
      'Coletamos dados cadastrais (nome, @usuário, e-mail e senha criptografada), informações do seu perfil público (foto, biografia e capa), além das fotografias e descrições dos pontos turísticos que você decide publicar na plataforma.',
  },
  {
    numero: '2',
    titulo: 'Localização Geográfica',
    icone: 'navigate-outline',
    conteudo:
      'O ViVai solicita acesso à sua localização apenas para ajudar na descoberta de atrações turísticas próximas e permitir o check-in em lugares reais. Você pode desativar o acesso ao GPS nas configurações do seu sistema a qualquer momento.',
  },
  {
    numero: '3',
    titulo: 'Como Utilizamos seus Dados',
    icone: 'construct-outline',
    conteudo:
      'Os dados coletados são utilizados para operar a rede social, recomendar novos pontos turísticos, exibir publicações de pessoas que você segue e manter sua conta segura contra fraudes ou acessos indevidos.',
  },
  {
    numero: '4',
    titulo: 'Compartilhamento com Terceiros',
    icone: 'shield-outline',
    conteudo:
      'Não comercializamos, alugamos nem vendemos dados pessoais a terceiros. Informações públicas (como fotos e nome de usuário) são visíveis para outros usuários da rede conforme as suas preferências de privacidade.',
  },
  {
    numero: '5',
    titulo: 'Seus Direitos (LGPD)',
    icone: 'ribbon-outline',
    conteudo:
      'Em conformidade com a LGPD (Lei nº 13.709/2018), você tem o direito de solicitar a confirmação, o acesso, a correção e a exclusão definitiva dos seus dados pessoais e de sua conta a qualquer momento.',
  },
  {
    numero: '6',
    titulo: 'Encarregado de Dados (DPO)',
    icone: 'mail-outline',
    conteudo:
      'Para exercer seus direitos de privacidade ou esclarecer dúvidas sobre o tratamento de informações, envie uma mensagem diretamente para nosso canal de privacidade: privacidade@vivai.app',
  },
];

export default function PoliticaPrivacidadeScreen() {
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
        <Text style={styles.headerTitulo}>Política de privacidade</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.conteudo}
        showsVerticalScrollIndicator={false}
      >
        {/* Banner Informativo */}
        <View style={styles.bannerTopo}>
          <View style={styles.badgeLgpd}>
            <Ionicons name="shield-checkmark" size={14} color="#10B981" style={{ marginRight: 6 }} />
            <Text style={styles.badgeLgpdTexto}>Conformidade com a LGPD</Text>
          </View>
          <Text style={styles.tituloPrincipal}>Protegendo sua privacidade e seus dados</Text>
          <Text style={styles.subtituloPrincipal}>
            A ViVai tem o compromisso de proteger sua privacidade e tratar seus dados pessoais com transparência, segurança e respeito.
          </Text>
        </View>

        {/* Seções */}
        {SECOES_POLITICA.map((secao) => (
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

        {/* Botão de Ciente */}
        <TouchableOpacity
          style={styles.botaoCiente}
          activeOpacity={0.85}
          onPress={() => router.back()}
        >
          <Ionicons name="checkmark-done" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
          <Text style={styles.botaoCienteTexto}>Estou ciente</Text>
        </TouchableOpacity>

        <Text style={styles.notaRodape}>
          Última atualização: Setembro de 2026 • ViVai Social Inc.
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
  badgeLgpd: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  badgeLgpdTexto: {
    color: '#10B981',
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
  botaoCiente: {
    backgroundColor: CORES.laranja,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    borderRadius: 12,
    marginTop: 16,
  },
  botaoCienteTexto: {
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
