import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
  Linking,
  Platform,
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

export default function SobreViVaiScreen() {
  const router = useRouter();

  const handleContato = () => {
    const email = 'mailto:contato@vivai.app?subject=Contato%20ViVai%20App';
    Linking.openURL(email).catch(() => {
      if (Platform.OS === 'web') {
        alert('Entre em contato pelo e-mail: contato@vivai.app');
      }
    });
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
        <Text style={styles.headerTitulo}>Sobre a ViVai</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.conteudo}
        showsVerticalScrollIndicator={false}
      >
        {/* Card Hero com Logo */}
        <View style={styles.heroCard}>
          <Image
            source={require('../../../assets/712a884c-15f9-45b6-a83a-48e3c34d4494__1_-removebg-preview.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.nomeApp}>ViVai</Text>
          <Text style={styles.sloganApp}>Sua rede social de viagens e experiências</Text>

          <View style={styles.versaoBadge}>
            <Text style={styles.versaoTexto}>Versão 1.0.0 (Release 2026)</Text>
          </View>
        </View>

        {/* Nossa Missão */}
        <View style={styles.cardInfo}>
          <View style={styles.cardHeader}>
            <View style={styles.iconeBox}>
              <Ionicons name="compass-outline" size={20} color={CORES.laranja} />
            </View>
            <Text style={styles.cardTitulo}>Nossa Missão</Text>
          </View>
          <Text style={styles.cardTexto}>
            A ViVai foi criada para transformar a maneira como você descobre e compartilha lugares incríveis. Unimos fotografia, turismo e comunidade para que cada viagem — perto ou longe — se torne uma experiência inesquecível.
          </Text>
        </View>

        {/* Destaques */}
        <View style={styles.cardInfo}>
          <View style={styles.cardHeader}>
            <View style={styles.iconeBox}>
              <Ionicons name="sparkles-outline" size={20} color={CORES.laranja} />
            </View>
            <Text style={styles.cardTitulo}>O que você encontra aqui</Text>
          </View>

          <View style={styles.itemDestaque}>
            <Ionicons name="location" size={16} color={CORES.laranja} style={{ marginRight: 10 }} />
            <Text style={styles.itemDestaqueTexto}>
              Catálogo interativo com os principais pontos turísticos do Brasil.
            </Text>
          </View>

          <View style={styles.divisor} />

          <View style={styles.itemDestaque}>
            <Ionicons name="camera" size={16} color={CORES.laranja} style={{ marginRight: 10 }} />
            <Text style={styles.itemDestaqueTexto}>
              Feed dinâmico com fotos reais tiradas por viajantes como você.
            </Text>
          </View>

          <View style={styles.divisor} />

          <View style={styles.itemDestaque}>
            <Ionicons name="map" size={16} color={CORES.laranja} style={{ marginRight: 10 }} />
            <Text style={styles.itemDestaqueTexto}>
              Integração com mapas e geolocalização para chegar aos seus destinos.
            </Text>
          </View>
        </View>

        {/* Links Rápidos */}
        <View style={styles.cardInfo}>
          <View style={styles.cardHeader}>
            <View style={styles.iconeBox}>
              <Ionicons name="link-outline" size={20} color={CORES.laranja} />
            </View>
            <Text style={styles.cardTitulo}>Documentos e Suporte</Text>
          </View>

          <TouchableOpacity
            style={styles.itemLink}
            activeOpacity={0.7}
            onPress={() => router.push('/vivai/termos')}
          >
            <View style={styles.linkEsquerda}>
              <Ionicons name="document-text-outline" size={18} color={CORES.texto} />
              <Text style={styles.linkTexto}>Termos de uso</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={CORES.textoSecundario} />
          </TouchableOpacity>

          <View style={styles.divisor} />

          <TouchableOpacity
            style={styles.itemLink}
            activeOpacity={0.7}
            onPress={() => router.push('/vivai/politica')}
          >
            <View style={styles.linkEsquerda}>
              <Ionicons name="shield-outline" size={18} color={CORES.texto} />
              <Text style={styles.linkTexto}>Política de privacidade</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={CORES.textoSecundario} />
          </TouchableOpacity>

          <View style={styles.divisor} />

          <TouchableOpacity
            style={styles.itemLink}
            activeOpacity={0.7}
            onPress={handleContato}
          >
            <View style={styles.linkEsquerda}>
              <Ionicons name="mail-outline" size={18} color={CORES.texto} />
              <Text style={styles.linkTexto}>Fale conosco (contato@vivai.app)</Text>
            </View>
            <Ionicons name="open-outline" size={18} color={CORES.textoSecundario} />
          </TouchableOpacity>
        </View>

        {/* Copyright */}
        <View style={styles.rodape}>
          <Text style={styles.rodapeTexto}>© 2026 ViVai Social Inc.</Text>
          <Text style={styles.rodapeSubtexto}>Todos os direitos reservados.</Text>
        </View>
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
  heroCard: {
    backgroundColor: CORES.cartao,
    alignItems: 'center',
    paddingVertical: 28,
    paddingHorizontal: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: CORES.borda,
    marginBottom: 16,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 12,
  },
  nomeApp: {
    color: CORES.texto,
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  sloganApp: {
    color: CORES.textoSecundario,
    fontSize: 13,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 14,
  },
  versaoBadge: {
    backgroundColor: 'rgba(255, 122, 0, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 122, 0, 0.25)',
  },
  versaoTexto: {
    color: CORES.laranja,
    fontSize: 12,
    fontWeight: '600',
  },
  cardInfo: {
    backgroundColor: CORES.cartao,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: CORES.borda,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconeBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 122, 0, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  cardTitulo: {
    color: CORES.texto,
    fontSize: 15,
    fontWeight: '600',
  },
  cardTexto: {
    color: '#D1D5DB',
    fontSize: 13,
    lineHeight: 20,
  },
  itemDestaque: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  itemDestaqueTexto: {
    flex: 1,
    color: '#D1D5DB',
    fontSize: 13,
    lineHeight: 18,
  },
  itemLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  linkEsquerda: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkTexto: {
    color: CORES.texto,
    fontSize: 13,
    marginLeft: 10,
  },
  divisor: {
    height: 1,
    backgroundColor: CORES.borda,
  },
  rodape: {
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 20,
  },
  rodapeTexto: {
    color: '#777777',
    fontSize: 12,
    fontWeight: '500',
  },
  rodapeSubtexto: {
    color: '#555555',
    fontSize: 11,
    marginTop: 2,
  },
});
