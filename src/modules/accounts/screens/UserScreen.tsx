import { useRoute } from '@react-navigation/native'
import { useEffect, useState } from 'react'

import { useAuth } from '@/modules/auth/store'
import AppContainer from '@/modules/shared/components/AppContainer'
import useNavigate from '@/modules/shared/hooks/use-navigate'
import type { Social } from '@/modules/shared/interfaces/social'
import type { User } from '@/modules/shared/interfaces/user'
import { useTheme } from '@/modules/shared/store'
import ProfileInformation from '../components/ProfileInformation'

export default function UserScreen() {
  const { params } = useRoute()
  const theme = useTheme((state) => state)
  const auth = useAuth((state) => state)
  const [isOwner, setIsOwner] = useState(false)
  const [user, setUser] = useState<User>()
  const { navigateWithParams } = useNavigate()

  // TODO: get from the api
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

    setSocials({
      socials: {
        facebook: 'https://www.facebook.com/',
        twitter: 'https://twitter.com/',
        linkedin: 'https://www.linkedin.com/',
        freeMarket: 'https://www.facebook.com/'
      }
    })
  }, [])

  useEffect(() => {
    const user = (params! as any).user as User

    setUser(user)
    setIsOwner(user.id === auth.user?.id)
  }, [params])

  return (
    <AppContainer>
      {(user != null || user !== undefined) && (
        <ProfileInformation
          user={user}
          socials={socials.socials}
          isOwner={isOwner}
          profileAction={() => {
            // TODO: follow user
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
