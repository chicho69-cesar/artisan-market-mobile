import { Button, ButtonText } from '@gluestack-ui/themed'

interface Props {
  bgColor: string
  color: string
  text: string
  onPress: () => void
}

export default function AppButton ({ bgColor, color, onPress, text }: Props) {
  return (
    <Button bgColor={bgColor}>
      <ButtonText color={color} fontWeight='$semibold' onPress={onPress}>
        {text}
      </ButtonText>
    </Button>
  )
}
