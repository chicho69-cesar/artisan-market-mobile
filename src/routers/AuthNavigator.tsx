import { RecoverPasswordScreen, SignInScreen, SignUpScreen } from '@/modules/auth/screens'
import { createStackNavigator } from '@react-navigation/stack'

import { useTheme } from '@/modules/shared/store'
import { colors } from '@/modules/shared/theme'
import ScreenHeader from './components/ScreenHeader'

const Stack = createStackNavigator()

export function AuthNavigator() {
  const theme = useTheme((state) => state)

  return (
    <Stack.Navigator
      initialRouteName='SignIn'
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
        name='SignIn'
        component={SignInScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name='SignUp'
        component={SignUpScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name='RecoverPassword'
        component={RecoverPasswordScreen}
        options={{
          headerTitle: (props) => <ScreenHeader title='Recuperar contraseña' />
        }}
      />
    </Stack.Navigator>
  )
}
