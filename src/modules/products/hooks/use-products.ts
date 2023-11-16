import type { Product } from '@/modules/shared/interfaces'
import { useEffect, useState } from 'react'
import { getProductsPaginated, searchProductsByQuery } from '../services'
import { useProductsStore } from '../store'

export function useProducts() {
  const [isLoading, setIsLoading] = useState(false)
  const [searchedProducts, setSearchedProducts] = useState<Product[]>([])
  const { products, setProducts, addProduct, editProduct } = useProductsStore((state) => state)

  useEffect(() => {
    setIsLoading(true)
    getProducts()
    setIsLoading(false)
  }, [])

  const searchProducts = async (search: string) => {
    setIsLoading(true)
    const productsSearched = await searchProductsByQuery(search)
    setSearchedProducts(productsSearched?.data ?? [])
    setIsLoading(false)
  }

  const getProducts = async (page: number = 1) => {
    const productsObtained = await getProductsPaginated(page)
    setProducts(productsObtained?.data ?? [])
    setSearchedProducts(productsObtained?.data ?? [])
  }

  const refetchProducts = async () => {
    setIsLoading(true)
    getProducts()
    setIsLoading(false)
  }

  return {
    isLoading,
    products,
    searchedProducts,
    addProduct,
    editProduct,
    searchProducts,
    refetchProducts
  }
}
