/* eslint-disable import/first */
global.__reanimatedWorkletInit = () => {}

import { StatusBar } from 'expo-status-bar'
import { GluestackUIProvider } from '@gluestack-ui/themed'

import { config } from '@/config/gluestack-ui.config'
import Router from '@/routers/Router'

export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <Router />
      <StatusBar style='auto' />
    </GluestackUIProvider>
  )
}
