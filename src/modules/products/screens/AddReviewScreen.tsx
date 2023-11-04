import { useEffect, useState } from 'react'

import AppButton from '@/modules/shared/components/AppButton'
import AppContainer from '@/modules/shared/components/AppContainer'
import AppHeader from '@/modules/shared/components/AppHeader'
import AppTextArea from '@/modules/shared/components/AppTextArea'
import { useTheme } from '@/modules/shared/store'
import { colors } from '@/modules/shared/theme'
import { FontAwesome } from '@expo/vector-icons'
import { HStack, Pressable } from '@gluestack-ui/themed'

export default function AddReviewScreen() {
  const theme = useTheme((state) => state)
  const [myRate, setMyRate] = useState(0)

  useEffect(() => {
    theme.changeMainColor()
  }, [])

  const onHandleGrade = (rate: number) => {
    setMyRate(rate)
  }

  return (
    <AppContainer>
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
        isInvalid={false}
        label='Review'
        placeholder='Escribe tu review aquí'
        errorMessage='Error on the review'
        onChangeText={(text) => {}}
      />

      <AppButton
        text='Agregar review'
        bgColor={theme.mainColor}
        color={colors.white}
        onPress={() => {}}
      />
    </AppContainer>
  )
}
