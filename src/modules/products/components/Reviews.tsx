import type { Review as ReviewType } from '@/modules/shared/interfaces/review'
import Review from './Review'

interface Props {
  reviews: ReviewType[]
}

export default function Reviews({ reviews }: Props) {
  return (
    <>
      {reviews?.map((review) => (
        <Review key={review.id} review={review} />
      ))}
    </>
  )
}
