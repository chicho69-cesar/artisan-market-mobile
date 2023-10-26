import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import HomeStack from './stacks/HomeStack'
import SearchStack from './stacks/SearchStack'
import CartStack from './stacks/CartStack'
import ChatsStack from './stacks/ChatsStack'
import ProfileStack from './stacks/ProfileStack'

const Tab = createBottomTabNavigator()

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName='HomeStack'
    >
      <Tab.Screen
        name='HomeStack'
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name='home' color={color} size={size} />
          ),
          tabBarActiveTintColor: 'red'
        }}
      />

      <Tab.Screen
        name='SearchStack'
        component={SearchStack}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name='home' color={color} size={size} />
          ),
          tabBarActiveTintColor: 'red'
        }}
      />
      
      <Tab.Screen
        name='CartStack'
        component={CartStack}
        options={{
          tabBarLabel: 'Cart',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name='home' color={color} size={size} />
          ),
          tabBarActiveTintColor: 'red'
        }}
      />
      
      <Tab.Screen
        name='ChatsStack'
        component={ChatsStack}
        options={{
          tabBarLabel: 'Chats',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name='home' color={color} size={size} />
          ),
          tabBarActiveTintColor: 'red'
        }}
      />
      
      <Tab.Screen
        name='ProfileStack'
        component={ProfileStack}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name='home' color={color} size={size} />
          ),
          tabBarActiveTintColor: 'red'
        }}
      />
    </Tab.Navigator>
  )
}
