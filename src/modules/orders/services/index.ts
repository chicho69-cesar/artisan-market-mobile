import { api } from '@/config/api'
import type { ProductParam } from '../types/params.d'
import type { Address, Order, Response } from '@/modules/shared/interfaces'

export async function addAddress(street: string, noOut: string, noIn: string, zipCode: string, city: string, state: string, country: string, phone: string, token: string) {
  try {
    const { data } = await api.post<Response<Address>>(
      '/addresses/add-address',
      {
        street,
        no_out: noOut,
        no_in: noIn,
        zip_code: zipCode,
        city,
        state,
        country,
        phone
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )

    console.log(data)
    return data
  } catch (error: any) {
    console.log(`Error en el servicio: ${error}`)
    return null
  }
}

export async function updateAddress(addressId: number, street: string, noOut: string, noIn: string, zipCode: string, city: string, state: string, country: string, phone: string, token: string) {
  try {
    const { data } = await api.put<Response<Address>>(
      `/addresses/update-address/${addressId}`,
      {
        street,
        no_out: noOut,
        no_in: noIn,
        zip_code: zipCode,
        city,
        state,
        country,
        phone
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )

    console.log(data)
    return data
  } catch (error: any) {
    console.log(`Error en el servicio: ${error}`)
    return null
  }
}

export async function createOrder(addressId: number, products: ProductParam[], token: string) {
  try {
    const { data } = await api.post<Response<Order>>(
      '/orders/create-order',
      {
        address_id: addressId,
        products
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )

    console.log(data)
    return data
  } catch (error: any) {
    console.log(`Error en el servicio: ${error}`)
    return null
  }
}

export async function getOrderById(orderId: number, token: string) {
  try {
    const { data } = await api.get<Response<Order>>(
      `/orders/get-order/${orderId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    console.log(data)
    return data
  } catch (error: any) {
    console.log(`Error en el servicio: ${error}`)
    return null
  }
}

export async function getUserOrders(token: string) {
  try {
    const { data } = await api.get<Response<Order[]>>(
      '/orders/user-orders',
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    console.log(data)
    return data
  } catch (error: any) {
    console.log(`Error en el servicio: ${error}`)
    return null
  }
}

export async function payOrder(orderId: number, token: string) {
  try {
    const { data } = await api.patch<Response<Order>>(
      `/orders/pay-order/${orderId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    console.log(data)
    return data
  } catch (error: any) {
    console.log(`Error en el servicio: ${error}`)
    return null
  }
}

export async function cancelOrder(orderId: number, token: string) {
  try {
    const { data } = await api.patch<Response<Order>>(
      `/orders/cancel-order/${orderId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    console.log(data)
    return data
  } catch (error: any) {
    console.log(`Error en el servicio: ${error}`)
    return null
  }
}
