import { HStack, Pressable, Text } from '@gluestack-ui/themed'
import { useEffect } from 'react'

import { AppContainer, AppHeader, Avatar } from '@/modules/shared/components'
import { blankImage, serverUrl } from '@/modules/shared/constants'
import { useNavigate } from '@/modules/shared/hooks'
import { useTheme } from '@/modules/shared/store'
import { colors } from '@/modules/shared/theme'
import { useChats } from '../hooks'

export default function ChatsScreen() {
  const theme = useTheme((state) => state)
  const { chats } = useChats()
  const { navigateWithParams } = useNavigate()

  useEffect(() => {
    theme.changeMainColor()
  }, [])

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
          onPress={() => {
            navigateWithParams('Chat', { chat })
          }}
        >
          <HStack space='sm' alignItems='center'>
            <Avatar
              source={
                chat.picture == null || chat.picture === undefined
                  ? blankImage : `${serverUrl}/storage/${chat.picture}`
              }
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
