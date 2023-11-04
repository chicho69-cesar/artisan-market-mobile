import { HStack, Heading, Image, Pressable, Text, VStack, View } from '@gluestack-ui/themed'
import { useEffect, useState } from 'react'

import { useAuth } from '@/modules/auth/store'
import AppContainer from '@/modules/shared/components/AppContainer'
import type { Social } from '@/modules/shared/interfaces/social'
import { Roles } from '@/modules/shared/interfaces/user'
import { useTheme } from '@/modules/shared/store'
import { colors } from '../../shared/theme/config'

const facebook = require('../../../../assets/socials/facebook.png')
const twitter = require('../../../../assets/socials/twitter.png')
const linkedin = require('../../../../assets/socials/linkedin.png')
const freeMarket = require('../../../../assets/socials/mercado-libre.png')

export default function ProfileScreen() {
  const theme = useTheme((state) => state)
  const auth = useAuth((state) => state)

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
      <HStack mt='$4' justifyContent='space-between' alignItems='center' space='md'>
        <Image
          source={auth.user?.picture ?? ''} // TODO: use a default image
          alt={auth.user?.name ?? ''}
          w='$24'
          h='$24'
          rounded='$full'
        />

        <VStack alignItems='flex-start' w='100%' space='xs'>
          <Text>
            {auth.user?.name} {auth.user?.lastname}
          </Text>

          <View>
            <Text>
              {auth.user?.role_id === Roles.seller ? 'Vendedor' : 'Usuario'}
            </Text>
          </View>

          <Pressable
            py='$1'
            px='$2'
            rounded='$md'
            bg={theme.mainColor}
            onPress={() => {}}
          >
            <Text color={colors.white}>
              Editar perfil
            </Text>
          </Pressable>

          <HStack justifyContent='space-between' alignItems='flex-start' space='sm'>
            <Pressable>
              <VStack>
                <Text>
                  Seguidores
                </Text>

                <Text>
                  90 {/* TODO: get from the api */}
                </Text>
              </VStack>
            </Pressable>

            <Pressable>
              <VStack>
                <Text>
                  Siguiendo
                </Text>

                <Text>
                  5 {/* TODO: get from the api */}
                </Text>
              </VStack>
            </Pressable>

            {auth.user?.role_id === Roles.seller && (
              <VStack>
                <Text>
                  Productos
                </Text>

                <Text>
                  18 {/* TODO: get from the api */}
                </Text>
              </VStack>
            )}
          </HStack>

          <VStack>
            <Text>
              Redes sociales
            </Text>

            <HStack>
              {(socials.socials.facebook != null) && (
                <Pressable
                  onPress={() => {
                    if (socials.socials.facebook != null) {
                      window.open(socials.socials.facebook, '_blank')
                    }
                  }}
                >
                  <Image
                    source={facebook}
                    alt='facebook'
                    w='$8'
                    h='$8'
                  />
                </Pressable>
              )}

              {(socials.socials.twitter != null) && (
                <Pressable
                  onPress={() => {
                    if (socials.socials.twitter != null) {
                      window.open(socials.socials.twitter, '_blank')
                    }
                  }}
                >
                  <Image
                    source={twitter}
                    alt='twitter'
                    w='$8'
                    h='$8'
                  />
                </Pressable>
              )}

              {(socials.socials.linkedin != null) && (
                <Pressable
                  onPress={() => {
                    if (socials.socials.linkedin != null) {
                      window.open(socials.socials.linkedin, '_blank')
                    }
                  }}
                >
                  <Image
                    source={linkedin}
                    alt='linkedin'
                    w='$8'
                    h='$8'
                  />
                </Pressable>
              )}

              {(socials.socials.freeMarket != null) && (
                <Pressable
                  onPress={() => {
                    if (socials.socials.freeMarket != null) {
                      window.open(socials.socials.freeMarket, '_blank')
                    }
                  }}
                >
                  <Image
                    source={freeMarket}
                    alt='freeMarket'
                    w='$8'
                    h='$8'
                  />
                </Pressable>
              )}
            </HStack>
          </VStack>
        </VStack>
      </HStack>

      <Heading>
        Mi historia
      </Heading>

      <Text>
        {auth.user?.biography}
      </Text>
    </AppContainer>
  )
}
