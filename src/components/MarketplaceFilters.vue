<template>
  <div class="marketplace-filters pt-6">
    <!-- Search Bar -->
    <div class="mb-8">
      <div class="max-w-md mx-auto">
        <div class="relative">
          <input
            type="text"
            v-model="searchQuery"
            :placeholder="t('marketplace.filters.searchPlaceholder')"
            class="w-full px-4 py-3 pl-12 pr-4 border border-gray-300 dark:border-brand-medium-dark-primary rounded-xl focus:ring-2 focus:ring-brand-primary focus:border-brand-primary dark:bg-brand-dark-primary dark:text-white transition-all duration-300 text-center"
            @input="handleSearchChange"
          />
          <svg class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
    </div>

    <!-- Category Swiper -->
    <div class="category-swiper-container">
      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center py-8">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-brand-primary border-t-transparent"></div>
      </div>
      
      <!-- Error State -->
      <div v-else-if="error" class="text-center py-8 text-red-500">
        {{ error }}
      </div>
      
      <!-- Categories Swiper -->
      <swiper
        v-else
        :modules="modules"
        :slides-per-view="'auto'"
        :space-between="16"
        :free-mode="true"
        :grab-cursor="true"
        class="category-swiper"
      >
        <swiper-slide
          v-for="category in categories"
          :key="category.id"
          class="category-slide"
        >
          <button
            @click="selectCategory(category.id)"
            :class="[
              'category-button',
              selectedCategory === category.id ? 'category-button--active' : ''
            ]"
          >
            <div class="category-icon">
              <img 
                :src="category.icon" 
                :alt="category.name"
                class="w-6 h-6"
              />
            </div>
            <span class="category-label">{{ category.name }}</span>
          </button>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { FreeMode } from 'swiper/modules'
import { useCategories } from '@/composables/useCategories'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/free-mode'

const { t } = useI18n()
const { categories, loading, error, loadCategories } = useCategories()

// Swiper modules
const modules = [FreeMode]

// Props and emits
const emit = defineEmits(['update:search', 'update:category'])

// Reactive data
const searchQuery = ref('')
const selectedCategory = ref<string>('all')

// Methods
const handleSearchChange = (): void => {
  emit('update:search', searchQuery.value)
}

const selectCategory = (categoryId: string): void => {
  selectedCategory.value = categoryId
  emit('update:category', categoryId)
}

// Load categories on mount
onMounted(() => {
  loadCategories()
})
</script>


<style scoped>
.marketplace-filters {
  @apply w-full;
}

.category-swiper-container {
  @apply w-full overflow-hidden;
}

.category-swiper {
  @apply w-full;
}

.category-slide {
  @apply w-auto;
}

.category-button {
  @apply flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 border-transparent bg-white dark:bg-brand-dark hover:bg-gray-50 dark:hover:bg-brand-dark-primary transition-all duration-300 min-w-[100px] cursor-pointer;
}

.category-button--active {
  @apply border-brand-primary dark:border-brand-light-primary bg-brand-primary/5 dark:bg-brand-light-primary/5;
}

.category-icon {
  @apply w-8 h-8 flex items-center justify-center transition-colors duration-300;
}

.category-icon img {
  @apply w-6 h-6 filter brightness-0 opacity-60 dark:opacity-40 transition-all duration-300;
}

.category-button--active .category-icon img {
  @apply opacity-100;
  filter: brightness(0) saturate(100%) invert(27%) sepia(96%) saturate(1352%) hue-rotate(213deg) brightness(119%) contrast(119%);
}

.dark .category-button--active .category-icon img {
  filter: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg) brightness(103%) contrast(103%);
}

.category-label {
  @apply text-xs font-medium text-gray-700 dark:text-gray-300 text-center transition-colors duration-300;
}

.category-button--active .category-label {
  @apply text-brand-primary dark:text-brand-light-primary font-semibold;
}

/* Swiper custom styles */
:deep(.swiper-slide) {
  width: auto !important;
}

:deep(.swiper-wrapper) {
  align-items: stretch;
}

:deep(.swiper-slide) {
  height: auto;
}
</style>
