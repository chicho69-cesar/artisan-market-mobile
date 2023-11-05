import { useEffect, useState } from 'react'

import Categories from '@/modules/products/components/Categories'
import AppButton from '@/modules/shared/components/AppButton'
import AppContainer from '@/modules/shared/components/AppContainer'
import AppHeader from '@/modules/shared/components/AppHeader'
import AppInput from '@/modules/shared/components/AppInput'
import AppTextArea from '@/modules/shared/components/AppTextArea'
import { useTheme } from '@/modules/shared/store'
import { colors } from '@/modules/shared/theme'
import { HStack } from '@gluestack-ui/themed'

export default function CreateProductScreen() {
  const theme = useTheme((state) => state)
  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {
    theme.changeMainColor()
  }, [])

  const handleChangeCategories = (text: string) => {
    const textToCheck = text.replace(/, /g, ',')

    if (textToCheck.includes(',')) {
      setCategories(textToCheck.split(','))
    }
  }

  return (
    <AppContainer>
      <AppHeader
        title='Crea tu producto'
        description='Agrega un nuevo producto a tu colección'
      />

      <AppInput
        isInvalid={false}
        keyboardType='default'
        label='Nombre'
        type='text'
        onChangeText={(text) => {}}
        placeholder='Nombre del producto...'
        errorMessage='Error in the name'
      />

      <AppTextArea
        isInvalid={false}
        label='Descripción'
        placeholder='Descripción del producto...'
        onChangeText={(text) => {}}
        errorMessage='Error in the description'
      />

      <HStack justifyContent='space-between' alignItems='center' space='sm'>
        <AppInput
          isInvalid={false}
          keyboardType='numeric'
          label='Precio'
          type='text'
          isGrouped
          onChangeText={(text) => {}}
          placeholder='$00.00'
          errorMessage='Error in the price'
        />

        <AppInput
          isInvalid={false}
          keyboardType='numeric'
          label='Stock'
          type='text'
          isGrouped
          onChangeText={(text) => {}}
          placeholder='00'
          errorMessage='Error in the stock'
        />
      </HStack>

      <AppInput
        isInvalid={false}
        keyboardType='default'
        label='Categorías'
        type='text'
        onChangeText={handleChangeCategories}
        placeholder='Escribe las categorías separados por ,'
        errorMessage='Error in the categories'
      />

      <Categories
        categories={categories.map((category, index) => ({
          id: index, name: category
        }))}
        mt='$0'
      />

      {/* TODO: make image selector */}

      <AppButton
        text='Agregar producto'
        bgColor={theme.mainColor}
        color={colors.white}
        onPress={() => {}}
      />
    </AppContainer>
  )
}
