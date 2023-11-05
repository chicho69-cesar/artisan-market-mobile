import type { Category } from '@/modules/shared/interfaces/product'

export function transformCategories(categories: Category[]): string {
  return categories.map((category) => category.name).join(', ')
}
