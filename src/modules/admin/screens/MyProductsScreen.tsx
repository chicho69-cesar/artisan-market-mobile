import { useEffect } from 'react'

import AppButton from '@/modules/shared/components/AppButton'
import AppContainer from '@/modules/shared/components/AppContainer'
import AppHeader from '@/modules/shared/components/AppHeader'
import useNavigate from '@/modules/shared/hooks/use-navigate'
import { useTheme } from '@/modules/shared/store'
import { colors } from '@/modules/shared/theme'
import AdminProduct from '../components/AdminProduct'
import { useAdminProducts } from '../hooks/use-admin-products'

export default function MyProductsScreen() {
  const theme = useTheme((state) => state)
  const { products } = useAdminProducts()
  const { navigate } = useNavigate()

  useEffect(() => {
    theme.changeMainColor()
  }, [])

  return (
    <AppContainer>
      <AppHeader
        title='Mis productos'
        description='Los productos que estoy vendiendo'
      />

      <AppButton
        text='Agregar producto'
        bgColor={theme.mainColor}
        color={colors.white}
        onPress={() => {
          navigate('CreateProduct')
        }}
      />

      {products.map((product) => (
        <AdminProduct
          key={product.id}
          product={product}
        />
      ))}
    </AppContainer>
  )
}
