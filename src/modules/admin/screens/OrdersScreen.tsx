import { useEffect } from 'react'

import Order from '@/modules/orders/components/Order'
import AppContainer from '@/modules/shared/components/AppContainer'
import AppHeader from '@/modules/shared/components/AppHeader'
import useNavigate from '@/modules/shared/hooks/use-navigate'
import { useTheme } from '@/modules/shared/store'
import { useSellerOrders } from '../hooks/use-seller-orders'

export default function OrdersScreen() {
  const theme = useTheme((state) => state)
  const { navigateBetweenRoutes } = useNavigate()
  const { orders } = useSellerOrders()

  useEffect(() => {
    theme.changeMainColor()
  }, [])

  return (
    <AppContainer>
      <AppHeader
        title='Mis pedidos'
        description='Los pedidos que la gente hizo de tus productos'
      />

      {orders.map((order) => (
        <Order
          key={order.order_id}
          client={order.user}
          date={order.order_date}
          noOfProducts={order.products.length}
          total={order.total}
          status={order.order_status}
          isAdminOrder
          navToOrder={() => {
            navigateBetweenRoutes('CartStack', 'Order', { order })
          }}
          navToClient={() => {
            navigateBetweenRoutes('ProfileStack', 'UserProfile', { user: order.user })
          }}
        />
      ))}
    </AppContainer>
  )
}
