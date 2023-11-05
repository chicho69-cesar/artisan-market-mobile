import { HStack, Pressable, Text } from '@gluestack-ui/themed'
import { useRoute } from '@react-navigation/native'
import { useEffect, useState } from 'react'

import AppContainer from '@/modules/shared/components/AppContainer'
import AppHeader from '@/modules/shared/components/AppHeader'
import Avatar from '@/modules/shared/components/Avatar'
import useNavigate from '@/modules/shared/hooks/use-navigate'
import type { User } from '@/modules/shared/interfaces/user'
import { useTheme } from '@/modules/shared/store'
import { colors } from '@/modules/shared/theme'
import { useFollow } from '../hooks/use-follow'

export default function FollowingsScreen() {
  const { params } = useRoute()
  const theme = useTheme((state) => state)
  const [user, setUser] = useState<User>()
  const { follows, fetchFollows } = useFollow(true)
  const { navigateBetweenRoutes } = useNavigate()

  useEffect(() => {
    theme.changeMainColor()
  }, [])

  useEffect(() => {
    const user = (params! as any).user as User
    setUser(user)
  }, [params])

  useEffect(() => {
    fetchFollows(user!)
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
              source={follow.picture ?? ''} /* TODO: set a default image */
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
