import type { Address } from './address'
import type { Product } from './product'
import type { User } from './user'

export interface Order {
  address_id: number
  address: Address
  created_at?: string
  date: string
  id: number
  order_products: OrderProduct[]
  products: Product[]
  status: string
  subtotal: number
  tax: number
  total: number
  updated_at?: string
  user_id: number
  user: User
}

export interface OrderGrouped {
  address_id: number
  address: Address
  order_date: string
  order_id: number
  order_status: string
  products: ProductElement[]
  subtotal: number
  tax: number
  total: number
  user_id: number
  user: User
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
