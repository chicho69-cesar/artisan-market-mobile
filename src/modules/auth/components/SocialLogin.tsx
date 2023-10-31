import { Image, Pressable } from '@gluestack-ui/themed'

interface Props {
  image: any
  alt: string
  name: string
  onPress: () => void
}

export default function SocialLogin({ alt, image, name, onPress }: Props) {
  return (
    <Pressable onPress={onPress}>
      <Image
        source={image}
        alt={alt}
        w='$12'
        h='$12'
        rounded='$full'
        objectFit='cover'
      />
    </Pressable>
  )
}
