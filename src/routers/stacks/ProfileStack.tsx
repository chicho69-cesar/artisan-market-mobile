import { createStackNavigator } from '@react-navigation/stack'
import { EditProfileScreen, FollowersScreen, FollowingsScreen, ProfileScreen } from '@/modules/accounts/screens'

const Stack = createStackNavigator()

export default function ProfileStack() {
  return (
    <Stack.Navigator
      initialRouteName='Profile'
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name='Profile' component={ProfileScreen} />
      <Stack.Screen name='EditProfile' component={EditProfileScreen} />
      <Stack.Screen name='Followers' component={FollowersScreen} />
      <Stack.Screen name='Following' component={FollowingsScreen} />
    </Stack.Navigator>
  )
}
