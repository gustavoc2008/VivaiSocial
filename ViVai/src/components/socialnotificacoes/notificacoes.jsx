import { useState } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { notificacoes } from './notificacoesData.js';
import styles from './NotificacoesStyle.js';
import { BottomNav } from '../bottomnav/BottomNav.jsx';

const icones = {
  curtida: require('../../../assets/coracao.png'),
  comentario: require('../../../assets/comentario.png'),
  seguir: require('../../../assets/AdicionarAmigo.png'),
};

export default function Notificacoes() {
  const [lidas, setLidas] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Notificações</Text>
        <Pressable hitSlop={8} onPress={() => setLidas(true)}>
          <Text style={styles.marcar}>Marcar todas como lidas</Text>
        </Pressable>
      </View>

      <ScrollView
        style={styles.lista}
        contentContainerStyle={styles.listaContent}
        showsVerticalScrollIndicator={false}
      >
        {notificacoes.map((notificacao) => (
          <View key={`${notificacao.nome}-${notificacao.tempo}`} style={styles.notificacao}>
            <View style={styles.iconeContainer}>
              <Image source={icones[notificacao.tipo]} style={styles.icone} />
            </View>

            <View style={[styles.avatar, { backgroundColor: notificacao.cor }]}>
              <Text style={styles.avatarTexto}>{notificacao.inicial}</Text>
            </View>

            <View style={styles.conteudo}>
              <Text style={styles.mensagem}>
                <Text style={styles.nome}>{notificacao.nome}</Text>
                {` ${notificacao.mensagem}`}
              </Text>
              <Text style={styles.tempo}>{notificacao.tempo}</Text>
            </View>

            {notificacao.naoLida && !lidas ? <View style={styles.ponto} /> : null}
          </View>
        ))}
      </ScrollView>

      <BottomNav/>
    </View>
    
  );
}
