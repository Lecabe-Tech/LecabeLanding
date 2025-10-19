import { ref, computed } from 'vue'
import type { Product } from '@/types/product'
import { mockProducts } from '@/data/products'

// Check environment - use mock data only in non-production
const environment = import.meta.env.VITE_ENVIRONMENT || 'development'
const isProduction = environment === 'prod' || environment === 'production'

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
   * Load products from API with pagination
   * In production, fetches from API. In development, uses mock data.
   */
  const loadProducts = async (page: number = 0, filters?: { search?: string, category?: string, sort?: string }): Promise<void> => {
    if (loading.value) return

    loading.value = true
    error.value = null

    try {
      let filteredData: Product[] = []
      
      if (isProduction) {
        // Production: Fetch from API
        const apiUrl = import.meta.env.VITE_API_URL || '/api'
        const params = new URLSearchParams({
          page: page.toString(),
          size: pageSize.toString(),
          ...(filters?.search && { search: filters.search }),
          ...(filters?.category && filters.category !== 'all' && { category: filters.category }),
          ...(filters?.sort && { sort: filters.sort })
        })
        
        const response = await fetch(`${apiUrl}/products?${params}`)
        if (!response.ok) throw new Error('Failed to fetch products')
        
        const data = await response.json()
        filteredData = data.items || data.products || []
        hasMore.value = data.hasMore ?? (data.total > (page + 1) * pageSize)
        
        // Append or replace products
        if (page === 0) {
          products.value = filteredData
        } else {
          products.value = [...products.value, ...filteredData]
        }
        currentPage.value = page
      } else {
        // Development: Use mock data
        await new Promise(resolve => setTimeout(resolve, 500))
        filteredData = [...mockProducts]
        
        // Apply filters
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
      }
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
   * Get product by ID
   * In production, fetches from API. In development, uses mock data.
   */
  const getProductById = async (id: string): Promise<Product | undefined> => {
    if (isProduction) {
      // Production: Fetch from API
      try {
        const apiUrl = import.meta.env.VITE_API_URL || '/api'
        const response = await fetch(`${apiUrl}/products/${id}`)
        if (!response.ok) throw new Error('Product not found')
        return await response.json()
      } catch (e) {
        console.error('Error fetching product:', e)
        return undefined
      }
    } else {
      // Development: Use mock data
      return mockProducts.find(p => p.id === id)
    }
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
