import { NavigationContainer } from '@react-navigation/native'
import { useEffect } from 'react'

import { useAuth } from '@/modules/auth/store'
import { getSession } from '@/modules/auth/utils/session'
import { AuthNavigator } from './AuthNavigator'
import { DrawerNavigator } from './DrawerNavigator'

export default function Router() {
  const auth = useAuth((state) => state)

  useEffect(() => {
    const getSessionFromStore = async () => {
      const userLogged = await getSession()

      if (userLogged != null) {
        auth.authenticate(userLogged.user!, userLogged.token!)
      }
    }

    getSessionFromStore()
  }, [])

  return (
    <NavigationContainer>
      {auth.isLoggedIn ? <DrawerNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  )
}
