import { MaterialIcons } from '@expo/vector-icons'
import { Pressable } from '@gluestack-ui/themed'
import { DrawerActions, useNavigation } from '@react-navigation/native'

import { colors } from '@/modules/shared/theme'

export default function OpenDrawer() {
  const navigation = useNavigation()

  return (
    <Pressable
      onPress={() => {
        navigation.dispatch(DrawerActions.openDrawer())
      }}
    >
      <MaterialIcons
        name='menu'
        size={24}
        color={colors.white}
        style={{ marginLeft: 10 }}
      />
    </Pressable>
  )
}
