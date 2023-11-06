import { MaterialIcons } from '@expo/vector-icons'
import { useRoute } from '@react-navigation/native'
import { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { GiftedChat, Send, type IMessage } from 'react-native-gifted-chat'

import type { User } from '@/modules/shared/interfaces'
import { useTheme } from '@/modules/shared/store'

export default function ChatScreen() {
  const { params } = useRoute()
  const theme = useTheme((state) => state)
  const [userToChat, setUserToChat] = useState<User>()
  const [messages, setMessages] = useState<IMessage[]>([])

  useEffect(() => {
    theme.changeMainColor()
  }, [])

  useEffect(() => {
    const user = (params! as any).chat as User
    setUserToChat(user)
  }, [params])

  useLayoutEffect(() => {
    // TODO: Load messages from api
    setMessages([
      {
        _id: 1,
        text: 'Hello World!!!',
        createdAt: new Date(),
        user: {
          _id: 2, // 1 for my messages; 2 for the other user messages
          name: `${userToChat?.name} ${userToChat?.lastname}`,
          avatar: userToChat?.picture ?? '' // TODO: use a default picture
        }
      }
    ])
  }, [userToChat])

  const handleSendMessage = useCallback(async (messages: IMessage[] = []) => {
    // TODO: send message to the server with messages[0]

    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    )
  }, [])

  return (
    <GiftedChat
      messages={messages}
      placeholder='Escribe un mensaje...'
      onSend={(messages) => {
        handleSendMessage(messages)
      }}
      user={{
        _id: 1,
        avatar: userToChat?.picture ?? '' /* TODO: set a image default */
      }}
      renderSend={(props) => (
        <Send
          {...props}
          containerStyle={{
            height: 60,
            width: 60,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <MaterialIcons
            name='send'
            size={24}
            color={theme.mainColor}
          />
        </Send>
      )}
      messagesContainerStyle={styles.messageStyle}
    />
  )
}

const styles = StyleSheet.create({
  messageStyle: {
    backgroundColor: '#fff'
  }
})
