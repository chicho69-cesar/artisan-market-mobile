import { Ionicons } from '@expo/vector-icons'
import { Badge, BadgeText, VStack } from '@gluestack-ui/themed'

interface Props {
  color: string
  size: number
}

export default function CartIcon({ color, size }: Props) {
  return (
    <VStack>
      <Badge
        h={22}
        w={22}
        bg='red'
        borderRadius='$full'
        mb={-14}
        mr={-14}
        zIndex={1}
        variant='solid'
        alignSelf='flex-end'
      >
        <BadgeText color='white' fontSize='$xs' fontWeight='$semibold'>
          3 {/* TODO: Tomarlo del state */}
        </BadgeText>
      </Badge>
      <Ionicons name='cart' color={color} size={size} />
    </VStack>
  )
}
