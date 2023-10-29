import { create } from 'zustand'

import type { User, UserLogged } from '../types/auth.d'
import { getSession } from '../utils/session'

interface StateActions {
  authenticate: (user: User, token: string) => void
}

type State = StateActions & UserLogged

export const useAuth = create<State>((set) => {
  return {
    isLoggedIn: false,
    user: null,
    token: null,
    authenticate: (user: User, token: string) => {
      set(() => ({
        isLoggedIn: true,
        user,
        token
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
