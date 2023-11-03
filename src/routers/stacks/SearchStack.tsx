import { SearchScreen } from '@/modules/products/screens'
import { useTheme } from '@/modules/shared/store'
import { colors } from '@/modules/shared/theme'
import { createStackNavigator } from '@react-navigation/stack'
import ScreenHeader from '../components/ScreenHeader'

const Stack = createStackNavigator()

export default function SearchStack() {
  const theme = useTheme((state) => state)

  return (
    <Stack.Navigator
      initialRouteName='Search'
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
        name='Search'
        component={SearchScreen}
        options={{
          headerTitle: (props) => <ScreenHeader title='Buscar productos' />,
          headerLeft: () => null
        }}
      />
    </Stack.Navigator>
  )
}
