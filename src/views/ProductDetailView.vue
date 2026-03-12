<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useProducts } from '@/composables/useProducts'
import { useReviews } from '@/composables/useReviews'
import { useScrollAnimation } from '@/composables/useScrollAnimation'
import { useContactForm } from '@/composables/useContactForm'
import type { Product } from '@/types/product'
import StarRating from '@/components/StarRating.vue'
import ProductMediaSwiper from '@/components/ProductMediaSwiper.vue'
import ProductReviews from '@/components/ProductReviews.vue'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const { getProductById } = useProducts()
const { reviews, loading: reviewsLoading, averageRating, loadReviews, clearReviews } = useReviews()
const { setPrefilled } = useContactForm()

// Scroll animations - immediate visibility to avoid blank page
const detailSection = useScrollAnimation({}, true)

// Product state
const product = ref<Product | undefined>(undefined)
const productLoading = ref(true)

/**
 * Load current product
 */
const loadProduct = async () => {
  const id = route.params.id as string
  productLoading.value = true
  product.value = await getProductById(id)
  productLoading.value = false
}

/**
 * Navigate back to produtos
 */
const goBack = (): void => {
  router.push('/produtos')
}

/**
 * Scroll to contact section on home page with prefilled message
 */
const scrollToContact = (): void => {
  if (product.value) {
    const subject = `${t('marketplace.detail.contactSubject')}: ${product.value.name}`
    const message = `${t('marketplace.detail.contactMessage', { productName: product.value.name })}\n\n`
    
    setPrefilled(subject, message)
  }
  
  router.push('/#contact')
}

/**
 * Open external link
 */
const openLink = (url: string): void => {
  window.open(url, '_blank')
}

/**
 * Load product and reviews on mount
 */
onMounted(async () => {
  await loadProduct()
  if (product.value) {
    loadReviews(product.value.id)
  }
})

/**
 * Watch for route changes and reload product
 */
watch(() => route.params.id, async () => {
  await loadProduct()
  if (product.value) {
    loadReviews(product.value.id)
  } else {
    clearReviews()
  }
})
</script>

