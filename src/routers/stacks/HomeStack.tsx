import { createStackNavigator } from '@react-navigation/stack'

import { AdminOrderScreen, CreateProductScreen, DashboardScreen, EditProductScreen, MyProductsScreen, OrdersScreen } from '@/modules/admin/screens'
import { OrdersHistoryScreen } from '@/modules/orders/screens'
import ShareProduct from '@/modules/products/components/ShareProduct'
import { AddReviewScreen, DetailsScreen, HomeScreen, ReviewsScreen } from '@/modules/products/screens'
import { useTheme } from '@/modules/shared/store'
import { colors } from '@/modules/shared/theme'
import OpenDrawer from '../components/OpenDrawer'
import ScreenHeader from '../components/ScreenHeader'

const Stack = createStackNavigator()

export default function HomeStack() {
  const theme = useTheme((state) => state)

  return (
    <Stack.Navigator
      initialRouteName='Home'
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
        name='Home'
        component={HomeScreen}
        options={{
          headerTitle: (props) => <ScreenHeader title='ArtisanMarket' />,
          headerLeft: () => <OpenDrawer />
        }}
      />

      <Stack.Screen
        name='Details'
        component={DetailsScreen}
        options={{
          headerTitle: (props) => <ScreenHeader title='ArtisanMarket' />,
          headerRight: () => <ShareProduct />
        }}
      />

      <Stack.Screen
        name='Reviews'
        component={ReviewsScreen}
        options={{
          headerTitle: (props) => <ScreenHeader title='Reviews' />
        }}
      />

      <Stack.Screen
        name='AddReview'
        component={AddReviewScreen}
        options={{
          headerTitle: (props) => <ScreenHeader title='Agregar review' />
        }}
      />

      <Stack.Screen
        name='OrdersHistory'
        component={OrdersHistoryScreen}
        options={{
          headerTitle: (props) => <ScreenHeader title='Historial de mis compras' />
        }}
      />

      <Stack.Screen
        name='Dashboard'
        component={DashboardScreen}
        options={{
          headerTitle: (props) => <ScreenHeader title='Dashboard' />
        }}
      />

      <Stack.Screen
        name='MyProducts'
        component={MyProductsScreen}
        options={{
          headerTitle: (props) => <ScreenHeader title='Mis productos' />
        }}
      />

      <Stack.Screen
        name='CreateProduct'
        component={CreateProductScreen}
        options={{
          headerTitle: (props) => <ScreenHeader title='Agregar producto' />
        }}
      />

      <Stack.Screen
        name='EditProduct'
        component={EditProductScreen}
        options={{
          headerTitle: (props) => <ScreenHeader title='Editar producto' />
        }}
      />

      <Stack.Screen
        name='Orders'
        component={OrdersScreen}
        options={{
          headerTitle: (props) => <ScreenHeader title='Pedidos' />
        }}
      />

      <Stack.Screen
        name='AdminOrder'
        component={AdminOrderScreen}
        options={{
          headerTitle: (props) => <ScreenHeader title='Orden del administrador' />
        }}
      />
    </Stack.Navigator>
  )
}
