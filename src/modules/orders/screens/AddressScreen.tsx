import { HStack } from '@gluestack-ui/themed'
import { useEffect, useState } from 'react'

import { useAuth } from '@/modules/auth/store'
import { AppAlert, AppButton, AppContainer, AppHeader, AppInput } from '@/modules/shared/components'
import { useNavigate } from '@/modules/shared/hooks'
import { useTheme } from '@/modules/shared/store'
import { colors } from '@/modules/shared/theme'
import { citySchema, countrySchema, makeValidation, noInSchema, noOutSchema, phoneSchema, stateSchema, streetSchema, zipCodeSchema } from '@/modules/shared/validations'
import { addAddress } from '../services'
import { useAddress } from '../store'

interface Errors {
  street: string | null
  noOut: string | null
  noIn: string | null
  zipCode: string | null
  city: string | null
  state: string | null
  country: string | null
  phone: string | null
}

export default function AddressScreen() {
  const theme = useTheme((state) => state)
  const auth = useAuth((state) => state)
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
  const [isAnError, setIsAnError] = useState(false)
  const [errors, setErrors] = useState<Errors>({
    street: null,
    noOut: null,
    noIn: null,
    zipCode: null,
    city: null,
    state: null,
    country: null,
    phone: null
  })

  useEffect(() => {
    theme.changeMainColor()
  }, [])

  const handleAddAddress = async () => {
    const [validatedStreet, validatedNoOut, validatedNoIn, validatedZipCode, validatedCity, validatedState, validatedCounty, validatePhone] = await Promise.all([
      makeValidation(streetSchema, street),
      makeValidation(noOutSchema, outNumber),
      makeValidation(noInSchema, inNumber),
      makeValidation(zipCodeSchema, zipCode),
      makeValidation(citySchema, city),
      makeValidation(stateSchema, state),
      makeValidation(countrySchema, country),
      makeValidation(phoneSchema, phone)
    ])

    const validations: Errors = {
      city: validatedCity,
      country: validatedCounty,
      noIn: validatedNoIn,
      noOut: validatedNoOut,
      phone: validatePhone,
      state: validatedState,
      street: validatedStreet,
      zipCode: validatedZipCode
    }

    setErrors(validations)
    if (!Object.values(validations).every((validation) => validation == null)) return

    const addressAdded = await addAddress(street, outNumber, inNumber, zipCode, city, state, country, phone, auth.token!)

    if (addressAdded == null) {
      setIsAnError(true)
      return
    }

    address.setAddress(addressAdded)
    navigate('Checkout')
  }

  return (
    <AppContainer>
      {isAnError && (
        <AppAlert
          action='error'
          description='Error al agregar la dirección'
          title='Error!'
        />
      )}

      <AppHeader
        title='Dirección'
        description='Dirección de entrega del pedido'
      />

      <AppInput
        isInvalid={errors.street != null}
        keyboardType='default'
        label='Calle'
        type='text'
        placeholder='Avenida...'
        onChangeText={setStreet}
        errorMessage={errors.street ?? ''}
      />

      <HStack justifyContent='space-between' alignItems='center' space='sm'>
        <AppInput
          isInvalid={errors.noOut != null}
          keyboardType='default'
          label='Exterior'
          type='text'
          placeholder='1..'
          isGrouped
          onChangeText={setOutNumber}
          errorMessage={errors.noOut ?? ''}
        />

        <AppInput
          isInvalid={errors.noIn != null}
          keyboardType='default'
          label='Interior'
          type='text'
          placeholder='1...'
          isGrouped
          onChangeText={setInNumber}
          errorMessage={errors.noIn ?? ''}
        />
      </HStack>

      <AppInput
        isInvalid={errors.zipCode != null}
        keyboardType='default'
        label='Código postal'
        type='text'
        placeholder='204...'
        onChangeText={setZipCode}
        errorMessage={errors.zipCode ?? ''}
      />

      <AppInput
        isInvalid={errors.city != null}
        keyboardType='default'
        label='Ciudad'
        type='text'
        placeholder='Aguas...'
        onChangeText={setCity}
        errorMessage={errors.city ?? ''}
      />

      <AppInput
        isInvalid={errors.state != null}
        keyboardType='default'
        label='Estado'
        type='text'
        placeholder='Aguas...'
        onChangeText={setState}
        errorMessage={errors.state ?? ''}
      />

      <AppInput
        isInvalid={errors.country != null}
        keyboardType='default'
        label='País'
        type='text'
        placeholder='Méx...'
        onChangeText={setCountry}
        errorMessage={errors.country ?? ''}
      />

      <AppInput
        isInvalid={errors.phone != null}
        keyboardType='phone-pad'
        label='Teléfono'
        type='text'
        placeholder='+52 449 ...'
        onChangeText={setPhone}
        errorMessage={errors.phone ?? ''}
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
