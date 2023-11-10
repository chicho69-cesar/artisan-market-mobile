import { FontAwesome } from '@expo/vector-icons'
import { HStack, Pressable } from '@gluestack-ui/themed'
import { StackActions, useNavigation } from '@react-navigation/native'
import { useEffect, useState } from 'react'

import { useAuth } from '@/modules/auth/store'
import { AppAlert, AppButton, AppContainer, AppHeader, AppTextArea } from '@/modules/shared/components'
import { useTheme } from '@/modules/shared/store'
import { colors } from '@/modules/shared/theme'
import { makeValidation, reviewSchema } from '@/modules/shared/validations'
import { addReview } from '../services'
import { useActiveProduct } from '../store'

export default function AddReviewScreen() {
  const theme = useTheme((state) => state)
  const auth = useAuth((state) => state)
  const { product } = useActiveProduct((state) => state)
  const navigation = useNavigation()

  const [myRate, setMyRate] = useState(0)
  const [review, setReview] = useState('')
  const [isAnError, setIsAnError] = useState(false)
  const [reviewError, setReviewError] = useState<string | null>(null)

  useEffect(() => {
    theme.changeMainColor()
  }, [])

  const onHandleGrade = (rate: number) => {
    setMyRate(rate)
  }

  const handleAddReview = async () => {
    const validatedReview = await makeValidation(reviewSchema, review)
    setReviewError(validatedReview)

    if (validatedReview != null) return
    if (product == null) return

    const response = await addReview(product.id, myRate, review, auth.token!)

    if (response != null) {
      const navAction = StackActions.push('Home')
      navigation.dispatch(navAction)
    } else {
      setIsAnError(true)

      setTimeout(() => {
        setIsAnError(false)
      }, 2000)
    }
  }

  return (
    <AppContainer>
      {isAnError && (
        <AppAlert
          action='error'
          description='Error al agregar la review'
          title='Error!'
        />
      )}

      <AppHeader
        title='Agrega una review'
        description='Añade una review personal sobre este producto'
      />

      <HStack
        w='100%'
        mb='$4'
        justifyContent='flex-start'
        space='sm'
        alignItems='center'
      >
        {[1, 2, 3, 4, 5].map((rate) => (
          <Pressable
            key={rate}
            onPress={() => {
              onHandleGrade(rate)
            }}
          >
            <FontAwesome
              name='star'
              size={36}
              color={rate <= myRate ? colors.yellow : colors.gray}
              style={{ fontWeight: 'bold' }}
            />
          </Pressable>
        ))}
      </HStack>

      <AppTextArea
        isInvalid={reviewError != null}
        label='Review'
        placeholder='Escribe tu review aquí'
        errorMessage={reviewError ?? ''}
        onChangeText={setReview}
      />

      <AppButton
        text='Agregar review'
        bgColor={theme.mainColor}
        color={colors.white}
        onPress={() => {
          handleAddReview()
        }}
      />
    </AppContainer>
  )
}
