<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useThemeStore } from '@/stores/theme'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
import ThemeToggle from '@/components/ThemeToggle.vue'
import MegaMenu from '@/components/MegaMenu.vue'

const { t } = useI18n()
const router = useRouter()
const route = useRoute()
const themeStore = useThemeStore()
const isMenuOpen = ref(false)
const activeSection = ref('')
const isScrolled = ref(false)

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
 * Navigate to home page
 */
const goHome = (): void => {
  router.push('/')
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

/**
 * Track scroll position for header background
 */
const trackScroll = (): void => {
  isScrolled.value = window.scrollY > 50
}

/**
 * Track active section on scroll
 */
const trackActiveSection = (): void => {
  // Track scroll for header styling
  trackScroll()

  // Only track sections on home page
  if (route.path !== '/') {
    activeSection.value = ''
    return
  }

  const sections = ['services', 'contact']
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
    class="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap px-4 sm:px-6 lg:px-10 py-3 transition-all duration-500"
    :class="[
      isScrolled
        ? 'bg-white/95 dark:bg-brand-dark/95 backdrop-blur-xl border-b border-gray-200/50 dark:border-brand-medium-dark-primary/50 shadow-sm'
        : 'bg-transparent border-b border-transparent'
    ]"
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

    <!-- Desktop Navigation - Minimal -->
    <div class="hidden lg:flex flex-1 justify-end items-center gap-2">
      <MegaMenu @close-menu="isMenuOpen = false" />

      <!-- Divider -->
      <div class="w-px h-6 bg-gray-200 dark:bg-brand-medium-dark-primary/50 mx-2" />

      <!-- Language & Theme - Inline -->
      <LanguageSwitcher direction="left" />
      <ThemeToggle />
    </div>

    <!-- Mobile menu button -->
    <div class="flex lg:hidden items-center gap-2">
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
        class="absolute top-full left-0 right-0 lg:hidden bg-white/95 dark:bg-brand-dark/95 backdrop-blur-xl border-b border-gray-200/50 dark:border-brand-medium-dark-primary/50 shadow-lg"
        role="navigation"
        aria-label="Menu mobile"
      >
        <div class="flex flex-col px-4 py-4 space-y-3">
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
        </div>
      </nav>
    </Transition>
  </header>
</template>

<style scoped>
/* Component-specific styles */
</style>

