import { HStack, View } from '@gluestack-ui/themed'
import { useRoute } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker'
import { useEffect, useState } from 'react'

import { Categories } from '@/modules/products/components'
import { AppButton, AppContainer, AppHeader, AppInput, AppTextArea } from '@/modules/shared/components'
import { serverUrl } from '@/modules/shared/constants'
import type { Product } from '@/modules/shared/interfaces'
import { useTheme } from '@/modules/shared/store'
import { colors } from '@/modules/shared/theme'
import { ImagePicker as ImagePickerComponent, ProductImages } from '../components'
import { transformCategories } from '../utils/transform-categories'

export default function EditProductScreen() {
  const { params } = useRoute()
  const theme = useTheme((state) => state)

  const [product, setProduct] = useState<Product>()
  const [categories, setCategories] = useState<string[]>([])
  const [images, setImages] = useState<string[]>([])
  const [imageFileNames, setImageFileNames] = useState<string[]>([])

  useEffect(() => {
    theme.changeMainColor()
  }, [])

  useEffect(() => {
    const productFromParams = (params! as any).product as Product
    setProduct(productFromParams)

    const textCategories = transformCategories(productFromParams.categories)
    handleChangeCategories(textCategories)

    setImages(productFromParams.images.map((image) => `${serverUrl}/storage/${image.link}`))
    setImageFileNames(productFromParams.images.map((image) => image.link))
  }, [params])

  const handleChangeCategories = (text: string) => {
    const textToCheck = text.replace(/, /g, ',')

    if (textToCheck.includes(',')) {
      setCategories(textToCheck.split(','))
    } else {
      setCategories([textToCheck])
    }
  }

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1
    })

    if (!result.canceled) {
      const newImage = result.assets[0].uri
      const newImageFileName = result.assets[0].fileName

      setImages([...images, newImage])

      if (newImageFileName != null && newImageFileName !== undefined) {
        setImageFileNames([...imageFileNames, newImageFileName])
      }
    }
  }

  return (
    <AppContainer>
      <AppHeader
        title='Edita tu producto'
        description={`Edita el producto "${product?.name}"`}
      />

      <AppInput
        isInvalid={false}
        keyboardType='default'
        label='Nombre'
        type='text'
        defaultValue={product?.name}
        onChangeText={(text) => {}}
        placeholder='Nombre del producto...'
        errorMessage='Error in the name'
      />

      <AppTextArea
        isInvalid={false}
        label='Descripción'
        placeholder='Descripción del producto...'
        defaultValue={product?.description}
        onChangeText={(text) => {}}
        errorMessage='Error in the description'
      />

      <HStack justifyContent='space-between' alignItems='center' space='sm'>
        <AppInput
          isInvalid={false}
          keyboardType='numeric'
          label='Precio'
          type='text'
          defaultValue={`${product?.price}`}
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
          defaultValue={`${product?.stock}`}
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
        defaultValue={transformCategories(product?.categories ?? [])}
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

      <ImagePickerComponent
        pickImage={() => {
          pickImage()
        }}
      />

      <ProductImages
        images={images}
        onRemoveImage={(index: number) => {
          const updatedImages = [...images]
          updatedImages.splice(index, 1)

          const updatedFileNames = [...imageFileNames]
          updatedFileNames.splice(index, 1)

          setImages(updatedImages)
          setImageFileNames(updatedFileNames)
        }}
      />

      <AppButton
        text='Guardar cambios'
        bgColor={theme.mainColor}
        color={colors.white}
        onPress={() => {}}
      />

      <View mb='$4' />
    </AppContainer>
  )
}
