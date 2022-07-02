import AsyncStorage from '@react-native-async-storage/async-storage';
import { TOKEN } from '../utils/constants';

export async function setTokenApi(token) {
  try {
    await AsyncStorage.setItem(TOKEN, token);
    return true;
  } catch (error) {
    Toast.show('Error while STORING the TOKEN IN LOCAL STORAGE....:', error);
    return null;
  }
}

export async function getTokenApi() {
  try {
    const token = await AsyncStorage.getItem(TOKEN);
    return token;
  } catch (error) {
    Toast.show('Error while READING the TOKEN IN LOCAL STORAGE....:', error);
    return null;
  }
}

export async function removeTokenApi() {
  try {
    await AsyncStorage.removeItem(TOKEN);
    return true;
  } catch (error) {
    Toast.show('Error while REMOVING the TOKEN IN LOCAL STORAGE....:', error);
    return null;
  }
}