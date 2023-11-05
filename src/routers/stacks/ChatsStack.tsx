import { createStackNavigator } from '@react-navigation/stack'

import { ChatScreen, ChatsScreen } from '@/modules/chats/screens'
import { useTheme } from '@/modules/shared/store'
import { colors } from '@/modules/shared/theme'
import GoChats from '../components/GoChats'
import ScreenHeader from '../components/ScreenHeader'

const Stack = createStackNavigator()

export default function ChatsStack() {
  const theme = useTheme((state) => state)

  return (
    <Stack.Navigator
      initialRouteName='Chats'
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
        name='Chats'
        component={ChatsScreen}
        options={{
          headerTitle: (props) => <ScreenHeader title='Chats' />,
          headerLeft: () => null
        }}
      />

      <Stack.Screen
        name='Chat'
        component={ChatScreen}
        options={{
          headerTitle: (props) => <ScreenHeader title='Chatea' />,
          headerLeft: () => <GoChats />
        }}
      />
    </Stack.Navigator>
  )
}
