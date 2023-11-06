import { useEffect } from 'react'

import AppContainer from '@/modules/shared/components/AppContainer'
import AppHeader from '@/modules/shared/components/AppHeader'
import useNavigate from '@/modules/shared/hooks/use-navigate'
import { useTheme } from '@/modules/shared/store'
import Order from '../components/Order'
import { useOrdersHistory } from '../hooks/use-orders-history'

export default function OrdersHistoryScreen() {
  const theme = useTheme((state) => state)
  const { navigateBetweenRoutes } = useNavigate()
  const { orders } = useOrdersHistory()

  useEffect(() => {
    theme.changeMainColor()
  }, [])

  return (
    <AppContainer>
      <AppHeader
        title='Mis compras'
        description='Historial de mis compras'
      />

      {orders.map((order) => (
        <Order
          key={order.id}
          client={order.user}
          date={order.date}
          noOfProducts={order.products.length}
          total={order.total}
          status={order.status}
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
