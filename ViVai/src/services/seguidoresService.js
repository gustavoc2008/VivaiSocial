import AsyncStorage from '@react-native-async-storage/async-storage';

const CHAVE_STORAGE = '@vivai_seguidores_dados_v1';

// Lista inicial de pessoas que seguem o usuário logado (Seguidores)
export const SEGUIDORES_INICIAIS = [
  { id: 'seg_1', nome: 'Rafaela Souza', user: '@rafa.souza', seguindo: true, cor: '#4d3d35', inicial: 'R' },
  { id: 'seg_2', nome: 'João Silva', user: '@joao.silva', seguindo: false, cor: '#594b44', inicial: 'J' },
  { id: 'seg_3', nome: 'Maria Oliveira', user: '@maria.oliveira', seguindo: true, cor: '#4a4b59', inicial: 'M' },
  { id: 'seg_4', nome: 'Carlos Lima', user: '@carlos.lima', seguindo: false, cor: '#3f4d4a', inicial: 'C' },
  { id: 'seg_5', nome: 'Ana Paula', user: '@ana.paula', seguindo: false, cor: '#5a3b3b', inicial: 'A' },
  { id: 'seg_6', nome: 'Lucas Santos', user: '@lucas.santos', seguindo: false, cor: '#4d3a4b', inicial: 'L' },
  { id: 'seg_7', nome: 'Júlia Fernandes', user: '@julia.fernandes', seguindo: false, cor: '#3d4e58', inicial: 'J' },
  { id: 'seg_8', nome: 'Bruno Oliveira', user: '@bruno.oliveira', seguindo: false, cor: '#4c423d', inicial: 'B' },
];

// Lista inicial de pessoas que o usuário logado está seguindo (Seguindo)
export const SEGUINDO_INICIAIS = [
  { id: 'seg_1', nome: 'Rafaela Souza', user: '@rafa.souza', seguindo: true, cor: '#4d3d35', inicial: 'R' },
  { id: 'seg_3', nome: 'Maria Oliveira', user: '@maria.oliveira', seguindo: true, cor: '#4a4b59', inicial: 'M' },
];

const obterChaveUsuario = (usuarioId) => {
  return `${CHAVE_STORAGE}_${usuarioId || 'padrao'}`;
};

/**
 * Carrega os dados de seguidores e seguindo do usuário
 */
export const carregarDadosSeguidores = async (usuarioId) => {
  try {
    const chave = obterChaveUsuario(usuarioId);
    const json = await AsyncStorage.getItem(chave);
    if (json) {
      const dados = JSON.parse(json);
      if (Array.isArray(dados.seguidores) && Array.isArray(dados.seguindo)) {
        return dados;
      }
    }

    // Se não existir dados salvos, inicializa com os padrões
    const dadosIniciais = {
      seguidores: SEGUIDORES_INICIAIS,
      seguindo: SEGUINDO_INICIAIS,
    };
    await AsyncStorage.setItem(chave, JSON.stringify(dadosIniciais));
    return dadosIniciais;
  } catch (error) {
    console.log('Erro ao carregar dados de seguidores:', error);
    return {
      seguidores: SEGUIDORES_INICIAIS,
      seguindo: SEGUINDO_INICIAIS,
    };
  }
};

/**
 * Retorna os totais de seguidores e seguindo
 */
export const obterContadoresSeguidores = async (usuarioId) => {
  const dados = await carregarDadosSeguidores(usuarioId);
  return {
    totalSeguidores: dados.seguidores.length,
    totalSeguindo: dados.seguindo.length,
  };
};

/**
 * Retorna um mapa { [id]: boolean } indicando quem o usuário segue
 */
export const obterMapaSeguindo = async (usuarioId) => {
  const dados = await carregarDadosSeguidores(usuarioId);
  const mapa = {};
  dados.seguindo.forEach((item) => {
    if (item.id) mapa[String(item.id)] = true;
    if (item.user) mapa[String(item.user)] = true;
    if (item.usuario) mapa[String(item.usuario)] = true;
    if (item.nome) mapa[String(item.nome)] = true;
  });
  return mapa;
};

/**
 * Alterna entre seguir / deixar de seguir um usuário
 */
export const alternarSeguirUsuario = async (usuarioAlvo, usuarioId) => {
  try {
    const chave = obterChaveUsuario(usuarioId);
    const dados = await carregarDadosSeguidores(usuarioId);

    const identificador = usuarioAlvo.id || usuarioAlvo.user || usuarioAlvo.usuario || usuarioAlvo.nome;
    const jaEstaSeguindo = dados.seguindo.some((u) => {
      const idAtual = u.id || u.user || u.usuario || u.nome;
      return String(idAtual) === String(identificador);
    });

    let novosSeguindo = [];
    if (jaEstaSeguindo) {
      // Deixar de seguir: remove da lista seguindo
      novosSeguindo = dados.seguindo.filter((u) => {
        const idAtual = u.id || u.user || u.usuario || u.nome;
        return String(idAtual) !== String(identificador);
      });
    } else {
      // Passar a seguir: adiciona à lista seguindo
      const itemFormatado = {
        id: usuarioAlvo.id || `user_${Date.now()}`,
        nome: usuarioAlvo.nome || 'Usuário',
        user: usuarioAlvo.user || (usuarioAlvo.usuario ? `@${usuarioAlvo.usuario}` : '@usuario'),
        seguindo: true,
        cor: usuarioAlvo.cor || '#4a4b59',
        inicial: usuarioAlvo.inicial || (usuarioAlvo.nome ? usuarioAlvo.nome.charAt(0).toUpperCase() : 'U'),
      };
      novosSeguindo = [itemFormatado, ...dados.seguindo];
    }

    // Atualiza o status "seguindo" na lista de seguidores se a pessoa estiver lá
    const novosSeguidores = dados.seguidores.map((u) => {
      const idAtual = u.id || u.user || u.usuario || u.nome;
      if (String(idAtual) === String(identificador)) {
        return { ...u, seguindo: !jaEstaSeguindo };
      }
      return u;
    });

    const novosDados = {
      seguidores: novosSeguidores,
      seguindo: novosSeguindo,
    };

    await AsyncStorage.setItem(chave, JSON.stringify(novosDados));

    return {
      estaSeguindo: !jaEstaSeguindo,
      dados: novosDados,
      totalSeguidores: novosDados.seguidores.length,
      totalSeguindo: novosDados.seguindo.length,
    };
  } catch (error) {
    console.log('Erro ao alternar seguir usuário:', error);
    return null;
  }
};
