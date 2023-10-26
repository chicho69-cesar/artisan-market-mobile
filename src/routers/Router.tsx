import { NavigationContainer } from '@react-navigation/native'

import { useAuth } from '@/modules/auth/store'
import { AuthNavigator } from './AuthNavigator'
import { DrawerNavigator } from './DrawerNavigator'

export default function Router() {
  const auth = useAuth((state) => state)

  return (
    <NavigationContainer>
      {auth.isLoggedIn ? <DrawerNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  )
}
