import { MaterialIcons } from '@expo/vector-icons'
import { useRoute } from '@react-navigation/native'
import { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { GiftedChat, Send, type IMessage } from 'react-native-gifted-chat'

import { useAuth } from '@/modules/auth/store'
import { blankImage } from '@/modules/shared/constants'
import type { User } from '@/modules/shared/interfaces'
import { useTheme } from '@/modules/shared/store'
import { useChat } from '../hooks'
import { sendMessage } from '../services'

export default function ChatScreen() {
  const { params } = useRoute()
  const theme = useTheme((state) => state)
  const auth = useAuth((state) => state)
  const [userToChat, setUserToChat] = useState<User>()
  const { conversation } = useChat(userToChat?.id ?? 0)
  const [messages, setMessages] = useState<IMessage[]>([])

  useEffect(() => {
    theme.changeMainColor()
  }, [])

  useEffect(() => {
    const user = (params! as any).chat as User
    setUserToChat(user)
  }, [params])

  useLayoutEffect(() => {
    const mapMessage = (message: any, user: any, userId: number) => ({
      _id: message.id,
      text: message.message,
      createdAt: new Date(message.date),
      user: {
        _id: userId,
        name: `${user?.name} ${user?.lastname}`,
        avatar: user?.picture ?? blankImage
      }
    })

    const messagesReceived: IMessage[] = conversation.receive.map((received) => mapMessage(received, userToChat, 2))
    const messagesSent: IMessage[] = conversation.send.map((sent) => mapMessage(sent, auth.user, 1))

    const messagesOfTheConversation = [...messagesReceived, ...messagesSent]

    messagesOfTheConversation.sort((a, b) => {
      const dateA = a.createdAt instanceof Date ? a.createdAt : new Date(a.createdAt)
      const dateB = b.createdAt instanceof Date ? b.createdAt : new Date(b.createdAt)

      return dateB.getTime() - dateA.getTime()
    })

    setMessages(messagesOfTheConversation)
  }, [userToChat, conversation])

  const handleSendMessage = useCallback(async (messages: IMessage[] = []) => {
    if (userToChat !== undefined) {
      await sendMessage(userToChat.id, messages[0].text, auth.token!)
    }

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
        avatar: userToChat?.picture ?? blankImage
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
