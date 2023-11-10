import { CircleIcon, HStack, Radio, RadioGroup, RadioIcon, RadioIndicator, RadioLabel, ScrollView, Text } from '@gluestack-ui/themed'
import { useEffect, useState } from 'react'

import { AppAlert, AppButton, AppInput } from '@/modules/shared/components'
import { useNavigate } from '@/modules/shared/hooks'
import { useTheme } from '@/modules/shared/store'
import { colors } from '@/modules/shared/theme'
import { validateEmail, validatePassword } from '@/modules/shared/validations'
import { AuthContainer, Header } from '../components'
import { signUp } from '../services'
import { useAuth } from '../store'

export default function SignUpScreen() {
  const auth = useAuth((state) => state)
  const theme = useTheme((state) => state)
  const { navigate } = useNavigate()

  const [name, setName] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [retypePassword, setRetypePassword] = useState('')
  const [role, setRole] = useState('user')
  const [isAnError, setIsAnError] = useState(false)
  const [emailError, setEmailError] = useState<string | null>(null)
  const [passwordError, setPasswordError] = useState<string | null>(null)
  const [retypePasswordError, setRetypePasswordError] = useState<string | null>(null)

  useEffect(() => {
    theme.changeMainColor()
  }, [])

  const handleSignUp = async () => {
    const validatedEmail = await validateEmail(email)
    const validatedPassword = await validatePassword(password)

    setEmailError(validatedEmail)
    setPasswordError(validatedPassword)

    if (validatedEmail != null || validatedPassword != null) return

    setRetypePasswordError(
      password !== retypePassword ? 'Las contraseñas no coinciden' : null
    )

    const response = await signUp(name, lastname, email, password, retypePassword, role)

    if (response != null) {
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
          description='Ocurrió un error al intentar registrarte'
          title='Error!'
        />
      )}

      <Header text='Regístrate para continuar'/>

      <AuthContainer>
        <AppInput
          isInvalid={false}
          keyboardType='default'
          label='Nombre'
          type='text'
          onChangeText={setName}
          placeholder='Nombre'
          errorMessage='Error in the name'
        />

        <AppInput
          isInvalid={false}
          keyboardType='default'
          label='Apellidos'
          type='text'
          onChangeText={setLastname}
          placeholder='Apellidos'
          errorMessage='Error in the lastname'
        />

        <AppInput
          isInvalid={emailError != null}
          keyboardType='email-address'
          label='Email'
          type='text'
          onChangeText={setEmail}
          placeholder='Email'
          errorMessage={emailError ?? ''}
        />

        <AppInput
          isInvalid={passwordError != null}
          keyboardType='visible-password'
          label='Password'
          type='password'
          onChangeText={setPassword}
          placeholder='Password'
          errorMessage={passwordError ?? ''}
        />

        <AppInput
          isInvalid={retypePasswordError != null}
          keyboardType='visible-password'
          label='Confirmar'
          type='password'
          onChangeText={setRetypePassword}
          placeholder='Confirmar password'
          errorMessage={retypePasswordError ?? ''}
        />

        <RadioGroup value={role} onChange={setRole} my='$4'>
          <HStack w='100%' space='xl' justifyContent='center'>
            <Radio value='user'>
              <RadioIndicator mr='$2' borderColor={theme.mainColor}>
                <RadioIcon as={CircleIcon} bgColor={theme.mainColor} />
              </RadioIndicator>

              <RadioLabel>Usuario</RadioLabel>
            </Radio>

            <Radio value='seller'>
              <RadioIndicator mr='$2' borderColor={theme.mainColor}>
                <RadioIcon as={CircleIcon} bgColor={theme.mainColor} />
              </RadioIndicator>

              <RadioLabel>Vendedor</RadioLabel>
            </Radio>
          </HStack>
        </RadioGroup>

        <AppButton
          bgColor={theme.mainColor}
          color={colors.white}
          text='Regístrate'
          onPress={() => {
            handleSignUp()
          }}
        />

        <Text w='100%' mt='$8' textAlign='center'>
          ¿Ya tienes cuenta?{' '}
          <Text
            color={theme.mainColor}
            fontWeight='$semibold'
            onPress={() => {
              navigate('SignIn')
            }}
          >
            Inicia sesión aquí
          </Text>
        </Text>
      </AuthContainer>
    </ScrollView>
  )
}
