import useNavigate from '@/modules/shared/hooks/use-navigate'
import type { Product as ProductType } from '@/modules/shared/interfaces/product'
import { useActiveProduct } from '../store/active-product'
import Product from './Product'

interface Props {
  products: ProductType[]
}

export default function Products({ products }: Props) {
  const productState = useActiveProduct((state) => state)
  const { navigate } = useNavigate()

  return (
    <>
      {products.map((product) => (
        <Product
          product={product}
          key={product.id}
          onPress={() => {
            productState.setActiveProduct(product)
            navigate('Details')
          }}
        />
      ))}
    </>
  )
}
