import { Pressable, Text } from '@gluestack-ui/themed'

import { useNavigate } from '@/modules/shared/hooks'
import type { Review as ReviewType } from '@/modules/shared/interfaces/review'
import { useTheme } from '@/modules/shared/store'
import { Review } from '.'

interface Props {
  reviews: ReviewType[]
  chunkReviews?: boolean
}

export default function Reviews({ reviews, chunkReviews = false }: Props) {
  const theme = useTheme((state) => state)
  const { navigate } = useNavigate()

  return (
    <>
      {chunkReviews ? (
        <>
          {reviews.slice(0, 3).map((review) => (
            <Review key={review.id} review={review} />
          ))}

          <Pressable
            w='100%'
            mb='$4'
            onPress={() => {
              navigate('Reviews')
            }}
          >
            <Text color={theme.mainColor} fontSize='$md' fontWeight='$medium' textAlign='center'>
              Ver más...
            </Text>
          </Pressable>
        </>
      ) : (
        <>
          {reviews?.map((review) => (
            <Review key={review.id} review={review} />
          ))}
        </>
      )}
    </>
  )
}
