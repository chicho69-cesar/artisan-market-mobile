import { Button } from '@gluestack-ui/themed'
import { useTheme } from '../store'
import { colors } from '../theme'

interface Props {
  bgColor?: string
  color?: string
  children: JSX.Element | JSX.Element[] | React.ReactNode
  onPress: () => void
}

export default function ActionButton({ bgColor, color, children, onPress }: Props) {
  const theme = useTheme((state) => state)

  bgColor = bgColor ?? theme.mainColor
  color = color ?? colors.white

  return (
    <Button bgColor={bgColor} onPress={onPress}>
      {children}
    </Button>
  )
}
