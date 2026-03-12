<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useScrollAnimation } from '@/composables/useScrollAnimation'
import { useServices } from '@/composables/useServices'
import TechBackground from '@/components/TechBackground.vue'

const { t } = useI18n()
const router = useRouter()
const { services } = useServices()

// Scroll animations
const heroSection = useScrollAnimation({}, true)
const servicesSection = useScrollAnimation()
const ctaSection = useScrollAnimation()

const navigateToService = (route: string) => {
  router.push(route)
}
</script>

<template>
  <div class="flex flex-1 flex-col relative">
    <!-- Animated Tech Background -->
    <TechBackground />

    <!-- Hero Section -->
    <section
      :ref="heroSection.target"
      class="relative py-20 md:py-28 overflow-hidden min-h-[80vh] flex items-center bg-gradient-to-br from-brand-primary to-brand-dark-primary dark:from-brand-light-primary dark:to-brand-primary"
      :class="heroSection.isVisible.value ? 'animate-fade-in' : 'opacity-0'"
    >
      <div class="max-w-7xl mx-auto px-6 md:px-12 text-center text-white relative z-10">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          {{ t('servicesPages.overview.hero.title') }}
        </h1>
        <p class="text-lg md:text-xl mb-8 text-white/90 max-w-3xl mx-auto">
          {{ t('servicesPages.overview.hero.subtitle') }}
        </p>
        <button
          class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-brand-primary rounded-xl font-bold text-lg hover:scale-105 transition-all shadow-xl"
          @click="router.push({ path: '/', hash: '#contact' })"
        >
          {{ t('servicesPages.overview.hero.cta') }}
        </button>
      </div>
    </section>

    <!-- Services Grid Section -->
    <section
      :ref="servicesSection.target"
      class="py-16 md:py-24 px-6 md:px-12"
      :class="servicesSection.isVisible.value ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'"
    >
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {{ t('servicesPages.overview.subtitle') }}
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {{ t('servicesPages.overview.description') }}
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-6 lg:gap-8">
          <div
            v-for="service in services"
            :key="service.id"
            class="group relative bg-white/90 dark:bg-[#1e202d]/90 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 dark:border-brand-primary/20 hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden"
            @click="navigateToService(service.route)"
          >
            <!-- Gradient Background on Hover -->
            <div
              :class="`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`"
            />

            <!-- Content -->
            <div class="relative">
              <!-- Icon -->
              <div
                :class="`w-16 h-16 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`"
              >
                <svg
                  v-if="service.icon === 'code'"
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="white"
                  viewBox="0 0 256 256"
                >
                  <path d="M69.12,94.15,28.5,128l40.62,33.85a8,8,0,1,1-10.24,12.29l-48-40a8,8,0,0,1,0-12.29l48-40a8,8,0,0,1,10.24,12.3Zm176,27.7-48-40a8,8,0,1,0-10.24,12.3L227.5,128l-40.62,33.85a8,8,0,1,0,10.24,12.29l48-40a8,8,0,0,0,0-12.29Z"/>
                </svg>
                <svg
                  v-else-if="service.icon === 'cloud'"
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="white"
                  viewBox="0 0 256 256"
                >
                  <path d="M160,40A88.09,88.09,0,0,0,81.29,88.67,64,64,0,1,0,72,216h88a88,88,0,0,0,0-176Z"/>
                </svg>
                <svg
                  v-else-if="service.icon === 'design'"
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="white"
                  viewBox="0 0 256 256"
                >
                  <path d="M227.32,73.37,182.63,28.69a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H216a8,8,0,0,0,0-16H115.32l112-112A16,16,0,0,0,227.32,73.37Z"/>
                </svg>
                <svg
                  v-else-if="service.icon === 'ai'"
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="white"
                  viewBox="0 0 256 256"
                >
                  <path d="M200,48H136V16a8,8,0,0,0-16,0V48H56A32,32,0,0,0,24,80V192a32,32,0,0,0,32,32H200a32,32,0,0,0,32-32V80A32,32,0,0,0,200,48Zm16,144a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V80A16,16,0,0,1,56,64H200a16,16,0,0,1,16,16Zm-36-56a12,12,0,1,1-12-12A12,12,0,0,1,180,136ZM88,136a12,12,0,1,1-12-12A12,12,0,0,1,88,136Z"/>
                </svg>
              </div>

              <!-- Title and Description -->
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-brand-primary dark:group-hover:text-brand-light-primary transition-colors">
                {{ t(`megamenu.services.items.${service.id}.title`) }}
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                {{ t(`megamenu.services.items.${service.id}.description`) }}
              </p>

              <!-- CTA -->
              <div class="flex items-center gap-2 text-brand-primary dark:text-brand-light-primary font-semibold group-hover:gap-4 transition-all">
                <span>{{ t('servicesPages.overview.viewService') }}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section
      :ref="ctaSection.target"
      class="py-16 md:py-24 px-6 md:px-12"
      :class="ctaSection.isVisible.value ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'"
    >
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Não encontrou o que procura?
        </h2>
        <p class="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Entre em contato e vamos encontrar a melhor solução para seu negócio
        </p>
        <button
          class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-primary dark:bg-brand-light-primary text-white dark:text-brand-dark rounded-xl font-bold text-lg hover:scale-105 transition-all shadow-lg"
          @click="router.push({ path: '/', hash: '#contact' })"
        >
          {{ t('nav.contact') }}
        </button>
      </div>
    </section>
  </div>
</template>
