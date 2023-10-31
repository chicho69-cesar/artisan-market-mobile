import { useNavigation } from '@react-navigation/native'

export default function useNavigate() {
  const navigation = useNavigation<any>()

  const navigate = (screen: string) => {
    navigation.navigate(screen)
  }

  const navigateBetweenRoutes = (navigator: string, route: string) => {
    navigation.navigate(navigator, {
      route
    })
  }

  return {
    navigate,
    navigateBetweenRoutes
  }
}
