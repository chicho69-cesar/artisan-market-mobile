import { create } from 'zustand'

export const useAuth = create<{ isLoggedIn: boolean }>((set) => ({
  isLoggedIn: true
}))
