import { createDrawerNavigator } from '@react-navigation/drawer'
import DrawerContent from '@/routers/components/DrawerContent'
import AppNavigator from './AppNavigator'

const Drawer = createDrawerNavigator()

export function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName='App'
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#25292e',
        },
        drawerActiveTintColor: 'red',
        drawerInactiveTintColor: 'white',
        drawerLabelStyle: {
          color: 'white'
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
