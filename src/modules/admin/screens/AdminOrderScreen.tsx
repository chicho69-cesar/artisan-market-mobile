import { useRoute } from '@react-navigation/native'
import { useEffect, useState } from 'react'

import { OrderResume } from '@/modules/orders/components'
import type { OrderStatus } from '@/modules/orders/types/order'
import { Product } from '@/modules/products/components'
import { AppContainer, AppHeader } from '@/modules/shared/components'
import type { AdminOrder } from '@/modules/shared/interfaces'
import { useTheme } from '@/modules/shared/store'

export default function AdminOrderScreen() {
  const { params } = useRoute()
  const theme = useTheme((state) => state)
  const [order, setOrder] = useState<AdminOrder>()

  useEffect(() => {
    theme.changeMainColor()
  }, [])

  useEffect(() => {
    const orderFromParams = (params! as any).order as AdminOrder
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
        <>
          {order.products.map((product) => (
            <Product
              key={product.product.id}
              product={product.product}
              isAdmin
              quantitySold={product.quantity_sold}
            />
          ))}
        </>
      )}
    </AppContainer>
  )
}
