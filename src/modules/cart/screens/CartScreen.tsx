import { useEffect } from 'react'

import AppContainer from '@/modules/shared/components/AppContainer'
import AppHeader from '@/modules/shared/components/AppHeader'
import useNavigate from '@/modules/shared/hooks/use-navigate'
import { useTheme } from '@/modules/shared/store'
import CartResume from '../components/CartResume'
import ProductCart from '../components/ProductCart'
import { useCartData } from '../hooks/use-cart-data'
import { useCart } from '../store/cart'

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
          navigate('Address')
        }}
      />
    </AppContainer>
  )
}
