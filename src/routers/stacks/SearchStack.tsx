import { createStackNavigator } from '@react-navigation/stack'
import { SearchScreen } from '@/modules/products/screens'

const Stack = createStackNavigator()

export default function SearchStack () {
  return (
    <Stack.Navigator
      initialRouteName='Search'
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name='Search' component={SearchScreen} />
    </Stack.Navigator>
  )
}
