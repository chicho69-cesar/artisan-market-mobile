import { Text, View } from '@gluestack-ui/themed'
import { useEffect } from 'react'

import AppButton from '@/modules/shared/components/AppButton'
import AppContainer from '@/modules/shared/components/AppContainer'
import AppHeader from '@/modules/shared/components/AppHeader'
import AppInput from '@/modules/shared/components/AppInput'
import useNavigate from '@/modules/shared/hooks/use-navigate'
import { useTheme } from '@/modules/shared/store'

export default function RecoverPasswordScreen() {
  const theme = useTheme((state) => state)
  const { navigate } = useNavigate()

  useEffect(() => {
    theme.changeMainColor()
  }, [])

  return (
    <AppContainer>
      <AppHeader
        title='Recupera tu contraseña'
        description='Te enviaremos una nueva contraseña de acceso a tu correo.'
      />

      <AppInput
        isInvalid={false}
        keyboardType='email-address'
        label='Email'
        type='text'
        onChangeText={(text) => {}}
        placeholder='Email'
        errorMessage='This is not a valid email'
      />

      <AppButton
        text='Enviar contraseña de acceso'
        onPress={() => {}}
      />

      <View my='$12' />

      <Text w='100%' mt='$64' textAlign='center'>
        ¿Aún no tienes cuenta?{' '}
        <Text
          color={theme.mainColor}
          fontWeight='$semibold'
          onPress={() => {
            navigate('SignUp')
          }}
        >
          Regístrate
        </Text>
      </Text>
    </AppContainer>
  )
}
