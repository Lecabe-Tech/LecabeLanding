<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useThemeStore } from '@/stores/theme'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
import ThemeToggle from '@/components/ThemeToggle.vue'

const { t } = useI18n()
const router = useRouter()
const route = useRoute()
const themeStore = useThemeStore()
const isMenuOpen = ref(false)
const activeSection = ref('')

/**
 * Toggle mobile menu visibility
 */
const toggleMenu = (): void => {
  isMenuOpen.value = !isMenuOpen.value
}

/**
 * Navigate to section (handles navigation from other pages)
 */
const scrollToSection = (sectionId: string): void => {
  // Close mobile menu first
  isMenuOpen.value = false
  
  // Check if we're on the home page
  if (router.currentRoute.value.path !== '/') {
    // Navigate to home page with hash
    router.push({ path: '/', hash: `#${sectionId}` })
  } else {
    // Already on home page, just scroll
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }
}

    /**
 * Navigate to produtos page
 */
    const goToMarketplace = (): void => {
      router.push('/produtos')
      isMenuOpen.value = false
    }

/**
 * Navigate to home page
 */
const goHome = (): void => {
  router.push('/')
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

/**
 * Track active section on scroll
 */
const trackActiveSection = (): void => {
  // Only track on home page
  if (route.path !== '/') {
    activeSection.value = ''
    return
  }

  const sections = ['about', 'services', 'contact']
  const scrollPosition = window.scrollY + 150 // Offset for header height

  // Check if at top of page
  if (window.scrollY < 100) {
    activeSection.value = ''
    return
  }

  // Find current section
  for (const sectionId of sections) {
    const element = document.getElementById(sectionId)
    if (element) {
      const rect = element.getBoundingClientRect()
      const elementTop = rect.top + window.scrollY
      const elementBottom = elementTop + rect.height

      if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
        activeSection.value = sectionId
        return
      }
    }
  }
}

/**
 * Check if a section is active
 */
const isActive = (sectionId: string): boolean => {
  return activeSection.value === sectionId
}

/**
 * Setup scroll listener
 */
onMounted(() => {
  window.addEventListener('scroll', trackActiveSection, { passive: true })
  trackActiveSection() // Initial check
})

/**
 * Cleanup scroll listener
 */
onUnmounted(() => {
  window.removeEventListener('scroll', trackActiveSection)
})
</script>

