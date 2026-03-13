<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLocaleStore } from '@/stores/locale'

interface Props {
  direction?: 'left' | 'right'
}

const props = withDefaults(defineProps<Props>(), {
  direction: 'right'
})

const { t, locale } = useI18n()
const localeStore = useLocaleStore()
const isOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

/**
 * Change language
 */
const changeLanguage = (lang: string) => {
  locale.value = lang
  localeStore.setLocale(lang)
  isOpen.value = false
}

/**
 * Toggle dropdown
 */
const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

/**
 * Close dropdown when clicking outside
 */
const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div
    ref="dropdownRef"
    class="relative"
  >
    <button
      type="button"
      class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-brand-medium-dark-primary transition-colors duration-200"
      :aria-label="t('ui.changeLanguage')"
      @click.stop="toggleDropdown"
    >
      <span class="text-xl">{{ localeStore.getCurrentLocaleInfo().flag }}</span>
      <span class="text-sm font-medium">{{ localeStore.getCurrentLocaleInfo().code.toUpperCase() }}</span>
      <svg
        class="w-4 h-4 transition-transform duration-200"
        :class="{ 'rotate-180': isOpen }"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>

    <!-- Dropdown -->
    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        :class="[
          'absolute mt-2 w-48 max-w-[calc(100vw-4rem)] bg-white dark:bg-brand-medium-dark-primary rounded-lg shadow-lg py-1',
          props.direction === 'left' ? 'right-0 z-[60]' : 'right-0 z-50'
        ]"
        @click.stop
      >
        <button
          v-for="lang in localeStore.availableLocales"
          :key="lang.code"
          type="button"
          class="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-brand-dark transition-colors duration-150"
          :class="{
            'bg-brand-light dark:bg-brand-dark': locale === lang.code
          }"
          @click="changeLanguage(lang.code)"
        >
          <span class="text-xl">{{ lang.flag }}</span>
          <span class="font-medium">{{ lang.name }}</span>
        </button>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
/* Component-specific styles */
</style>

