import { create } from 'zustand'
import { LoggedState, Role } from '../types/auth.d'

export const useAuth = create<LoggedState>((set) => ({
  isLoggedIn: true,
  user: {
    name: 'Test',
    lastname: 'Test',
    email: 'correo@correo.com',
    role: Role.Seller,
    picture: null,
    biography: null,
  },
  token: '123456',
}))
