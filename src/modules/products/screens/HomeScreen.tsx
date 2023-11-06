import { useEffect } from 'react'

import { AppContainer, AppHeader } from '@/modules/shared/components'
import { useTheme } from '@/modules/shared/store'
import { Products } from '../components'
import { useProducts } from '../hooks'

export default function HomeScreen() {
  const theme = useTheme((state) => state)
  const { products } = useProducts()

  useEffect(() => {
    theme.changeMainColor()
  }, [])

  return (
    <AppContainer>
      <AppHeader
        title='ArtisanMarket'
        description='Todos los productos'
      />

      <Products products={products} />
    </AppContainer>
  )
}
