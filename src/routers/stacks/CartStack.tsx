import { CartScreen } from '@/modules/cart/screens'
import { AddressScreen, CheckoutScreen, OrderScreen } from '@/modules/orders/screens'
import { useTheme } from '@/modules/shared/store'
import { colors } from '@/modules/shared/theme'
import { createStackNavigator } from '@react-navigation/stack'
import ScreenHeader from '../components/ScreenHeader'

const Stack = createStackNavigator()

export default function CartStack() {
  const theme = useTheme((state) => state)

  return (
    <Stack.Navigator
      initialRouteName='Cart'
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.mainColor,
          elevation: 5,
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15,
          height: 80
        },
        headerTintColor: colors.white,
        headerTitleStyle: {
          fontWeight: 'bold',
          color: colors.white
        }
      }}
    >
      <Stack.Screen
        name='Cart'
        component={CartScreen}
        options={{
          headerTitle: (props) => <ScreenHeader title='Carrito de compras' />,
          headerLeft: () => null
        }}
      />

      <Stack.Screen
        name='Address'
        component={AddressScreen}
        options={{
          headerTitle: (props) => <ScreenHeader title='Dirección de entrega' />,
          headerLeft: () => null
        }}
      />

      <Stack.Screen
        name='Checkout'
        component={CheckoutScreen}
        options={{
          headerTitle: (props) => <ScreenHeader title='Confirmar pedido' />,
          headerLeft: () => null
        }}
      />

      <Stack.Screen
        name='Order'
        component={OrderScreen}
        options={{
          headerTitle: (props) => <ScreenHeader title='Información de la orden' />
        }}
      />
    </Stack.Navigator>
  )
}
