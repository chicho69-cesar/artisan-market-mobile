import { useEffect } from 'react'

import AppContainer from '@/modules/shared/components/AppContainer'
import AppHeader from '@/modules/shared/components/AppHeader'
import { useTheme } from '@/modules/shared/store'

export default function HomeScreen() {
  const theme = useTheme((state) => state)

  useEffect(() => {
    theme.changeMainColor()
  }, [])

  return (
    <AppContainer>
      <AppHeader
        title='ArtisanMarket'
        description='Todos los productos'
      />
    </AppContainer>
  )
}
