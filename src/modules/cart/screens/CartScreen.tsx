import { HStack, Heading, Text, VStack, View } from '@gluestack-ui/themed'
import { useEffect, useState } from 'react'

import AppButton from '@/modules/shared/components/AppButton'
import AppContainer from '@/modules/shared/components/AppContainer'
import AppHeader from '@/modules/shared/components/AppHeader'
import { useTheme } from '@/modules/shared/store'
import { colors } from '@/modules/shared/theme'
import { currencyFormatter } from '@/modules/shared/utils/currency-formatter'
import ProductCart from '../components/ProductCart'
import { useCart } from '../store/cart'
import type { CartOrderData } from '../types/cart.d'

export default function CartScreen() {
  const theme = useTheme((state) => state)
  const cart = useCart((state) => state)
  const [orderData, setOrderData] = useState<CartOrderData>({
    noOfProducts: 0,
    subTotal: 0,
    tax: 0,
    total: 0
  })

  useEffect(() => {
    theme.changeMainColor()
  }, [])

  useEffect(() => {
    const noOfProducts = cart.cart.reduce((acc, curr) => {
      return acc + curr.quantity
    }, 0)

    const subTotal = cart.cart.reduce((acc, curr) => {
      return acc + curr.quantity * curr.product.price
    }, 0)

    const tax = subTotal * 0.16
    const total = subTotal * 1.16

    setOrderData({
      noOfProducts,
      subTotal,
      tax,
      total
    })
  }, [cart.cart])

  return (
    <AppContainer>
      <AppHeader
        title='Carrito de compras'
        description='Productos del carrito de compras'
      />

      {cart.cart.map(({ product, quantity }) => (
        <ProductCart
          key={product.id}
          product={product}
          quantity={quantity}
          decreaseQuantity={() => {
            cart.decreaseQuantity(product.id)
          }}
          increaseQuantity={() => {
            cart.increaseQuantity(product.id)
          }}
          removeProduct={() => {
            cart.removeProductFromCart(product)
          }}
        />
      ))}

      <VStack
        w='100%'
        space='xs'
        mb='$4'
        rounded='$md'
        borderWidth='$1'
        borderColor={colors.lightGray}
      >
        <Heading
          p='$3'
          borderBottomWidth='$1'
          borderBottomColor={colors.lightGray}
          color={colors.gray}
          fontSize='$2xl'
        >
          Orden
        </Heading>

        <HStack
          px='$3'
          justifyContent='space-between'
          alignItems='center'
          space='sm'
        >
          <Text color={colors.gray} fontSize='$lg' fontWeight='$normal'>
            No. de productos
          </Text>

          <Text color={colors.gray} fontSize='$lg' fontWeight='$medium'>
            {orderData.noOfProducts}
          </Text>
        </HStack>

        <HStack
          px='$3'
          justifyContent='space-between'
          alignItems='center'
          space='sm'
        >
          <Text color={colors.gray} fontSize='$lg' fontWeight='$normal'>
            Sub Total
          </Text>

          <Text color={colors.gray} fontSize='$lg' fontWeight='$medium'>
            {currencyFormatter.format(orderData.subTotal)}
          </Text>
        </HStack>

        <HStack
          px='$3'
          justifyContent='space-between'
          alignItems='center'
          space='sm'
        >
          <Text color={colors.gray} fontSize='$lg' fontWeight='$normal'>
            Impuestos (16%)
          </Text>

          <Text color={colors.gray} fontSize='$lg' fontWeight='$medium'>
            {currencyFormatter.format(orderData.tax)}
          </Text>
        </HStack>

        <HStack
          px='$3'
          mt='$2'
          justifyContent='space-between'
          alignItems='center'
          space='sm'
        >
          <Text color={colors.gray} fontSize='$xl' fontWeight='$medium'>
            Total
          </Text>

          <Text color={colors.gray} fontSize='$xl' fontWeight='$medium'>
            {currencyFormatter.format(orderData.total)}
          </Text>
        </HStack>

        <View w='100%' p='$3'>
          <AppButton
            text='Continuar'
            bgColor={theme.mainColor}
            color={colors.white}
            onPress={() => {}}
          />
        </View>
      </VStack>
    </AppContainer>
  )
}
