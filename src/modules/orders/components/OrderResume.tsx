import { HStack, Heading, Image, Pressable, Text, VStack, View } from '@gluestack-ui/themed'

import { useAuth } from '@/modules/auth/store'
import type { CartOrderData } from '@/modules/cart/types/cart'
import { AppButton } from '@/modules/shared/components'
import type { Address, User } from '@/modules/shared/interfaces'
import { useTheme } from '@/modules/shared/store'
import { colors } from '@/modules/shared/theme'
import { currencyFormatter } from '@/modules/shared/utils/currency-formatter'
import { OrderStatus } from '../types/order.d'

const paypalImage = require('../../../../assets/paypal.png')

interface Props {
  user: User
  address: Address
  orderData: CartOrderData
  status: OrderStatus
  confirmOrder?: () => void
  payOrder?: () => void
  cancelOrder?: () => void
}

export default function OrderResume({ user, address, orderData, status, confirmOrder, payOrder, cancelOrder }: Props) {
  const theme = useTheme((state) => state)
  const auth = useAuth((state) => state)

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
        {status === OrderStatus.unconfirmed ? (
          <AppButton
            text='Confirmar pedido'
            bgColor={theme.mainColor}
            color={colors.white}
            onPress={() => {
              confirmOrder?.()
            }}
          />
        ) : status === OrderStatus.pending ? (
          <>
            {auth.user?.id === user.id ? (
              <HStack justifyContent='space-between' alignItems='center' space='sm'>
                <Pressable
                  w='48%'
                  bg='#ffd140'
                  p='$2'
                  rounded='$md'
                  onPress={() => {
                    payOrder?.()
                  }}
                >
                  <Image
                    source={paypalImage}
                    alt='Paypal'
                    h='$8'
                    w='100%'
                  />
                </Pressable>

                <Pressable
                  w='48%'
                  bg={colors.red}
                  p='$3'
                  rounded='$md'
                  onPress={() => {
                    cancelOrder?.()
                  }}
                >
                  <Text fontSize='$xl' textAlign='center' fontWeight='$bold' color={colors.white}>
                    Cancelar
                  </Text>
                </Pressable>
              </HStack>
            ) : (
              <View
                w='100%'
                borderWidth='$1'
                borderColor={colors.lightGray}
                rounded='$md'
                p='$2'
              >
                <Text
                  color={colors.lightGray}
                  fontWeight='$semibold'
                  fontSize='$lg'
                  textAlign='center'
                >
                  Pendiente
                </Text>
              </View>
            )}
          </>
        ) : status === OrderStatus.paid ? (
          <View
            w='100%'
            borderWidth='$1'
            borderColor={colors.green}
            rounded='$md'
            p='$2'
          >
            <Text
              color={colors.green}
              fontWeight='$semibold'
              fontSize='$lg'
              textAlign='center'
            >
              Pagada
            </Text>
          </View>
        ) : (
          <View
            w='100%'
            borderWidth='$1'
            borderColor={colors.red}
            rounded='$md'
            p='$2'
          >
            <Text
              color={colors.red}
              fontWeight='$semibold'
              fontSize='$lg'
              textAlign='center'
            >
              Cancelada
            </Text>
          </View>
        )}
      </View>
    </VStack>
  )
}
