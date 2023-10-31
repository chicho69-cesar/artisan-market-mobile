import { createDrawerNavigator } from '@react-navigation/drawer'

import { useTheme } from '@/modules/shared/store'
import { colors } from '@/modules/shared/theme'
import DrawerContent from '@/routers/components/DrawerContent'
import AppNavigator from './AppNavigator'

const Drawer = createDrawerNavigator()

export function DrawerNavigator() {
  const theme = useTheme((state) => state)

  return (
    <Drawer.Navigator
      initialRouteName='App'
      screenOptions={{
        drawerStyle: {
          backgroundColor: colors.gray
        },
        drawerActiveTintColor: theme.mainColor,
        drawerInactiveTintColor: colors.white,
        drawerLabelStyle: {
          color: colors.white
        }
      }}
      drawerContent={(props) => (<DrawerContent {...props}/>)}
    >
      <Drawer.Screen
        name='App'
        component={AppNavigator}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  )
}
