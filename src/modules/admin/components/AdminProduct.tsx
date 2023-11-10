import { HStack, Image, Pressable, Text, VStack } from '@gluestack-ui/themed'

import { Categories } from '@/modules/products/components'
import { blankImage, serverUrl } from '@/modules/shared/constants'
import { useNavigate } from '@/modules/shared/hooks'
import type { Product } from '@/modules/shared/interfaces'
import { useTheme } from '@/modules/shared/store'
import { colors } from '@/modules/shared/theme'
import { currencyFormatter } from '@/modules/shared/utils/currency-formatter'

interface Props {
  product: Product
}

export default function AdminProduct({ product }: Props) {
  const theme = useTheme((state) => state)
  const { navigateWithParams } = useNavigate()

  return (
    <HStack
      justifyContent='flex-start'
      alignItems='center'
      space='sm'
      p='$2'
      mt='$4'
      borderWidth='$1'
      borderColor={colors.lightGray}
      rounded='$md'
    >
      <Image
        source={
          product.images.length === 0
            ? blankImage : `${serverUrl}/storage/${product.images[0].link}`
        }
        alt={product.name}
        w='$24'
        aspectRatio='9 / 16'
        objectFit='cover'
        rounded='$sm'
      />

      <VStack
        w='70%'
        space='xs'
      >
        <Text
          isTruncated
          color={colors.gray}
          fontSize='$xl'
          fontWeight='$semibold'
        >
          {product.name}
        </Text>

        <Text isTruncated numberOfLines={2} color={colors.gray}>
          {product.description}
        </Text>

        <Categories categories={product.categories} mt='$1' />

        <HStack justifyContent='space-between' space='xs' alignItems='center'>
          <Text color={colors.gray}>
            Precio:{' '}
            <Text color={theme.mainColor} fontWeight='$semibold'>
              {currencyFormatter.format(product.price)}
            </Text>
          </Text>

          <Text color={colors.gray}>
            Stock:{' '}
            <Text color={theme.mainColor} fontWeight='$semibold'>
              {product.stock}
            </Text>
          </Text>
        </HStack>

        <HStack justifyContent='flex-end'>
          <Pressable
            onPress={() => {
              navigateWithParams('EditProduct', { product })
            }}
          >
            <Text color={theme.mainColor} fontWeight='$semibold'>
              Editar
            </Text>
          </Pressable>
        </HStack>
      </VStack>
    </HStack>
  )
}
