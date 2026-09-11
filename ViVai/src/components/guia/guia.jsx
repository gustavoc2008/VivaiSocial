import { SafeAreaView, ScrollView, Text, View } from 'react-native';

import styles from './guia';

export default function Guia() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Guia</Text>
        <Text style={styles.subtitulo}>
          Saiba como aproveitar o Vivai.
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.item}>
          <View style={styles.iconBox}>
            <Text style={styles.topicIcon}>1</Text>
          </View>
          <View style={styles.itemText}>
            <Text style={styles.itemTitle}>Primeiros passos</Text>
            <Text style={styles.itemDescription}>
              Configure seu perfil e comece a usar o Vivai.
            </Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </View>

        <View style={styles.item}>
          <View style={styles.iconBox}>
            <Text style={styles.topicIcon}>2</Text>
          </View>
          <View style={styles.itemText}>
            <Text style={styles.itemTitle}>Criar uma publicação</Text>
            <Text style={styles.itemDescription}>
              Compartilhe momentos e ideias com a comunidade.
            </Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </View>

        <View style={styles.item}>
          <View style={styles.iconBox}>
            <Text style={styles.topicIcon}>3</Text>
          </View>
          <View style={styles.itemText}>
            <Text style={styles.itemTitle}>Interagir</Text>
            <Text style={styles.itemDescription}>
              Curta e comente as publicações que você gosta.
            </Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </View>

        <View style={styles.item}>
          <View style={styles.iconBox}>
            <Text style={styles.topicIcon}>4</Text>
          </View>
          <View style={styles.itemText}>
            <Text style={styles.itemTitle}>Privacidade e segurança</Text>
            <Text style={styles.itemDescription}>
              Mantenha suas informações pessoais protegidas.
            </Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
