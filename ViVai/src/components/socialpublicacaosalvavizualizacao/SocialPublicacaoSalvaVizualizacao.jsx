import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function SocialPublicacaoSalvaVisualizacao() {
  const router = useRouter();

  return (
    <View style={styles.container}>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >

        {/* CABEÇALHO */}
        <View style={styles.header}>

          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons
              name="chevron-back"
              size={28}
              color="#F5F0E8"
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            Publicação
          </Text>

          <View style={{ width: 28 }} />

        </View>

        {/* USUÁRIO */}
        <View style={styles.userContainer}>

          <View style={styles.userLeft}>

            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
              }}
              style={styles.avatar}
            />

            <View>
              <Text style={styles.userName}>
                Maria Eduarda
              </Text>

              <Text style={styles.userHandle}>
                maria.cordeiro
              </Text>
            </View>

          </View>

          <Text style={styles.time}>
            2h
          </Text>

        </View>

        {/* FOTO DA PUBLICAÇÃO */}
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?w=1000',
          }}
          style={styles.postImage}
        />

        {/* LEGENDA */}
        <Text style={styles.caption}>
          Momentos assim são únicos! 😍
        </Text>

        {/* LOCALIZAÇÃO */}
        <View style={styles.locationContainer}>

          <Ionicons
            name="location-outline"
            size={17}
            color="#F5F0E8"
          />

          <Text style={styles.location}>
            Parque Ibirapuera, São Paulo
          </Text>

        </View>

        {/* AÇÕES */}
        <View style={styles.actions}>

          <TouchableOpacity style={styles.actionButton}>
            <Ionicons
              name="heart"
              size={29}
              color="#D9362E"
            />

            <Text style={styles.actionText}>
              24
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Ionicons
              name="chatbubble-outline"
              size={27}
              color="#F5F0E8"
            />

            <Text style={styles.actionText}>
              5
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Ionicons
              name="paper-plane-outline"
              size={28}
              color="#F5F0E8"
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.saveButton}>
            <Ionicons
              name="bookmark"
              size={27}
              color="#F5A000"
            />
          </TouchableOpacity>

        </View>

      </ScrollView>

      {/* MENU INFERIOR */}
      <View style={styles.bottomBar}>

        <TouchableOpacity
          style={styles.bottomItem}
          onPress={() => router.push('/vivai')}
        >
          <Ionicons
            name="home"
            size={27}
            color="#F5F0E8"
          />

          <Text style={styles.bottomText}>
            Início
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.bottomItem}>
          <Ionicons
            name="search-outline"
            size={29}
            color="#F5F0E8"
          />

          <Text style={styles.bottomText}>
            Explorar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.bottomItem}>
          <Ionicons
            name="add-circle-outline"
            size={31}
            color="#F5F0E8"
          />

          <Text style={styles.bottomText}>
            Criar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.bottomItem}>
          <Ionicons
            name="notifications-outline"
            size={28}
            color="#F5F0E8"
          />

          <Text style={styles.bottomText}>
            Notificações
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bottomItem}
          onPress={() => router.push('/vivai/editarPerfil')}
        >
          <Ionicons
            name="person-outline"
            size={29}
            color="#F5A000"
          />

          <Text style={[styles.bottomText, styles.activeText]}>
            Perfil
          </Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = {

  container: {
    flex: 1,
    backgroundColor: '#292929',
  },

  scrollContent: {
    paddingBottom: 20,
  },

  header: {
    height: 65,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#454545',
  },

  headerTitle: {
    color: '#F5F0E8',
    fontSize: 17,
    fontWeight: '600',
  },

  userContainer: {
    height: 75,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  userLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginRight: 10,
  },

  userName: {
    color: '#F5F0E8',
    fontSize: 14,
    fontWeight: '600',
  },

  userHandle: {
    color: '#BDB8B0',
    fontSize: 11,
    marginTop: 2,
  },

  time: {
    color: '#CFC8BE',
    fontSize: 11,
  },

  postImage: {
    width: '100%',
    height: 340,
    resizeMode: 'cover',
  },

  caption: {
    color: '#F5F0E8',
    fontSize: 16,
    paddingHorizontal: 18,
    paddingTop: 12,
  },

  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    marginTop: 8,
  },

  location: {
    color: '#D0C9C0',
    fontSize: 11,
    marginLeft: 5,
  },

  actions: {
    height: 75,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },

  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 25,
  },

  actionText: {
    color: '#F5F0E8',
    fontSize: 13,
    marginLeft: 4,
  },

  saveButton: {
    marginLeft: 'auto',
  },

  bottomBar: {
    height: 75,
    backgroundColor: '#292929',
    borderTopWidth: 1,
    borderTopColor: '#454545',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  bottomItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  bottomText: {
    color: '#F5F0E8',
    fontSize: 9,
    marginTop: 3,
  },

  activeText: {
    color: '#F5A000',
  },

};