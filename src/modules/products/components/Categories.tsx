import type { Category } from '@/modules/shared/interfaces/product'
import { useTheme } from '@/modules/shared/store'
import { colors } from '@/modules/shared/theme'
import { Box, HStack, Text } from '@gluestack-ui/themed'

interface Props {
  categories: Category[]
}

export default function Categories({ categories }: Props) {
  const theme = useTheme((state) => state)

  return (
    <HStack flexWrap='wrap' mt='$4' space='sm' justifyContent='flex-start'>
      {categories.map((category) => (
        <Box
          key={category.id}
          bg={theme.mainColor}
          py='$1'
          px='$3'
          rounded='$md'
        >
          <Text color={colors.white}>
            {category.name}
          </Text>
        </Box>
      ))}
    </HStack>
  )
}
