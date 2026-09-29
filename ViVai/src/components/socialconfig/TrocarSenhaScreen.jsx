import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  StatusBar,
  Alert,
  Platform,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/Context';
import { api } from '../../services/json';

const CORES = {
  fundo: '#0D0D0D',
  cartao: '#1C1C1E',
  laranja: '#FF7A00',
  texto: '#FFFFFF',
  textoSecundario: '#9CA3AF',
  borda: '#282828',
  inputBg: '#242426',
  erro: '#EF4444',
  sucesso: '#10B981',
};

export default function TrocarSenhaScreen() {
  const router = useRouter();
  const { usuarioLogado, atualizarUsuario } = useAuth();

  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const [mostrarSenhaAtual, setMostrarSenhaAtual] = useState(false);
  const [mostrarNovaSenha, setMostrarNovaSenha] = useState(false);
  const [mostrarConfirmar, setMostrarConfirmar] = useState(false);

  const [salvando, setSalvando] = useState(false);
  const [mensagemErro, setMensagemErro] = useState('');

  const handleSalvarSenha = async () => {
    setMensagemErro('');

    if (!senhaAtual.trim()) {
      setMensagemErro('Informe sua senha atual.');
      return;
    }

    // Se o usuário logado possui senha cadastrada, validar senha atual
    if (usuarioLogado?.senha && usuarioLogado.senha !== senhaAtual.trim()) {
      setMensagemErro('A senha atual informada está incorreta.');
      return;
    }

    if (!novaSenha.trim()) {
      setMensagemErro('Informe a nova senha.');
      return;
    }

    if (novaSenha.trim().length < 6) {
      setMensagemErro('A nova senha deve ter no mínimo 6 caracteres.');
      return;
    }

    if (novaSenha.trim() === senhaAtual.trim()) {
      setMensagemErro('A nova senha deve ser diferente da senha atual.');
      return;
    }

    if (novaSenha.trim() !== confirmarSenha.trim()) {
      setMensagemErro('A confirmação não coincide com a nova senha.');
      return;
    }

    setSalvando(true);

    try {
      const senhaFinal = novaSenha.trim();

      // 1. Atualiza no contexto do app e AsyncStorage
      if (atualizarUsuario) {
        await atualizarUsuario({ senha: senhaFinal });
      }

      // 2. Sincroniza com a API fake se houver id do usuário
      if (usuarioLogado?.id) {
        try {
          await api.patch(`/usuarios/${usuarioLogado.id}`, { senha: senhaFinal });
        } catch (apiError) {
          console.log('Aviso ao sincronizar nova senha com API:', apiError?.message);
        }
      }

      if (Platform.OS === 'web') {
        alert('Senha alterada com sucesso!');
        router.back();
      } else {
        Alert.alert('Sucesso!', 'Sua senha foi alterada com sucesso.', [
          { text: 'OK', onPress: () => router.back() },
        ]);
      }
    } catch (erro) {
      console.log('Erro ao trocar senha:', erro);
      setMensagemErro('Não foi possível alterar a senha. Tente novamente.');
    } finally {
      setSalvando(false);
    }
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
        <Text style={styles.headerTitulo}>Trocar senha</Text>
        <View style={{ width: 36 }} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.conteudo}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.topoCard}>
            <View style={styles.iconeCirculo}>
              <Ionicons name="shield-checkmark" size={28} color={CORES.laranja} />
            </View>
            <Text style={styles.topoTitulo}>Segurança da conta</Text>
            <Text style={styles.topoDescricao}>
              Sua senha deve ter pelo menos 6 caracteres e incluir uma combinação de números, letras e caracteres especiais.
            </Text>
          </View>

          {mensagemErro ? (
            <View style={styles.boxErro}>
              <Ionicons name="alert-circle" size={18} color={CORES.erro} />
              <Text style={styles.textoErro}>{mensagemErro}</Text>
            </View>
          ) : null}

          {/* Campo Senha Atual */}
          <View style={styles.inputGrupo}>
            <Text style={styles.label}>Senha atual</Text>
            <View style={styles.inputContainer}>
              <Ionicons
                name="lock-closed-outline"
                size={18}
                color={CORES.textoSecundario}
                style={styles.inputIcone}
              />
              <TextInput
                style={styles.input}
                value={senhaAtual}
                onChangeText={(text) => {
                  setSenhaAtual(text);
                  setMensagemErro('');
                }}
                secureTextEntry={!mostrarSenhaAtual}
                placeholder="Digite sua senha atual"
                placeholderTextColor="#666666"
                autoCapitalize="none"
              />
              <TouchableOpacity
                onPress={() => setMostrarSenhaAtual(!mostrarSenhaAtual)}
                style={styles.btnOlho}
              >
                <Ionicons
                  name={mostrarSenhaAtual ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color={CORES.textoSecundario}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Campo Nova Senha */}
          <View style={styles.inputGrupo}>
            <Text style={styles.label}>Nova senha</Text>
            <View style={styles.inputContainer}>
              <Ionicons
                name="key-outline"
                size={18}
                color={CORES.textoSecundario}
                style={styles.inputIcone}
              />
              <TextInput
                style={styles.input}
                value={novaSenha}
                onChangeText={(text) => {
                  setNovaSenha(text);
                  setMensagemErro('');
                }}
                secureTextEntry={!mostrarNovaSenha}
                placeholder="Digite sua nova senha"
                placeholderTextColor="#666666"
                autoCapitalize="none"
              />
              <TouchableOpacity
                onPress={() => setMostrarNovaSenha(!mostrarNovaSenha)}
                style={styles.btnOlho}
              >
                <Ionicons
                  name={mostrarNovaSenha ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color={CORES.textoSecundario}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Campo Confirmar Nova Senha */}
          <View style={styles.inputGrupo}>
            <Text style={styles.label}>Confirmar nova senha</Text>
            <View style={styles.inputContainer}>
              <Ionicons
                name="checkmark-circle-outline"
                size={18}
                color={CORES.textoSecundario}
                style={styles.inputIcone}
              />
              <TextInput
                style={styles.input}
                value={confirmarSenha}
                onChangeText={(text) => {
                  setConfirmarSenha(text);
                  setMensagemErro('');
                }}
                secureTextEntry={!mostrarConfirmar}
                placeholder="Repita a nova senha"
                placeholderTextColor="#666666"
                autoCapitalize="none"
              />
              <TouchableOpacity
                onPress={() => setMostrarConfirmar(!mostrarConfirmar)}
                style={styles.btnOlho}
              >
                <Ionicons
                  name={mostrarConfirmar ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color={CORES.textoSecundario}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Dicas de senha */}
          <View style={styles.boxDicas}>
            <View style={styles.itemDica}>
              <Ionicons
                name={novaSenha.length >= 6 ? 'checkmark-circle' : 'ellipse-outline'}
                size={16}
                color={novaSenha.length >= 6 ? CORES.sucesso : CORES.textoSecundario}
              />
              <Text style={styles.textoDica}>Pelo menos 6 caracteres</Text>
            </View>

            <View style={styles.itemDica}>
              <Ionicons
                name={
                  novaSenha.length > 0 && novaSenha === confirmarSenha
                    ? 'checkmark-circle'
                    : 'ellipse-outline'
                }
                size={16}
                color={
                  novaSenha.length > 0 && novaSenha === confirmarSenha
                    ? CORES.sucesso
                    : CORES.textoSecundario
                }
              />
              <Text style={styles.textoDica}>As duas senhas coincidem</Text>
            </View>
          </View>

          {/* Botão Salvar */}
          <TouchableOpacity
            style={[styles.botaoSalvar, salvando && { opacity: 0.7 }]}
            activeOpacity={0.85}
            onPress={handleSalvarSenha}
            disabled={salvando}
          >
            {salvando ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.botaoSalvarTexto}>Atualizar senha</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
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
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
  },
  topoCard: {
    alignItems: 'center',
    marginBottom: 24,
    backgroundColor: CORES.cartao,
    padding: 20,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: CORES.borda,
  },
  iconeCirculo: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 122, 0, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  topoTitulo: {
    color: CORES.texto,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  topoDescricao: {
    color: CORES.textoSecundario,
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
  },
  boxErro: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 16,
  },
  textoErro: {
    color: CORES.erro,
    fontSize: 13,
    marginLeft: 8,
    flex: 1,
  },
  inputGrupo: {
    marginBottom: 16,
  },
  label: {
    color: '#E0E0E0',
    fontSize: 13,
    marginBottom: 6,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: CORES.inputBg,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: CORES.borda,
    paddingHorizontal: 12,
  },
  inputIcone: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 48,
    color: CORES.texto,
    fontSize: 14,
  },
  btnOlho: {
    padding: 8,
  },
  boxDicas: {
    marginTop: 8,
    marginBottom: 24,
    backgroundColor: CORES.cartao,
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: CORES.borda,
  },
  itemDica: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  textoDica: {
    color: CORES.textoSecundario,
    fontSize: 12,
    marginLeft: 8,
  },
  botaoSalvar: {
    backgroundColor: CORES.laranja,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoSalvarTexto: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
});
