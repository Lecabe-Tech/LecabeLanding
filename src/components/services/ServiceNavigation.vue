<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { Service } from '@/types/service'

interface Props {
  prevService: Service | null
  nextService: Service | null
}

defineProps<Props>()

const { t } = useI18n()
</script>

<template>
  <div class="flex justify-between items-center mt-16 pt-8 border-t border-gray-200 dark:border-brand-medium-dark-primary">
    <!-- Serviço Anterior -->
    <router-link
      v-if="prevService"
      :to="prevService.route"
      class="flex items-center gap-3 group hover:gap-4 transition-all"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        viewBox="0 0 256 256"
        class="text-brand-primary dark:text-brand-light-primary"
      >
        <path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z" />
      </svg>
      <div>
        <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">
          Serviço Anterior
        </div>
        <div class="font-semibold text-gray-900 dark:text-white group-hover:text-brand-primary dark:group-hover:text-brand-light-primary transition-colors">
          {{ t(`megamenu.services.items.${prevService.id}.title`) }}
        </div>
      </div>
    </router-link>
    <div v-else />

    <!-- Serviço Seguinte -->
    <router-link
      v-if="nextService"
      :to="nextService.route"
      class="flex items-center gap-3 group hover:gap-4 transition-all text-right"
    >
      <div>
        <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">
          Próximo Serviço
        </div>
        <div class="font-semibold text-gray-900 dark:text-white group-hover:text-brand-primary dark:group-hover:text-brand-light-primary transition-colors">
          {{ t(`megamenu.services.items.${nextService.id}.title`) }}
        </div>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        viewBox="0 0 256 256"
        class="text-brand-primary dark:text-brand-light-primary"
      >
        <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z" />
      </svg>
    </router-link>
    <div v-else />
  </div>
</template>
