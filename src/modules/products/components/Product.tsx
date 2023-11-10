import { Center, HStack, Image, Pressable, Text, VStack } from '@gluestack-ui/themed'

import { blankImage, serverUrl } from '@/modules/shared/constants'
import type { Product as ProductType } from '@/modules/shared/interfaces'
import { colors } from '@/modules/shared/theme'
import { currencyFormatter } from '@/modules/shared/utils/currency-formatter'

interface Props {
  product: ProductType
  onPress?: () => void
}

export default function Product({ product, onPress }: Props) {
  return (
    <Pressable w='100%' onPress={onPress}>
      <VStack
        w='100%'
        space='lg'
        p='$6'
        mb='$4'
        rounded='$md'
        borderWidth='$1'
        borderColor={colors.lightGray}
      >
        <Center>
          <Image
            source={
              product.images.length === 0
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
          justifyContent='center'
          alignItems='center'
        >
          <Text fontSize='$xl' color={colors.gray} w='65%'>
            {product.name}
          </Text>

          <Text fontSize='$2xl' fontWeight='$bold' color={colors.gray} w='30%'>
            {currencyFormatter.format(product.price)}
          </Text>
        </HStack>
      </VStack>
    </Pressable>
  )
}
