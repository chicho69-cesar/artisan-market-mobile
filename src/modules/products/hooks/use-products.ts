import type { Product } from '@/modules/shared/interfaces'
import { useEffect, useState } from 'react'

export function useProducts() {
  const [isLoading, setIsLoading] = useState(false)
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    // TODO: Make call to the api
    setIsLoading(true)
    setProducts([
      {
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
      {
        id: 2,
        name: 'Jabones artesanales',
        description: 'Jabones muy pero muy pero muy bonitos',
        categories: [
          {
            id: 3,
            name: 'artesanal'
          }
        ],
        images: [
          {
            id: 3,
            link: 'https://i.pinimg.com/564x/ec/31/91/ec319144d5280efbf5798c5c8f9a4bd7.jpg',
            product_id: 2
          }
        ],
        price: 49.99,
        stock: 100,
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
      }
    ])
    setIsLoading(false)
  }, [])

  const searchProducts = async (search: string) => {
    // TODO: Make call to the api endpoint
    setIsLoading(true)
    setProducts([
      {
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
      }
    ])
    setIsLoading(false)
  }

  return {
    isLoading,
    products,
    searchProducts
  }
}
