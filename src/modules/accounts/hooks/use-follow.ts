import type { User } from '@/modules/shared/interfaces'
import { useState } from 'react'

export function useFollow(following: boolean) {
  const [follows, setFollows] = useState<User[]>([])

  const fetchFollows = (user: User) => {
    /* TODO: make the call to the API to get the followers or followings */
    setFollows([
      {
        id: 2,
        name: 'Liz',
        lastname: 'Sandoval Vallejo',
        email: 'liz@gmail.com',
        role_id: 1,
        biography: 'Hola soy Liz',
        picture: 'https://i.pinimg.com/564x/15/1e/35/151e3502c936026578395f82fad54b97.jpg'
      },
      {
        id: 3,
        name: 'Fatima',
        lastname: 'Gomez',
        email: 'fatima@gmail.com',
        role_id: 2,
        biography: 'Hola soy Fatima',
        picture: 'https://i.pinimg.com/736x/d8/f7/ca/d8f7ca2a10a9f687b15ef93d8977b2d5.jpg'
      },
      {
        id: 4,
        name: 'Carolina',
        lastname: 'Carrillo',
        email: 'caro@gmail.com',
        role_id: 2,
        biography: 'Hola soy Caro',
        picture: 'https://i.pinimg.com/564x/d2/84/11/d28411a1622eb21b66dcb1175149caa7.jpg'
      }
    ])
  }

  return {
    follows,
    fetchFollows
  }
}
