import { Button, ButtonText } from '@gluestack-ui/themed'
import { useTheme } from '../store'
import { colors } from '../theme'

interface Props {
  bgColor?: string
  color?: string
  text: string
  onPress: () => void
}

export default function AppButton({ bgColor, color, onPress, text }: Props) {
  const theme = useTheme((state) => state)

  bgColor = bgColor ?? theme.mainColor
  color = color ?? colors.white

  return (
    <Button bgColor={bgColor} onPress={onPress}>
      <ButtonText color={color} fontWeight='$semibold'>
        {text}
      </ButtonText>
    </Button>
  )
}
