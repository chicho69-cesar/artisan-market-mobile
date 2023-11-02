import type { Product as ProductType } from '@/modules/shared/interfaces/product'
import Product from './Product'

interface Props {
  products: ProductType[]
}

export default function Products({ products }: Props) {
  return (
    <>
      {products.map((product) => (
        <Product
          product={product}
          key={product.id}
          onPress={() => {}}
        />
      ))}
    </>
  )
}
