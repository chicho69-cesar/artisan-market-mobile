import { useEffect } from 'react'

import { useAuth } from '@/modules/auth/store'
import { useCartData } from '@/modules/cart/hooks/use-cart-data'
import { useCart } from '@/modules/cart/store/cart'
import Products from '@/modules/products/components/Products'
import AppContainer from '@/modules/shared/components/AppContainer'
import AppHeader from '@/modules/shared/components/AppHeader'
import { useTheme } from '@/modules/shared/store'
import OrderResume from '../components/OrderResume'
import { useAddress } from '../store/address'
import { OrderStatus } from '../types/order.d'

export default function CheckoutScreen() {
  const theme = useTheme((state) => state)
  const user = useAuth((state) => state.user)
  const address = useAddress((state) => state.address)
  const cart = useCart((state) => state.cart)
  const { orderData } = useCartData()

  useEffect(() => {
    theme.changeMainColor()
  }, [])

  return (
    <AppContainer>
      <AppHeader
        title='Resumen del pedido'
        description={`Resumen de (${orderData.noOfProducts}) productos`}
      />

      <OrderResume
        user={user!}
        address={address!}
        orderData={orderData}
        status={OrderStatus.pending}
      />

      <Products products={cart.map((cartElement) => cartElement.product)} />
    </AppContainer>
  )
}
