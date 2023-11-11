import { HStack } from '@gluestack-ui/themed'
import { useEffect } from 'react'

import { AppContainer, AppHeader } from '@/modules/shared/components'
import { useTheme } from '@/modules/shared/store'
import { colors } from '@/modules/shared/theme'
import { DashboardCard } from '../components'
import { useDashboardStats } from '../hooks'

export default function DashboardScreen() {
  const theme = useTheme((state) => state)
  const { stats } = useDashboardStats()

  useEffect(() => {
    theme.changeMainColor()
  }, [])

  return (
    <AppContainer>
      <AppHeader
        title='Administra tu negocio'
        description='Ve las estadísticas de tu negocio'
      />

      <HStack flexWrap='wrap' justifyContent='space-between' alignItems='flex-start' space='md'>
        <DashboardCard
          quantity={stats?.stats.total_orders ?? 0}
          color={colors.purple}
          icon='credit-card'
          text='Ordenes Totales'
        />

        <DashboardCard
          quantity={stats?.stats.paid_orders ?? 0}
          color={colors.green}
          icon='cash-check'
          text='Ordenes Pagadas'
        />

        <DashboardCard
          quantity={stats?.stats.pending_orders ?? 0}
          color={colors.lightGray}
          icon='credit-card-off'
          text='Ordenes Pendientes'
        />

        <DashboardCard
          quantity={stats?.stats.cancelled_orders ?? 0}
          color={colors.red}
          icon='archive-cancel'
          text='Ordenes Canceladas'
        />

        <DashboardCard
          quantity={stats?.stats.total_products ?? 0}
          color={colors.yellow}
          icon='storefront'
          text='Productos'
        />

        <DashboardCard
          quantity={stats?.stats.zero_stock_products ?? 0}
          color={colors.black}
          icon='alert-box'
          text='Sin Existencias'
        />

        <DashboardCard
          quantity={stats?.stats.total_reviews ?? 0}
          color={colors.blue}
          icon='lead-pencil'
          text='Reviews'
        />
      </HStack>
    </AppContainer>
  )
}
