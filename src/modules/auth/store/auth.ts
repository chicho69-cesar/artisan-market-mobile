import { create } from 'zustand'

import type { User } from '@/modules/shared/interfaces/user'
import type { UserLogged } from '../types/auth.d'
import { getSession } from '../utils/session'

interface StateActions {
  authenticate: (user: User, token: string) => void
  logout: () => void
}

type State = StateActions & UserLogged

export const useAuth = create<State>((set) => {
  return {
    isLoggedIn: true,
    user: {
      id: 1,
      name: 'Cesar',
      lastname: 'Villalobos Olmos',
      email: 'cesarvillalobosolmos.01@gmail.com',
      picture: 'https://i.pinimg.com/564x/2c/4c/67/2c4c67f144c8ed1600be38d06d8d1765.jpg',
      biography: 'Hola Mundo, me encanta programar y vender cosas :)',
      role_id: 1
    },
    token: '12345',
    authenticate: (user: User, token: string) => {
      set((state) => ({
        ...state,
        isLoggedIn: true,
        user,
        token
      }))
    },
    logout: () => {
      set((state) => ({
        ...state,
        isLoggedIn: false,
        user: null,
        token: null
      }))
    },
    init: () => {
      set((state) => {
        getSession()
          .then((session) => {
            state.isLoggedIn = !(session == null)
            state.user = (session != null) ? session.user : null
            state.token = (session != null) ? session.token : null
          })

        return state
      })
    }
  }
})