<template>
  <div class="min-h-screen bg-brand-light dark:bg-brand-dark transition-colors duration-300">
    <!-- Loading State -->
    <div
      v-if="productLoading"
      class="max-w-7xl mx-auto px-6 md:px-12 py-16 text-center"
    >
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-brand-primary border-t-transparent" />
      <p class="mt-4 text-gray-600 dark:text-gray-400">
        Carregando produto...
      </p>
    </div>

    <!-- Product not found -->
    <div
      v-else-if="!product"
      class="max-w-7xl mx-auto px-6 md:px-12 py-16"
    >
      <div class="text-center">
        <h2 class="section-title mb-4">
          {{ t('marketplace.detail.notFound') }}
        </h2>
        <button
          class="btn-primary"
          @click="goBack"
        >
          {{ t('marketplace.detail.backToMarketplace') }}
        </button>
      </div>
    </div>

    <!-- Product Details -->
    <div
      v-else
      :ref="detailSection.target"
      class="py-16 md:py-24"
      :class="[
        detailSection.isVisible.value ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
      ]"
    >
      <div class="max-w-7xl mx-auto px-6 md:px-12">
        <!-- Breadcrumb -->
        <nav class="flex items-center gap-2 text-sm mb-8">
          <button
            class="flex items-center gap-2 text-brand-primary dark:text-brand-light-primary hover:underline"
            @click="goBack"
          >
            <img 
              src="/assets/logos/simbolo-gradient.png" 
              alt="Lecabe"
              class="h-5 w-auto"
            >
            <span>{{ t('marketplace.page.title') }}</span>
          </button>
          <span class="text-gray-400">/</span>
          <span class="text-gray-700 dark:text-gray-300">{{ product.name }}</span>
        </nav>

        <!-- Product Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- Media Column -->
          <div>
            <!-- Media Swiper if product has media, otherwise show cover image -->
            <ProductMediaSwiper
              v-if="product.media && product.media.length > 0"
              :media="product.media"
              :product-name="product.name"
            />
            <div
              v-else
              class="relative w-full h-96 lg:h-[600px] rounded-xl overflow-hidden shadow-2xl bg-gray-100 dark:bg-brand-dark"
            >
              <img
                :src="product.cover_image"
                :alt="product.name"
                class="w-full h-full object-cover"
              >
            </div>
          </div>

          <!-- Info Column -->
          <div class="flex flex-col">
            <!-- Title -->
            <h1 class="section-subtitle mb-4">
              {{ product.name }}
            </h1>

            <!-- Rating and Stats -->
            <div class="flex flex-wrap items-center gap-6 mb-6">
              <StarRating :rating="product.avaliacoes" />
              <div class="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <span class="flex items-center gap-1">
                  <svg
                    class="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                  {{ product.qtd_assinantes }} {{ t('marketplace.detail.subscribers') }}
                </span>
                <span class="flex items-center gap-1">
                  <svg
                    class="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>
                  {{ product.qtd_vendas }} {{ t('marketplace.detail.sales') }}
                </span>
              </div>
            </div>

            <!-- Tags -->
            <div
              v-if="product.tags && product.tags.length > 0"
              class="flex flex-wrap gap-2 mb-6"
            >
              <span
                v-for="tag in product.tags"
                :key="tag"
                class="px-3 py-1 bg-brand-primary/10 dark:bg-brand-light-primary/10 text-brand-primary dark:text-brand-light-primary text-xs font-semibold rounded-full border border-brand-primary/20 dark:border-brand-light-primary/20"
              >
                {{ tag }}
              </span>
            </div>

            <!-- Description -->
            <div class="mb-8">
              <h2 class="card-title mb-3">
                {{ t('marketplace.detail.description') }}
              </h2>
              <p class="card-description leading-relaxed">
                {{ product.description }}
              </p>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-col gap-4">
              <button
                class="w-full px-6 py-4 bg-brand-primary dark:bg-brand-light-primary text-white rounded-lg font-bold text-lg hover:bg-brand-dark-primary dark:hover:bg-brand-medium-primary hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
                @click="openLink(product.link_produto)"
              >
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                {{ t('marketplace.detail.accessProduct') }}
              </button>

              <button
                class="w-full px-6 py-4 bg-white dark:bg-brand-dark text-brand-primary dark:text-brand-light-primary border-2 border-brand-primary dark:border-brand-light-primary rounded-lg font-bold text-lg hover:bg-brand-primary hover:text-white dark:hover:bg-brand-light-primary dark:hover:text-brand-dark transition-all duration-300 flex items-center justify-center gap-2"
                @click="openLink(product.live_demo)"
              >
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {{ t('marketplace.detail.viewDemo') }}
              </button>

              <button
                class="w-full px-6 py-4 bg-gray-100 dark:bg-brand-medium-dark-primary text-gray-900 dark:text-white rounded-lg font-semibold text-lg hover:bg-gray-200 dark:hover:bg-brand-medium-dark-primary/70 transition-all duration-300 flex items-center justify-center gap-2"
                @click="scrollToContact"
              >
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                {{ t('marketplace.detail.contact') }}
              </button>
            </div>
          </div>
        </div>

        <!-- Reviews Section -->
        <div class="mt-16">
          <!-- Loading Reviews -->
          <div
            v-if="reviewsLoading"
            class="text-center py-12"
          >
            <div class="inline-block animate-spin rounded-full h-10 w-10 border-4 border-brand-primary border-t-transparent" />
            <p class="mt-4 text-gray-600 dark:text-gray-400">
              {{ t('marketplace.reviews.loading') }}
            </p>
          </div>
          
          <!-- Reviews Component -->
          <ProductReviews
            v-else
            :reviews="reviews"
            :average-rating="averageRating"
          />
        </div>
      </div>
    </div>
  </div>
</template>

