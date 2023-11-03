import { Pressable, Text } from '@gluestack-ui/themed'
import { useTheme } from '../store'
import { colors } from '../theme'

interface Props {
  active: boolean
  text: string
  onPress: () => void
}

export default function TabBarItem({ active, onPress, text }: Props) {
  const theme = useTheme((state) => state)

  return (
    <Pressable
      p='$2'
      borderBottomWidth='$2'
      borderBottomColor={active ? theme.mainColor : 'white'}
      onPress={onPress}
    >
      <Text
        color={active ? theme.mainColor : colors.gray}
        fontWeight='$semibold'
      >
        {text}
      </Text>
    </Pressable>
  )
}
