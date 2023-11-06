import type { Review } from '@/modules/shared/interfaces'
import { useEffect, useState } from 'react'

export function useReviews(productId: number) {
  const [isLoading, setIsLoading] = useState(false)
  const [reviews, setReviews] = useState<Review[]>()

  useEffect(() => {
    if (productId === 0) return

    // TODO: Make call to the api
    setIsLoading(true)
    setReviews([
      {
        id: 1,
        rate: 5,
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl at aliquet viverra, nisl nisl aliquet nisl, nisl nisl aliquet nisl. Sed euismod, nisl at aliquet viver',
        product_id: 1,
        user_id: 1,
        user: {
          id: 1,
          name: 'Cesar',
          email: 'cesar-09a@gmail.com',
          lastname: 'Villalobos Olmos',
          role_id: 1,
          biography: 'Hola soy Cesar',
          picture: 'https://i.pinimg.com/564x/2c/4c/67/2c4c67f144c8ed1600be38d06d8d1765.jpg'
        },
        created_at: '2023-11-02T17:28:21.000000Z'
      },
      {
        id: 2,
        rate: 5,
        comment: 'Amet aliqua quis reprehenderit ex enim nisi laborum minim magna aute enim quis cupidatat.',
        product_id: 1,
        user_id: 1,
        user: {
          id: 1,
          name: 'Cesar',
          email: 'cesar-09a@gmail.com',
          lastname: 'Villalobos Olmos',
          role_id: 1,
          biography: 'Hola soy Cesar',
          picture: 'https://i.pinimg.com/564x/2c/4c/67/2c4c67f144c8ed1600be38d06d8d1765.jpg'
        },
        created_at: '2023-11-02T17:28:21.000000Z'
      },
      {
        id: 3,
        rate: 4,
        comment: 'Labore dolor ex in nulla laborum. Fugiat fugiat mollit minim do mollit enim proident eiusmod nisi tempor ex dolor laborum.',
        product_id: 1,
        user_id: 1,
        user: {
          id: 1,
          name: 'Cesar',
          email: 'cesar-09a@gmail.com',
          lastname: 'Villalobos Olmos',
          role_id: 1,
          biography: 'Hola soy Cesar',
          picture: 'https://i.pinimg.com/564x/2c/4c/67/2c4c67f144c8ed1600be38d06d8d1765.jpg'
        },
        created_at: '2023-11-02T17:28:21.000000Z'
      }
    ])
    setIsLoading(false)
  }, [])

  return {
    isLoading,
    reviews
  }
}
