import { MaterialIcons } from '@expo/vector-icons'
import { Center, HStack, Image, Pressable, Text, VStack } from '@gluestack-ui/themed'

import { blankImage, serverUrl } from '@/modules/shared/constants'
import type { Product } from '@/modules/shared/interfaces'
import { useTheme } from '@/modules/shared/store'
import { colors } from '@/modules/shared/theme'
import { currencyFormatter } from '@/modules/shared/utils/currency-formatter'

interface Props {
  product: Product
  quantity: number
  increaseQuantity: () => void
  decreaseQuantity: () => void
  removeProduct: () => void
}

export default function ProductCart({ product, quantity, decreaseQuantity, increaseQuantity, removeProduct }: Props) {
  const theme = useTheme((state) => state)

  return (
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

      <HStack justifyContent='space-between' alignItems='center' space='md'>
        <HStack justifyContent='flex-start' alignItems='center' space='md'>
          <Pressable onPress={decreaseQuantity}>
            <MaterialIcons
              name='remove-circle-outline'
              size={32}
              color={theme.mainColor}
              style={{ fontWeight: 'bold' }}
            />
          </Pressable>

          <Text fontSize='$2xl' color={colors.gray}>
            {quantity}
          </Text>

          <Pressable onPress={increaseQuantity}>
            <MaterialIcons
              name='add-circle-outline'
              size={32}
              color={theme.mainColor}
              style={{ fontWeight: 'bold' }}
            />
          </Pressable>
        </HStack>

        <Pressable onPress={removeProduct}>
          <Text fontSize='$md' fontWeight='$semibold' color={theme.mainColor}>
            Eliminar
          </Text>
        </Pressable>
      </HStack>
    </VStack>
  )
}
