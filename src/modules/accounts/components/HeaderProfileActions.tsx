import { MaterialIcons } from '@expo/vector-icons'
import { HStack, Pressable } from '@gluestack-ui/themed'

import { signOut } from '@/modules/auth/services'
import { useAuth } from '@/modules/auth/store'
import { useNavigate } from '@/modules/shared/hooks'
import { Roles } from '@/modules/shared/interfaces'
import { colors } from '@/modules/shared/theme'
import { clearSession } from '@/modules/auth/utils/session'

export default function HeaderProfileActions() {
  const auth = useAuth((state) => state)
  const { navigate } = useNavigate()

  const handleLogout = async () => {
    await clearSession()
    const response = await signOut(auth.token ?? '')

    if (response != null) {
      auth.logout()
    }
  }

  return (
    <HStack justifyContent='flex-end' alignItems='center' space='xs'>
      {auth.user?.role_id === Roles.seller && (
        <Pressable
          onPress={() => {
            navigate('CreateProduct')
          }}
        >
          <MaterialIcons
            name='add-box'
            size={24}
            color={colors.white}
            style={{ marginRight: 10 }}
          />
        </Pressable>
      )}

      <Pressable
        onPress={() => {
          handleLogout()
        }}
      >
        <MaterialIcons
          name='logout'
          size={24}
          color={colors.white}
          style={{ marginRight: 10 }}
        />
      </Pressable>
    </HStack>
  )
}
