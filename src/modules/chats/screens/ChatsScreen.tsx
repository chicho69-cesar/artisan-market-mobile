import { HStack, Pressable, Text } from '@gluestack-ui/themed'
import { useEffect } from 'react'

import AppContainer from '@/modules/shared/components/AppContainer'
import AppHeader from '@/modules/shared/components/AppHeader'
import Avatar from '@/modules/shared/components/Avatar'
import { useTheme } from '@/modules/shared/store'
import { colors } from '@/modules/shared/theme'
import { useChats } from '../hooks/use-chats'

export default function ChatsScreen() {
  const theme = useTheme((state) => state)
  const { chats } = useChats()

  useEffect(() => {
    theme.changeMainColor()
  }, [])

  useEffect(() => {
    console.log(chats)
  }, [chats])

  return (
    <AppContainer>
      <AppHeader
        title='Chats activos'
        description='Revisa tus mensajes'
      />

      {chats.map((chat) => (
        <Pressable
          key={chat.id}
          w='100%'
          py='$2'
          borderBottomWidth='$1'
          borderBottomColor={colors.lightGray}
          onPress={() => {}}
        >
          <HStack space='sm' alignItems='center'>
            <Avatar
              source={chat.picture ?? ''} /* TODO: set a default image */
              alt={chat.name}
            />

            <Text color={colors.gray} fontSize='$lg' fontWeight='$medium'>
              {chat.name} {chat.lastname}
            </Text>
          </HStack>
        </Pressable>
      ))}
    </AppContainer>
  )
}
