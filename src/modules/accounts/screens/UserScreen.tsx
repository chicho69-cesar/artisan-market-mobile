import { useEffect } from 'react'

import AppContainer from '@/modules/shared/components/AppContainer'
import { useTheme } from '@/modules/shared/store'

export default function UserScreen() {
  const theme = useTheme((state) => state)

  useEffect(() => {
    theme.changeMainColor()
  }, [])

  return (
    <AppContainer>
      {/*  */}
    </AppContainer>
  )
}
