import { useEffect, useState } from 'react'

import { useAuth } from '@/modules/auth/store'
import AppContainer from '@/modules/shared/components/AppContainer'
import useNavigate from '@/modules/shared/hooks/use-navigate'
import type { Social } from '@/modules/shared/interfaces/social'
import { useTheme } from '@/modules/shared/store'
import ProfileInformation from '../components/ProfileInformation'

export default function ProfileScreen() {
  const theme = useTheme((state) => state)
  const auth = useAuth((state) => state)
  const { navigateWithParams, navigate } = useNavigate()

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

  return (
    <AppContainer>
      <ProfileInformation
        user={auth.user!}
        socials={socials.socials}
        isOwner
        profileAction={() => {
          navigate('EditProfile')
        }}
        goFollowers={() => {
          navigateWithParams('Followers', { user: auth.user })
        }}
        goFollowings={() => {
          navigateWithParams('Following', { user: auth.user })
        }}
      />
    </AppContainer>
  )
}
