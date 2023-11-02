import { Box, HStack, Pressable, Text, VStack, View } from '@gluestack-ui/themed'
import { useEffect, useState } from 'react'

import ActionButton from '@/modules/shared/components/ActionButton'
import AppContainer from '@/modules/shared/components/AppContainer'
import { useTheme } from '@/modules/shared/store'
import { colors } from '@/modules/shared/theme'
import { currencyFormatter } from '@/modules/shared/utils/currency-formatter'
import { MaterialIcons } from '@expo/vector-icons'
import ImagesCarousel from '../components/ImagesCarousel'
import { useActiveProduct } from '../store/active-product'

export default function DetailsScreen() {
  const theme = useTheme((state) => state)
  const { product } = useActiveProduct((state) => state)

  const [isFavorite, setIsFavorite] = useState(false)
  const [showDescription, setShowDescription] = useState(true)

  useEffect(() => {
    theme.changeMainColor()
  }, [])

  useEffect(() => {
    console.log(product)
  }, [product])

  return (
    <AppContainer>
      <ImagesCarousel images={product?.images} />

      <HStack w='100%' space='sm' alignItems='center' justifyContent='space-between'>
        <VStack w='68%'>
          <Text fontSize='$lg' color={colors.gray}>
            {product?.name}
          </Text>

          <Text fontSize='$sm' color={colors.gray}>
            De{' '}
            <Text color={theme.mainColor} fontWeight='$semibold'>
              {product?.seller.name} {product?.seller.lastname}
            </Text>
          </Text>
        </VStack>

        <Pressable w='28%'>
          <HStack justifyContent='flex-end' alignItems='center'>
            <MaterialIcons name='star' size={32} color='#FACC15' />

            <Text fontSize='$md' color={colors.gray}>
              4.8 {/* TODO: Get a average of the reviews */}
            </Text>

            <Text fontSize='$md' fontWeight='$light' color={colors.gray}>
              (78) {/* TODO: Get of the number of reviews */}
            </Text>
          </HStack>
        </Pressable>
      </HStack>

      <HStack w='100%' mt='$4' alignItems='center' justifyContent='space-between'>
        <Text color={colors.gray} fontSize='$2xl' fontWeight='$semibold'>
          {currencyFormatter.format(product?.price ?? 0)}
        </Text>

        <HStack alignItems='center' space='sm'>
          <Text fontSize='$lg'>
            Disponible:{' '}
            <Text fontWeight='$bold' color={theme.mainColor}>
              {product?.stock}
            </Text>
          </Text>

          <Pressable
            onPress={() => {
              setIsFavorite((isFav) => !isFav)
            }}
          >
            <MaterialIcons
              name={isFavorite ? 'bookmark' : 'bookmark-outline'}
              size={32}
              color={theme.mainColor}
            />
          </Pressable>
        </HStack>
      </HStack>

      <HStack flexWrap='wrap' mt='$4' space='sm' justifyContent='flex-start'>
        {product?.categories.map((category) => (
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

      <HStack mt='$4' space='md' justifyContent='flex-start'>
        <Pressable
          p='$2'
          borderBottomWidth='$2'
          borderBottomColor={showDescription ? theme.mainColor : 'white'}
          onPress={() => {
            setShowDescription(true)
          }}
        >
          <Text
            color={showDescription ? theme.mainColor : colors.gray}
            fontWeight='$semibold'
          >
            Descripción
          </Text>
        </Pressable>

        <Pressable
          p='$2'
          borderBottomWidth='$2'
          borderBottomColor={showDescription ? 'white' : theme.mainColor}
          onPress={() => {
            setShowDescription(false)
          }}
        >
          <Text
            color={showDescription ? colors.gray : theme.mainColor}
            fontWeight='$semibold'
          >
            Reviews
          </Text>
        </Pressable>
      </HStack>

      <View mt='$2' />

      {showDescription ? (
        <>
          <Text w='100%'>
            {product?.description}
          </Text>

          <HStack flexWrap='nowrap' mt='$4' space='md'>
            <ActionButton bgColor={theme.mainColor} onPress={() => {}}>
              <MaterialIcons name='add-shopping-cart' size={18} color={colors.white} />

              <Text color={colors.white}>
                Agregar al carrito
              </Text>
            </ActionButton>

            <ActionButton bgColor={colors.gray} onPress={() => {}}>
              <MaterialIcons name='attach-money' size={18} color={colors.white} />

              <Text color={colors.white}>
                Comprar ahora
              </Text>
            </ActionButton>
          </HStack>
        </>
      ) : null}
    </AppContainer>
  )
}
