import { HStack, Pressable, Text } from '@gluestack-ui/themed'
import { useRoute } from '@react-navigation/native'
import { useEffect, useState } from 'react'

import { AppContainer, AppHeader, Avatar } from '@/modules/shared/components'
import { blankImage, serverUrl } from '@/modules/shared/constants'
import { useNavigate } from '@/modules/shared/hooks'
import type { User } from '@/modules/shared/interfaces'
import { useTheme } from '@/modules/shared/store'
import { colors } from '@/modules/shared/theme'
import { useFollows } from '../hooks'

export default function FollowersScreen() {
  const { params } = useRoute()
  const theme = useTheme((state) => state)
  const [user, setUser] = useState<User>()
  const { follows, fetchFollows } = useFollows(false)
  const { navigateBetweenRoutes } = useNavigate()

  useEffect(() => {
    theme.changeMainColor()
  }, [])

  useEffect(() => {
    const user = (params! as any).user as User
    setUser(user)
  }, [params])

  useEffect(() => {
    if (user !== undefined) {
      fetchFollows(user.id)
    }
  }, [user])

  return (
    <AppContainer>
      <AppHeader
        title='Seguidores'
        description={`Personas que siguen a ${user?.name} ${user?.lastname}`}
      />

      {follows.map((follow) => (
        <Pressable
          key={follow.id}
          w='100%'
          py='$2'
          borderBottomWidth='$1'
          borderBottomColor={colors.lightGray}
          onPress={() => {
            if ((user) != null) {
              navigateBetweenRoutes('ProfileStack', 'UserProfile', { user: follow })
            }
          }}
        >
          <HStack space='sm' alignItems='center'>
            <Avatar
              source={
                follow.picture == null || follow.picture === undefined
                  ? blankImage : `${serverUrl}/storage/${follow.picture}`
              }
              alt={follow.name}
            />

            <Text color={colors.gray} fontSize='$lg' fontWeight='$medium'>
              {follow.name} {follow.lastname}
            </Text>
          </HStack>
        </Pressable>
      ))}
    </AppContainer>
  )
}
