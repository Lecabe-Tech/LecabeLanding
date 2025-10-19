/**
 * Application constants
 */

/**
 * Application name
 */
export const APP_NAME = 'Lecabe Landing'

/**
 * Application version
 */
export const APP_VERSION = '1.0.0'

/**
 * Default pagination size
 */
export const DEFAULT_PAGE_SIZE = 10

/**
 * Maximum file upload size in bytes (5MB)
 */
export const MAX_FILE_SIZE = 5 * 1024 * 1024

/**
 * Supported image formats
 */
export const SUPPORTED_IMAGE_FORMATS = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']

/**
 * API endpoints
 */
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REGISTER: '/auth/register'
  },
  USERS: {
    LIST: '/users',
    DETAILS: (id: string | number) => `/users/${id}`
  }
} as const

/**
 * Route names
 */
export const ROUTE_NAMES = {
  HOME: 'home',
  ABOUT: 'about',
  CONTACT: 'contact'
} as const

/**
 * Local storage keys
 */
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_PREFERENCES: 'user_preferences',
  THEME: 'theme'
} as const

