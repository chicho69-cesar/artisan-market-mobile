import { useNavigate } from '@/modules/shared/hooks'
import type { Product as ProductType } from '@/modules/shared/interfaces'
import { Product } from '.'
import { useActiveProduct } from '../store'

interface Props {
  products: ProductType[]
  withoutNavigate?: boolean
}

export default function Products({ products, withoutNavigate = false }: Props) {
  const productState = useActiveProduct((state) => state)
  const { navigate } = useNavigate()

  return (
    <>
      {products.map((product) => (
        <Product
          product={product}
          key={product.id}
          onPress={() => {
            if (!withoutNavigate) {
              productState.setActiveProduct(product)
              navigate('Details')
            }
          }}
        />
      ))}
    </>
  )
}
