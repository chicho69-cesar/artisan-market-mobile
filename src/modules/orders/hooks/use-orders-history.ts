import type { Order } from '@/modules/shared/interfaces'
import { useEffect, useState } from 'react'

export function useOrdersHistory() {
  const [isLoading, setIsLoading] = useState(false)
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    // TODO: Make call to the api
    setIsLoading(true)
    setOrders([
      {
        id: 1,
        address: {
          id: 1,
          city: 'Aguascalientes',
          country: 'México',
          no_out: '2111',
          phone: '3461099207',
          state: 'Aguascalientes',
          street: 'Alfredo Lewis',
          zip_code: '47210',
          no_in: '4C'
        },
        address_id: 1,
        date: '2021-05-10T00:00:00.000Z',
        order_products: [],
        products: [],
        status: 'pending',
        subtotal: 2100,
        tax: 415,
        total: 2515,
        user: {
          id: 1,
          email: 'liz@gmail.com',
          lastname: 'Sandoval Vallejo',
          name: 'Liz',
          role_id: 2,
          biography: 'Hola soy Liz',
          picture: 'https://i.pinimg.com/564x/d2/84/11/d28411a1622eb21b66dcb1175149caa7.jpg'
        },
        user_id: 2
      },
      {
        id: 2,
        address: {
          id: 1,
          city: 'Aguascalientes',
          country: 'México',
          no_out: '2111',
          phone: '3461099207',
          state: 'Aguascalientes',
          street: 'Alfredo Lewis',
          zip_code: '47210',
          no_in: '4C'
        },
        address_id: 1,
        date: '2021-05-10T00:00:00.000Z',
        order_products: [],
        products: [],
        status: 'paid',
        subtotal: 100,
        tax: 16,
        total: 116,
        user: {
          id: 2,
          email: 'liz@gmail.com',
          lastname: 'Sandoval Vallejo',
          name: 'Liz',
          role_id: 2,
          biography: 'Hola soy Liz',
          picture: 'https://i.pinimg.com/564x/d2/84/11/d28411a1622eb21b66dcb1175149caa7.jpg'
        },
        user_id: 2
      },
      {
        id: 3,
        address: {
          id: 1,
          city: 'Aguascalientes',
          country: 'México',
          no_out: '2111',
          phone: '3461099207',
          state: 'Aguascalientes',
          street: 'Alfredo Lewis',
          zip_code: '47210',
          no_in: '4C'
        },
        address_id: 1,
        date: '2021-05-10T00:00:00.000Z',
        order_products: [],
        products: [],
        status: 'cancelled',
        subtotal: 1000,
        tax: 160,
        total: 1160,
        user: {
          id: 2,
          email: 'liz@gmail.com',
          lastname: 'Sandoval Vallejo',
          name: 'Liz',
          role_id: 2,
          biography: 'Hola soy Liz',
          picture: 'https://i.pinimg.com/564x/d2/84/11/d28411a1622eb21b66dcb1175149caa7.jpg'
        },
        user_id: 2
      }
    ])
    setIsLoading(false)
  }, [])

  return {
    isLoading,
    orders
  }
}
