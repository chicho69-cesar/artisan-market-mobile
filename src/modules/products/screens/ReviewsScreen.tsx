import { useEffect } from 'react'

import { AppButton, AppContainer, AppHeader } from '@/modules/shared/components'
import { useNavigate } from '@/modules/shared/hooks'
import { useTheme } from '@/modules/shared/store'
import { colors } from '@/modules/shared/theme'
import { Reviews } from '../components'
import { useReviews } from '../hooks'
import { useActiveProduct } from '../store'

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
