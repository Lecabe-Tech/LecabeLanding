<script setup lang="ts">
import type { ServiceFeature } from '@/types/service'
import GlassCard from '@/components/ui/GlassCard.vue'

interface Props {
  features: ServiceFeature[]
  accentColor?: string
}

defineProps<Props>()
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[200px]">
    <GlassCard
      v-for="feature in features"
      :key="feature.id"
      :class="feature.gridPosition || 'col-span-1 row-span-1'"
      padding="md"
      as="div"
    >
      <!-- Ícone com animação premium -->
      <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-brand-primary/10 to-brand-primary/5 dark:from-brand-light-primary/10 dark:to-brand-light-primary/5 flex items-center justify-center mb-4 group-hover:from-brand-primary/20 group-hover:to-brand-primary/10 transition-all duration-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          fill="currentColor"
          viewBox="0 0 256 256"
          class="text-brand-primary dark:text-brand-light-primary transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
        >
          <!-- Ícone genérico - será customizado por feature -->
          <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Z" />
        </svg>
      </div>

      <!-- Conteúdo -->
      <h3 class="font-bold text-gray-900 dark:text-white text-lg mb-2 group-hover:text-brand-primary dark:group-hover:text-brand-light-primary transition-colors duration-300">
        {{ feature.title }}
      </h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        {{ feature.description }}
      </p>
    </GlassCard>
  </div>
</template>
