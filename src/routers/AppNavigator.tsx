import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import CartIcon from './components/CartIcon'
import CartStack from './stacks/CartStack'
import ChatsStack from './stacks/ChatsStack'
import HomeStack from './stacks/HomeStack'
import ProfileStack from './stacks/ProfileStack'
import SearchStack from './stacks/SearchStack'

const Tab = createBottomTabNavigator()

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{ 
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#25292e',
          paddingBottom: 6,
          paddingTop: 4,
          height: 60
        },
        tabBarActiveTintColor: 'red', // TODO: Tomarlo del state
        tabBarInactiveTintColor: 'white',
      }}
      initialRouteName='HomeStack'
    >
      <Tab.Screen
        name='HomeStack'
        component={HomeStack}
        options={{
          tabBarLabel: 'Inicio',
          tabBarIcon: ({ color }) => (
            <FontAwesome name='home' color={color} size={22} />
          )
        }}
      />

      <Tab.Screen
        name='SearchStack'
        component={SearchStack}
        options={{
          tabBarLabel: 'Buscar',
          tabBarIcon: ({ color }) => (
            <FontAwesome name='search' color={color} size={22} />
          )
        }}
      />
      
      <Tab.Screen
        name='CartStack'
        component={CartStack}
        options={{
          tabBarLabel: 'Carrito',
          tabBarIcon: ({ color }) => (
            <CartIcon color={color} size={22} />
          )
        }}
      />
      
      <Tab.Screen
        name='ChatsStack'
        component={ChatsStack}
        options={{
          tabBarLabel: 'Chats',
          tabBarIcon: ({ color }) => (
            <Ionicons name='chatbubbles' color={color} size={22} />
          )
        }}
      />
      
      <Tab.Screen
        name='ProfileStack'
        component={ProfileStack}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color }) => (
            <Ionicons name='person' color={color} size={22} />
          )
        }}
      />
    </Tab.Navigator>
  )
}
