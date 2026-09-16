import { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import styles from './SeguidoresStyle';

const usuariosIniciais = [
  { nome: 'Rafaela Souza', user: '@rafa.souza', seguindo: true, cor: '#4d3d35', inicial: 'R' },
  { nome: 'João Silva', user: '@joao.silva', seguindo: false, cor: '#594b44', inicial: 'J' },
  { nome: 'Maria Oliveira', user: '@maria.oliveira', seguindo: true, cor: '#4a4b59', inicial: 'M' },
  { nome: 'Carlos Lima', user: '@carlos.lima', seguindo: false, cor: '#3f4d4a', inicial: 'C' },
  { nome: 'Ana Paula', user: '@ana.paula', seguindo: false, cor: '#5a3b3b', inicial: 'A' },
  { nome: 'Lucas Santos', user: '@lucas.santos', seguindo: false, cor: '#4d3a4b', inicial: 'L' },
  { nome: 'Júlia Fernandes', user: '@julia.fernandes', seguindo: false, cor: '#3d4e58', inicial: 'J' },
  { nome: 'Bruno Oliveira', user: '@bruno.oliveira', seguindo: false, cor: '#4c423d', inicial: 'B' },
];

export default function Seguidores() {
  const router = useRouter();
  const [abaAtiva, setAbaAtiva] = useState('seguidores');
  const [usuarios, setUsuarios] = useState(usuariosIniciais);

  const lista = useMemo(() => {
    return usuarios.filter((usuario) => {
      if (abaAtiva === 'seguidores') return usuario.seguindo === false;
      return usuario.seguindo === true;
    });
  }, [abaAtiva, usuarios]);

  const alternarSeguir = (nome) => {
    setUsuarios((atual) =>
      atual.map((usuario) =>
        usuario.nome === nome ? { ...usuario, seguindo: !usuario.seguindo } : usuario,
      ),
    );
  };

  return (
    <View style={styles.container}>
      {/* Header com botão de voltar funcional */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={10}>
          <Text style={styles.voltar}>‹</Text>
        </Pressable>
        <Text style={styles.titulo}>Seguidores</Text>
      </View>

      {/* Abas de navegação interna */}
      <View style={styles.tabs}>
        <Pressable
          style={[styles.tab, abaAtiva === 'seguidores' && styles.tabAtiva]}
          onPress={() => setAbaAtiva('seguidores')}
        >
          <Text style={[styles.tabText, abaAtiva === 'seguidores' && styles.tabTextAtiva]}>
            Seguidores
          </Text>
        </Pressable>

        <Pressable
          style={[styles.tab, abaAtiva === 'seguindo' && styles.tabAtiva]}
          onPress={() => setAbaAtiva('seguindo')}
        >
          <Text style={[styles.tabText, abaAtiva === 'seguindo' && styles.tabTextAtiva]}>
            Seguindo
          </Text>
        </Pressable>
      </View>

      {/* Lista de usuários */}
      <ScrollView
        style={styles.lista}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listaContent}
      >
        {lista.map((usuario) => (
          <View key={`${usuario.nome}-${usuario.user}`} style={styles.item}>
            <View style={[styles.avatar, { backgroundColor: usuario.cor }]}>
              <Text style={styles.avatarTexto}>{usuario.inicial}</Text>
            </View>

            <View style={styles.dados}>
              <Text style={styles.nome}>{usuario.nome}</Text>
              <Text style={styles.usuario}>{usuario.user}</Text>
            </View>

            <Pressable
              onPress={() => alternarSeguir(usuario.nome)}
              style={[styles.botao, usuario.seguindo ? styles.botaoSeguindo : styles.botaoSeguir]}
            >
              <Text style={styles.botaoTexto}>{usuario.seguindo ? 'Seguindo' : 'Seguir'}</Text>
            </Pressable>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}