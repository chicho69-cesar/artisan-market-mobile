import { api } from '@/config/api'

export async function sendMessage(userToSend: number, message: string, token: string) {
  try {
    const { data } = await api.post(
      '/users/send-message',
      {
        user_to_send_message: userToSend,
        message
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

export async function getConversation(userId: number, token: string) {
  try {
    const { data } = await api.get(
      `/users/conversation/${userId}`,
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

export async function getMyConversations(token: string) {
  try {
    const { data } = await api.get(
      '/users/my-conversations',
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
