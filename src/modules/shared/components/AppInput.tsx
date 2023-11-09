import { AlertIcon, EyeIcon, EyeOffIcon, FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText, FormControlLabel, FormControlLabelText, Input, InputField, InputIcon, InputSlot } from '@gluestack-ui/themed'
import { useState } from 'react'
import { colors } from '../theme'

interface Props {
  isInvalid: boolean
  label: string
  type: 'text' | 'password' | undefined
  placeholder: string
  defaultValue?: string
  isGrouped?: boolean
  keyboardType?: string
  errorMessage?: string
  onChangeText: (text: string) => void
}

export default function AppInput({ isInvalid, label, type, keyboardType, placeholder, defaultValue = '', isGrouped = false, errorMessage, onChangeText }: Props) {
  const [showPassword, setShowPassword] = useState(false)

  const width = isGrouped ? '48%' : '100%'

  return (
    <FormControl isInvalid={isInvalid} mb='$4' w={width}>
      <FormControlLabel mb='$0' aria-label='input'>
        <FormControlLabelText size='sm' color={colors.gray} fontWeight='$light' aria-label='input'>
          {label}
        </FormControlLabelText>
      </FormControlLabel>

      <Input>
        <InputField
          type={(showPassword || type === 'text') ? 'text' : 'password'}
          keyboardType={keyboardType as any}
          placeholder={placeholder}
          size='lg'
          defaultValue={defaultValue}
          color={colors.gray}
          borderColor={colors.lightGray}
          onChangeText={onChangeText}
        />

        {type === 'password' && (
          <InputSlot
            pr='$3'
            onPress={() => {
              setShowPassword((show) => !show)
            }}
          >
            <InputIcon
              as={showPassword ? EyeIcon : EyeOffIcon}
              color={colors.lightGray}
            />
          </InputSlot>
        )}
      </Input>

      <FormControlError>
        <FormControlErrorIcon as={AlertIcon} />
        <FormControlErrorText>
          {errorMessage}
        </FormControlErrorText>
      </FormControlError>
    </FormControl>
  )
}
