import type { Product } from '@/modules/shared/interfaces'
import { create } from 'zustand'

interface StateActions {
  setProducts: (products: Product[]) => void
  addProduct: (product: Product) => void
  editProduct: (product: Product) => void
}

type State = {
  products: Product[]
} & StateActions

export const useProductsStore = create<State>((set) => ({
  products: [],
  setProducts: (products) => {
    set({ products })
  },
  addProduct: (product) => {
    set((state) => ({ products: [...state.products, product] }))
  },
  editProduct: (product) => {
    set((state) => ({ products: state.products.map((p) => (p.id === product.id ? product : p)) }))
  }
}))
