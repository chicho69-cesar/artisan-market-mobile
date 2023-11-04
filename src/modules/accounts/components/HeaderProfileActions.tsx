import { MaterialIcons } from '@expo/vector-icons'
import { HStack, Pressable } from '@gluestack-ui/themed'

import { useAuth } from '@/modules/auth/store'
import useNavigate from '@/modules/shared/hooks/use-navigate'
import { Roles } from '@/modules/shared/interfaces/user'
import { colors } from '@/modules/shared/theme'

export default function HeaderProfileActions() {
  const auth = useAuth((state) => state)
  const { navigate } = useNavigate()

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
          auth.logout()
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
