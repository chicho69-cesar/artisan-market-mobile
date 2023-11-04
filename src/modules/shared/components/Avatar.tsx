import { Image } from '@gluestack-ui/themed'

interface Props {
  source: string
  alt: string
}

export default function Avatar({ source, alt }: Props) {
  return (
    <Image
      source={source}
      alt={alt}
      w={50}
      h={50}
      rounded='$full'
    />
  )
}
