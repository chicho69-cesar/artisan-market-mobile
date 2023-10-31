import { createStackNavigator } from '@react-navigation/stack'
import { CreateProductScreen, DashboardScreen, EditProductScreen, MyProductsScreen, OrdersScreen } from '@/modules/admin/screens'
import { OrdersHistoryScreen } from '@/modules/orders/screens'
import { AddReviewScreen, DetailsScreen, HomeScreen, ReviewsScreen } from '@/modules/products/screens'

const Stack = createStackNavigator()

export default function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName='Home'
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='Details' component={DetailsScreen} />
      <Stack.Screen name='Reviews' component={ReviewsScreen} />
      <Stack.Screen name='AddReview' component={AddReviewScreen} />
      <Stack.Screen name='OrdersHistory' component={OrdersHistoryScreen} />
      <Stack.Screen name='Dashboard' component={DashboardScreen} />
      <Stack.Screen name='MyProducts' component={MyProductsScreen} />
      <Stack.Screen name='CreateProduct' component={CreateProductScreen} />
      <Stack.Screen name='EditProduct' component={EditProductScreen} />
      <Stack.Screen name='Orders' component={OrdersScreen} />
    </Stack.Navigator>
  )
}
