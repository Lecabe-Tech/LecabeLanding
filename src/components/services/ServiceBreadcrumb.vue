<script setup lang="ts">
import { useI18n } from 'vue-i18n'

interface Props {
  serviceName: string
}

defineProps<Props>()

const { t } = useI18n()
</script>

<template>
  <nav class="flex items-center gap-2 text-sm mb-8 animate-fade-in">
    <router-link
      to="/"
      class="text-brand-primary dark:text-brand-light-primary hover:underline transition-colors"
    >
      Home
    </router-link>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      viewBox="0 0 256 256"
      class="text-gray-400 dark:text-gray-600"
    >
      <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"/>
    </svg>
    <router-link
      to="/servicos"
      class="text-brand-primary dark:text-brand-light-primary hover:underline transition-colors"
    >
      {{ t('nav.services') }}
    </router-link>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      viewBox="0 0 256 256"
      class="text-gray-400 dark:text-gray-600"
    >
      <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"/>
    </svg>
    <span class="text-gray-700 dark:text-gray-300 font-medium">{{ serviceName }}</span>
  </nav>
</template>
