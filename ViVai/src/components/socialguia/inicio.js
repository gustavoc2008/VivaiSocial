import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

const itensGuia = [
  { id: 'inicio', titulo: 'Início', descricao: 'Feed de publicações', icone: require('../../../assets/Inicio.png') },
  { id: 'explorar', titulo: 'Explorar', descricao: 'Descubra pessoas e conteúdos', icone: require('../../../assets/Explorar.png') },
  { id: 'criar', titulo: 'Criar', descricao: 'Publique fotos, vídeos e textos', icone: require('../../../assets/Criar.png') },
  { id: 'notificacoes', titulo: 'Notificações', descricao: 'Veja interações e novidades', icone: require('../../../assets/Notificações.png') },
  { id: 'perfil', titulo: 'Perfil', descricao: 'Visualize e edite seu perfil', icone: require('../../../assets/Perfil.png') },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#17181b',
    paddingHorizontal: 18,
  },

  header: {
    paddingTop: 12,
    paddingBottom: 20,
  },

  titulo: {
    color: '#f4f5f6',
    fontSize: 34,
    fontWeight: '700',
    letterSpacing: -0.7,
  },

  subtitulo: {
    color: '#d8d8d8',
    fontSize: 17,
    lineHeight: 26,
    marginTop: 6,
    opacity: 0.85,
  },

  content: {
    paddingBottom: 16,
  },

  item: {
    minHeight: 90,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    marginBottom: 2,
  },

  iconBox: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: '#24262a',
    borderWidth: 1,
    borderColor: '#3a3d41',
    justifyContent: 'center',
    alignItems: 'center',
  },

  icone: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
    tintColor: '#f4f5f6',
  },

  iconeInicio: {
    tintColor: '#f28b2d',
  },

  itemText: {
    flex: 1,
    marginLeft: 18,
  },

  itemTitle: {
    color: '#f2f2f2',
    fontSize: 19,
    fontWeight: '600',
  },

  itemDescription: {
    color: '#b9b9b9',
    fontSize: 15,
    marginTop: 4,
  },

  arrow: {
    color: '#f1f1f1',
    fontSize: 35,
    fontWeight: '300',
    marginLeft: 12,
    lineHeight: 35,
  },
});

export default function Guia({ onNavigate = () => {} }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Guia</Text>
        <Text style={styles.subtitulo}>{`Navegação principal da sua rede social,${'\n'}sempre acessível.`}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {itensGuia.map((item, index) => (
          <Pressable key={item.id} style={styles.item} onPress={() => onNavigate(item.id)}>
            <View style={styles.iconBox}>
              <Image source={item.icone} style={[styles.icone, index === 0 && styles.iconeInicio]} />
            </View>

            <View style={styles.itemText}>
              <Text style={styles.itemTitle}>{item.titulo}</Text>
              <Text style={styles.itemDescription}>{item.descricao}</Text>
            </View>

            <Text style={styles.arrow}>{'›'}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}
