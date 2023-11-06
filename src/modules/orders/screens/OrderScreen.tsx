import { useRoute } from '@react-navigation/native'
import { useEffect, useState } from 'react'

import Products from '@/modules/products/components/Products'
import AppContainer from '@/modules/shared/components/AppContainer'
import AppHeader from '@/modules/shared/components/AppHeader'
import type { Order } from '@/modules/shared/interfaces/order'
import { useTheme } from '@/modules/shared/store'
import OrderResume from '../components/OrderResume'
import type { OrderStatus } from '../types/order.d'

export default function OrderScreen() {
  const { params } = useRoute()
  const theme = useTheme((state) => state)
  const [order, setOrder] = useState<Order>()

  useEffect(() => {
    theme.changeMainColor()
  }, [])

  useEffect(() => {
    const orderFromParams = (params! as any).order as Order
    setOrder(orderFromParams)
  }, [params])

  return (
    <AppContainer>
      <AppHeader
        title='Estado de la orden'
        description={`Resumen de (${order?.products.length}) productos`}
      />

      {(order != null && order !== undefined) && (
        <OrderResume
          address={order.address}
          status={order.status as OrderStatus}
          user={order.user}
          orderData={{
            noOfProducts: order.products.length,
            subTotal: order.subtotal,
            tax: order.tax,
            total: order.total
          }}
        />
      )}

      <Products products={order?.products ?? []} />
    </AppContainer>
  )
}
