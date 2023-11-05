import { MaterialIcons } from '@expo/vector-icons'
import { FlatList, HStack, Image, Pressable, Text, VStack, View } from '@gluestack-ui/themed'
import * as ImagePicker from 'expo-image-picker'
import { useEffect, useState } from 'react'

import Categories from '@/modules/products/components/Categories'
import AppButton from '@/modules/shared/components/AppButton'
import AppContainer from '@/modules/shared/components/AppContainer'
import AppHeader from '@/modules/shared/components/AppHeader'
import AppInput from '@/modules/shared/components/AppInput'
import AppTextArea from '@/modules/shared/components/AppTextArea'
import { useTheme } from '@/modules/shared/store'
import { colors } from '@/modules/shared/theme'

export default function CreateProductScreen() {
  const theme = useTheme((state) => state)
  const [categories, setCategories] = useState<string[]>([])

  const [images, setImages] = useState<string[]>([])
  const [imageFileNames, setImageFileNames] = useState<string[]>([])

  useEffect(() => {
    theme.changeMainColor()
  }, [])

  const handleChangeCategories = (text: string) => {
    const textToCheck = text.replace(/, /g, ',')

    if (textToCheck.includes(',')) {
      setCategories(textToCheck.split(','))
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

      <Pressable
        bg={theme.mainColor}
        p='$2'
        my='$4'
        rounded='$md'
        onPress={() => {
          pickImage()
        }}
      >
        <HStack alignItems='center' justifyContent='center'>
          <MaterialIcons
            name='image'
            size={24}
            color={colors.white}
            style={{ marginRight: 5 }}
          />

          <Text color={colors.white} fontSize='$md'>
            Seleccionar imagen
          </Text>
        </HStack>
      </Pressable>

      {/* TODO: make an space for no images */}

      <FlatList
        mb='$4'
        data={images}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <VStack
            key={index}
            mr='$2'
            w='$24'
            space='xs'
            alignItems='center'
          >
            <Image
              source={{ uri: (item as string) }} // TODO: set a default image
              alt={item as string}
              w='$24'
              h='$32'
              rounded='$md'
              objectFit='cover'
            />

            <Pressable
              py='$1'
              px='$4'
              rounded='$lg'
              alignItems='center'
              bg={theme.mainColor}
              onPress={() => {
                const updatedImages = [...images]
                updatedImages.splice(index, 1)

                const updatedFileNames = [...imageFileNames]
                updatedFileNames.splice(index, 1)

                setImages(updatedImages)
                setImageFileNames(updatedFileNames)
              }}
            >
              <MaterialIcons
                name='delete'
                size={18}
                color={colors.white}
              />
            </Pressable>
          </VStack>
        )}
      />

      <AppButton
        text='Agregar producto'
        bgColor={theme.mainColor}
        color={colors.white}
        onPress={() => {}}
      />

      <View mb='$4' />
    </AppContainer>
  )
}
