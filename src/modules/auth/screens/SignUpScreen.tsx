import { CircleIcon, HStack, Radio, RadioGroup, RadioIcon, RadioIndicator, RadioLabel, ScrollView, Text } from '@gluestack-ui/themed'
import { useEffect, useState } from 'react'

import { AppAlert, AppButton, AppInput } from '@/modules/shared/components'
import { useNavigate } from '@/modules/shared/hooks'
import { useTheme } from '@/modules/shared/store'
import { colors } from '@/modules/shared/theme'
import { emailSchema, lastnameSchema, makeValidation, nameSchema, passwordSchema } from '@/modules/shared/validations'
import { AuthContainer, Header } from '../components'
import { signUp } from '../services'
import { useAuth } from '../store'

interface Errors {
  name: string | null
  lastname: string | null
  email: string | null
  password: string | null
  retypePassword: string | null
}

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
  const [errors, setErrors] = useState<Errors>({
    name: null,
    lastname: null,
    email: null,
    password: null,
    retypePassword: null
  })

  useEffect(() => {
    theme.changeMainColor()
  }, [])

  const handleSignUp = async () => {
    const validatedName = await makeValidation(nameSchema, name)
    const validatedLastname = await makeValidation(lastnameSchema, lastname)
    const validatedEmail = await makeValidation(emailSchema, email)
    const validatedPassword = await makeValidation(passwordSchema, password)

    setErrors({
      name: validatedName,
      lastname: validatedLastname,
      email: validatedEmail,
      password: validatedPassword,
      retypePassword: null
    })

    if (
      validatedName != null ||
      validatedLastname != null ||
      validatedEmail != null ||
      validatedPassword != null
    ) return

    setErrors({
      name: null,
      lastname: null,
      email: null,
      password: null,
      retypePassword: password !== retypePassword ? 'Las contraseñas no coinciden' : null
    })

    if (password !== retypePassword) return

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
          isInvalid={errors.name != null}
          keyboardType='default'
          label='Nombre'
          type='text'
          onChangeText={setName}
          placeholder='Nombre'
          errorMessage={errors.name ?? ''}
        />

        <AppInput
          isInvalid={errors.lastname != null}
          keyboardType='default'
          label='Apellidos'
          type='text'
          onChangeText={setLastname}
          placeholder='Apellidos'
          errorMessage={errors.lastname ?? ''}
        />

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

        <AppInput
          isInvalid={errors.retypePassword != null}
          keyboardType='visible-password'
          label='Confirmar'
          type='password'
          onChangeText={setRetypePassword}
          placeholder='Confirmar password'
          errorMessage={errors.retypePassword ?? ''}
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
