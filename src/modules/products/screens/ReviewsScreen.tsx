import { useEffect } from 'react'

import AppButton from '@/modules/shared/components/AppButton'
import AppContainer from '@/modules/shared/components/AppContainer'
import AppHeader from '@/modules/shared/components/AppHeader'
import useNavigate from '@/modules/shared/hooks/use-navigate'
import { useTheme } from '@/modules/shared/store'
import { colors } from '@/modules/shared/theme'
import Reviews from '../components/Reviews'
import { useReviews } from '../hooks/use-reviews'
import { useActiveProduct } from '../store/active-product'

export default function ReviewsScreen() {
  const theme = useTheme((state) => state)
  const { navigate } = useNavigate()
  const { product } = useActiveProduct((state) => state)
  const { reviews } = useReviews(product?.id ?? 0)

  useEffect(() => {
    theme.changeMainColor()
  }, [])

  return (
    <AppContainer>
      <AppHeader
        title='Reviews'
        description={`Reviews del producto ${product?.name}`}
      />

      <AppButton
        text='Agregar review'
        bgColor={theme.mainColor}
        color={colors.white}
        onPress={() => {
          navigate('AddReview')
        }}
      />

      <Reviews reviews={reviews ?? []}/>
    </AppContainer>
  )
}
