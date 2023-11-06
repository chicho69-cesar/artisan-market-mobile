import { Box, HStack, Text } from '@gluestack-ui/themed'

import type { Category } from '@/modules/shared/interfaces'
import { useTheme } from '@/modules/shared/store'
import { colors } from '@/modules/shared/theme'

interface Props {
  categories: Category[]
  mt?: string
  w?: string
}

export default function Categories({ categories, mt = '$4', w = '100%' }: Props) {
  const theme = useTheme((state) => state)

  return (
    <HStack flexWrap='wrap' w={w as any} mt={mt as any} space='sm' justifyContent='flex-start'>
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
