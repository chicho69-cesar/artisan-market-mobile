import { MaterialIcons } from '@expo/vector-icons'
import { HStack, Pressable, Text, VStack, View } from '@gluestack-ui/themed'
import { useEffect, useMemo, useState } from 'react'

import { useCart } from '@/modules/cart/store'
import { ActionButton, AppContainer, TabBarItem } from '@/modules/shared/components'
import { useNavigate } from '@/modules/shared/hooks'
import { useTheme } from '@/modules/shared/store'
import { colors } from '@/modules/shared/theme'
import { currencyFormatter } from '@/modules/shared/utils/currency-formatter'
import { Categories, ImagesCarousel, Reviews } from '../components'
import { useReviews } from '../hooks'
import { useActiveProduct } from '../store'

export default function DetailsScreen() {
  const theme = useTheme((state) => state)
  const cart = useCart((state) => state)
  const { product } = useActiveProduct((state) => state)
  const { reviews } = useReviews(product?.id ?? 0)
  const { navigateBetweenRoutes } = useNavigate()

  const [isFavorite, setIsFavorite] = useState(false)
  const [showDescription, setShowDescription] = useState(true)

  useEffect(() => {
    theme.changeMainColor()
  }, [])

  const rateAvg: number = useMemo(() => {
    if (reviews != null && reviews !== undefined) {
      if (reviews.length === 0) return 0
      return reviews.reduce((acc, review) => acc + review.rate, 0) / reviews.length
    }

    return 0
  }, [reviews])

  return (
    <AppContainer>
      <ImagesCarousel images={product?.images} />

      <HStack w='100%' space='sm' alignItems='center' justifyContent='space-between'>
        <VStack w='68%'>
          <Text fontSize='$lg' color={colors.gray}>
            {product?.name}
          </Text>

          <HStack>
            <Text fontSize='$sm' color={colors.gray}>
              De{' '}
            </Text>

            <Pressable
              onPress={() => {
                if ((product?.seller) != null) {
                  navigateBetweenRoutes('ProfileStack', 'UserProfile', { user: product?.seller })
                }
              }}
            >
              <Text color={theme.mainColor} fontWeight='$semibold'>
                {product?.seller.name} {product?.seller.lastname}
              </Text>
            </Pressable>
          </HStack>
        </VStack>

        <Pressable w='28%'>
          <HStack justifyContent='flex-end' alignItems='center'>
            <MaterialIcons name='star' size={32} color='#FACC15' />

            <Text fontSize='$md' color={colors.gray}>
              {rateAvg}
            </Text>

            <Text fontSize='$md' fontWeight='$light' color={colors.gray}>
              ({reviews?.length ?? 0})
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

      <Categories categories={product?.categories ?? []} />

      <HStack mt='$4' space='md' justifyContent='flex-start'>
        <TabBarItem
          active={showDescription}
          text='Descripción'
          onPress={() => {
            setShowDescription(true)
          }}
        />

        <TabBarItem
          active={!showDescription}
          text='Reviews'
          onPress={() => {
            setShowDescription(false)
          }}
        />
      </HStack>

      <View mt='$2' />

      {showDescription ? (
        <>
          <Text w='100%'>
            {product?.description}
          </Text>

          <HStack flexWrap='nowrap' mt='$4' space='xs' justifyContent='space-between'>
            <ActionButton
              bgColor={theme.mainColor}
              onPress={() => {
                if (product!.stock > 0) {
                  cart.addProductToCart(product!)
                }
              }}
            >
              <MaterialIcons
                name='add-shopping-cart'
                size={18}
                color={colors.white}
                style={{ marginRight: 2 }}
              />

              <Text color={colors.white}>
                Agregar al carrito
              </Text>
            </ActionButton>

            <ActionButton bgColor={colors.gray} onPress={() => {}}>
              <MaterialIcons
                name='attach-money'
                size={18}
                color={colors.white}
                style={{ marginRight: 2 }}
              />

              <Text color={colors.white}>
                Comprar ahora
              </Text>
            </ActionButton>
          </HStack>
        </>
      ) : (
        <Reviews reviews={reviews ?? []} chunkReviews />
      )}
    </AppContainer>
  )
}
