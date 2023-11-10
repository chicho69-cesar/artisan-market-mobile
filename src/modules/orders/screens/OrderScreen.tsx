import { useRoute } from '@react-navigation/native'
import { useEffect, useState } from 'react'

import { useAuth } from '@/modules/auth/store'
import { Products } from '@/modules/products/components'
import { AppAlert, AppContainer, AppHeader } from '@/modules/shared/components'
import type { Order } from '@/modules/shared/interfaces'
import { useTheme } from '@/modules/shared/store'
import { OrderResume } from '../components'
import { cancelOrder, payOrder } from '../services'
import type { OrderStatus } from '../types/order.d'

export default function OrderScreen() {
  const { params } = useRoute()
  const theme = useTheme((state) => state)
  const auth = useAuth((state) => state)
  const [order, setOrder] = useState<Order>()
  const [isAnError, setIsAnError] = useState(false)

  useEffect(() => {
    theme.changeMainColor()
  }, [])

  useEffect(() => {
    const orderFromParams = (params! as any).order as Order
    setOrder(orderFromParams)
  }, [params])

  const handleOrderAction = async (pay: boolean) => {
    if (order == null || order === undefined) return

    const response = pay
      ? await payOrder(order.id, auth.token!)
      : await cancelOrder(order.id, auth.token!)

    if (response != null) {
      setOrder(response)
    } else {
      setIsAnError(true)

      setTimeout(() => {
        setIsAnError(false)
      }, 2000)
    }
  }

  return (
    <AppContainer>
      {isAnError && (
        <AppAlert
          action='error'
          description='Ocurrió un error inesperado. Inténtalo de nuevo'
          title='Error!'
        />
      )}

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
          payOrder={() => {
            handleOrderAction(true)
          }}
          cancelOrder={() => {
            handleOrderAction(false)
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
