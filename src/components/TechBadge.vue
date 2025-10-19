<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  name: string
  icon: string
  animationDelay?: string
}

const props = withDefaults(defineProps<Props>(), {
  animationDelay: '0'
})

/**
 * Get the icon SVG file path based on the icon name
 */
const iconSrc = computed(() => {
  return `/assets/icons/tech/${props.icon}.svg`
})
</script>

<template>
  <div
    class="tech-badge flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-gray-200 dark:border-brand-medium-dark-primary bg-white dark:bg-brand-medium-dark-primary/30 p-4 md:p-6 hover:border-brand-primary dark:hover:border-brand-light-primary transition-all duration-300 group cursor-pointer"
    :class="`animation-delay-${animationDelay} animate-scale-in`"
  >
    <div class="w-10 h-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
      <img 
        :src="iconSrc" 
        :alt="`${name} logo`"
        class="w-full h-full object-contain"
      />
    </div>
    <span class="text-gray-900 dark:text-white text-sm md:text-base font-semibold text-center leading-tight">
      {{ name }}
    </span>
  </div>
</template>

<style scoped>
.tech-badge:hover {
  box-shadow: 0 8px 20px rgba(79, 82, 255, 0.15),
              0 0 0 1px rgba(79, 82, 255, 0.1);
}

@media (prefers-color-scheme: dark) {
  .tech-badge:hover {
    box-shadow: 0 8px 20px rgba(156, 207, 255, 0.15),
                0 0 0 1px rgba(156, 207, 255, 0.1);
  }
}
</style>
