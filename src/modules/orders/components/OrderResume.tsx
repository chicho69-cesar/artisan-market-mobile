import type { User } from '@/modules/auth/types/auth'
import type { CartOrderData } from '@/modules/cart/types/cart'
import AppButton from '@/modules/shared/components/AppButton'
import type { Address } from '@/modules/shared/interfaces/address'
import { useTheme } from '@/modules/shared/store'
import { colors } from '@/modules/shared/theme'
import { currencyFormatter } from '@/modules/shared/utils/currency-formatter'
import { HStack, Heading, Text, VStack, View } from '@gluestack-ui/themed'
import type { OrderStatus } from '../types/order.d'

interface Props {
  user: User // TODO: Change for user interface
  address: Address
  orderData: CartOrderData
  status: OrderStatus
}

export default function OrderResume({ user, address, orderData, status }: Props) {
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
        fontSize='$xl'
      >
        Dirección de entrega
      </Heading>

      <Text color={colors.gray} fontSize='$md' px='$3' fontWeight='$normal'>
        {user.name} {user.lastname}
      </Text>

      <Text color={colors.gray} fontSize='$md' px='$3' fontWeight='$normal'>
        {address.no_out},{' '}
        {((address?.no_in) != null) ? `${address.no_in}, ` : ''}
        {address.street}
      </Text>

      <Text color={colors.gray} fontSize='$md' px='$3' fontWeight='$normal'>
        {address.city}, {address.state}, {address.country}
      </Text>

      <Text color={colors.gray} fontSize='$md' px='$3' fontWeight='$normal'>
        {address.phone}
      </Text>

      <Heading
        p='$3'
        borderBottomWidth='$1'
        borderBottomColor={colors.lightGray}
        borderTopWidth='$1'
        borderTopColor={colors.lightGray}
        color={colors.gray}
        fontSize='$xl'
      >
        Resumen del pedido
      </Heading>

      <HStack
        px='$3'
        justifyContent='space-between'
        alignItems='center'
        space='sm'
      >
        <Text color={colors.gray} fontSize='$md' fontWeight='$normal'>
          No. de productos
        </Text>

        <Text color={colors.gray} fontSize='$md' fontWeight='$medium'>
          {orderData.noOfProducts}
        </Text>
      </HStack>

      <HStack
        px='$3'
        justifyContent='space-between'
        alignItems='center'
        space='sm'
      >
        <Text color={colors.gray} fontSize='$md' fontWeight='$normal'>
          Sub Total
        </Text>

        <Text color={colors.gray} fontSize='$md' fontWeight='$medium'>
          {currencyFormatter.format(orderData.subTotal)}
        </Text>
      </HStack>

      <HStack
        px='$3'
        justifyContent='space-between'
        alignItems='center'
        space='sm'
      >
        <Text color={colors.gray} fontSize='$md' fontWeight='$normal'>
          Impuestos (16%)
        </Text>

        <Text color={colors.gray} fontSize='$md' fontWeight='$medium'>
          {currencyFormatter.format(orderData.tax)}
        </Text>
      </HStack>

      <HStack
        px='$3'
        mt='$2'
        justifyContent='space-between'
        alignItems='center'
        space='sm'
      >
        <Text color={colors.gray} fontSize='$lg' fontWeight='$medium'>
          Total
        </Text>

        <Text color={colors.gray} fontSize='$lg' fontWeight='$medium'>
          {currencyFormatter.format(orderData.total)}
        </Text>
      </HStack>

      <View w='100%' p='$3'>
        <AppButton
          text='Confirmar pedido'
          bgColor={theme.mainColor}
          color={colors.white}
          onPress={() => {}}
        />
      </View>
    </VStack>
  )
}
