import { Box, Center, HStack, Image, Pressable, Text, VStack } from '@gluestack-ui/themed'

import { blankImage, serverUrl } from '@/modules/shared/constants'
import type { Product as ProductType } from '@/modules/shared/interfaces'
import { useTheme } from '@/modules/shared/store'
import { colors } from '@/modules/shared/theme'
import { currencyFormatter } from '@/modules/shared/utils/currency-formatter'

interface Props {
  product: ProductType
  onPress?: () => void
  isAdmin?: boolean
  quantitySold?: number
}

export default function Product({ product, isAdmin = false, quantitySold, onPress }: Props) {
  const theme = useTheme((state) => state)

  return (
    <Pressable w='100%' onPress={onPress}>
      <VStack
        w='100%'
        p='$6'
        mb='$4'
        rounded='$md'
        borderWidth='$1'
        borderColor={colors.lightGray}
      >
        <Center>
          <Image
            source={
              product.images == null || product.images === undefined || product.images.length === 0
                ? blankImage : `${serverUrl}/storage/${product.images[0].link}`
            }
            alt={product.name}
            w='90%'
            h='$80'
            rounded='$md'
            objectFit='cover'
          />
        </Center>

        <HStack
          w='100%'
          space='sm'
          mt='$4'
          justifyContent='space-between'
          alignItems='center'
        >
          <Text fontSize='$xl' color={colors.gray} w='65%'>
            {product.name}
          </Text>

          <Text fontSize='$2xl' fontWeight='$bold' color={colors.gray} w='30%'>
            {currencyFormatter.format(product.price)}
          </Text>
        </HStack>

        {isAdmin && (
          <HStack
            w='100%'
            space='xs'
            mt='$2'
            justifyContent='flex-start'
            alignItems='center'
          >
            <Text fontSize='$md' fontWeight='$medium' color={colors.gray}>
              Productos vendidos:{' '}
            </Text>

            <Box py='$2' px='$4' rounded='$md' elevation='$0.5' bgColor={theme.mainColor}>
              <Text fontSize='$lg' fontWeight='$bold' color={colors.white}>
                {quantitySold}
              </Text>
            </Box>
          </HStack>
        )}
      </VStack>
    </Pressable>
  )
}
