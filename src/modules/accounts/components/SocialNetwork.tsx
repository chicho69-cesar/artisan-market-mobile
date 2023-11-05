import { Image, Pressable } from '@gluestack-ui/themed'

interface Props {
  social: string | null
  name: string
  image: any
}

export default function SocialNetwork({ social, name, image }: Props) {
  return (
    <Pressable
      onPress={() => {
        if (social != null) {
          // window.open(social, '_blank') // TODO: Open on expo
        }
      }}
    >
      <Image
        source={image}
        alt='facebook'
        w='$8'
        h='$8'
      />
    </Pressable>
  )
}
