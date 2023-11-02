import type { Address } from './address'
import type { Product } from './product'
import type { User } from './user'

export interface Order {
  id: number
  user_id: number
  date: string
  address_id: number
  status: string
  subtotal: number
  tax: number
  total: number
  updated_at?: string
  created_at?: string
  order_products: OrderProduct[]
  products: Product[]
  address: Address
  user: User
}

export interface OrderGrouped {
  address: Address
  order_id: number
  order_status: string
  order_date: string
  subtotal: number
  tax: number
  total: number
  products: ProductElement[]
}

export interface ProductElement {
  product: Product
  quantity_sold: number
}

export interface OrderProduct {
  id: number
  product_id: number
  order_id: number
  quantity: number
  created_at?: string
  updated_at?: string
}
