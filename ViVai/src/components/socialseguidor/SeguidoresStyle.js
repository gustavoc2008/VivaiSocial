import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#17181b',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 12,
  },

  voltar: {
    color: '#f3f5f5',
    fontSize: 34,
    fontWeight: '400',
    lineHeight: 34,
    marginRight: 12,
  },

  titulo: {
    color: '#f3f5f5',
    fontSize: 24,
    fontWeight: '700',
  },

  tabs: {
    flexDirection: 'row',
    marginHorizontal: 14,
    marginTop: 4,
    backgroundColor: '#2a2d31',
    borderRadius: 14,
    padding: 4,
  },

  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
  },

  tabAtiva: {
    backgroundColor: '#f28b2d',
  },

  tabText: {
    color: '#d9d9d9',
    fontSize: 16,
    fontWeight: '600',
  },

  tabTextAtiva: {
    color: '#fff',
  },

  lista: {
    flex: 1,
    marginTop: 10,
  },

  listaContent: {
    paddingHorizontal: 14,
    paddingBottom: 16,
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 72,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
  },

  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
  },

  avatarTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },

  dados: {
    flex: 1,
    justifyContent: 'center',
  },

  nome: {
    color: '#f1f1f1',
    fontSize: 16,
    fontWeight: '600',
  },

  usuario: {
    color: '#b7b7b7',
    fontSize: 13,
    marginTop: 2,
  },

  botao: {
    minWidth: 90,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },

  botaoSeguir: {
    backgroundColor: '#f28b2d',
  },

  botaoSeguindo: {
    backgroundColor: '#2f3135',
  },

  botaoTexto: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
});

export default styles;
