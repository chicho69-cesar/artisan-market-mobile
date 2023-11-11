import { MaterialIcons } from '@expo/vector-icons'
import { HStack, Image, Pressable, Text, View } from '@gluestack-ui/themed'
import * as ImagePicker from 'expo-image-picker'
import { useEffect, useState } from 'react'

import { useAuth } from '@/modules/auth/store'
import { AppAlert, AppButton, AppContainer, AppHeader, AppInput, AppTextArea } from '@/modules/shared/components'
import { blankImage, serverUrl } from '@/modules/shared/constants'
import { useNavigate } from '@/modules/shared/hooks'
import { useTheme } from '@/modules/shared/store'
import { colors } from '@/modules/shared/theme'
import { makeValidation, nameSchema } from '@/modules/shared/validations'
import { addUserSocial, editProfile, uploadProfilePicture } from '../services'

interface Errors {
  name: string | null
  lastname: string | null
}

export default function EditProfileScreen() {
  const theme = useTheme((state) => state)
  const auth = useAuth((state) => state)
  const { navigate } = useNavigate()

  const [isAnError, setIsAnError] = useState(false)
  const [name, setName] = useState(auth.user?.name ?? '')
  const [lastname, setLastName] = useState(auth.user?.lastname ?? '')
  const [bio, setBio] = useState(auth.user?.biography ?? '')
  const [facebook, setFacebook] = useState('')
  const [twitter, setTwitter] = useState('')
  const [linkedin, setLinkedin] = useState('')
  const [freeMarket, setFreeMarket] = useState('')
  const [image, setImage] = useState<string | null>(null)
  const [, setImageFileName] = useState<string | null | undefined>('image.jpg')
  const [errors, setErrors] = useState<Errors>({
    name: null,
    lastname: null
  })

  useEffect(() => {
    theme.changeMainColor()
  }, [])

  useEffect(() => {
    setImage(
      auth.user?.picture == null || auth.user.picture === undefined
        ? blankImage : `${serverUrl}/storage/${auth.user.picture}`
    )
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

    const validatedName = await makeValidation(nameSchema, name)
    const validatedLastname = await makeValidation(nameSchema, lastname)

    setErrors({
      name: validatedName,
      lastname: validatedLastname
    })

    if (validatedName != null || validatedLastname != null) return

    const uri = image

    await uploadProfilePicture(uri, auth.token!)
    await addUserSocial(auth.token!, facebook, twitter, linkedin, freeMarket)

    const response = await editProfile(name, lastname, bio, auth.token!)

    if (response != null) {
      auth.updateAuthInfo(response)
      navigate('Profile')
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
          description='Ocurrió un error inesperado inténtalo de nuevo'
          title='Error!'
        />
      )}

      <AppHeader
        title='Edita tu información'
        description='Edita la información que aparecerá en tu perfil'
      />

      <AppInput
        isInvalid={errors.name != null}
        keyboardType='default'
        label='Nombre'
        type='text'
        onChangeText={setName}
        placeholder='Nombre'
        defaultValue={name}
        errorMessage={errors.name ?? ''}
      />

      <AppInput
        isInvalid={errors.lastname != null}
        keyboardType='default'
        label='Apellidos'
        type='text'
        onChangeText={setLastName}
        placeholder='Apellidos'
        defaultValue={lastname}
        errorMessage={errors.lastname ?? ''}
      />

      <AppTextArea
        isInvalid={false}
        label='Biografía'
        onChangeText={setBio}
        placeholder='Historia del usuario...'
        defaultValue={bio}
        errorMessage='Error on the biography'
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
          onChangeText={setFacebook}
          placeholder='Facebook'
          errorMessage='Error in the facebook'
        />

        <AppInput
          isInvalid={false}
          keyboardType='default'
          label='Twitter'
          type='text'
          isGrouped
          onChangeText={setTwitter}
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
          onChangeText={setLinkedin}
          placeholder='LinkedIn'
          errorMessage='Error in the linkedin'
        />

        <AppInput
          isInvalid={false}
          keyboardType='default'
          label='Mercado Libre'
          type='text'
          isGrouped
          onChangeText={setFreeMarket}
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
