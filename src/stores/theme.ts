import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

/**
 * Store for theme management (light/dark mode)
 * Persists preference to localStorage
 */
export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(false)
  
  /**
   * Initialize theme from localStorage or system preference
   */
  const initTheme = (): void => {
    const savedTheme = localStorage.getItem('theme')
    
    if (savedTheme) {
      isDark.value = savedTheme === 'dark'
    } else {
      // Check system preference
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    
    updateDocumentClass()
  }

  /**
   * Update document class based on theme
   */
  const updateDocumentClass = (): void => {
    if (isDark.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  /**
   * Toggle between light and dark theme
   */
  const toggleTheme = (): void => {
    isDark.value = !isDark.value
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
    updateDocumentClass()
  }

  /**
   * Set specific theme
   * @param dark - true for dark mode, false for light mode
   */
  const setTheme = (dark: boolean): void => {
    isDark.value = dark
    localStorage.setItem('theme', dark ? 'dark' : 'light')
    updateDocumentClass()
  }

  // Watch for changes and update document class
  watch(isDark, updateDocumentClass)

  return {
    isDark,
    initTheme,
    toggleTheme,
    setTheme
  }
})

