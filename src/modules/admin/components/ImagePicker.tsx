import { useTheme } from '@/modules/shared/store'
import { colors } from '@/modules/shared/theme'
import { MaterialIcons } from '@expo/vector-icons'
import { HStack, Pressable, Text } from '@gluestack-ui/themed'

interface Props {
  pickImage: () => void
}

export default function ImagePicker({ pickImage }: Props) {
  const theme = useTheme((state) => state)

  return (
    <Pressable
      bg={theme.mainColor}
      p='$2'
      my='$4'
      rounded='$md'
      onPress={() => {
        pickImage()
      }}
    >
      <HStack alignItems='center' justifyContent='center'>
        <MaterialIcons
          name='image'
          size={24}
          color={colors.white}
          style={{ marginRight: 5 }}
        />

        <Text color={colors.white} fontSize='$md'>
          Seleccionar imagen
        </Text>
      </HStack>
    </Pressable>
  )
}
