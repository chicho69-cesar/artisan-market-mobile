import { api } from '@/config/api'
import { Role } from '../types/auth.d'

export async function signUp(name: string, lastname: string, email: string, password: string, confirmPassword: string, role: Role) {
  try {
    const { data } = await api.post(
      '/users/sign-up',
      {
        name,
        lastname,
        email,
        password,
        confirm_password: confirmPassword,
        role,
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    console.log(data)
    return data
  } catch (error) {
    console.log(`Error en el servicio: ${error}`)
    return null
  }
}

export async function signIn(email: string, password: string) {
  try {
    const { data } = await api.post(
      '/users/sign-in',
      {
        email,
        password,
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    console.log(data)
    return data
  } catch (error) {
    console.log(`Error en el servicio: ${error}`)
    return null
  }
}

export async function signOut(token: string) {
  try {
    const { data } = await api.post(
      '/users/sign-out',
      {},
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    )

    console.log(data)
    return data
  } catch (error) {
    console.log(`Error en el servicio: ${error}`)
    return null
  }
}
