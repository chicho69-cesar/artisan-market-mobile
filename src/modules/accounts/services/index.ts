import { api } from '@/config/api'

export async function getUserById(id: number, token: string) {
  try {
    const { data } = await api.get(`/users/user-info/${id}`, {
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

export async function editProfile(name: string, lastname: string, biography: string, token: string) {
  try {
    const { data } = await api.put(
      '/users/edit',
      {
        name,
        lastname,
        biography
      },
      {
        headers: {
          'Content-Type': 'application/json',
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

export async function followUser(userFollow: number, token: string) {
  try {
    const { data } = await api.patch(
      '/users/follow-user',
      {
        user_follow: userFollow
      },
      {
        headers: {
          'Content-Type': 'application/json',
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

export async function unfollowUser(userFollow: number, token: string) {
  try {
    const { data } = await api.patch(
      '/users/unfollow-user',
      {
        user_follow: userFollow
      },
      {
        headers: {
          'Content-Type': 'application/json',
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

export async function getFollowers(token: string) {
  try {
    const { data } = await api.get('/users/followers', {
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

export async function getFollowings(token: string) {
  try {
    const { data } = await api.get('/users/followings', {
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

export async function uploadProfilePicture(uri: string, name: string, type: string, token: string) {
  const response = await fetch(uri)
  const blob = await response.blob()

  const formData = new FormData()
  formData.append('picture', blob, name)

  try {
    const { data } = await api.post(
      '/users/upload-profile-picture',
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
