import { HStack, Heading, Text, VStack, View } from '@gluestack-ui/themed'

import { AppButton } from '@/modules/shared/components'
import { useTheme } from '@/modules/shared/store'
import { colors } from '@/modules/shared/theme'
import { currencyFormatter } from '@/modules/shared/utils/currency-formatter'

interface Props {
  noOfProducts: number
  subTotal: number
  tax: number
  total: number
  onPress: () => void
}

export default function CartResume({ noOfProducts, subTotal, tax, total, onPress }: Props) {
  const theme = useTheme((state) => state)

  return (
    <VStack
      w='100%'
      space='xs'
      mb='$4'
      rounded='$md'
      borderWidth='$1'
      borderColor={colors.lightGray}
    >
      <Heading
        p='$3'
        borderBottomWidth='$1'
        borderBottomColor={colors.lightGray}
        color={colors.gray}
        fontSize='$2xl'
      >
        Orden
      </Heading>

      <HStack
        px='$3'
        justifyContent='space-between'
        alignItems='center'
        space='sm'
      >
        <Text color={colors.gray} fontSize='$lg' fontWeight='$normal'>
          No. de productos
        </Text>

        <Text color={colors.gray} fontSize='$lg' fontWeight='$medium'>
          {noOfProducts}
        </Text>
      </HStack>

      <HStack
        px='$3'
        justifyContent='space-between'
        alignItems='center'
        space='sm'
      >
        <Text color={colors.gray} fontSize='$lg' fontWeight='$normal'>
          Sub Total
        </Text>

        <Text color={colors.gray} fontSize='$lg' fontWeight='$medium'>
          {currencyFormatter.format(subTotal)}
        </Text>
      </HStack>

      <HStack
        px='$3'
        justifyContent='space-between'
        alignItems='center'
        space='sm'
      >
        <Text color={colors.gray} fontSize='$lg' fontWeight='$normal'>
          Impuestos (16%)
        </Text>

        <Text color={colors.gray} fontSize='$lg' fontWeight='$medium'>
          {currencyFormatter.format(tax)}
        </Text>
      </HStack>

      <HStack
        px='$3'
        mt='$2'
        justifyContent='space-between'
        alignItems='center'
        space='sm'
      >
        <Text color={colors.gray} fontSize='$xl' fontWeight='$medium'>
          Total
        </Text>

        <Text color={colors.gray} fontSize='$xl' fontWeight='$medium'>
          {currencyFormatter.format(total)}
        </Text>
      </HStack>

      <View w='100%' p='$3'>
        <AppButton
          text='Continuar'
          bgColor={theme.mainColor}
          color={colors.white}
          onPress={onPress}
        />
      </View>
    </VStack>
  )
}
