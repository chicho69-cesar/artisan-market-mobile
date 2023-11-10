import { ScrollView, View } from '@gluestack-ui/themed'
import { colors } from '../theme'

interface Props {
  children: JSX.Element | JSX.Element[] | React.ReactNode
}

export default function AppContainer({ children }: Props) {
  return (
    <ScrollView
      h='100%'
      px={20}
      py={10}
      showsVerticalScrollIndicator={false}
      bg={colors.white}
    >
      {children}

      <View mt='$4' />
    </ScrollView>
  )
}
