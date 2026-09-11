import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171717',
    paddingHorizontal: 20,
  },

  header: {
    paddingTop: 20,
    paddingBottom: 22,
  },

  titulo: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  subtitulo: {
    fontSize: 15,
    color: '#FFFFFF',
    opacity: 0.7,
    marginTop: 5,
  },

  content: {
    paddingBottom: 24,
  },

  item: {
    minHeight: 70,
    backgroundColor: '#262626',
    borderRadius: 12,
    marginBottom: 12,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconBox: {
    width: 45,
    height: 45,
    borderRadius: 10,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
  },

  topicIcon: {
    color: '#D97706',
    fontSize: 20,
    fontWeight: '700',
  },

  itemText: {
    flex: 1,
    marginLeft: 15,
  },

  itemTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  itemDescription: {
    fontSize: 13,
    color: '#FFFFFF',
    opacity: 0.6,
    marginTop: 4,
  },

  arrow: {
    fontSize: 30,
    color: '#D97706',
    fontWeight: '300',
    marginLeft: 10,
  },
});
