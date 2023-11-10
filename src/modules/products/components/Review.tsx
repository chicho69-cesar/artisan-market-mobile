import { FontAwesome } from '@expo/vector-icons'
import { HStack, Pressable, Text, VStack } from '@gluestack-ui/themed'

import { Avatar } from '@/modules/shared/components'
import { blankImage, serverUrl } from '@/modules/shared/constants'
import { useNavigate } from '@/modules/shared/hooks'
import type { Review as ReviewType } from '@/modules/shared/interfaces'
import { colors } from '@/modules/shared/theme'
import { dateFormatter } from '@/modules/shared/utils/date-formatter'

interface Props {
  review: ReviewType
}

export default function Review({ review }: Props) {
  const { navigateBetweenRoutes } = useNavigate()

  return (
    <VStack my='$3' space='sm'>
      <HStack space='md' justifyContent='space-between' alignItems='center'>
        <HStack space='sm' justifyContent='flex-start' alignItems='center'>
          <Pressable
            onPress={() => {
              if ((review.user) != null) {
                navigateBetweenRoutes('ProfileStack', 'UserProfile', { user: review.user })
              }
            }}
          >
            <Avatar
              source={
                review.user.picture == null || review.user.picture === undefined
                  ? blankImage : `${serverUrl}/storage/${review.user.picture}`
              }
              alt={review.user.name ?? ''}
            />
          </Pressable>

          <VStack>
            <Text color={colors.gray} fontWeight='$medium'>
              {review.user.name} {review.user.lastname}
            </Text>

            <HStack space='xs'>
              {([1, 2, 3, 4, 5]).map((rate) => (
                <FontAwesome
                  key={rate}
                  name='star'
                  size={16}
                  color={rate <= review.rate ? colors.yellow : colors.gray}
                  style={{ fontWeight: 'bold' }}
                />
              ))}
            </HStack>
          </VStack>
        </HStack>

        <Text color={colors.gray} fontWeight='$light' fontSize='$sm'>
          {dateFormatter.format(new Date(review.created_at ?? '2000-01-01T01:01:01.000000Z'))}
        </Text>
      </HStack>

      <Text color={colors.gray}>
        {review.comment}
      </Text>
    </VStack>
  )
}
