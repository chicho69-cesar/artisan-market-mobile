import { createStackNavigator } from '@react-navigation/stack'

import { CreateProductScreen, DashboardScreen, EditProductScreen, MyProductsScreen, OrdersScreen } from '@/modules/admin/screens'
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
          headerRight: () => (<ShareProduct />)
        }}
      />

      <Stack.Screen
        name='Reviews'
        component={ReviewsScreen}
      />

      <Stack.Screen
        name='AddReview'
        component={AddReviewScreen}
      />

      <Stack.Screen
        name='OrdersHistory'
        component={OrdersHistoryScreen}
      />

      <Stack.Screen
        name='Dashboard'
        component={DashboardScreen}
      />

      <Stack.Screen
        name='MyProducts'
        component={MyProductsScreen}
      />

      <Stack.Screen
        name='CreateProduct'
        component={CreateProductScreen}
      />

      <Stack.Screen
        name='EditProduct'
        component={EditProductScreen}
      />

      <Stack.Screen
        name='Orders'
        component={OrdersScreen}
      />
    </Stack.Navigator>
  )
}
