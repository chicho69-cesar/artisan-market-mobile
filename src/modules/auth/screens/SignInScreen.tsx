import { CheckIcon, Checkbox, CheckboxIcon, CheckboxIndicator, CheckboxLabel, HStack, ScrollView, Text } from '@gluestack-ui/themed'
import { useEffect, useState } from 'react'

import { AppAlert, AppButton, AppInput } from '@/modules/shared/components'
import { useNavigate } from '@/modules/shared/hooks'
import { useTheme } from '@/modules/shared/store'
import { colors } from '@/modules/shared/theme'
import { emailSchema, makeValidation, passwordSchema } from '@/modules/shared/validations'
import { AuthContainer, Header, SocialLogin } from '../components'
import { signIn } from '../services'
import { useAuth } from '../store'
import { setSession } from '../utils/session'

const facebook = require('../../../../assets/facebook.png')
const google = require('../../../../assets/google.png')

interface Errors {
  email: string | null
  password: string | null
}

export default function SignInScreen() {
  const auth = useAuth((state) => state)
  const theme = useTheme((state) => state)
  const { navigate } = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [isAnError, setIsAnError] = useState(false)
  const [errors, setErrors] = useState<Errors>({
    email: null,
    password: null
  })

  useEffect(() => {
    theme.changeMainColor()
  }, [])

  const handleSignIn = async () => {
    const validatedEmail = await makeValidation(emailSchema, email)
    const validatedPassword = await makeValidation(passwordSchema, password)

    setErrors({
      email: validatedEmail,
      password: validatedPassword
    })

    if (validatedEmail != null || validatedPassword != null) return

    const response = await signIn(email, password)

    if (response != null) {
      if (rememberMe) {
        setSession({
          isLoggedIn: true,
          token: response.token,
          user: response.user
        })
      }

      auth.authenticate(response.user, response.token)
    } else {
      setIsAnError(true)

      setTimeout(() => {
        setIsAnError(false)
      }, 2000)
    }
  }

  return (
    <ScrollView
      h='100%'
      showsVerticalScrollIndicator={false}
      bg={colors.semiWhite}
    >
      {isAnError && (
        <AppAlert
          action='error'
          description='Error al iniciar sesión. Revisa tu email y tu contraseña'
          title='Error!'
        />
      )}

      <Header text='Inicia Sesión' />

      <AuthContainer>
        <AppInput
          isInvalid={errors.email != null}
          keyboardType='email-address'
          label='Email'
          type='text'
          onChangeText={setEmail}
          placeholder='Email'
          errorMessage={errors.email ?? ''}
        />

        <AppInput
          isInvalid={errors.password != null}
          keyboardType='visible-password'
          label='Password'
          type='password'
          onChangeText={setPassword}
          placeholder='Password'
          errorMessage={errors.password ?? ''}
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
          onPress={() => {
            handleSignIn()
          }}
        />

        <Text my='$8' fontSize='$sm' color={colors.lightGray} textAlign='center'>
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
