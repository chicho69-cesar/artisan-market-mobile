import { CheckIcon, Checkbox, CheckboxIcon, CheckboxIndicator, CheckboxLabel, HStack, ScrollView, Text } from '@gluestack-ui/themed'
import { useEffect, useState } from 'react'

import AppButton from '@/modules/shared/components/AppButton'
import AppInput from '@/modules/shared/components/AppInput'
import { useTheme } from '@/modules/shared/store'
import { colors } from '@/modules/shared/theme'
import AuthContainer from '../components/AuthContainer'
import Header from '../components/Header'
import SocialLogin from '../components/SocialLogin'
import useNavigate from '@/modules/shared/hooks/use-navigate'

const facebook = require('../../../../assets/facebook.png')
const google = require('../../../../assets/google.png')

export default function SignInScreen() {
  const theme = useTheme((state) => state)
  const { navigate } = useNavigate()

  const [rememberMe, setRememberMe] = useState(false)

  useEffect(() => {
    theme.changeMainColor()
  }, [])

  return (
    <ScrollView
      h='100%'
      showsVerticalScrollIndicator={false}
      bg={colors.semiWhite}
    >
      <Header text='Inicia Sesión' />

      <AuthContainer>
        <AppInput
          isInvalid={false}
          keyboardType='email-address'
          label='Email'
          type='text'
          onChangeText={(text) => {}}
          placeholder='Email'
          errorMessage='This is not a valid email'
        />

        <AppInput
          isInvalid={false}
          keyboardType='visible-password'
          label='Password'
          type='password'
          onChangeText={(text) => {}}
          placeholder='Password'
          errorMessage='This is not a valid password'
        />

        <Text
          textAlign='right'
          color={theme.mainColor}
          fontWeight='$bold'
          onPress={() => {
            navigate('RecoverPassword')
          }}
        >
          ¿Olvidaste tu contraseña?
        </Text>

        <Checkbox
          size='md'
          my='$4'
          value='remember-me'
          isChecked={rememberMe}
          onChange={(value) => {
            setRememberMe(value)
          }}
        >
          <CheckboxIndicator mr='$2' aria-label='Ahh' borderColor={theme.mainColor}>
            <CheckboxIcon as={CheckIcon} bgColor={theme.mainColor} aria-label='Ahh' />
          </CheckboxIndicator>

          <CheckboxLabel>
            Recuérdame y mantén mi sesión
          </CheckboxLabel>
        </Checkbox>

        <AppButton
          bgColor={theme.mainColor}
          color={colors.white}
          text='Iniciar sesión'
          onPress={() => {}}
        />

        <Text my='$4' fontSize='$sm' color={colors.lightGray} textAlign='center'>
          ó
        </Text>

        <HStack w='100%' space='lg' mb='$4' justifyContent='center'>
          <SocialLogin
            alt='Facebook'
            image={facebook}
            name='Facebook'
            onPress={() => { console.log('Facebook') }}
          />

          <SocialLogin
            alt='Google'
            image={google}
            name='Google'
            onPress={() => { console.log('Google') }}
          />
        </HStack>

        <Text w='100%' mt='$8' textAlign='center'>
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
      </AuthContainer>
    </ScrollView>
  )
}
