<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useThemeStore } from './stores/theme'
import { useI18n } from 'vue-i18n'
import Header from './components/layout/Header.vue'
import Footer from './components/layout/Footer.vue'

const themeStore = useThemeStore()
const { locale } = useI18n()

// Initialize theme on mount
onMounted(() => {
  themeStore.initTheme()
  
  // Set initial language attribute
  const savedLocale = localStorage.getItem('locale') || 'pt'
  document.documentElement.lang = savedLocale
  locale.value = savedLocale
})
</script>

<template>
  <div class="min-h-screen flex flex-col transition-colors duration-300">
    <!-- Skip to main content link for keyboard navigation -->
    <a
      href="#main-content"
      class="skip-to-main"
    >
      Pular para o conteúdo principal
    </a>
    
    <Header />
    <main
      id="main-content"
      class="flex-grow"
      role="main"
      tabindex="-1"
    >
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<style scoped>
/* Component-specific styles if needed */
</style>

