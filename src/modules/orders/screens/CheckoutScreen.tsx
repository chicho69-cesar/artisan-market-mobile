import { useEffect } from 'react'

import { useAuth } from '@/modules/auth/store'
import { useCartData } from '@/modules/cart/hooks'
import { useCart } from '@/modules/cart/store'
import { Products } from '@/modules/products/components'
import { AppContainer, AppHeader } from '@/modules/shared/components'
import { useTheme } from '@/modules/shared/store'
import { OrderResume } from '../components'
import { useAddress } from '../store'
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
