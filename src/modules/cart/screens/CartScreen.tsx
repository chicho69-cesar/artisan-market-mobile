import { useEffect, useState } from 'react'

import AppContainer from '@/modules/shared/components/AppContainer'
import AppHeader from '@/modules/shared/components/AppHeader'
import useNavigate from '@/modules/shared/hooks/use-navigate'
import { useTheme } from '@/modules/shared/store'
import CartResume from '../components/CartResume'
import ProductCart from '../components/ProductCart'
import { useCart } from '../store/cart'
import type { CartOrderData } from '../types/cart.d'

export default function CartScreen() {
  const theme = useTheme((state) => state)
  const cart = useCart((state) => state)
  const { navigate } = useNavigate()
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

      <CartResume
        noOfProducts={orderData.noOfProducts}
        subTotal={orderData.subTotal}
        tax={orderData.tax}
        total={orderData.total}
        onPress={() => {
          navigate('Address')
        }}
      />
    </AppContainer>
  )
}
