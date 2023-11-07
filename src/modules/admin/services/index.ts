import { api } from '@/config/api'
import type { DashboardStats, ImageUpload, Order, Product, ProductsPagination, Response } from '@/modules/shared/interfaces'

export async function addProduct(name: string, description: string, price: number, stock: number, categories: string[], token: string) {
  try {
    const { data } = await api.post<Response<Product>>(
      '/products/add-product',
      {
        name,
        description,
        price,
        stock,
        categories
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

export async function uploadProductImage(productId: number, uri: string, name: string, type: string, token: string) {
  const response = await fetch(uri)
  const blob = await response.blob()

  const formData = new FormData()
  formData.append('image', blob, name)

  try {
    const { data } = await api.post<Response<ImageUpload>>(
      `/products/upload-image/${productId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
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

export async function deleteProductImage(productId: number, token: string) {
  try {
    const { data } = await api.delete<Response<string[]>>(`/products/delete-image/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    console.log(data)
    return data
  } catch (error: any) {
    console.log(`Error en el servicio: ${error}`)
    return null
  }
}

export async function getSellerProducts(token: string) {
  try {
    const { data } = await api.get<Response<ProductsPagination>>('/products/seller-products', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    console.log(data)
    return data
  } catch (error: any) {
    console.log(`Error en el servicio: ${error}`)
    return null
  }
}

export async function updateProduct(productId: number, name: string, description: string, price: number, stock: number, categories: string[], token: string) {
  try {
    const { data } = await api.put<Response<Product>>(
      `/products/update-product/${productId}`,
      {
        name,
        description,
        price,
        stock,
        categories
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

export async function deleteProduct(productId: number, token: string) {
  try {
    const { data } = await api.delete<Response<string[]>>(`/products/delete-product/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    console.log(data)
    return data
  } catch (error: any) {
    console.log(`Error en el servicio: ${error}`)
    return null
  }
}

export async function getSellerOrders(token: string) {
  try {
    const { data } = await api.get<Response<Order[]>>('/orders/seller-orders', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    console.log(data)
    return data
  } catch (error: any) {
    console.log(`Error en el servicio: ${error}`)
    return null
  }
}

export async function getDashboardStats(token: string) {
  try {
    const { data } = await api.get<Response<DashboardStats>>('/dashboard/stats', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    console.log(data)
    return data
  } catch (error: any) {
    console.log(`Error en el servicio: ${error}`)
    return null
  }
}
