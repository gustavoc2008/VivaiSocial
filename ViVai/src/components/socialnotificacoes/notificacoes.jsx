import React from "react";

import {
  View,
  Text,
  ScrollView,
  Pressable,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { BottomNav } from "../bottomnav/BottomNav";

import styles from "./notificacoes";

export default function NotificacoesTela() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>

        <View style={styles.header}>

          <Text style={styles.titulo}>
            Notificações
          </Text>

          <Pressable>
            <Text style={styles.marcar}>
              Marcar todas como lidas
            </Text>
          </Pressable>

        </View>

        <ScrollView
          contentContainerStyle={{
            paddingBottom: 100
          }}
        >

          {/* Conteúdo das notificações */}

        </ScrollView>

        <BottomNav />

      </View>
    </SafeAreaView>
  );
}