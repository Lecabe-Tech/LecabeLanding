<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  rating: number
  readonly?: boolean
  showNumber?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  readonly: true,
  showNumber: true
})

/**
 * Calculate filled stars
 */
const stars = computed(() => {
  const fullStars = Math.floor(props.rating)
  const hasHalfStar = props.rating % 1 >= 0.5
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  return {
    full: fullStars,
    half: hasHalfStar ? 1 : 0,
    empty: emptyStars
  }
})
</script>

<template>
  <div class="flex items-center gap-1">
    <!-- Full stars -->
    <svg
      v-for="i in stars.full"
      :key="'full-' + i"
      class="w-5 h-5 text-yellow-400 fill-current"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>

    <!-- Half star -->
    <svg
      v-if="stars.half"
      class="w-5 h-5 text-yellow-400"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <defs>
        <linearGradient id="halfGrad">
          <stop offset="50%" stop-color="currentColor" stop-opacity="1"/>
          <stop offset="50%" stop-color="currentColor" stop-opacity="0.3"/>
        </linearGradient>
      </defs>
      <path fill="url(#halfGrad)" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>

    <!-- Empty stars -->
    <svg
      v-for="i in stars.empty"
      :key="'empty-' + i"
      class="w-5 h-5 text-gray-300 dark:text-gray-600 fill-current"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>

    <!-- Rating number -->
    <span v-if="showNumber" class="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">
      {{ rating.toFixed(1) }}
    </span>
  </div>
</template>

