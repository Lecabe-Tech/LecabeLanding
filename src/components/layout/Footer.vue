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
        <!-- Column 1: Logo and Contact Info -->
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
          
          <!-- Contact Information -->
          <div class="flex flex-col gap-2 text-center md:text-left">
            <a
              href="mailto:contato@lecabe.com.br"
              class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-brand-primary dark:hover:text-brand-light-primary transition-colors duration-200 text-sm justify-center md:justify-start"
            >
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span>contato@lecabe.com.br</span>
            </a>
            <a
              href="https://wa.me/5511978561720"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-brand-primary dark:hover:text-brand-light-primary transition-colors duration-200 text-sm justify-center md:justify-start"
            >
              <svg
                class="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span>+55 11 97856-1720</span>
            </a>
          </div>
        </div>

        <!-- Column 2: Links and Social Media -->
        <div class="flex flex-col gap-6">
          <!-- Links -->
          <div class="flex flex-col gap-3">
            <router-link
              to="/politica-de-privacidade"
              class="text-gray-600 dark:text-gray-400 hover:text-brand-primary dark:hover:text-brand-light-primary transition-colors duration-200 text-base font-medium"
            >
              {{ t('footer.privacyPolicy') }}
            </router-link>
            <router-link
              to="/termos-de-servico"
              class="text-gray-600 dark:text-gray-400 hover:text-brand-primary dark:hover:text-brand-light-primary transition-colors duration-200 text-base font-medium"
            >
              {{ t('footer.termsOfService') }}
            </router-link>
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

