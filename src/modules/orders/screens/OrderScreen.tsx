import { useRoute } from '@react-navigation/native'
import { useEffect, useState } from 'react'

import { Products } from '@/modules/products/components'
import { AppContainer, AppHeader } from '@/modules/shared/components'
import type { Order } from '@/modules/shared/interfaces'
import { useTheme } from '@/modules/shared/store'
import { OrderResume } from '../components'
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
        description={`Resumen de (${order?.products.length ?? 0}) productos`}
      />

      {(order != null && order !== undefined) && (
        <OrderResume
          address={order.address}
          status={order.status as OrderStatus}
          user={order.user}
          orderData={{
            noOfProducts: order.products.length ?? 0,
            subTotal: order.subtotal,
            tax: order.tax,
            total: order.total
          }}
        />
      )}

      {(order != null && order !== undefined) && (
        <Products
          withoutNavigate
          products={
            order.products ?? []
          }
        />
      )}
    </AppContainer>
  )
}
