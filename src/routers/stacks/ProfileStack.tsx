import HeaderProfileActions from '@/modules/accounts/components/HeaderProfileActions'
import { EditProfileScreen, FollowersScreen, FollowingsScreen, ProfileScreen } from '@/modules/accounts/screens'
import { useTheme } from '@/modules/shared/store'
import { colors } from '@/modules/shared/theme'
import { createStackNavigator } from '@react-navigation/stack'
import OpenDrawer from '../components/OpenDrawer'
import ScreenHeader from '../components/ScreenHeader'

const Stack = createStackNavigator()

export default function ProfileStack() {
  const theme = useTheme((state) => state)

  return (
    <Stack.Navigator
      initialRouteName='Profile'
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
        name='Profile'
        component={ProfileScreen}
        options={{
          headerTitle: (props) => <ScreenHeader title='Ve tu perfil' />,
          headerLeft: () => <OpenDrawer />,
          headerRight: () => <HeaderProfileActions />
        }}
      />

      <Stack.Screen
        name='EditProfile'
        component={EditProfileScreen}
      />

      <Stack.Screen
        name='Followers'
        component={FollowersScreen}
      />

      <Stack.Screen
        name='Following'
        component={FollowingsScreen}
      />
    </Stack.Navigator>
  )
}
