import { Heading, Text, VStack } from '@gluestack-ui/themed'
import { colors } from '../theme'

interface Props {
  title: string
  description: string
}

export default function AppHeader({ title, description }: Props) {
  return (
    <VStack mb='$4'>
      <Heading color={colors.gray}>
        {title}
      </Heading>

      <Text color={colors.gray}>
        {description}
      </Text>
    </VStack>
  )
}
