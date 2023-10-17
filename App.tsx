import { StatusBar } from 'expo-status-bar'
import { GluestackUIProvider, Text, Box } from '@gluestack-ui/themed'
import { config } from '@gluestack-ui/config'

export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <Box width='100%' justifyContent='center' alignItems='center'>
        <Text>Hello World!!!</Text>
      </Box>

      <StatusBar style='auto' />
    </GluestackUIProvider>
  )
}
