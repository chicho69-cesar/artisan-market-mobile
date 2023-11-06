import { HStack, Pressable, Text, VStack, View } from '@gluestack-ui/themed'

import type { User } from '@/modules/shared/interfaces'
import { useTheme } from '@/modules/shared/store'
import { colors } from '@/modules/shared/theme'
import { currencyFormatter } from '@/modules/shared/utils/currency-formatter'
import { longDateFormatter } from '@/modules/shared/utils/date-formatter'
import { OrderStatus } from '../types/order.d'

interface Props {
  client: User
  total: number
  noOfProducts: number
  date: string
  status: string
  navToOrder: () => void
  isAdminOrder?: boolean
  navToClient?: () => void
}

export default function Order({ client, date, noOfProducts, status, total, navToOrder, isAdminOrder = false, navToClient }: Props) {
  const theme = useTheme((state) => state)

  return (
    <VStack
      p='$3'
      my='$2'
      rounded='$md'
      space='xs'
      borderWidth='$1'
      borderColor={colors.lightGray}
    >
      {isAdminOrder && (
        <HStack>
          <Text fontSize='$lg' fontWeight='$semibold' color={colors.gray}>
            Cliente:{' '}
          </Text>

          <Pressable
            onPress={() => {
              navToClient?.()
            }}
          >
            <Text fontSize='$lg' fontWeight='$semibold' color={theme.mainColor}>
              {client.name} {client.lastname}
            </Text>
          </Pressable>
        </HStack>
      )}

      <Text mt='$1' fontSize='$2xl' fontWeight='$bold' color={colors.gray}>
        Total:{' '}
        <Text fontSize='$2xl' fontWeight='$bold' color={theme.mainColor}>
          {currencyFormatter.format(total)}
        </Text>
      </Text>

      <Text fontSize='$lg' fontWeight='$medium' color={colors.gray}>
        No. de productos:{' '}
        <Text fontSize='$lg' fontWeight='$medium' color={theme.mainColor}>
          {noOfProducts}
        </Text>
      </Text>

      <Text fontSize='$lg' fontWeight='$medium' color={colors.gray}>
        Fecha:{' '}
        <Text fontSize='$lg' fontWeight='$medium' color={theme.mainColor}>
          {longDateFormatter.format(new Date(date))}
        </Text>
      </Text>

      <HStack mt='$2' justifyContent='space-between' alignItems='center'>
        <View
          py='$2'
          px='$4'
          rounded='$full'
          borderWidth='$2'
          borderColor={
            status === OrderStatus.pending
              ? colors.lightGray
              : status === OrderStatus.paid
                ? colors.green
                : colors.red
          }
        >
          {status === OrderStatus.pending ? (
            <Text fontWeight='$semibold' color={colors.lightGray}>
              Pendiente
            </Text>
          ) : status === OrderStatus.paid ? (
            <Text fontWeight='$semibold' color={colors.green}>
              Pagada
            </Text>
          ) : (
            <Text fontWeight='$semibold' color={colors.red}>
              Cancelada
            </Text>
          )}
        </View>

        <Pressable
          onPress={() => {
            navToOrder()
          }}
        >
          <Text fontWeight='$medium' color={theme.mainColor}>
            Ver orden
          </Text>
        </Pressable>
      </HStack>
    </VStack>
  )
}
