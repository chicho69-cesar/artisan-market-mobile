import { HStack } from '@gluestack-ui/themed'
import { useEffect, useState } from 'react'

import AppButton from '@/modules/shared/components/AppButton'
import AppContainer from '@/modules/shared/components/AppContainer'
import AppHeader from '@/modules/shared/components/AppHeader'
import AppInput from '@/modules/shared/components/AppInput'
import useNavigate from '@/modules/shared/hooks/use-navigate'
import { useTheme } from '@/modules/shared/store'
import { colors } from '@/modules/shared/theme'
import { useAddress } from '../store/address'

export default function AddressScreen() {
  const theme = useTheme((state) => state)
  const address = useAddress((state) => state)
  const { navigate } = useNavigate()

  const [street, setStreet] = useState('')
  const [outNumber, setOutNumber] = useState('')
  const [inNumber, setInNumber] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [country, setCountry] = useState('')
  const [phone, setPhone] = useState('')

  useEffect(() => {
    theme.changeMainColor()
  }, [])

  const handleAddAddress = async () => {
    address.setAddress({
      id: 1,
      street,
      no_out: outNumber,
      no_in: inNumber,
      zip_code: zipCode,
      city,
      state,
      country,
      phone
    })

    navigate('Checkout')
  }

  return (
    <AppContainer>
      <AppHeader
        title='Dirección'
        description='Dirección de entrega del pedido'
      />

      <AppInput
        isInvalid={false}
        keyboardType='default'
        label='Calle'
        type='text'
        placeholder='Avenida...'
        onChangeText={(text) => {
          setStreet(text)
        }}
        errorMessage='Error in the street'
      />

      <HStack justifyContent='space-between' alignItems='center' space='sm'>
        <AppInput
          isInvalid={false}
          keyboardType='default'
          label='Exterior'
          type='text'
          placeholder='1..'
          isGrouped
          onChangeText={(text) => {
            setOutNumber(text)
          }}
          errorMessage='Error in the exterior number'
        />

        <AppInput
          isInvalid={false}
          keyboardType='default'
          label='Interior'
          type='text'
          placeholder='1...'
          isGrouped
          onChangeText={(text) => {
            setInNumber(text)
          }}
          errorMessage='Error in the interior number'
        />
      </HStack>

      <AppInput
        isInvalid={false}
        keyboardType='default'
        label='Código postal'
        type='text'
        placeholder='204...'
        onChangeText={(text) => {
          setZipCode(text)
        }}
        errorMessage='Error in the zip code'
      />

      <AppInput
        isInvalid={false}
        keyboardType='default'
        label='Ciudad'
        type='text'
        placeholder='Aguas...'
        onChangeText={(text) => {
          setCity(text)
        }}
        errorMessage='Error in the city'
      />

      <AppInput
        isInvalid={false}
        keyboardType='default'
        label='Estado'
        type='text'
        placeholder='Aguas...'
        onChangeText={(text) => {
          setState(text)
        }}
        errorMessage='Error in the state'
      />

      <AppInput
        isInvalid={false}
        keyboardType='default'
        label='País'
        type='text'
        placeholder='Méx...'
        onChangeText={(text) => {
          setCountry(text)
        }}
        errorMessage='Error in the country'
      />

      <AppInput
        isInvalid={false}
        keyboardType='phone-pad'
        label='Teléfono'
        type='text'
        placeholder='+52 449 ...'
        onChangeText={(text) => {
          setPhone(text)
        }}
        errorMessage='Error in the phone'
      />

      <AppButton
        text='Revisar pedido'
        bgColor={theme.mainColor}
        color={colors.white}
        onPress={() => {
          handleAddAddress()
        }}
      />
    </AppContainer>
  )
}
