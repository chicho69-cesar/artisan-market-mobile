import { AlertIcon, FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText, FormControlLabel, FormControlLabelText, Textarea, TextareaInput } from '@gluestack-ui/themed'
import { colors } from '../theme'

interface Props {
  isInvalid: boolean
  label: string
  placeholder: string
  defaultValue?: string
  errorMessage?: string
  onChangeText: (text: string) => void
}

export default function AppTextArea({ isInvalid, label, placeholder, defaultValue = '', errorMessage, onChangeText }: Props) {
  return (
    <FormControl isInvalid={isInvalid} mb='$4' w='100%'>
      <FormControlLabel mb='$0'>
        <FormControlLabelText size='sm' color={colors.gray} fontWeight='$light'>
          {label}
        </FormControlLabelText>
      </FormControlLabel>

      <Textarea size='lg' w='100%'>
        <TextareaInput
          w='100%'
          placeholder={placeholder}
          defaultValue={defaultValue}
          color={colors.gray}
          borderColor={colors.lightGray}
          onChangeText={onChangeText}
        />
      </Textarea>

      <FormControlError>
        <FormControlErrorIcon as={AlertIcon} />
        <FormControlErrorText>
          {errorMessage}
        </FormControlErrorText>
      </FormControlError>
    </FormControl>
  )
}
