import { ref } from 'vue'
import { defineStore } from 'pinia'

/**
 * Store for language/locale management
 * Supports: Portuguese (pt), English (en), French (fr)
 */
export const useLocaleStore = defineStore('locale', () => {
  const currentLocale = ref(localStorage.getItem('locale') || 'pt')
  
  /**
   * Available languages
   */
  const availableLocales = [
    { code: 'pt', name: 'Português', flag: '🇧🇷' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' }
  ]

  /**
   * Set the current locale
   * @param locale - Language code (pt, en, fr)
   */
  const setLocale = (locale: string): void => {
    if (!availableLocales.find(l => l.code === locale)) {
      console.warn(`Locale ${locale} not available`)
      return
    }
    
    currentLocale.value = locale
    localStorage.setItem('locale', locale)
    
    // Update document language attribute
    document.documentElement.lang = locale
  }

  /**
   * Get current locale information
   */
  const getCurrentLocaleInfo = () => {
    return availableLocales.find(l => l.code === currentLocale.value) || availableLocales[0]
  }

  return {
    currentLocale,
    availableLocales,
    setLocale,
    getCurrentLocaleInfo
  }
})

