import axios from 'axios';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

const getDevServerIp = () => {
  if (Platform.OS === 'web') {
    return 'localhost';
  }

  // Tenta pegar o IP do host pelo Expo (Expo Go ou dev client)
  const hostUri =
    Constants.expoConfig?.hostUri ||
    Constants.manifest2?.extra?.expoGo?.debuggerHost ||
    Constants.expoGoConfig?.debuggerHost;

  if (hostUri) {
    return hostUri.split(':')[0];
  }

  // Fallback para o IP da máquina na rede local
  return '192.168.15.147';
};

export const API_URL = `http://${getDevServerIp()}:3000`;

export const api = axios.create({
  baseURL: API_URL
});

export default api;