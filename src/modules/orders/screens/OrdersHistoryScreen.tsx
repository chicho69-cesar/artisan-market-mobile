import { useEffect } from 'react'

import { AppContainer, AppHeader } from '@/modules/shared/components'
import { useNavigate } from '@/modules/shared/hooks'
import { useTheme } from '@/modules/shared/store'
import { Order } from '../components'
import { useOrdersHistory } from '../hooks'

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
