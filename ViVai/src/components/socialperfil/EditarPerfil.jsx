import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../../context/Context';
import { api } from '../../services/json';

export default function EditarPerfil() {
  const router = useRouter();
  const { usuarioLogado, atualizarUsuario } = useAuth();

  const [name, setName] = useState(usuarioLogado?.nome || 'Rafaela Meira');
  const [username, setUsername] = useState(
    usuarioLogado?.usuario ? usuarioLogado.usuario.replace(/^@/, '') : 'rafaealmeira'
  );
  const [bio, setBio] = useState(
    usuarioLogado?.bio || 'Apaixonada por tecnologia, viagens e por boas histórias. ✨'
  );
  const [avatar, setAvatar] = useState(
    usuarioLogado?.foto ||
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400'
  );
  const [banner, setBanner] = useState(
    usuarioLogado?.banner || usuarioLogado?.capa || ''
  );
  const [salvando, setSalvando] = useState(false);

  const maxBioLength = 150;

  const escolherFoto = async () => {
    try {
      const permissao = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissao.granted) {
        alert('Precisamos de permissão para acessar a galeria.');
        return;
      }

      const resultado = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!resultado.canceled && resultado.assets && resultado.assets[0]?.uri) {
        setAvatar(resultado.assets[0].uri);
      }
    } catch (erro) {
      console.log('Erro ao escolher foto:', erro);
    }
  };

  const escolherBanner = async () => {
    try {
      const permissao = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissao.granted) {
        alert('Precisamos de permissão para acessar a galeria.');
        return;
      }

      const resultado = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.8,
      });

      if (!resultado.canceled && resultado.assets && resultado.assets[0]?.uri) {
        setBanner(resultado.assets[0].uri);
      }
    } catch (erro) {
      console.log('Erro ao escolher banner:', erro);
    }
  };

  const handleSave = async () => {
    if (!name.trim()) {
      alert('Por favor, informe seu nome.');
      return;
    }

    if (!username.trim()) {
      alert('Por favor, informe seu nome de usuário.');
      return;
    }

    setSalvando(true);

    const dadosAtualizados = {
      nome: name.trim(),
      usuario: username.trim().replace(/^@/, ''),
      bio: bio.trim(),
      foto: avatar,
      banner: banner,
    };

    try {
      if (atualizarUsuario) {
        await atualizarUsuario(dadosAtualizados);
      }

      if (usuarioLogado?.id) {
        try {
          await api.patch(`/usuarios/${usuarioLogado.id}`, dadosAtualizados);
        } catch (apiError) {
          console.log('Aviso ao sincronizar com API:', apiError?.message);
        }
      }

      if (Platform.OS === 'web') {
        alert('Perfil atualizado com sucesso!');
        router.back();
      } else {
        Alert.alert('Sucesso!', 'Perfil atualizado com sucesso.', [
          { text: 'OK', onPress: () => router.back() },
        ]);
      }
    } catch (erro) {
      console.log('Erro ao salvar alterações:', erro);
      alert('Não foi possível salvar as alterações.');
    } finally {
      setSalvando(false);
    }
  };

  const renderAvatarSource = () => {
    if (!avatar) {
      return require('../../../assets/pessoa.jpeg');
    }
    if (
      typeof avatar === 'string' &&
      (avatar.startsWith('http') ||
        avatar.startsWith('file') ||
        avatar.startsWith('blob') ||
        avatar.startsWith('data:') ||
        avatar.includes('/'))
    ) {
      return { uri: avatar };
    }
    if (avatar === 'pessoa.jpeg') {
      return require('../../../assets/pessoa.jpeg');
    }
    return { uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400' };
  };

  const renderBannerSource = () => {
    if (!banner) {
      return require('../../../assets/airbnb.jpg');
    }
    if (
      typeof banner === 'string' &&
      (banner.startsWith('http') ||
        banner.startsWith('file') ||
        banner.startsWith('blob') ||
        banner.startsWith('data:') ||
        banner.includes('/'))
    ) {
      return { uri: banner };
    }
    return require('../../../assets/airbnb.jpg');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={26} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Editar perfil</Text>
        <View style={{ width: 26 }} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          {/* Seção Banner / Capa */}
          <View style={styles.bannerSection}>
            <Text style={styles.label}>Capa do perfil (Banner)</Text>
            <View style={styles.bannerWrapper}>
              <Image source={renderBannerSource()} style={styles.bannerImage} resizeMode="cover" />
              <TouchableOpacity
                style={styles.bannerEditButton}
                activeOpacity={0.8}
                onPress={escolherBanner}
              >
                <Ionicons name="camera" size={16} color="#FFFFFF" />
                <Text style={styles.bannerEditText}>Alterar banner</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Foto de Perfil */}
          <View style={styles.avatarSection}>
            <Text style={styles.label}>Foto de perfil</Text>
            <View style={styles.avatarWrapper}>
              <TouchableOpacity activeOpacity={0.8} onPress={escolherFoto}>
                <Image source={renderAvatarSource()} style={styles.avatar} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.cameraBadge} activeOpacity={0.8} onPress={escolherFoto}>
                <Ionicons name="camera" size={16} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Campo Nome */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nome</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholderTextColor="#666"
            />
          </View>

          {/* Campo Usuário */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>@usuário</Text>
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              placeholderTextColor="#666"
            />
          </View>

          {/* Campo Bio */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Bio</Text>
            <View style={styles.bioContainer}>
              <TextInput
                style={styles.bioInput}
                value={bio}
                onChangeText={setBio}
                multiline
                maxLength={maxBioLength}
                placeholderTextColor="#666"
                textAlignVertical="top"
              />
              <Text style={styles.charCounter}>
                {bio.length}/{maxBioLength}
              </Text>
            </View>
          </View>

          {/* Botão Salvar */}
          <TouchableOpacity
            style={[styles.saveButton, salvando && { opacity: 0.7 }]}
            activeOpacity={0.85}
            onPress={handleSave}
            disabled={salvando}
          >
            <Text style={styles.saveButtonText}>
              {salvando ? 'Salvando...' : 'Salvar alterações'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  bannerSection: {
    marginTop: 10,
    marginBottom: 20,
  },
  bannerWrapper: {
    width: '100%',
    height: 140,
    borderRadius: 14,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#1C1C1E',
    borderWidth: 1,
    borderColor: '#2C2C2E',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerEditButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  bannerEditText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 6,
  },
  avatarSection: {
    marginBottom: 20,
    alignItems: 'center',
  },
  avatarWrapper: {
    alignSelf: 'center',
    marginTop: 8,
    position: 'relative',
  },
  avatar: {
    width: 105,
    height: 105,
    borderRadius: 52.5,
    borderWidth: 2,
    borderColor: '#333333',
    backgroundColor: '#1C1C1E',
  },
  cameraBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#D95300',
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#121212',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    color: '#E0E0E0',
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#1C1C1E',
    borderColor: '#2C2C2E',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: '#FFFFFF',
    fontSize: 15,
  },
  bioContainer: {
    backgroundColor: '#1C1C1E',
    borderColor: '#2C2C2E',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    minHeight: 120,
    justifyContent: 'space-between',
  },
  bioInput: {
    color: '#FFFFFF',
    fontSize: 15,
    padding: 0,
    minHeight: 70,
  },
  charCounter: {
    color: '#777777',
    fontSize: 12,
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  saveButton: {
    backgroundColor: '#D95300',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 12,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
