import { ref, computed } from 'vue'
import type { Category } from '@/types/product'
import { fetchCategories } from '@/data/categories'

export function useCategories() {
  const categories = ref<Category[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  /**
   * Load categories from API
   */
  const loadCategories = async (): Promise<void> => {
    if (loading.value) return
    
    loading.value = true
    error.value = null
    
    try {
      categories.value = await fetchCategories()
    } catch (e) {
      error.value = 'Erro ao carregar categorias'
      console.error('Error loading categories:', e)
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
