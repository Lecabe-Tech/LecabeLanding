<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  number: string
  icon: string
  title: string
  description: string
  animationDelay?: string
  width?: 'sm' | 'md' | 'lg' | 'full'
}

const props = withDefaults(defineProps<Props>(), {
  animationDelay: '0',
  width: 'md'
})

/**
 * Get the width classes based on the width prop
 */
const widthClasses = computed(() => {
  switch (props.width) {
    case 'sm':
      return 'w-64' // 256px
    case 'md':
      return 'w-72' // 288px
    case 'lg':
      return 'w-80' // 320px
    case 'full':
      return 'w-full'
    default:
      return 'w-72' // 288px
  }
})

/**
 * Get the icon SVG file path based on the icon name
 */
const iconSrc = computed(() => {
  // Map icon names to service SVG files
  const iconMap: Record<string, string> = {
    gear: 'custom-software',
    chart: 'cloud',
    users: 'ux',
    code: 'development',
    brain: 'ai',
    design: 'uiux',
    check: 'qa',
    robot: 'automation'
  }
  const iconFile = iconMap[props.icon] || 'development'
  return `/assets/icons/services/${iconFile}.svg`
})
</script>

<template>
  <div
    class="service-card relative flex flex-col shadow-lg p-8 rounded-xl overflow-hidden transition-all duration-300 group animate-scale-in min-h-[22rem]"
    :class="[`animation-delay-${animationDelay}`, widthClasses]"
  >
    <!-- Puzzle piece background -->
    <div
      class="absolute top-0 left-0 w-24 h-24 opacity-5 dark:opacity-10 pointer-events-none"
    >
      <img
        src="/assets/images/puzzle-piece.svg"
        alt=""
        class="w-full h-full object-contain"
        aria-hidden="true"
      />
    </div>
    
    <!-- Number badge in top-left corner -->
    <div
      class="absolute top-4 left-4 w-8 h-8 bg-brand-primary dark:bg-brand-light-primary rounded-full flex items-center justify-center z-10"
    >
      <span class="text-white text-sm font-bold">{{ number }}</span>
    </div>

    <!-- Icon with corner background in top-right -->
    <div class="absolute top-0 right-0 w-28 h-28 overflow-hidden z-10">
      <div class="corner-background"></div>
      <div class="absolute top-4 right-4 w-14 h-14 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 icon-with-border">
        <img 
          :src="iconSrc" 
          :alt="`${title} icon`"
          class="w-full h-full object-contain"
        />
      </div>
    </div>

    <!-- Title and description -->
    <h3 class="card-title relative z-10 mb-4 mt-8">
      {{ title }}
    </h3>
    <p class="card-description relative z-10" style="line-height: 1.7">
      {{ description }}
    </p>
  </div>
</template>

<style scoped>
.service-card {
  position: relative;
  transition: all 0.3s ease;
  box-sizing: border-box;
  background: linear-gradient(135deg, rgba(79, 82, 255, 0.02) 0%, rgba(116, 118, 255, 0.04) 100%);
}

.service-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(79, 82, 255, 0.2);
  background: linear-gradient(135deg, rgba(79, 82, 255, 0.08) 0%, rgba(116, 118, 255, 0.12) 100%);
}

/* Corner background triangle - Larger size */
.corner-background {
  position: absolute;
  top: 0;
  right: 0;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 112px 112px 0;
  border-color: transparent #4f52ff transparent transparent;
  transition: border-color 0.3s ease;
}

/* White border around icon */
.icon-with-border {
  background: white;
  border-radius: 12px;
  padding: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

@media (prefers-color-scheme: dark) {
  .service-card {
    background: linear-gradient(135deg, rgba(79, 82, 255, 0.15) 0%, rgba(60, 63, 187, 0.25) 100%);
  }
  
  .service-card:hover {
    box-shadow: 0 20px 40px rgba(156, 207, 255, 0.25);
    background: linear-gradient(135deg, rgba(116, 118, 255, 0.25) 0%, rgba(156, 207, 255, 0.2) 100%);
  }

  .corner-background {
    border-color: transparent #4f52ff transparent transparent;
  }
}
</style>
