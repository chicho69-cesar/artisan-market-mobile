import { MaterialIcons } from '@expo/vector-icons'
import { Pressable } from '@gluestack-ui/themed'
import { useNavigation } from '@react-navigation/native'

import { colors } from '@/modules/shared/theme'

export default function GoChats() {
  const navigation = useNavigation<any>()

  return (
    <Pressable
      onPress={() => {
        navigation.navigate('Chats')
      }}
    >
      <MaterialIcons
        name='arrow-back'
        size={24}
        color={colors.white}
        style={{ marginLeft: 10 }}
      />
    </Pressable>
  )
}
