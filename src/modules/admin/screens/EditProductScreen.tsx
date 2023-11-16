import { HStack, Text, View } from '@gluestack-ui/themed'
import { useNavigation, useRoute } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker'
import { useEffect, useState } from 'react'

import { useAuth } from '@/modules/auth/store'
import { Categories } from '@/modules/products/components'
import { useProducts } from '@/modules/products/hooks'
import { getProductById } from '@/modules/products/services'
import { AppAlert, AppButton, AppContainer, AppHeader, AppInput, AppTextArea } from '@/modules/shared/components'
import { serverUrl } from '@/modules/shared/constants'
import type { Product } from '@/modules/shared/interfaces'
import { useTheme } from '@/modules/shared/store'
import { colors } from '@/modules/shared/theme'
import { descriptionSchema, makeValidation, nameSchema, priceSchema, stockSchema } from '@/modules/shared/validations'
import { ImagePicker as ImagePickerComponent, ProductImages } from '../components'
import { deleteProductImage, updateProduct, uploadProductImage } from '../services'
import { transformCategories } from '../utils/transform-categories'

interface Errors {
  name: string | null
  description: string | null
  price: string | null
  stock: string | null
  images: string | null
}

export default function EditProductScreen() {
  const { params } = useRoute()
  const theme = useTheme((state) => state)
  const auth = useAuth((state) => state)
  const navigation = useNavigation()

  const { editProduct } = useProducts()
  const [product, setProduct] = useState<Product>()
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

  useEffect(() => {
    const productFromParams = (params! as any).product as Product
    setProduct(productFromParams)

    const textCategories = transformCategories(productFromParams.categories)
    handleChangeCategories(textCategories)

    setImages(productFromParams.images.map((image) => `${serverUrl}/storage/${image.link}`))
    setImageFileNames(productFromParams.images.map((image) => image.link))

    setName(productFromParams.name)
    setDescription(productFromParams.description)
    setPrice(productFromParams.price)
    setStock(productFromParams.stock)
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

  const handleRemoveImage = async (index: number, item: string) => {
    if (item.includes('storage/product_images/')) {
      await deleteProductImage(item, auth.token!)
    }

    const updatedImages = [...images]
    updatedImages.splice(index, 1)

    const updatedFileNames = [...imageFileNames]
    updatedFileNames.splice(index, 1)

    setImages(updatedImages)
    setImageFileNames(updatedFileNames)
  }

  const handleEditProduct = async () => {
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

    if (product === undefined) return

    const response = await updateProduct(product.id, name, description, price, stock, categories, auth.token!)

    if (response != null) {
      await Promise.all(images.map(async (image) => {
        if (!image.includes('storage/product_images/')) {
          await uploadProductImage(product.id, image, auth.token!)
        }
      }))

      const productUpdated = await getProductById(response.id)

      if (productUpdated != null) {
        editProduct(productUpdated)
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
          description='Ocurrió un error al editar el producto inténtalo de nuevo'
          title='Error!'
        />
      )}

      <AppHeader
        title='Edita tu producto'
        description={`Edita el producto "${product?.name}"`}
      />

      <AppInput
        isInvalid={errors.name != null}
        keyboardType='default'
        label='Nombre'
        type='text'
        defaultValue={product?.name}
        onChangeText={setName}
        placeholder='Nombre del producto...'
        errorMessage={errors.name ?? ''}
      />

      <AppTextArea
        isInvalid={errors.description != null}
        label='Descripción'
        placeholder='Descripción del producto...'
        defaultValue={product?.description}
        onChangeText={setDescription}
        errorMessage={errors.description ?? ''}
      />

      <HStack justifyContent='space-between' alignItems='center' space='sm'>
        <AppInput
          isInvalid={errors.price != null}
          keyboardType='numeric'
          label='Precio'
          type='text'
          defaultValue={`${product?.price}`}
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
          defaultValue={`${product?.stock}`}
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

      {errors.images != null && (
        <Text fontSize='$md' fontWeight='$medium' color={colors.red} textAlign='center'>
          {errors.images}
        </Text>
      )}

      <ProductImages
        images={images}
        onRemoveImage={(index: number, item: string) => {
          handleRemoveImage(index, item)
        }}
      />

      <AppButton
        text='Guardar cambios'
        bgColor={theme.mainColor}
        color={colors.white}
        onPress={() => {
          handleEditProduct()

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
