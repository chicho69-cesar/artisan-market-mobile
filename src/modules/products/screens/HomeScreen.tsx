import { useEffect } from 'react'

import AppContainer from '@/modules/shared/components/AppContainer'
import AppHeader from '@/modules/shared/components/AppHeader'
import { useTheme } from '@/modules/shared/store'
import Products from '../components/Products'
import { useProducts } from '../hooks/use-products'

export default function HomeScreen() {
  const theme = useTheme((state) => state)
  const { products } = useProducts()

  useEffect(() => {
    theme.changeMainColor()
  }, [])

  useEffect(() => {
    console.log(products)
  }, [products])

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
