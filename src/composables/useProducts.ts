import { ref, computed } from 'vue'
import type { Product } from '@/types/product'
import { mockProducts } from '@/data/products'

/**
 * Composable for managing products with infinite scroll support
 * Prepared for future API integration
 */
export function useProducts() {
  const products = ref<Product[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const hasMore = ref(true)
  const currentPage = ref(0)
  const pageSize = 9 // 3 products per row, 3 rows per page

  /**
   * Load products from API with pagination (currently using mock data)
   */
  const loadProducts = async (page: number = 0, filters?: { search?: string, category?: string, sort?: string }): Promise<void> => {
    if (loading.value) return

    loading.value = true
    error.value = null

    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/products?page=${page}&size=${pageSize}&search=${filters?.search}&category=${filters?.category}&sort=${filters?.sort}`)
      // const data = await response.json()
      // return { products: data.items, hasMore: data.hasMore }
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Apply filters to mock data
      let filteredData = [...mockProducts]
      
      if (filters?.search) {
        const searchLower = filters.search.toLowerCase()
        filteredData = filteredData.filter(p =>
          p.name.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower)
        )
      }
      
      if (filters?.category && filters.category !== 'all') {
        filteredData = filteredData.filter(p => p.category === filters.category)
      }
      
      // Sort
      switch (filters?.sort) {
        case 'popular':
          filteredData.sort((a, b) => b.qtd_vendas - a.qtd_vendas)
          break
        case 'rating':
          filteredData.sort((a, b) => b.avaliacoes - a.avaliacoes)
          break
      }
      
      // Paginate
      const start = page * pageSize
      const end = start + pageSize
      const pageProducts = filteredData.slice(start, end)
      
      if (page === 0) {
        products.value = pageProducts
      } else {
        products.value = [...products.value, ...pageProducts]
      }
      
      currentPage.value = page
      hasMore.value = end < filteredData.length
    } catch (e) {
      error.value = 'Erro ao carregar produtos'
      console.error(e)
    } finally {
      loading.value = false
    }
  }

  /**
   * Load next page
   */
  const loadMore = async (filters?: { search?: string, category?: string, sort?: string }): Promise<void> => {
    if (!hasMore.value || loading.value) return
    await loadProducts(currentPage.value + 1, filters)
  }

  /**
   * Reset pagination
   */
  const reset = (): void => {
    products.value = []
    currentPage.value = 0
    hasMore.value = true
  }

  /**
   * Get product by ID (searches in all mock products)
   */
  const getProductById = (id: string): Product | undefined => {
    return mockProducts.find(p => p.id === id)
  }

  return {
    products: computed(() => products.value),
    loading: computed(() => loading.value),
    error: computed(() => error.value),
    hasMore: computed(() => hasMore.value),
    loadProducts,
    loadMore,
    reset,
    getProductById
  }
}

