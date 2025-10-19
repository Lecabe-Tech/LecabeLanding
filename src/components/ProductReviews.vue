<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { ProductReview } from '@/types/product'
import StarRating from './StarRating.vue'

interface Props {
  reviews: ProductReview[]
  averageRating: number
}

const props = defineProps<Props>()
const { t } = useI18n()

/**
 * Format date
 */
const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

/**
 * Get initials from name
 */
const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

/**
 * Rating distribution
 */
const ratingDistribution = computed(() => {
  const dist = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
  props.reviews.forEach(review => {
    dist[review.rating as keyof typeof dist]++
  })
  return dist
})

/**
 * Calculate percentage for rating bar
 */
const getRatingPercentage = (count: number): number => {
  if (props.reviews.length === 0) return 0
  return (count / props.reviews.length) * 100
}
</script>

<template>
  <div class="product-reviews">
    <!-- Reviews Header -->
    <div class="mb-8">
      <div class="flex items-center gap-3 mb-4">
        <img 
          src="/assets/logos/simbolo-gradient.png" 
          alt="Lecabe"
          class="h-8 w-auto"
        />
        <h2 class="card-title">{{ t('marketplace.reviews.title') }}</h2>
      </div>
      
      <!-- Rating Summary -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 bg-gray-50 dark:bg-brand-medium-dark-primary/30 rounded-xl">
        <!-- Average Rating -->
        <div class="text-center md:text-left">
          <div class="flex items-center justify-center md:justify-start gap-2 mb-2">
            <span class="text-5xl font-black text-brand-primary dark:text-brand-light-primary">
              {{ averageRating.toFixed(1) }}
            </span>
            <div>
              <StarRating :rating="averageRating" :show-number="false" />
              <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {{ t('marketplace.reviews.basedOn', { count: reviews.length }) }}
              </p>
            </div>
          </div>
        </div>

        <!-- Rating Distribution -->
        <div class="space-y-2">
          <div
            v-for="star in [5, 4, 3, 2, 1]"
            :key="star"
            class="flex items-center gap-2"
          >
            <span class="text-sm font-semibold w-8 text-gray-700 dark:text-gray-300">
              {{ star }} ★
            </span>
            <div class="flex-1 h-2 bg-gray-200 dark:bg-brand-dark rounded-full overflow-hidden">
              <div
                class="h-full bg-yellow-400 transition-all duration-300"
                :style="{ width: `${getRatingPercentage(ratingDistribution[star as keyof typeof ratingDistribution])}%` }"
              ></div>
            </div>
            <span class="text-sm text-gray-600 dark:text-gray-400 w-12 text-right">
              {{ ratingDistribution[star as keyof typeof ratingDistribution] }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Reviews List -->
    <div v-if="reviews.length > 0" class="space-y-6">
      <div
        v-for="review in reviews"
        :key="review.id"
        class="p-6 bg-white dark:bg-brand-medium-dark-primary/30 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg"
      >
        <!-- Review Header -->
        <div class="flex items-start gap-4 mb-4">
          <!-- Avatar -->
          <div
            v-if="review.avatar"
            class="w-12 h-12 rounded-full overflow-hidden flex-shrink-0"
          >
            <img :src="review.avatar" :alt="review.author" class="w-full h-full object-cover" />
          </div>
          <div
            v-else
            class="w-12 h-12 rounded-full bg-brand-primary dark:bg-brand-light-primary text-white flex items-center justify-center font-bold flex-shrink-0"
          >
            {{ getInitials(review.author) }}
          </div>

          <!-- Author Info -->
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between gap-2 mb-1">
              <h3 class="font-bold text-gray-900 dark:text-white truncate">
                {{ review.author }}
              </h3>
              <span class="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                {{ formatDate(review.date) }}
              </span>
            </div>
            <StarRating :rating="review.rating" :show-number="false" />
          </div>
        </div>

        <!-- Review Comment -->
        <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          {{ review.comment }}
        </p>

        <!-- Review Footer -->
        <div class="flex items-center gap-4 text-sm">
          <button
            class="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-brand-primary dark:hover:text-brand-light-primary transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
            </svg>
            <span>{{ t('marketplace.reviews.helpful') }} ({{ review.helpful }})</span>
          </button>
        </div>
      </div>
    </div>

    <!-- No Reviews -->
    <div v-else class="text-center py-12">
      <svg
        class="mx-auto h-16 w-16 text-gray-400 dark:text-gray-600 mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
      </svg>
      <p class="text-gray-600 dark:text-gray-400">
        {{ t('marketplace.reviews.noReviews') }}
      </p>
    </div>
  </div>
</template>

