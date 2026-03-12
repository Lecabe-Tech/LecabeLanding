<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useScrollAnimation } from '@/composables/useScrollAnimation'
import TechBackground from '@/components/TechBackground.vue'

const { t } = useI18n()
const router = useRouter()

// Scroll animations
const heroSection = useScrollAnimation({}, true)
const statsSection = useScrollAnimation()
const missionSection = useScrollAnimation()
const ctaSection = useScrollAnimation()

const stats = computed(() => [
  {
    value: t('companyPages.overview.stats.founded.value'),
    label: t('companyPages.overview.stats.founded.label')
  },
  {
    value: t('companyPages.overview.stats.team.value'),
    label: t('companyPages.overview.stats.team.label')
  },
  {
    value: t('companyPages.overview.stats.projects.value'),
    label: t('companyPages.overview.stats.projects.label')
  },
  {
    value: t('companyPages.overview.stats.satisfaction.value'),
    label: t('companyPages.overview.stats.satisfaction.label')
  }
])

const navigateTo = (path: string) => {
  router.push(path)
}
</script>

<template>
  <div class="flex flex-1 flex-col relative">
    <!-- Animated Tech Background -->
    <TechBackground />

    <!-- Hero Section -->
    <section
      :ref="heroSection.target"
      class="relative py-20 md:py-32 overflow-hidden min-h-[70vh] flex items-center"
      :class="heroSection.isVisible.value ? 'animate-fade-in' : 'opacity-0'"
    >
      <div class="max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            {{ t('companyPages.overview.hero.title') }}
          </h1>
          <p class="text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed">
            {{ t('companyPages.overview.hero.subtitle') }}
          </p>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section
      :ref="statsSection.target"
      class="py-16 px-6 md:px-12"
      :class="statsSection.isVisible.value ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'"
    >
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div
            v-for="(stat, index) in stats"
            :key="index"
            class="text-center"
          >
            <div class="text-4xl md:text-5xl font-bold text-brand-primary dark:text-brand-light-primary mb-2">
              {{ stat.value }}
            </div>
            <div class="text-sm md:text-base text-gray-600 dark:text-gray-400">
              {{ stat.label }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Mission & Vision -->
    <section
      :ref="missionSection.target"
      class="py-16 md:py-24 px-6 md:px-12"
      :class="missionSection.isVisible.value ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'"
    >
      <div class="max-w-7xl mx-auto">
        <div class="grid md:grid-cols-2 gap-12">
          <!-- Mission -->
          <div class="bg-white/90 dark:bg-[#1e202d]/90 backdrop-blur-sm rounded-2xl p-8 border border-gray-100 dark:border-brand-primary/20 shadow-lg">
            <div class="w-14 h-14 rounded-xl bg-brand-primary/10 dark:bg-brand-light-primary/10 flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 256 256" class="text-brand-primary dark:text-brand-light-primary">
                <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm40-68a28,28,0,0,1-28,28h-8v8a8,8,0,0,1-16,0v-8h-8a28,28,0,0,1-28-28,8,8,0,0,1,16,0,12,12,0,0,0,12,12h32a12,12,0,0,0,0-24H112a28,28,0,0,1,0-56h8V72a8,8,0,0,1,16,0v8h8a28,28,0,0,1,28,28,8,8,0,0,1-16,0,12,12,0,0,0-12-12H112a12,12,0,0,0,0,24h28A28,28,0,0,1,168,148Z"/>
              </svg>
            </div>
            <h2 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {{ t('companyPages.overview.mission.title') }}
            </h2>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
              {{ t('companyPages.overview.mission.content') }}
            </p>
          </div>

          <!-- Vision -->
          <div class="bg-white/90 dark:bg-[#1e202d]/90 backdrop-blur-sm rounded-2xl p-8 border border-gray-100 dark:border-brand-primary/20 shadow-lg">
            <div class="w-14 h-14 rounded-xl bg-purple-500/10 flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 256 256" class="text-purple-500">
                <path d="M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z"/>
              </svg>
            </div>
            <h2 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {{ t('companyPages.overview.vision.title') }}
            </h2>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
              {{ t('companyPages.overview.vision.content') }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Quick Links -->
    <section class="py-16 md:py-24 px-6 md:px-12 bg-gray-50 dark:bg-brand-medium-dark-primary/30">
      <div class="max-w-7xl mx-auto">
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <button
            class="bg-white dark:bg-brand-medium-dark-primary p-6 rounded-xl hover:shadow-lg transition-all group text-left"
            @click="navigateTo('/empresa/sobre')"
          >
            <div class="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256" class="text-purple-500">
                <path d="M136,80v43.47l36.12,21.67a8,8,0,0,1-8.24,13.72l-40-24A8,8,0,0,1,120,128V80a8,8,0,0,1,16,0Zm-8-48A95.44,95.44,0,0,0,60.08,60.15C52.81,67.51,46.35,74.59,40,82V64a8,8,0,0,0-16,0v40a8,8,0,0,0,8,8H72a8,8,0,0,0,0-16H49.62C55.65,87.21,61.82,80.39,68.57,73.86a80,80,0,1,1-1.16,114.45,8,8,0,1,0-11.3,11.31A96,96,0,1,0,128,32Z"/>
              </svg>
            </div>
            <h3 class="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-500 transition-colors">
              Nossa História
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Como começamos e nossos valores
            </p>
          </button>

          <button
            class="bg-white dark:bg-brand-medium-dark-primary p-6 rounded-xl hover:shadow-lg transition-all group text-left"
            @click="navigateTo('/empresa/equipe')"
          >
            <div class="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256" class="text-purple-500">
                <path d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,55.53,105.64,95.83,95.83,0,0,1,47.22,37.71A8,8,0,0,1,250.14,206.7Z"/>
              </svg>
            </div>
            <h3 class="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-500 transition-colors">
              Nosso Time
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Conheça quem faz acontecer
            </p>
          </button>

          <button
            class="bg-white dark:bg-brand-medium-dark-primary p-6 rounded-xl hover:shadow-lg transition-all group text-left"
            @click="navigateTo('/empresa/cultura')"
          >
            <div class="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256" class="text-purple-500">
                <path d="M178,40c-20.65,0-38.73,8.88-50,23.89C116.73,48.88,98.65,40,78,40a62.07,62.07,0,0,0-62,62c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,228.66,240,172,240,102A62.07,62.07,0,0,0,178,40ZM128,214.8C109.74,204.16,32,155.69,32,102A46.06,46.06,0,0,1,78,56c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.8,0c6.82-16.67,23.15-27,42.6-27a46.06,46.06,0,0,1,46,46C224,155.61,146.24,204.15,128,214.8Z"/>
              </svg>
            </div>
            <h3 class="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-500 transition-colors">
              Cultura
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Ambiente e benefícios
            </p>
          </button>

          <button
            class="bg-white dark:bg-brand-medium-dark-primary p-6 rounded-xl hover:shadow-lg transition-all group text-left"
            @click="navigateTo('/empresa/carreiras')"
          >
            <div class="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256" class="text-purple-500">
                <path d="M216,56H176V48a24,24,0,0,0-24-24H104A24,24,0,0,0,80,48v8H40A16,16,0,0,0,24,72V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V72A16,16,0,0,0,216,56ZM96,48a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm16,72h32a8,8,0,0,1,0,16H112a8,8,0,0,1,0-16Z"/>
              </svg>
            </div>
            <h3 class="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-500 transition-colors">
              Carreiras
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Vagas e oportunidades
            </p>
          </button>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section
      :ref="ctaSection.target"
      :class="[
        `py-16 md:py-24 px-6 md:px-12 relative overflow-hidden`,
        ctaSection.isVisible.value ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
      ]"
    >
      <div class="absolute inset-0 bg-gradient-to-br from-purple-500 to-purple-600 dark:from-purple-400 dark:to-purple-500 opacity-10" />
      <div class="max-w-4xl mx-auto text-center relative z-10">
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          {{ t('companyPages.overview.cta.title') }}
        </h2>
        <p class="text-xl text-gray-600 dark:text-gray-300 mb-8">
          {{ t('companyPages.overview.cta.description') }}
        </p>
        <button
          class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-purple-500 dark:bg-purple-400 text-white dark:text-brand-dark rounded-xl font-bold text-lg hover:bg-purple-600 dark:hover:bg-purple-500 hover:scale-105 transition-all shadow-lg"
          @click="navigateTo('/empresa/carreiras')"
        >
          {{ t('companyPages.overview.cta.button') }}
        </button>
      </div>
    </section>
  </div>
</template>
