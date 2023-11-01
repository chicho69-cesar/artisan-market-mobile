import { CircleIcon, HStack, Radio, RadioGroup, RadioIcon, RadioIndicator, RadioLabel, ScrollView, Text } from '@gluestack-ui/themed'
import { useEffect, useState } from 'react'

import AppButton from '@/modules/shared/components/AppButton'
import AppInput from '@/modules/shared/components/AppInput'
import useNavigate from '@/modules/shared/hooks/use-navigate'
import { useTheme } from '@/modules/shared/store'
import { colors } from '@/modules/shared/theme'
import AuthContainer from '../components/AuthContainer'
import Header from '../components/Header'

export default function SignUpScreen() {
  const theme = useTheme((state) => state)
  const { navigate } = useNavigate()

  const [role, setRole] = useState('user')

  useEffect(() => {
    theme.changeMainColor()
  }, [])

  return (
    <ScrollView
      h='100%'
      showsVerticalScrollIndicator={false}
      bg={colors.semiWhite}
    >
      <Header text='Regístrate para continuar'/>

      <AuthContainer>
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

        <AppInput
          isInvalid={false}
          keyboardType='visible-password'
          label='Confirmar'
          type='password'
          onChangeText={(text) => {}}
          placeholder='Confirmar password'
          errorMessage='Error, this is not the same password'
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
          onPress={() => {}}
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
