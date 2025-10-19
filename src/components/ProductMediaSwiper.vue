<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import type { ProductMedia } from '@/types/product'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

interface Props {
  media: ProductMedia[]
  productName: string
}

defineProps<Props>()

// Swiper modules
const modules = [Navigation, Pagination, Autoplay]

/**
 * Check if URL is a YouTube video
 */
const isYouTubeVideo = (url: string): boolean => {
  return url.includes('youtube.com') || url.includes('youtu.be')
}

/**
 * Check if URL is a direct video file
 */
const isDirectVideo = (url: string): boolean => {
  return url.match(/\.(mp4|webm|ogg)$/i) !== null
}
</script>

<template>
  <div class="product-media-swiper">
    <Swiper
      :modules="modules"
      :slides-per-view="1"
      :space-between="0"
      :navigation="true"
      :pagination="{ clickable: true }"
      :loop="media.length > 1"
      :autoplay="false"
      class="rounded-xl overflow-hidden shadow-2xl bg-gray-100 dark:bg-brand-dark"
    >
      <SwiperSlide
        v-for="(item, index) in media"
        :key="index"
        class="relative w-full h-96 lg:h-[600px]"
      >
        <!-- Image -->
        <img
          v-if="item.type === 'image'"
          :src="item.url"
          :alt="`${productName} - Imagem ${index + 1}`"
          class="w-full h-full object-cover"
        >

        <!-- YouTube Video -->
        <iframe
          v-else-if="item.type === 'video' && isYouTubeVideo(item.url)"
          :src="item.url"
          :title="`${productName} - Vídeo ${index + 1}`"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          class="w-full h-full"
        />

        <!-- Direct Video -->
        <video
          v-else-if="item.type === 'video' && isDirectVideo(item.url)"
          :src="item.url"
          controls
          class="w-full h-full object-cover"
        >
          Seu navegador não suporta a tag de vídeo.
        </video>

        <!-- Fallback for unknown video types -->
        <div
          v-else-if="item.type === 'video'"
          class="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-brand-medium-dark-primary"
        >
          <div class="text-center p-8">
            <svg
              class="mx-auto h-16 w-16 text-gray-400 dark:text-gray-600 mb-4"
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
            <p class="text-gray-600 dark:text-gray-400">
              Formato de vídeo não suportado
            </p>
            <a
              :href="item.url"
              target="_blank"
              rel="noopener noreferrer"
              class="mt-2 inline-block text-brand-primary dark:text-brand-light-primary hover:underline"
            >
              Abrir em nova aba
            </a>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style scoped>
.product-media-swiper :deep(.swiper) {
  width: 100%;
  height: 100%;
}

/* Navigation Arrows - Modern Design */
.product-media-swiper :deep(.swiper-button-next),
.product-media-swiper :deep(.swiper-button-prev) {
  color: #fff;
  background: linear-gradient(135deg, rgba(79, 82, 255, 0.95), rgba(60, 63, 187, 0.95));
  width: 56px;
  height: 56px;
  border-radius: 12px;
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 12px rgba(79, 82, 255, 0.4);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}

.product-media-swiper :deep(.swiper-button-next:hover),
.product-media-swiper :deep(.swiper-button-prev:hover) {
  background: linear-gradient(135deg, rgba(79, 82, 255, 1), rgba(60, 63, 187, 1));
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(79, 82, 255, 0.6);
}

.product-media-swiper :deep(.swiper-button-next::after),
.product-media-swiper :deep(.swiper-button-prev::after) {
  font-size: 16px;
  font-weight: 700;
}

/* Position adjustments for better visibility */
.product-media-swiper :deep(.swiper-button-next) {
  right: 16px;
}

.product-media-swiper :deep(.swiper-button-prev) {
  left: 16px;
}

/* Pagination Bullets - Enhanced Design */
.product-media-swiper :deep(.swiper-pagination) {
  bottom: 20px !important;
}

.product-media-swiper :deep(.swiper-pagination-bullet) {
  width: 10px;
  height: 10px;
  background: rgba(255, 255, 255, 0.6);
  opacity: 1;
  transition: all 0.3s ease;
  margin: 0 6px !important;
}

.product-media-swiper :deep(.swiper-pagination-bullet-active) {
  background: #4f52ff;
  width: 28px;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(79, 82, 255, 0.5);
}

/* Dark Mode */
@media (prefers-color-scheme: dark) {
  .product-media-swiper :deep(.swiper-button-next),
  .product-media-swiper :deep(.swiper-button-prev) {
    background: linear-gradient(135deg, rgba(156, 207, 255, 0.95), rgba(116, 118, 255, 0.95));
    box-shadow: 0 4px 12px rgba(156, 207, 255, 0.4);
  }

  .product-media-swiper :deep(.swiper-button-next:hover),
  .product-media-swiper :deep(.swiper-button-prev:hover) {
    background: linear-gradient(135deg, rgba(156, 207, 255, 1), rgba(116, 118, 255, 1));
    box-shadow: 0 6px 20px rgba(156, 207, 255, 0.6);
  }

  .product-media-swiper :deep(.swiper-pagination-bullet-active) {
    background: #9ccfff;
    box-shadow: 0 2px 8px rgba(156, 207, 255, 0.5);
  }
}
</style>

