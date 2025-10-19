/**
 * Common types used throughout the application
 */

/**
 * Represents a generic API response
 */
export interface ApiResponse<T> {
  data: T
  message?: string
  success: boolean
}

/**
 * Represents pagination information
 */
export interface PaginationMeta {
  currentPage: number
  totalPages: number
  perPage: number
  total: number
}

/**
 * Represents a paginated response
 */
export interface PaginatedResponse<T> {
  data: T[]
  meta: PaginationMeta
}

/**
 * Base entity with common fields
 */
export interface BaseEntity {
  id: string | number
  createdAt: string
  updatedAt: string
}

