import { createStackNavigator } from '@react-navigation/stack'
import { CartScreen } from '@/modules/cart/screens'
import { AddressScreen, CheckoutScreen, OrderScreen } from '@/modules/orders/screens'

const Stack = createStackNavigator()

export default function CartStack () {
  return (
    <Stack.Navigator
      initialRouteName='Cart'
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name='Cart' component={CartScreen} />
      <Stack.Screen name='Address' component={AddressScreen} />
      <Stack.Screen name='Checkout' component={CheckoutScreen} />
      <Stack.Screen name='Order' component={OrderScreen} />
    </Stack.Navigator>
  )
}
