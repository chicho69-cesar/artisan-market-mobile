import { useRoute } from '@react-navigation/native'
import { useEffect, useState } from 'react'

import { useAuth } from '@/modules/auth/store'
import { AppContainer } from '@/modules/shared/components'
import { useNavigate } from '@/modules/shared/hooks'
import type { Social, User } from '@/modules/shared/interfaces'
import { useTheme } from '@/modules/shared/store'
import { ProfileInformation } from '../components'
import { getSocialsForAnUser } from '../services'

export default function UserScreen() {
  const { params } = useRoute()
  const theme = useTheme((state) => state)
  const auth = useAuth((state) => state)
  const [isOwner, setIsOwner] = useState(false)
  const [user, setUser] = useState<User>()
  const { navigateWithParams, navigate } = useNavigate()

  const [socials, setSocials] = useState<Social>({
    socials: {
      facebook: null,
      twitter: null,
      linkedin: null,
      freeMarket: null
    }
  })

  useEffect(() => {
    theme.changeMainColor()
  }, [])

  useEffect(() => {
    const user = (params! as any).user as User

    setUser(user)
    setIsOwner(user.id === auth.user?.id)
  }, [params])

  useEffect(() => {
    if (user !== undefined) {
      getSocials()
    }
  }, [user])

  const getSocials = async () => {
    const userSocials = await getSocialsForAnUser(user!.id, auth.token!)

    if (userSocials != null) {
      setSocials(userSocials)
    }
  }

  return (
    <AppContainer>
      {(user != null || user !== undefined) && (
        <ProfileInformation
          user={user}
          socials={socials.socials}
          isOwner={isOwner}
          profileAction={() => {
            navigate('EditProfile')
          }}
          goFollowers={() => {
            navigateWithParams('Followers', { user })
          }}
          goFollowings={() => {
            navigateWithParams('Following', { user })
          }}
        />
      )}
    </AppContainer>
  )
}
