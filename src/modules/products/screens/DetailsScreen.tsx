import { MaterialIcons } from '@expo/vector-icons'
import { HStack, Pressable, Text, VStack, View } from '@gluestack-ui/themed'
import { useEffect, useState } from 'react'

import { useCart } from '@/modules/cart/store/cart'
import ActionButton from '@/modules/shared/components/ActionButton'
import AppContainer from '@/modules/shared/components/AppContainer'
import TabBarItem from '@/modules/shared/components/TabBarItem'
import useNavigate from '@/modules/shared/hooks/use-navigate'
import { useTheme } from '@/modules/shared/store'
import { colors } from '@/modules/shared/theme'
import { currencyFormatter } from '@/modules/shared/utils/currency-formatter'
import Categories from '../components/Categories'
import ImagesCarousel from '../components/ImagesCarousel'
import Reviews from '../components/Reviews'
import { useReviews } from '../hooks/use-reviews'
import { useActiveProduct } from '../store/active-product'

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
                cart.addProductToCart(product!)
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
