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
          />
          <img
            v-else
            src="/assets/logos/Logo-horizontal-degradê -preto-8.png"
            alt="Lecabe Logo"
            class="h-16 w-auto"
          />
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
            <!-- Twitter/X -->
            <a href="#" aria-label="Twitter" class="group">
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
                    d="M247.39,68.94A8,8,0,0,0,240,64H209.57A48.66,48.66,0,0,0,168.1,40a46.91,46.91,0,0,0-33.75,13.7A47.9,47.9,0,0,0,120,88v6.09C79.74,83.47,46.81,50.72,46.46,50.37a8,8,0,0,0-13.65,4.92c-4.31,47.79,9.57,79.77,22,98.18a110.93,110.93,0,0,0,21.88,24.2c-15.23,17.53-39.21,26.74-39.47,26.84a8,8,0,0,0-3.85,11.93c.75,1.12,3.75,5.05,11.08,8.72C53.51,229.7,65.48,232,80,232c70.67,0,129.72-54.42,135.75-124.44l29.91-29.9A8,8,0,0,0,247.39,68.94Zm-45,29.41a8,8,0,0,0-2.32,5.14C196,166.58,143.28,216,80,216c-10.56,0-18-1.4-23.22-3.08,11.51-6.25,27.56-17,37.88-32.48A8,8,0,0,0,92,169.08c-.47-.27-43.91-26.34-44-96,16,13,45.25,33.17,78.67,38.79A8,8,0,0,0,136,104V88a32,32,0,0,1,9.6-22.92A30.94,30.94,0,0,1,167.9,56c12.66.16,24.49,7.88,29.44,19.21A8,8,0,0,0,204.67,80h16Z"
                  />
                </svg>
              </div>
            </a>

            <!-- LinkedIn -->
            <a href="#" aria-label="LinkedIn" class="group">
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

            <!-- Instagram -->
            <a href="#" aria-label="Instagram" class="group">
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

            <!-- WhatsApp -->
            <a href="#" aria-label="WhatsApp" class="group">
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

