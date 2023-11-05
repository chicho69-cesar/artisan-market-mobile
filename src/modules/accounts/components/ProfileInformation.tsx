import { HStack, Heading, Image, Pressable, Text, VStack, View } from '@gluestack-ui/themed'

import useNavigate from '@/modules/shared/hooks/use-navigate'
import type { Socials } from '@/modules/shared/interfaces/social'
import { Roles, type User } from '@/modules/shared/interfaces/user'
import { useTheme } from '@/modules/shared/store'
import { colors } from '@/modules/shared/theme'
import { Ionicons } from '@expo/vector-icons'
import SocialNetwork from './SocialNetwork'

const facebook = require('../../../../assets/socials/facebook.png')
const twitter = require('../../../../assets/socials/twitter.png')
const linkedin = require('../../../../assets/socials/linkedin.png')
const freeMarket = require('../../../../assets/socials/mercado-libre.png')

interface Props {
  user: User
  socials: Socials
  isOwner?: boolean
  profileAction: () => void
  goFollowers: () => void
  goFollowings: () => void
}

export default function ProfileInformation({ user, socials, isOwner = true, profileAction, goFollowers, goFollowings }: Props) {
  const theme = useTheme((state) => state)
  const { navigateWithParams } = useNavigate()

  return (
    <>
      <HStack mt='$4' justifyContent='space-between' alignItems='center' space='md'>
        <Image
          source={user.picture ?? ''} // TODO: use a default image
          alt={user.name ?? ''}
          w='$24'
          h='$24'
          rounded='$full'
        />

        <VStack alignItems='flex-start' w='100%' space='sm'>
          <Text color={colors.gray} fontSize='$lg' fontWeight='$medium'>
            {user.name} {user.lastname}
          </Text>

          <HStack alignItems='center' space='md'>
            <View
              py='$1'
              px='$3'
              borderWidth='$1'
              borderColor={theme.mainColor}
              rounded='$full'
            >
              <Text fontSize='$sm' fontWeight='$semibold' color={theme.mainColor}>
                {user.role_id === Roles.seller ? 'Vendedor' : 'Usuario'}
              </Text>
            </View>

            <Pressable
              py='$1'
              px='$3'
              rounded='$full'
              bg={theme.mainColor}
              onPress={() => {
                profileAction()
              }}
            >
              <Text fontSize='$md' fontWeight='$semibold' color={colors.white}>
                {isOwner ? 'Editar perfil' : 'Seguir'}
              </Text>
            </Pressable>
          </HStack>

          <HStack justifyContent='space-between' alignItems='flex-start' space='sm'>
            <Pressable
              onPress={() => {
                goFollowers()
              }}
            >
              <VStack alignItems='center' space='sm'>
                <Text fontSize='$sm' fontWeight='$semibold' color={colors.gray}>
                  Seguidores
                </Text>

                <Text fontSize='$2xl' fontWeight='$semibold' color={colors.gray}>
                  90 {/* TODO: get from the api */}
                </Text>
              </VStack>
            </Pressable>

            <Pressable
              onPress={() => {
                goFollowings()
              }}
            >
              <VStack alignItems='center' space='sm'>
                <Text fontSize='$sm' fontWeight='$semibold' color={colors.gray}>
                  Siguiendo
                </Text>

                <Text fontSize='$2xl' fontWeight='$semibold' color={colors.gray}>
                  5 {/* TODO: get from the api */}
                </Text>
              </VStack>
            </Pressable>

            {user.role_id === Roles.seller && (
              <VStack alignItems='center' space='sm'>
                <Text fontSize='$sm' fontWeight='$semibold' color={colors.gray}>
                  Productos
                </Text>

                <Text fontSize='$2xl' fontWeight='$semibold' color={colors.gray}>
                  18 {/* TODO: get from the api */}
                </Text>
              </VStack>
            )}
          </HStack>

          <VStack space='xs'>
            <Text fontSize='$sm' fontWeight='$semibold' color={colors.gray}>
              Redes sociales
            </Text>

            <HStack space='sm' alignItems='flex-start'>
              {(socials.facebook != null) && (
                <SocialNetwork
                  social={socials.facebook}
                  name='Facebook'
                  image={facebook}
                />
              )}

              {(socials.twitter != null) && (
                <SocialNetwork
                  social={socials.twitter}
                  name='Twitter'
                  image={twitter}
                />
              )}

              {(socials.linkedin != null) && (
                <SocialNetwork
                  social={socials.linkedin}
                  name='LinkedIn'
                  image={linkedin}
                />
              )}

              {(socials.freeMarket != null) && (
                <SocialNetwork
                  social={socials.freeMarket}
                  name='Mercado Libre'
                  image={freeMarket}
                />
              )}
            </HStack>
          </VStack>
        </VStack>
      </HStack>

      {!isOwner && (
        <Pressable
          w='$48'
          py='$1'
          px='$2'
          mt='$4'
          rounded='$full'
          bg={theme.mainColor}
          onPress={() => {
            navigateWithParams('Chat', { chat: user })
          }}
        >
          <HStack justifyContent='center' alignItems='center'>
            <Ionicons
              name='chatbubble'
              size={24}
              color={colors.white}
              style={{ marginRight: 10 }}
            />

            <Text fontSize='$md' fontWeight='$semibold' color={colors.white}>
              Chatea conmigo
            </Text>
          </HStack>
        </Pressable>
      )}

      <Heading mt='$2' color={colors.gray}>
        Mi historia
      </Heading>

      <Text color={colors.gray}>
        {user.biography}
      </Text>
    </>
  )
}
