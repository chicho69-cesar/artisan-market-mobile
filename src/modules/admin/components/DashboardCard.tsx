import { colors } from '@/modules/shared/theme'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { HStack, Text, VStack } from '@gluestack-ui/themed'

interface Props {
  quantity: number
  color: string
  icon: string
  text: string
}

export default function DashboardCard({ quantity, color, icon, text }: Props) {
  return (
    <VStack
      p='$2'
      w='48%'
      rounded='$md'
      borderWidth='$1'
      borderColor={colors.lightGray}
    >
      <HStack alignItems='center' justifyContent='center' mb='$2'>
        <MaterialCommunityIcons
          name={icon as any}
          size={64}
          color={color}
          style={{ marginRight: 10 }}
        />

        <Text color={colors.gray} fontSize='$2xl' fontWeight='$semibold'>
          {quantity}
        </Text>
      </HStack>

      <Text color={colors.gray} textAlign='center'>
        {text}
      </Text>
    </VStack>
  )
}
