/**
 * Product media type
 */
export type MediaType = 'image' | 'video'

/**
 * Product media item
 */
export interface ProductMedia {
  type: MediaType
  url: string
  thumbnail?: string // For videos
}

/**
 * Product review
 */
export interface ProductReview {
  id: string
  author: string
  avatar?: string
  rating: number // 1-5 stars
  date: string
  comment: string
  helpful: number
}

/**
 * Product interface for Marketplace
 */
export interface Product {
  id: string
  name: string
  description: string
  cover_image: string
  media: ProductMedia[] // Images and videos
  link_produto: string
  live_demo: string
  avaliacoes: number // 1-5 stars (calculated from reviews API)
  qtd_vendas: number
  qtd_assinantes: number
  category: string
}

/**
 * Product category type
 */
export type ProductCategory = 
  | 'all'
  | 'wms'
  | 'ai'
  | 'erp'
  | 'chatbots'
  | 'automation'
  | 'analytics'
  | 'crm'
  | 'ecommerce'
  | 'mobile'
  | 'web'
  | 'cloud'

/**
 * Category from API
 */
export interface Category {
  id: string
  name: string
  link: string
  icon?: string
}

/**
 * Product sort options
 */
export type ProductSortOption = 
  | 'popular'
  | 'rating'
  | 'price-asc'
  | 'price-desc'

