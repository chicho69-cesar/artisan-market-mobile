/* eslint-disable multiline-ternary */
import { DrawerContentScrollView, DrawerItem, type DrawerContentComponentProps } from '@react-navigation/drawer'
import { useNavigation } from '@react-navigation/native'
import { Text } from 'react-native'

import { useAuth } from '@/modules/auth/store'
import { Roles } from '@/modules/shared/interfaces'

export default function DrawerContent(props: DrawerContentComponentProps) {
  const auth = useAuth((state) => state)
  const navigation = useNavigation<any>()

  const handleNavigate = (screen: string) => {
    navigation.navigate('HomeStack', {
      screen
    })
  }

  return (
    <DrawerContentScrollView {...props}>
      {/* <DrawerItemList {...props} /> */}

      <DrawerItem
        label={() => (
          <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>
            Mi historial de pedidos
          </Text>
        )}
        onPress={() => {
          handleNavigate('OrdersHistory')
        }}
      />

      {(auth.isLoggedIn && auth.user?.role_id === Roles.seller) ? (
        <>
          <DrawerItem
            label={() => (
              <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>
                Dashboard
              </Text>
            )}
            onPress={() => {
              handleNavigate('Dashboard')
            }}
          />

          <DrawerItem
            label={() => (
              <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>
                Mis productos
              </Text>
            )}
            onPress={() => {
              handleNavigate('MyProducts')
            }}
          />

          <DrawerItem
            label={() => (
              <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>
                Pedidos
              </Text>
            )}
            onPress={() => {
              handleNavigate('Orders')
            }}
          />
        </>
      ) : null}
    </DrawerContentScrollView>
  )
}
