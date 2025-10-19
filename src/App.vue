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
  <div class="min-h-screen bg-brand-light dark:bg-brand-dark flex flex-col transition-colors duration-300">
    <Header />
    <main class="flex-grow">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<style scoped>
/* Component-specific styles if needed */
</style>

