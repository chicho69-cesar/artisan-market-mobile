import { api } from '@/config/api'

export async function addAddress(street: string, noOut: string, noIn: string, zipCode: string, city: string, state: string, country: string, phone: string, token: string) {
  try {
    const { data } = await api.post(
      '/addresses/add-address',
      {
        street,
        no_out: noOut,
        no_in: noIn,
        zip_code: zipCode,
        city,
        state,
        country,
        phone,
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
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

export async function updateAddress(addressId: number, street: string, noOut: string, noIn: string, zipCode: string, city: string, state: string, country: string, phone: string, token: string) {
  try {
    const { data } = await api.put(
      `/addresses/update-address/${addressId}`,
      {
        street,
        no_out: noOut,
        no_in: noIn,
        zip_code: zipCode,
        city,
        state,
        country,
        phone,
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
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

export async function createOrder(addressId: number, products: { id: number, quantity: number }[], token: string) {
  try {
    const { data } = await api.post(
      '/orders/create-order',
      {
        address_id: addressId,
        products,
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
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

export async function getOrderById(orderId: number, token: string) {
  try {
    const { data } = await api.get(
      `/orders/get-order/${orderId}`,
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

export async function getUserOrders(token: string) {
  try {
    const { data } = await api.get(
      '/orders/user-orders',
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

export async function payOrder(orderId: number, token: string) {
  try {
    const { data } = await api.patch(
      `/orders/pay-order/${orderId}`,
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

export async function cancelOrder(orderId: number, token: string) {
  try {
    const { data } = await api.patch(
      `/orders/cancel-order/${orderId}`,
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
