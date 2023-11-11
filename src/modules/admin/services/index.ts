import { api } from '@/config/api'
import { serverUrl } from '@/modules/shared/constants'
import type { AdminOrder, DashboardStats, ImageUpload, Product, ProductsPagination, Response } from '@/modules/shared/interfaces'
import * as FileSystem from 'expo-file-system'

export async function addProduct(name: string, description: string, price: number, stock: number, categories: string[], token: string) {
  try {
    const { data: response } = await api.post<Response<Product>>(
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

    const { data } = response
    return data
  } catch (error: any) {
    console.log(`Error en el servicio: ${error}`)
    return null
  }
}

export async function uploadProductImage(productId: number, uri: string, token: string) {
  try {
    const response = await FileSystem.uploadAsync(`${serverUrl}/api/products/upload-image/${productId}`, uri, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      },
      fieldName: 'image',
      httpMethod: 'POST',
      uploadType: FileSystem.FileSystemUploadType.MULTIPART
    })

    const jsonResponse = JSON.parse(response.body)
    const { data } = jsonResponse as Response<ImageUpload>
    return data
  } catch (error: any) {
    console.log('Error en uploading file')
    return null
  }
}

export async function deleteProductImage(image: string, token: string) {
  const link = image.replace(`${serverUrl}/storage/product_images/`, '')

  try {
    const { data: response } = await api.delete<Response<string[]>>(`/products/delete-image/${link}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const { data } = response
    return data
  } catch (error: any) {
    console.log(`Error en el servicio: ${error}`)
    return null
  }
}

export async function getSellerProducts(sellerId: number, token: string) {
  try {
    const { data: response } = await api.get<Response<ProductsPagination>>(`/products/seller-products/${sellerId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const { data } = response
    return data
  } catch (error: any) {
    console.log(`Error en el servicio: ${error}`)
    return null
  }
}

export async function updateProduct(productId: number, name: string, description: string, price: number, stock: number, categories: string[], token: string) {
  try {
    const { data: response } = await api.put<Response<Product>>(
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

    const { data } = response
    return data
  } catch (error: any) {
    console.log(`Error en el servicio: ${error}`)
    return null
  }
}

export async function deleteProduct(productId: number, token: string) {
  try {
    const { data: response } = await api.delete<Response<string[]>>(`/products/delete-product/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const { data } = response
    return data
  } catch (error: any) {
    console.log(`Error en el servicio: ${error}`)
    return null
  }
}

export async function getSellerOrders(token: string) {
  try {
    const { data: response } = await api.get<Response<AdminOrder[]>>('/orders/seller-orders', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const { data } = response
    return data
  } catch (error: any) {
    console.log(`Error en el servicio: ${error}`)
    return null
  }
}

export async function getDashboardStats(token: string) {
  try {
    const { data: response } = await api.get<Response<DashboardStats>>('/dashboard/stats', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const { data } = response
    return data
  } catch (error: any) {
    console.log(`Error en el servicio: ${error}`)
    return null
  }
}
