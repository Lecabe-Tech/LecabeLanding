import { ref, computed } from 'vue'
import type { Category } from '@/types/product'
import { fetchCategories as fetchMockCategories } from '@/data/categories'

// Check environment - use mock data only in non-production
const environment = import.meta.env.VITE_ENVIRONMENT || 'development'
const isProduction = environment === 'prod' || environment === 'production'

export function useCategories() {
  const categories = ref<Category[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  /**
   * Load categories from API
   * In production, fetches from API. In development, uses mock data.
   */
  const loadCategories = async (): Promise<void> => {
    if (loading.value) return
    
    loading.value = true
    error.value = null
    
    try {
      if (isProduction) {
        // Production: Fetch from API
        const apiUrl = import.meta.env.VITE_API_URL || '/api'
        const response = await fetch(`${apiUrl}/products/categories`)
        if (!response.ok) throw new Error('Failed to fetch categories')
        categories.value = await response.json()
      } else {
        // Development: Use mock data
        categories.value = await fetchMockCategories()
      }
    } catch (e) {
      // In production, don't show error to avoid giving impression of system failure
      if (isProduction) {
        console.warn('Categories API not available in production, hiding category section')
        categories.value = [] // Empty categories array
      } else {
        error.value = 'Erro ao carregar categorias'
        console.error('Error loading categories:', e)
      }
    } finally {
      loading.value = false
    }
  }

  /**
   * Get category by ID
   */
  const getCategoryById = (id: string): Category | undefined => {
    return categories.value.find(category => category.id === id)
  }

  /**
   * Get category by link
   */
  const getCategoryByLink = (link: string): Category | undefined => {
    return categories.value.find(category => category.link === link)
  }

  return {
    categories: computed(() => categories.value),
    loading: computed(() => loading.value),
    error: computed(() => error.value),
    loadCategories,
    getCategoryById,
    getCategoryByLink
  }
}
