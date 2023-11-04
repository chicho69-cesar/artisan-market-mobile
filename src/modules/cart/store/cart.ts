import { create } from 'zustand'

import type { Product } from '@/modules/shared/interfaces/product'
import type { Cart } from '../types/cart.d'

interface StateActions {
  addProductToCart: (product: Product) => void
  removeProductFromCart: (product: Product) => void
  increaseQuantity: (productId: number) => void
  decreaseQuantity: (productId: number) => void
  resetCart: () => void
}

type State = StateActions & {
  cart: Cart[]
}

export const useCart = create<State>((set) => ({
  cart: [
    {
      product: {
        id: 1,
        name: 'Playera artesanal con bordado personalizado',
        description: 'Playera muy pero muy pero muy bonita Playera muy pero muy pero muy bonita Playera muy pero muy pero muy bonita Playera muy pero muy pero muy bonita Playera muy pero muy pero muy bonita Playera muy pero muy pero muy bonita Playera muy pero muy pero muy bonita',
        categories: [
          {
            id: 1,
            name: 'playeras'
          },
          {
            id: 2,
            name: 'ropa'
          }
        ],
        images: [
          {
            id: 1,
            link: 'https://i.pinimg.com/564x/b6/81/21/b68121e3bc8283c7d5151671d22071b9.jpg',
            product_id: 1
          },
          {
            id: 2,
            link: 'https://i.pinimg.com/236x/bb/99/77/bb99779ed7d65384a350537a639f8be9.jpg',
            product_id: 1
          }
        ],
        price: 149.99,
        stock: 10,
        seller_id: 1,
        seller: {
          id: 1,
          name: 'Cesar',
          email: 'cesar-09a@gmail.com',
          lastname: 'Villalobos Olmos',
          role_id: 1,
          biography: 'Hola soy Cesar',
          picture: 'https://i.pinimg.com/564x/2c/4c/67/2c4c67f144c8ed1600be38d06d8d1765.jpg'
        }
      },
      quantity: 4
    }
  ],
  addProductToCart: (product: Product) => {
    set((state) => {
      if (state.cart.some((cart) => cart.product.id === product.id)) return state

      return {
        ...state,
        cart: [...state.cart, { product, quantity: 1 }]
      }
    })
  },
  removeProductFromCart: (product: Product) => {
    set((state) => ({
      ...state,
      cart: state.cart.filter((cart) => cart.product.id !== product.id)
    }))
  },
  increaseQuantity: (productId: number) => {
    set((state) => {
      const newCart = state.cart.map((cart) => {
        if (cart.product.id === productId) {
          cart.quantity++
        }

        return cart
      })

      return {
        ...state,
        cart: [...newCart]
      }
    })
  },
  decreaseQuantity: (productId: number) => {
    set((state) => {
      const newCart = state.cart.map((cart) => {
        if (cart.product.id === productId && cart.quantity > 0) {
          cart.quantity--
        }

        return cart
      })

      return {
        ...state,
        cart: [...newCart]
      }
    })
  },
  resetCart: () => {
    set((state) => ({
      ...state,
      cart: []
    }))
  }
}))
