import { colors } from '@/modules/shared/theme'
import { Text } from '@gluestack-ui/themed'

interface Props {
  title: string
}

export default function ScreenHeader({ title }: Props) {
  return (
    <Text color={colors.white} fontWeight='$bold' fontSize='$lg'>
      {title}
    </Text>
  )
}
