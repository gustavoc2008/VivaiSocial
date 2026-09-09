import { StyleSheet } from 'react-native';

export const notificacoes = [
  {
    nome: 'João Silva',
    mensagem: 'curtiu sua publicação.',
    tempo: 'Há 2 min',
    tipo: 'curtida',
    inicial: 'J',
    naoLida: true, 
  },
  {
    nome: 'Maria Oliveira',
    mensagem: 'comentou sua publicação: "Lindo!"',
    tempo: 'Há 10 min',
    tipo: 'comentario',
    inicial: 'M',
    naoLida: true,
  },
  {
    nome: 'Carlos Lima',
    mensagem: 'começou a seguir você.',
    tempo: 'Há 30 min',
    tipo: 'seguir',
    inicial: 'C',
    naoLida: false,
  },
  {
    nome: 'Ana Paula',
    mensagem: 'curtiu sua publicação.',
    tempo: 'Há 1 hora',
    tipo: 'curtida',
    inicial: 'A',
    naoLida: false,
  },
  {
    nome: 'Lucas',
    mensagem: 'comentou sua publicação: "Perfeito!"',
    tempo: 'Há 2 horas',
    tipo: 'comentario',
    inicial: 'L',
    naoLida: false,
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0f0e',
  },

  header: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderBottomWidth: 0,
  },

  titulo: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '600',
  },

  marcar: {
    color: '#ff7a00',
    fontSize: 12,
  },

  lista: {
    flex: 1,
  },

  notificacao: {
    minHeight: 100,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
  },

  iconeContainer: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconeCurtida: {
    color: '#ff493f',
    fontSize: 34,
    fontWeight: 'bold',
  },

  iconeComentario: {
    width: 34,
    height: 27,
    borderRadius: 15,
    backgroundColor: '#ffffff',
  },

  iconeSeguir: {
    color: '#ff7a00',
    fontSize: 34,
  },

  avatar: {
    width: 43,
    height: 43,
    borderRadius: 22,
    backgroundColor: '#393939',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  avatarTexto: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  conteudo: {
    flex: 1,
    justifyContent: 'center',
  },

  mensagem: {
    color: '#cfcfcf',
    fontSize: 15,
    lineHeight: 21,
  },

  nome: {
    color: '#ffffff',
    fontWeight: '700',
  },

  tempo: {
    color: '#777777',
    fontSize: 13,
    marginTop: 2,
  },

  ponto: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ff7a00',
    marginLeft: 8,
  },

  menu: {
    height: 78,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#0d0f0e',
    borderTopWidth: 1,
    borderTopColor: '#292929',
  },

  menuItem: {
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },

  menuIcon: {
    color: '#eeeeee',
    fontSize: 28,
    height: 32,
  },

  menuTexto: {
    color: '#eeeeee',
    fontSize: 11,
    marginTop: 3,
  },

  menuAtivo: {
    color: '#ff7a00',
  },
});

export default styles;