import { createI18n } from 'vue-i18n'
import pt from '../locales/pt.json'
import en from '../locales/en.json'
import fr from '../locales/fr.json'

/**
 * I18n plugin configuration for multi-language support
 * Supports: Portuguese (pt), English (en), French (fr)
 */
const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('locale') || 'pt',
  fallbackLocale: 'pt',
  messages: {
    pt,
    en,
    fr
  },
  globalInjection: true
})

export default i18n

