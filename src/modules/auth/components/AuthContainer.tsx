import { colors } from '@/modules/shared/theme'
import { View } from '@gluestack-ui/themed'

interface Props {
  children: JSX.Element | JSX.Element[]
}

export default function AuthContainer({ children }: Props) {
  return (
    <View p={20} pb='$32' borderTopLeftRadius='$3xl' borderTopRightRadius='$3xl' bg={colors.white}>
      {children}
    </View>
  )
}
