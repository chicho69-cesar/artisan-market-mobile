import { HStack, Image, Pressable, Text, VStack } from '@gluestack-ui/themed'
import { useEffect } from 'react'

import Categories from '@/modules/products/components/Categories'
import AppButton from '@/modules/shared/components/AppButton'
import AppContainer from '@/modules/shared/components/AppContainer'
import AppHeader from '@/modules/shared/components/AppHeader'
import useNavigate from '@/modules/shared/hooks/use-navigate'
import { useTheme } from '@/modules/shared/store'
import { colors } from '@/modules/shared/theme'
import { currencyFormatter } from '@/modules/shared/utils/currency-formatter'
import { useAdminProducts } from '../hooks/use-admin-products'

export default function MyProductsScreen() {
  const theme = useTheme((state) => state)
  const { products } = useAdminProducts()
  const { navigate, navigateWithParams } = useNavigate()

  useEffect(() => {
    theme.changeMainColor()
  }, [])

  return (
    <AppContainer>
      <AppHeader
        title='Mis productos'
        description='Los productos que estoy vendiendo'
      />

      <AppButton
        text='Agregar producto'
        bgColor={theme.mainColor}
        color={colors.white}
        onPress={() => {
          navigate('CreateProduct')
        }}
      />

      {products.map((product) => (
        <HStack
          key={product.id}
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
            source={product.images[0].link}
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
      ))}
    </AppContainer>
  )
}
