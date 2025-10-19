<script setup lang="ts">
import { ref, computed, onMounted, watch, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useScrollAnimation } from '@/composables/useScrollAnimation'
import { useProducts } from '@/composables/useProducts'
import type { ProductCategory } from '@/types/product'
import MarketplaceFilters from '@/components/MarketplaceFilters.vue'
import ProductCard from '@/components/ProductCard.vue'

const { t } = useI18n()
const { products, loading, hasMore, loadProducts, loadMore, reset } = useProducts()

// Scroll animations
const heroSection = useScrollAnimation()
const productsSection = useScrollAnimation()

// Filter states
const searchQuery = ref('')
const selectedCategory = ref<ProductCategory>('all')

// Infinite scroll
const loadingMore = ref(false)
const scrollObserver = ref<IntersectionObserver | null>(null)
const loadMoreTrigger = ref<HTMLElement | null>(null)

/**
 * Current filters
 */
const currentFilters = computed(() => ({
  search: searchQuery.value,
  category: selectedCategory.value,
  sort: 'popular'
}))

/**
 * Load more products when scrolling
 */
const handleLoadMore = async () => {
  if (loading.value || loadingMore.value || !hasMore.value) return
  
  loadingMore.value = true
  await loadMore(currentFilters.value)
  loadingMore.value = false
}

/**
 * Setup infinite scroll observer
 */
const setupInfiniteScroll = () => {
  if (!loadMoreTrigger.value) return

  scrollObserver.value = new IntersectionObserver(
    (entries) => {
      const firstEntry = entries[0]
      if (firstEntry.isIntersecting && hasMore.value && !loading.value && !loadingMore.value) {
        handleLoadMore()
      }
    },
    {
      root: null,
      rootMargin: '100px',
      threshold: 0.1
    }
  )

  scrollObserver.value.observe(loadMoreTrigger.value)
}

/**
 * Reload products when filters change
 */
watch(currentFilters, () => {
  reset()
  loadProducts(0, currentFilters.value)
}, { deep: true })

/**
 * Load initial products
 */
onMounted(() => {
  loadProducts(0, currentFilters.value)
  setTimeout(setupInfiniteScroll, 1000)
})

/**
 * Cleanup observer
 */
onUnmounted(() => {
  if (scrollObserver.value) {
    scrollObserver.value.disconnect()
  }
})
</script>

<template>
  <div class="min-h-screen bg-brand-light dark:bg-brand-dark transition-colors duration-300">
    <!-- Hero Section -->
    <section
      :ref="heroSection.target"
      class="relative py-16 md:py-24 overflow-hidden bg-gradient-to-r from-brand-primary to-brand-dark-primary dark:from-brand-light-primary dark:to-brand-primary"
      :class="[
        heroSection.isVisible.value ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
      ]"
    >
      <div class="max-w-7xl mx-auto px-6 md:px-12 text-center relative z-10">
        <!-- Title with Logo -->
        <div class="flex items-center justify-center gap-4 mb-4">
          <img 
            src="/assets/logos/simbolo-white.png" 
            alt="Lecabe"
            class="h-12 md:h-16 w-auto"
          />
          <h1 class="section-title text-white">
            {{ t('marketplace.page.title') }}
          </h1>
        </div>
        <p class="section-description text-white/90 max-w-3xl mx-auto">
          {{ t('marketplace.page.description') }}
        </p>
      </div>
    </section>

    <!-- Products Section -->
    <section
      :ref="productsSection.target"
      class="px-6 md:px-12"
      :class="[
        productsSection.isVisible.value ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
      ]"
    >
      <div class="max-w-7xl mx-auto">
        <!-- Filters -->
        <MarketplaceFilters
          @update:search="searchQuery = $event"
          @update:category="selectedCategory = $event as ProductCategory"
        />

        <!-- Loading State (Initial) -->
        <div v-if="loading && products.length === 0" class="text-center py-16">
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-brand-primary border-t-transparent"></div>
          <p class="mt-4 text-gray-600 dark:text-gray-400">{{ t('marketplace.loading') }}</p>
        </div>

        <!-- Products Grid -->
        <div v-else-if="products.length > 0" class="mt-12">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <ProductCard
              v-for="(product, index) in products"
              :key="product.id"
              :product="product"
              :animation-delay="String((index % 3) * 100)"
            />
          </div>

          <!-- Load More Trigger -->
          <div
            ref="loadMoreTrigger"
            class="py-8 text-center"
          >
            <div v-if="loadingMore || loading" class="inline-block animate-spin rounded-full h-10 w-10 border-4 border-brand-primary border-t-transparent"></div>
            <p v-else-if="!hasMore" class="text-gray-600 dark:text-gray-400">
              {{ t('marketplace.allProductsLoaded') }}
            </p>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-16 mt-12">
          <svg
            class="mx-auto h-24 w-24 text-gray-400 dark:text-gray-600 mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 class="text-xl font-bold text-gray-700 dark:text-gray-300 mb-2">
            {{ t('marketplace.emptyState.title') }}
          </h3>
          <p class="text-gray-600 dark:text-gray-400">
            {{ t('marketplace.emptyState.description') }}
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
