import { Heading, Image, View } from '@gluestack-ui/themed'
import Constants from 'expo-constants'

import { colors } from '@/modules/shared/theme'

const backImage = require('../../../../assets/back-image.png')

interface Props {
  text: string
}

export default function Header({ text }: Props) {
  return (
    <View
      h='$64'
      bg={colors.semiWhite}
      pt={Constants.statusBarHeight}
      position='relative'
    >
      <Image
        source={backImage}
        alt='Image background'
        w='100%'
        h='100%'
        position='absolute'
        top={Constants.statusBarHeight}
        bottom={0}
        zIndex={-1}
      />

      <Heading textAlign='center' size='4xl' position='absolute' top='$24' w='100%' color={colors.gray}>
        ArtisanMarket
      </Heading>

      <Heading textAlign='center' size='lg' position='absolute' top='$40' w='100%' color={colors.gray}>
        {text}
      </Heading>
    </View>
  )
}
