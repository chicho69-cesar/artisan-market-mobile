import { api } from '@/config/api'

export async function getProductById(productId: number) {
  try {
    const { data } = await api.get(`/products/get-product/${productId}`)

    console.log(data)
    return data
  } catch (error: any) {
    console.log(`Error en el servicio: ${error}`)
    return null
  }
}

export async function getProductsPaginated(page: number) {
  try {
    const { data } = await api.get(`/products/get-products?page=${page}`)

    console.log(data)
    return data
  } catch (error: any) {
    console.log(`Error en el servicio: ${error}`)
    return null
  }
}

export async function searchProductsByQuery(query: string) {
  try {
    const { data } = await api.get(`/products/search-products?q=${query}`)

    console.log(data)
    return data
  } catch (error: any) {
    console.log(`Error en el servicio: ${error}`)
    return null
  }
}

export async function addReview(productId: number, rate: number, comment: string, token: string) {
  try {
    const { data } = await api.post(
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
    const { data } = await api.get(`/reviews/get-review/${reviewId}`)

    console.log(data)
    return data
  } catch (error: any) {
    console.log(`Error en el servicio: ${error}`)
    return null
  }
}

export async function getReviewsOfProduct(productId: number) {
  try {
    const { data } = await api.get(`/reviews/get-reviews/${productId}`)

    console.log(data)
    return data
  } catch (error: any) {
    console.log(`Error en el servicio: ${error}`)
    return null
  }
}

export async function updateReview(reviewId: number, rate: number, comment: string, token: string) {
  try {
    const { data } = await api.put(
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
    const { data } = await api.delete(
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
