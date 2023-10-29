import { createStackNavigator } from '@react-navigation/stack'
import { ChatScreen, ChatsScreen } from '@/modules/chats/screens'

const Stack = createStackNavigator()

export default function ChatsStack () {
  return (
    <Stack.Navigator
      initialRouteName='Chats'
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name='Chats' component={ChatsScreen} />
      <Stack.Screen name='Chat' component={ChatScreen} />
    </Stack.Navigator>
  )
}
