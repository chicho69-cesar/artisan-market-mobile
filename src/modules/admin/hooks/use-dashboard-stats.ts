import type { DashboardStats } from '@/modules/shared/interfaces'
import { useEffect, useState } from 'react'

export function useDashboardStats() {
  const [stats, setStats] = useState<DashboardStats>()

  useEffect(() => {
    /* TODO: get from the api */
    setStats({
      stats: {
        total_orders: 4,
        paid_orders: 1,
        pending_orders: 2,
        cancelled_orders: 1,
        total_products: 18,
        zero_stock_products: 0,
        total_reviews: 26
      }
    })
  }, [])

  const refetchStats = async () => { }

  return {
    stats,
    refetchStats
  }
}
