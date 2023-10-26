import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'

import { useAuth } from '@/modules/auth/store'
import { EditProfileScreen, FollowersScreen, FollowingsScreen, ProfileScreen } from '@/modules/accounts/screens'
import { CreateProductScreen, DashboardScreen, EditProductScreen, MyProductsScreen, OrdersScreen } from '@/modules/admin/screens'
import { RecoverPasswordScreen, SignInScreen, SignUpScreen } from '@/modules/auth/screens'
import { CartScreen } from '@/modules/cart/screens'
import { ChatScreen, ChatsScreen } from '@/modules/chats/screens'
import { AddressScreen, CheckoutScreen, OrderScreen, OrdersHistoryScreen } from '@/modules/orders/screens'
import { AddReviewScreen, DetailsScreen, HomeScreen, ReviewsScreen, SearchScreen } from '@/modules/products/screens'

import { View, Text } from 'react-native'
import DrawerContent from './components/DrawerContent'

const Drawer = createDrawerNavigator()
const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

function AuthNavigator() {
  return (
    <Stack.Navigator
      initialRouteName='SignIn'
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name='SignIn' component={SignInScreen} />
      <Stack.Screen name='SignUp' component={SignUpScreen} />
      <Stack.Screen name='RecoverPassword' component={RecoverPasswordScreen} />
    </Stack.Navigator>
  )
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName='Home'
      drawerContent={(props) => (<DrawerContent {...props}/>)}
    >
      <Drawer.Screen 
        name='Home'
        component={HomeScreen}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  )
}

export default function Router() {
  const auth = useAuth((state) => state)

  return (
    <NavigationContainer>
      {auth.isLoggedIn ? <DrawerNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  )
}
