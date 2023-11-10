import { MaterialIcons } from '@expo/vector-icons'
import { HStack, Image, Pressable, Text, View } from '@gluestack-ui/themed'
import * as ImagePicker from 'expo-image-picker'
import { useEffect, useState } from 'react'

import { useAuth } from '@/modules/auth/store'
import { AppButton, AppContainer, AppHeader, AppInput, AppTextArea } from '@/modules/shared/components'
import { blankImage } from '@/modules/shared/constants'
import { useTheme } from '@/modules/shared/store'
import { colors } from '@/modules/shared/theme'

export default function EditProfileScreen() {
  const theme = useTheme((state) => state)
  const auth = useAuth((state) => state)

  const [image, setImage] = useState<string | null>(null)
  const [imageFileName, setImageFileName] = useState<string | null | undefined>('image.jpg')

  useEffect(() => {
    theme.changeMainColor()
  }, [])

  useEffect(() => {
    setImage(auth.user?.picture ?? blankImage)
  }, [auth])

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1
    })

    if (!result.canceled) {
      setImage(result.assets[0].uri)
      setImageFileName(result.assets[0].fileName)
    }
  }

  const handleEdit = async () => {
    if (image == null) {
      return
    }

    const uri = image
    const type = 'image/jpeg'
    const name = imageFileName ?? 'image.jpg'

    /* TODO: upload the image and update information */
  }

  return (
    <AppContainer>
      <AppHeader
        title='Edita tu información'
        description='Edita la información que aparecerá en tu perfil'
      />

      <AppInput
        isInvalid={false}
        keyboardType='default'
        label='Nombre'
        type='text'
        onChangeText={(text) => {}}
        placeholder='Nombre'
        errorMessage='Error in the name'
      />

      <AppInput
        isInvalid={false}
        keyboardType='default'
        label='Apellidos'
        type='text'
        onChangeText={(text) => {}}
        placeholder='Apellidos'
        errorMessage='Error in the lastname'
      />

      <AppTextArea
        isInvalid={false}
        label='Biografía'
        placeholder='Historia del usuario...'
        onChangeText={(text) => {}}
        errorMessage='Error in the biography'
      />

      <HStack
        justifyContent='space-between'
        alignItems='center'
        space='sm'
        p='$1'
        mb='$4'
        borderWidth='$1'
        borderColor={colors.lightGray}
        rounded='$md'
      >
        <Pressable
          bg={theme.mainColor}
          py='$1'
          px='$2'
          rounded='$md'
          onPress={() => {
            pickImage()
          }}
        >
          <HStack alignItems='center' justifyContent='center'>
            <MaterialIcons
              name='image'
              size={18}
              color={colors.white}
              style={{ marginRight: 5 }}
            />

            <Text color={colors.white} fontSize='$sm'>
              Seleccionar imagen
            </Text>
          </HStack>
        </Pressable>

        {(image != null) && (
          <Image
            source={{ uri: image ?? blankImage }}
            alt={auth.user?.name}
            w='$40'
            aspectRatio='9 / 12'
            rounded='$md'
            objectFit='cover'
          />
        )}
      </HStack>

      <HStack justifyContent='space-between' alignItems='center' space='sm'>
        <AppInput
          isInvalid={false}
          keyboardType='default'
          label='Facebook'
          type='text'
          isGrouped
          onChangeText={(text) => {}}
          placeholder='Facebook'
          errorMessage='Error in the facebook'
        />

        <AppInput
          isInvalid={false}
          keyboardType='default'
          label='Twitter'
          type='text'
          isGrouped
          onChangeText={(text) => {}}
          placeholder='Twitter'
          errorMessage='Error in the twitter'
        />
      </HStack>

      <HStack justifyContent='space-between' alignItems='center' space='sm'>
        <AppInput
          isInvalid={false}
          keyboardType='default'
          label='LinkedIn'
          type='text'
          isGrouped
          onChangeText={(text) => {}}
          placeholder='LinkedIn'
          errorMessage='Error in the linkedin'
        />

        <AppInput
          isInvalid={false}
          keyboardType='default'
          label='Mercado Libre'
          type='text'
          isGrouped
          onChangeText={(text) => {}}
          placeholder='Mercado Libre'
          errorMessage='Error in the free market'
        />
      </HStack>

      <AppButton
        text='Guardar información'
        bgColor={theme.mainColor}
        color={colors.white}
        onPress={() => {
          handleEdit()
        }}
      />

      <View my='$4' />
    </AppContainer>
  )
}
