import { View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import styles from './notificacoes';
import { BottomNav } from '../bottomnav/BottomNav';

export const Notificacoes = () => {
  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.titulo}>Notificações</Text>

        <Pressable>
          <Text style={styles.marcar}>
            Marcar todas como lidas
          </Text>
        </Pressable>
      </View>

      <ScrollView>
        {/* conteúdo das notificações */}
      </ScrollView>

      <BottomNav />

    </SafeAreaView>
  );
}