import { useTheme } from '@/modules/shared/store'
import { colors } from '@/modules/shared/theme'
import { MaterialIcons } from '@expo/vector-icons'
import { FlatList, HStack, Image, Pressable, Text, VStack, View } from '@gluestack-ui/themed'

interface Props {
  images: string[]
  onRemoveImage: (index: number, image: string) => void
}

export default function ProductImages({ images, onRemoveImage }: Props) {
  const theme = useTheme((state) => state)

  if (images.length === 0) {
    return (
      <HStack justifyContent='center' mb='$4'>
        <View
          w='$32'
          h='$40'
          borderWidth='$4'
          justifyContent='center'
          alignItems='center'
          rounded='$md'
          borderColor={theme.mainColor}
          style={{ borderStyle: 'dashed' }}
        >
          <Text fontWeight='$semibold' color={theme.mainColor}>
            No Images
          </Text>
        </View>
      </HStack>
    )
  }

  return (
    <FlatList
      mb='$4'
      data={images}
      keyExtractor={(item, index) => index.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({ item, index }) => (
        <VStack
          key={index}
          mr='$2'
          w='$24'
          space='xs'
          alignItems='center'
        >
          <Image
            source={{ uri: (item as string) }}
            alt={item as string}
            w='$24'
            h='$32'
            rounded='$md'
            objectFit='cover'
          />

          <Pressable
            py='$1'
            px='$4'
            rounded='$lg'
            alignItems='center'
            bg={theme.mainColor}
            onPress={() => {
              onRemoveImage(index, item as string)
            }}
          >
            <MaterialIcons
              name='delete'
              size={18}
              color={colors.white}
            />
          </Pressable>
        </VStack>
      )}
    />
  )
}
