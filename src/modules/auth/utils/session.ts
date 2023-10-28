import * as SecureStore from 'expo-secure-store'
import { UserLogged } from '../types/auth.d'

export async function getSession() {
  try {
    const session = await SecureStore.getItemAsync('session')
    return session ? JSON.parse(session) as UserLogged : null
  } catch (error) {
    return null
  }
}

export async function setSession(session: UserLogged) {
  try {
    await SecureStore.setItemAsync('session', JSON.stringify(session))
    return true
  } catch (error) {
    return false
  }
}
