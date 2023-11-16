import { HStack, Text, View } from '@gluestack-ui/themed'
import { useNavigation } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker'
import { useEffect, useState } from 'react'

import { useAuth } from '@/modules/auth/store'
import { Categories } from '@/modules/products/components'
import { useProducts } from '@/modules/products/hooks'
import { getProductById } from '@/modules/products/services'
import { AppAlert, AppButton, AppContainer, AppHeader, AppInput, AppTextArea } from '@/modules/shared/components'
import { useTheme } from '@/modules/shared/store'
import { colors } from '@/modules/shared/theme'
import { descriptionSchema, makeValidation, nameSchema, priceSchema, stockSchema } from '@/modules/shared/validations'
import { ImagePicker as ImagePickerComponent, ProductImages } from '../components'
import { addProduct, uploadProductImage } from '../services'

interface Errors {
  name: string | null
  description: string | null
  price: string | null
  stock: string | null
  images: string | null
}

export default function CreateProductScreen() {
  const theme = useTheme((state) => state)
  const auth = useAuth((state) => state)
  const navigation = useNavigation()

  const { addProduct: addProductState } = useProducts()
  const [isAnError, setIsAnError] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0)
  const [stock, setStock] = useState(0)
  const [categories, setCategories] = useState<string[]>([])
  const [images, setImages] = useState<string[]>([])
  const [imageFileNames, setImageFileNames] = useState<string[]>([])
  const [errors, setErrors] = useState<Errors>({
    name: null,
    description: null,
    price: null,
    stock: null,
    images: null
  })

  useEffect(() => {
    theme.changeMainColor()
  }, [])

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

  const handleCreateProduct = async () => {
    if (images.length === 0) {
      setErrors({
        ...errors,
        images: 'Debes agregar al menos una imagen'
      })

      return
    }

    const [validatedName, validatedDescription, validatedPrice, validatedStock] = await Promise.all([
      makeValidation(nameSchema, name),
      makeValidation(descriptionSchema, description),
      makeValidation(priceSchema, price),
      makeValidation(stockSchema, stock)
    ])

    setErrors({
      name: validatedName,
      description: validatedDescription,
      price: validatedPrice,
      stock: validatedStock,
      images: null
    })

    if (
      validatedName != null ||
      validatedDescription != null ||
      validatedPrice != null ||
      validatedStock != null
    ) return

    const response = await addProduct(name, description, price, stock, categories, auth.token!)

    if (response != null) {
      await Promise.all(images.map(async (image) => {
        await uploadProductImage(response.id, image, auth.token!)
      }))

      const productAdded = await getProductById(response.id)

      if (productAdded != null) {
        addProductState(productAdded)
      }
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
          description='Ocurrió un error al agregar el producto inténtalo de nuevo'
          title='Error!'
        />
      )}

      <AppHeader
        title='Crea tu producto'
        description='Agrega un nuevo producto a tu colección'
      />

      <AppInput
        isInvalid={errors.name != null}
        keyboardType='default'
        label='Nombre'
        type='text'
        onChangeText={setName}
        placeholder='Nombre del producto...'
        errorMessage={errors.name ?? ''}
      />

      <AppTextArea
        isInvalid={errors.description != null}
        label='Descripción'
        placeholder='Descripción del producto...'
        onChangeText={setDescription}
        errorMessage={errors.description ?? ''}
      />

      <HStack justifyContent='space-between' alignItems='center' space='sm'>
        <AppInput
          isInvalid={errors.price != null}
          keyboardType='numeric'
          label='Precio'
          type='text'
          isGrouped
          onChangeText={(text) => {
            setPrice(parseFloat(text))
          }}
          placeholder='$00.00'
          errorMessage={errors.price ?? ''}
        />

        <AppInput
          isInvalid={errors.stock != null}
          keyboardType='numeric'
          label='Stock'
          type='text'
          isGrouped
          onChangeText={(text) => {
            setStock(parseInt(text))
          }}
          placeholder='00'
          errorMessage={errors.stock ?? ''}
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

      <ImagePickerComponent
        pickImage={() => {
          pickImage()
        }}
      />

      {errors.images != null && (
        <Text fontSize='$md' fontWeight='$medium' color={colors.red} textAlign='center'>
          {errors.images}
        </Text>
      )}

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
        text='Agregar producto'
        bgColor={theme.mainColor}
        color={colors.white}
        onPress={() => {
          handleCreateProduct()

          navigation.reset({
            index: 0,
            routes: [{ name: 'Home' as never }]
          })
        }}
      />

      <View mb='$4' />
    </AppContainer>
  )
}
