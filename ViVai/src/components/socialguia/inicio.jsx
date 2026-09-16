import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import styles from './inicio';

const itensGuia = [
  { id: 'inicio', titulo: 'Início', descricao: 'Feed de publicações', icone: require('../../../assets/Inicio.png') },
  { id: 'explorar', titulo: 'Explorar', descricao: 'Descubra pessoas e conteúdos', icone: require('../../../assets/Explorar.png') },
  { id: 'criar', titulo: 'Criar', descricao: 'Publique fotos, vídeos e textos', icone: require('../../../assets/Criar.png') },
  { id: 'notificacoes', titulo: 'Notificações', descricao: 'Veja interações e novidades', icone: require('../../../assets/Notificações.png') },
  { id: 'perfil', titulo: 'Perfil', descricao: 'Visualize e edite seu perfil', icone: require('../../../assets/Perfil.png') },
];

export default function Guia({ onNavigate = () => {} }) {
  return <View style={styles.container}><View style={styles.header}><Text style={styles.titulo}>Guia</Text><Text style={styles.subtitulo}>Navegação principal da sua rede social,{`\n`}sempre acessível.</Text></View><ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>{itensGuia.map((item, index) => <Pressable key={item.id} style={styles.item} onPress={() => onNavigate(item.id)}><View style={styles.iconBox}><Image source={item.icone} style={[styles.icone, index === 0 && styles.iconeInicio]} /></View><View style={styles.itemText}><Text style={styles.itemTitle}>{item.titulo}</Text><Text style={styles.itemDescription}>{item.descricao}</Text></View><Text style={styles.arrow}>›</Text></Pressable>)}</ScrollView></View>;
}