<template>
  <header
    role="banner"
    class="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-gray-200 dark:border-brand-medium-dark-primary px-4 sm:px-6 lg:px-10 py-3 bg-white dark:bg-brand-dark transition-colors duration-300 shadow-sm"
  >
    <!-- Logo -->
    <div class="flex items-center gap-4 text-gray-900 dark:text-white">
      <button
        class="flex items-center gap-2 hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-brand-primary dark:focus:ring-brand-light-primary rounded-lg"
        :aria-label="t('nav.goHome') || 'Ir para página inicial'"
        @click="goHome"
      >
        <img
          v-if="themeStore.isDark"
          src="/assets/logos/Logo-horizontal-degradê-branco-8.png"
          alt="Lecabe Logo"
          class="h-8 md:h-10 w-auto"
        >
        <img
          v-else
          src="/assets/logos/Logo-horizontal-degradê -preto-8.png"
          alt="Lecabe Logo"
          class="h-8 md:h-10 w-auto"
        >
      </button>
    </div>

    <!-- Desktop Navigation -->
    <nav
      class="hidden md:flex flex-1 justify-end gap-8"
      role="navigation"
      aria-label="Navegação principal"
    >
      <div class="flex items-center gap-9">
        <button
          :class="[
            'text-gray-900 dark:text-white text-sm font-medium leading-normal hover:text-brand-primary dark:hover:text-brand-light-primary transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-primary dark:focus:ring-brand-light-primary focus:ring-offset-2 px-2 py-1 pb-1 border-b-2',
            isActive('about') 
              ? 'border-brand-primary dark:border-brand-light-primary text-brand-primary dark:text-brand-light-primary' 
              : 'border-transparent'
          ]"
          :aria-label="`Navegar para ${t('nav.about')}`"
          @click="scrollToSection('about')"
        >
          {{ t('nav.about') }}
        </button>
        <button
          :class="[
            'text-gray-900 dark:text-white text-sm font-medium leading-normal hover:text-brand-primary dark:hover:text-brand-light-primary transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-primary dark:focus:ring-brand-light-primary focus:ring-offset-2 px-2 py-1 pb-1 border-b-2',
            isActive('services') 
              ? 'border-brand-primary dark:border-brand-light-primary text-brand-primary dark:text-brand-light-primary' 
              : 'border-transparent'
          ]"
          :aria-label="`Navegar para ${t('nav.services')}`"
          @click="scrollToSection('services')"
        >
          {{ t('nav.services') }}
        </button>
        <button
          :class="[
            'text-gray-900 dark:text-white text-sm font-medium leading-normal hover:text-brand-primary dark:hover:text-brand-light-primary transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-primary dark:focus:ring-brand-light-primary focus:ring-offset-2 px-2 py-1 pb-1 border-b-2',
            isActive('contact') 
              ? 'border-brand-primary dark:border-brand-light-primary text-brand-primary dark:text-brand-light-primary' 
              : 'border-transparent'
          ]"
          :aria-label="`Navegar para ${t('nav.contact')}`"
          @click="scrollToSection('contact')"
        >
          {{ t('nav.contact') }}
        </button>
      </div>

      <div class="flex items-center gap-3">
        <ThemeToggle />
        <LanguageSwitcher />
        
        <button
          class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg h-10 px-4 bg-brand-dark dark:bg-brand-primary text-neutral-50 text-sm font-bold leading-normal tracking-[0.015em] hover:bg-brand-primary dark:hover:bg-brand-dark-primary transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-brand-light-primary"
          :aria-label="t('nav.goToProducts') || 'Ir para Produtos'"
          @click="goToMarketplace"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="currentColor"
            viewBox="0 0 256 256"
          >
            <path d="M222.14,58.87A8,8,0,0,0,216,56H54.68L49.79,29.14A16,16,0,0,0,34.05,16H16a8,8,0,0,0,0,16h18L59.56,172.29a24,24,0,0,0,5.33,11.27,28,28,0,1,0,44.4,8.44h45.42A27.75,27.75,0,0,0,152,204a28,28,0,1,0,28-28H83.17a8,8,0,0,1-7.87-6.57L72.13,152h116a24,24,0,0,0,23.61-19.71l12.16-66.86A8,8,0,0,0,222.14,58.87ZM96,204a12,12,0,1,1-12-12A12,12,0,0,1,96,204Zm96,0a12,12,0,1,1-12-12A12,12,0,0,1,192,204Zm4-74.57A8,8,0,0,1,188.1,136H69.22L57.59,72H206.41Z" />
          </svg>
          <span class="truncate">Produtos</span>
        </button>
      </div>
    </nav>

    <!-- Mobile menu button -->
    <div class="flex md:hidden items-center gap-2">
      <ThemeToggle />
      <button
        type="button"
        class="p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-brand-medium-dark-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary dark:focus:ring-brand-light-primary transition-colors"
        :aria-label="isMenuOpen ? 'Fechar menu' : 'Abrir menu'"
        :aria-expanded="isMenuOpen"
        aria-controls="mobile-menu"
        @click="toggleMenu"
      >
        <svg
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            v-if="!isMenuOpen"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
          <path
            v-else
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <!-- Mobile Navigation Dropdown -->
    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <nav
        v-if="isMenuOpen"
        id="mobile-menu"
        class="absolute top-full left-0 right-0 md:hidden bg-white dark:bg-brand-dark border-b border-gray-200 dark:border-brand-medium-dark-primary shadow-lg"
        role="navigation"
        aria-label="Menu mobile"
      >
        <div class="flex flex-col px-4 py-4 space-y-3">
          <button
            :class="[
              'text-left text-gray-700 dark:text-gray-300 hover:text-brand-primary dark:hover:text-brand-light-primary py-2 transition-all font-medium focus:outline-none focus:ring-2 focus:ring-brand-primary dark:focus:ring-brand-light-primary rounded px-2 border-l-4',
              isActive('about')
                ? 'border-brand-primary dark:border-brand-light-primary text-brand-primary dark:text-brand-light-primary bg-gray-50 dark:bg-brand-medium-dark-primary'
                : 'border-transparent'
            ]"
            :aria-label="`Navegar para ${t('nav.about')}`"
            @click="scrollToSection('about')"
          >
            {{ t('nav.about') }}
          </button>
          <button
            :class="[
              'text-left text-gray-700 dark:text-gray-300 hover:text-brand-primary dark:hover:text-brand-light-primary py-2 transition-all font-medium focus:outline-none focus:ring-2 focus:ring-brand-primary dark:focus:ring-brand-light-primary rounded px-2 border-l-4',
              isActive('services')
                ? 'border-brand-primary dark:border-brand-light-primary text-brand-primary dark:text-brand-light-primary bg-gray-50 dark:bg-brand-medium-dark-primary'
                : 'border-transparent'
            ]"
            :aria-label="`Navegar para ${t('nav.services')}`"
            @click="scrollToSection('services')"
          >
            {{ t('nav.services') }}
          </button>
          <button
            :class="[
              'text-left text-gray-700 dark:text-gray-300 hover:text-brand-primary dark:hover:text-brand-light-primary py-2 transition-all font-medium focus:outline-none focus:ring-2 focus:ring-brand-primary dark:focus:ring-brand-light-primary rounded px-2 border-l-4',
              isActive('contact')
                ? 'border-brand-primary dark:border-brand-light-primary text-brand-primary dark:text-brand-light-primary bg-gray-50 dark:bg-brand-medium-dark-primary'
                : 'border-transparent'
            ]"
            :aria-label="`Navegar para ${t('nav.contact')}`"
            @click="scrollToSection('contact')"
          >
            {{ t('nav.contact') }}
          </button>
          
          <div class="pt-3 border-t border-gray-200 dark:border-brand-medium-dark-primary">
            <LanguageSwitcher />
          </div>
          
          <button
            class="flex min-w-[84px] w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg h-10 px-4 bg-brand-dark dark:bg-brand-primary text-neutral-50 text-sm font-bold leading-normal tracking-[0.015em] hover:bg-brand-primary dark:hover:bg-brand-dark-primary transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-brand-light-primary"
            :aria-label="t('nav.goToProducts') || 'Ir para Produtos'"
            @click="goToMarketplace"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <path d="M222.14,58.87A8,8,0,0,0,216,56H54.68L49.79,29.14A16,16,0,0,0,34.05,16H16a8,8,0,0,0,0,16h18L59.56,172.29a24,24,0,0,0,5.33,11.27,28,28,0,1,0,44.4,8.44h45.42A27.75,27.75,0,0,0,152,204a28,28,0,1,0,28-28H83.17a8,8,0,0,1-7.87-6.57L72.13,152h116a24,24,0,0,0,23.61-19.71l12.16-66.86A8,8,0,0,0,222.14,58.87ZM96,204a12,12,0,1,1-12-12A12,12,0,0,1,96,204Zm96,0a12,12,0,1,1-12-12A12,12,0,0,1,192,204Zm4-74.57A8,8,0,0,1,188.1,136H69.22L57.59,72H206.41Z" />
            </svg>
            <span class="truncate">Produtos</span>
          </button>
        </div>
      </nav>
    </Transition>
  </header>
</template>

<style scoped>
/* Component-specific styles */
</style>

