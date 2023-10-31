import { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { Button } from '@gluestack-ui/themed'

import { useTheme } from '@/modules/shared/store'

export default function HomeScreen() {
  const [count, setCount] = useState(0)
  const theme = useTheme((state) => state)

  useEffect(() => {
    theme.changeMainColor()
  }, [])

  return (
    <View>
      <Text>HomeScreen</Text>

      <Button onPress={() => {
        setCount((prevCount) => prevCount + 1)
      }}>
        <Text>Hola {count}</Text>
      </Button>
    </View>
  )
}
