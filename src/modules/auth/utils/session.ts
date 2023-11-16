import * as SecureStore from 'expo-secure-store'
import type { UserLogged } from '../types/auth.d'

const SECURE_ITEM_NAME = 'session'

export async function getSession() {
  try {
    const session = await SecureStore.getItemAsync(SECURE_ITEM_NAME)
    return (session != null) ? JSON.parse(session) as UserLogged : null
  } catch (error) {
    return null
  }
}

export async function setSession(session: UserLogged) {
  try {
    await SecureStore.setItemAsync(SECURE_ITEM_NAME, JSON.stringify(session))
    return true
  } catch (error) {
    return false
  }
}

export async function clearSession() {
  try {
    await SecureStore.deleteItemAsync(SECURE_ITEM_NAME)
    return true
  } catch (error) {
    return false
  }
}
