import { serverUrl } from '@/modules/shared/constants'
import type { Image as ImageType } from '@/modules/shared/interfaces'
import { Image } from '@gluestack-ui/themed'
import Carousel from 'react-native-reanimated-carousel'

interface Props {
  images?: ImageType[]
}

export default function ImagesCarousel({ images = [] }: Props) {
  return (
    <Carousel
      data={images}
      style={{
        width: '100%',
        height: 240,
        alignItems: 'center',
        justifyContent: 'flex-end'
      }}
      width={280}
      height={210}
      pagingEnabled={true}
      snapEnabled={true}
      mode='horizontal-stack'
      loop={true}
      autoPlay={false}
      autoPlayReverse={false}
      modeConfig={{
        snapDirection: 'left',
        stackInterval: 18
      }}
      customConfig={() => ({ type: 'positive', viewCount: 5 })}
      renderItem={({ item }) => (
        <Image
          source={`${serverUrl}/storage/${item.link}`}
          alt={`Image of product with id ${item.product_id}`}
          w='$48'
          h='100%'
          rounded='$md'
        />
      )}
    />
  )
}
