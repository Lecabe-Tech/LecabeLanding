<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useThemeStore } from '@/stores/theme'

const { t } = useI18n()
const themeStore = useThemeStore()
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="bg-white dark:bg-brand-dark border-t border-gray-200 dark:border-brand-medium-dark-primary transition-colors duration-300">
    <div class="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
        <!-- Column 1: Logo -->
        <div class="flex flex-col items-center md:items-start gap-4">
          <img
            v-if="themeStore.isDark"
            src="/assets/logos/Logo-horizontal-degradê-branco-8.png"
            alt="Lecabe Logo"
            class="h-16 w-auto"
          >
          <img
            v-else
            src="/assets/logos/Logo-horizontal-degradê -preto-8.png"
            alt="Lecabe Logo"
            class="h-16 w-auto"
          >
          <p class="text-gray-600 dark:text-gray-400 text-sm max-w-xs text-center md:text-left">
            Transformando ideias em soluções digitais inovadoras.
          </p>
        </div>

        <!-- Column 2: Links and Social Media -->
        <div class="flex flex-col gap-6">
          <!-- Links -->
          <div class="flex flex-col gap-3">
            <a
              href="#"
              class="text-gray-600 dark:text-gray-400 hover:text-brand-primary dark:hover:text-brand-light-primary transition-colors duration-200 text-base font-medium"
            >
              {{ t('footer.privacyPolicy') }}
            </a>
            <a
              href="#"
              class="text-gray-600 dark:text-gray-400 hover:text-brand-primary dark:hover:text-brand-light-primary transition-colors duration-200 text-base font-medium"
            >
              {{ t('footer.termsOfService') }}
            </a>
          </div>

          <!-- Social Media Icons with Primary Background -->
          <div class="flex flex-wrap gap-3">
            <!-- Instagram -->
            <a
              href="https://www.instagram.com/_lecabe/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              class="group"
            >
              <div class="w-10 h-10 rounded-full bg-brand-primary dark:bg-brand-light-primary flex items-center justify-center hover:bg-brand-dark-primary dark:hover:bg-brand-medium-primary transition-all duration-300 hover:scale-110">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20px"
                  height="20px"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                  class="text-white"
                >
                  <path
                    d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z"
                  />
                </svg>
              </div>
            </a>

            <!-- LinkedIn -->
            <a
              href="https://www.linkedin.com/company/lecabe/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              class="group"
            >
              <div class="w-10 h-10 rounded-full bg-brand-primary dark:bg-brand-light-primary flex items-center justify-center hover:bg-brand-dark-primary dark:hover:bg-brand-medium-primary transition-all duration-300 hover:scale-110">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20px"
                  height="20px"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                  class="text-white"
                >
                  <path
                    d="M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24Zm0,192H40V40H216V216ZM96,112v64a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0Zm88,28v36a8,8,0,0,1-16,0V140a20,20,0,0,0-40,0v36a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A36,36,0,0,1,184,140ZM100,84A12,12,0,1,1,88,72,12,12,0,0,1,100,84Z"
                  />
                </svg>
              </div>
            </a>

            <!-- WhatsApp -->
            <a
              href="https://wa.me/5511978561720"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              class="group"
            >
              <div class="w-10 h-10 rounded-full bg-brand-primary dark:bg-brand-light-primary flex items-center justify-center hover:bg-brand-dark-primary dark:hover:bg-brand-medium-primary transition-all duration-300 hover:scale-110">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20px"
                  height="20px"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                  class="text-white"
                >
                  <path
                    d="M187.58,144.84l-32-16a8,8,0,0,0-8,.5l-14.69,9.8a40.55,40.55,0,0,1-16-16l9.8-14.69a8,8,0,0,0,.5-8l-16-32A8,8,0,0,0,104,64a40,40,0,0,0-40,40,88.1,88.1,0,0,0,88,88,40,40,0,0,0,40-40A8,8,0,0,0,187.58,144.84ZM152,176a72.08,72.08,0,0,1-72-72A24,24,0,0,1,99.29,80.46l11.48,23L101,118a8,8,0,0,0-.73,7.51,56.47,56.47,0,0,0,30.15,30.15A8,8,0,0,0,138,155l14.61-9.74,23,11.48A24,24,0,0,1,152,176ZM128,24A104,104,0,0,0,36.18,176.88L24.83,210.93a16,16,0,0,0,20.24,20.24l34.05-11.35A104,104,0,1,0,128,24Zm0,192a87.87,87.87,0,0,1-44.06-11.81,8,8,0,0,0-6.54-.67L40,216,52.47,178.6a8,8,0,0,0-.66-6.54A88,88,0,1,1,128,216Z"
                  />
                </svg>
              </div>
            </a>
          </div>

          <!-- Copyright -->
          <p class="text-gray-600 dark:text-gray-400 text-sm mt-4">
            © {{ currentYear }} Lecabe. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
/* Component-specific styles */
</style>

