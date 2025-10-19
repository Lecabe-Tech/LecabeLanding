<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { Product } from '@/types/product'
import StarRating from './StarRating.vue'
import { useI18n } from 'vue-i18n'

interface Props {
  product: Product
  animationDelay?: string
}

const props = withDefaults(defineProps<Props>(), {
  animationDelay: '0'
})

const router = useRouter()
const { t } = useI18n()

/**
 * Navigate to product details
 */
const viewDetails = (): void => {
  router.push(`/marketplace/${props.product.id}`)
}

/**
 * Open live demo in new tab
 */
const openDemo = (): void => {
  window.open(props.product.live_demo, '_blank')
}
</script>

<template>
  <div
    class="product-card relative flex flex-col bg-white dark:bg-brand-medium-dark-primary/30 rounded-xl overflow-hidden shadow-lg transition-all duration-300 group animate-scale-in h-full"
    :class="`animation-delay-${animationDelay}`"
  >
    <!-- Product Image -->
    <div class="relative w-full h-48 md:h-56 overflow-hidden bg-gray-100 dark:bg-brand-dark">
      <img
        :src="product.cover_image"
        :alt="product.name"
        class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
      >
      
      <!-- Badges -->
      <div class="absolute top-3 right-3 flex flex-col gap-2">
        <div class="bg-brand-primary text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
          {{ product.qtd_vendas }} vendas
        </div>
        <div class="bg-brand-alternative text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
          {{ product.qtd_assinantes }} assinantes
        </div>
      </div>
    </div>

    <!-- Product Info -->
    <div class="flex flex-col flex-1 p-6">
      <!-- Title -->
      <h3 class="card-title mb-2 line-clamp-2">
        {{ product.name }}
      </h3>

      <!-- Rating -->
      <div class="mb-3">
        <StarRating :rating="product.avaliacoes" />
      </div>

      <!-- Description -->
      <p class="card-description mb-4 line-clamp-3 flex-1">
        {{ product.description }}
      </p>

      <!-- Actions - Inline Buttons -->
      <div class="flex gap-2">
        <button
          class="flex-1 px-4 py-2.5 bg-brand-primary dark:bg-brand-light-primary text-white rounded-lg font-semibold text-sm hover:bg-brand-dark-primary dark:hover:bg-brand-medium-primary hover:scale-105 transition-all duration-300 shadow-md"
          @click="viewDetails"
        >
          {{ t('marketplace.product.viewDetails') }}
        </button>
        <button
          class="flex-1 px-4 py-2.5 bg-white dark:bg-brand-dark text-brand-primary dark:text-brand-light-primary border-2 border-brand-primary dark:border-brand-light-primary rounded-lg font-semibold text-sm hover:bg-brand-primary hover:text-white dark:hover:bg-brand-light-primary dark:hover:text-brand-dark transition-all duration-300"
          @click="openDemo"
        >
          {{ t('marketplace.product.liveDemo') }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  position: relative;
  transition: all 0.3s ease;
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(79, 82, 255, 0.2);
}

@media (prefers-color-scheme: dark) {
  .product-card:hover {
    box-shadow: 0 20px 40px rgba(156, 207, 255, 0.25);
  }
}

/* Line clamp utilities */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

