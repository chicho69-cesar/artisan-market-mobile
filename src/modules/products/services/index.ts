import { api } from '@/config/api'
import type { Product, ProductsPagination, Response, Review } from '@/modules/shared/interfaces'

export async function getProductById(productId: number) {
  try {
    const { data } = await api.get<Response<Product>>(`/products/get-product/${productId}`)

    console.log(data)
    return data
  } catch (error: any) {
    console.log(`Error en el servicio: ${error}`)
    return null
  }
}

export async function getProductsPaginated(page: number) {
  try {
    const { data } = await api.get<Response<ProductsPagination>>(`/products/get-products?page=${page}`)

    console.log(data)
    return data
  } catch (error: any) {
    console.log(`Error en el servicio: ${error}`)
    return null
  }
}

export async function searchProductsByQuery(query: string) {
  try {
    const { data } = await api.get<Response<ProductsPagination>>(`/products/search-products?q=${query}`)

    console.log(data)
    return data
  } catch (error: any) {
    console.log(`Error en el servicio: ${error}`)
    return null
  }
}

export async function addReview(productId: number, rate: number, comment: string, token: string) {
  try {
    const { data } = await api.post<Response<Review>>(
      `/reviews/add-review/${productId}`,
      {
        rate,
        comment
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

export async function getReview(reviewId: number) {
  try {
    const { data } = await api.get<Response<Review>>(`/reviews/get-review/${reviewId}`)

    console.log(data)
    return data
  } catch (error: any) {
    console.log(`Error en el servicio: ${error}`)
    return null
  }
}

export async function getReviewsOfProduct(productId: number) {
  try {
    const { data } = await api.get<Response<Review[]>>(`/reviews/get-reviews/${productId}`)

    console.log(data)
    return data
  } catch (error: any) {
    console.log(`Error en el servicio: ${error}`)
    return null
  }
}

export async function updateReview(reviewId: number, rate: number, comment: string, token: string) {
  try {
    const { data } = await api.put<Response<Review>>(
      `/reviews/update-review/${reviewId}`,
      {
        rate,
        comment
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

export async function deleteReview(reviewId: number, token: string) {
  try {
    const { data } = await api.delete<Response<string[]>>(
      `/reviews/delete-review/${reviewId}`,
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
