import { createStackNavigator } from '@react-navigation/stack'
import { RecoverPasswordScreen, SignInScreen, SignUpScreen } from '@/modules/auth/screens'

const Stack = createStackNavigator()

export function AuthNavigator() {
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
