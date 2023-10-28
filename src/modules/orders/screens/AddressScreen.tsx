import { useEffect } from 'react'
import { Text, View } from 'react-native'

import { useTheme } from '@/modules/shared/store/theme'

export default function AddressScreen() {
  const theme = useTheme((state) => state)

  useEffect(() => {
    theme.changeMainColor()
  }, [])

  return (
    <View>
      <Text>AddressScreen</Text>
    </View>
  )
}
