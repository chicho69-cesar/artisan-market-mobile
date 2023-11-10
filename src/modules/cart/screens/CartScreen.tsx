import { useEffect } from 'react'

import { AppContainer, AppHeader } from '@/modules/shared/components'
import { useNavigate } from '@/modules/shared/hooks'
import { useTheme } from '@/modules/shared/store'
import { CartResume, ProductCart } from '../components'
import { useCartData } from '../hooks'
import { useCart } from '../store'

export default function CartScreen() {
  const theme = useTheme((state) => state)
  const cart = useCart((state) => state)
  const { navigate } = useNavigate()
  const { orderData } = useCartData()

  useEffect(() => {
    theme.changeMainColor()
  }, [])

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
          if (cart.cart.length > 0) {
            navigate('Address')
          }
        }}
      />
    </AppContainer>
  )
}
