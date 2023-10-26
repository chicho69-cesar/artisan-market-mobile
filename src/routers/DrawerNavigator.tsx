import { createDrawerNavigator } from '@react-navigation/drawer'
import DrawerContent from '@/routers/components/DrawerContent'
import AppNavigator from './AppNavigator'

const Drawer = createDrawerNavigator()

export function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName='App'
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
