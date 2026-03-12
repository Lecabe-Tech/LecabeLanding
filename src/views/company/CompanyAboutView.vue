<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useScrollAnimation } from '@/composables/useScrollAnimation'
import TechBackground from '@/components/TechBackground.vue'

const { t } = useI18n()

// Scroll animations
const heroSection = useScrollAnimation({}, true)
const storySection = useScrollAnimation()
const valuesSection = useScrollAnimation()
const principlesSection = useScrollAnimation()

const values = computed(() => [
  {
    id: 'excellence',
    icon: 'code',
    title: t('companyPages.about.values.items.excellence.title'),
    description: t('companyPages.about.values.items.excellence.description')
  },
  {
    id: 'transparency',
    icon: 'transparency',
    title: t('companyPages.about.values.items.transparency.title'),
    description: t('companyPages.about.values.items.transparency.description')
  },
  {
    id: 'partnership',
    icon: 'handshake',
    title: t('companyPages.about.values.items.partnership.title'),
    description: t('companyPages.about.values.items.partnership.description')
  },
  {
    id: 'innovation',
    icon: 'lightbulb',
    title: t('companyPages.about.values.items.innovation.title'),
    description: t('companyPages.about.values.items.innovation.description')
  },
  {
    id: 'impact',
    icon: 'chart',
    title: t('companyPages.about.values.items.impact.title'),
    description: t('companyPages.about.values.items.impact.description')
  },
  {
    id: 'quality',
    icon: 'check',
    title: t('companyPages.about.values.items.quality.title'),
    description: t('companyPages.about.values.items.quality.description')
  }
])

const principles = computed(() => [
  {
    title: t('companyPages.about.principles.items.understanding.title'),
    description: t('companyPages.about.principles.items.understanding.description')
  },
  {
    title: t('companyPages.about.principles.items.collaboration.title'),
    description: t('companyPages.about.principles.items.collaboration.description')
  },
  {
    title: t('companyPages.about.principles.items.delivery.title'),
    description: t('companyPages.about.principles.items.delivery.description')
  },
  {
    title: t('companyPages.about.principles.items.support.title'),
    description: t('companyPages.about.principles.items.support.description')
  }
])
</script>

<template>
  <div class="flex flex-1 flex-col relative">
    <!-- Animated Tech Background -->
    <TechBackground />

    <!-- Hero Section -->
    <section
      :ref="heroSection.target"
      class="relative py-20 md:py-28 overflow-hidden min-h-[60vh] flex items-center"
      :class="heroSection.isVisible.value ? 'animate-fade-in' : 'opacity-0'"
    >
      <div class="max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            {{ t('companyPages.about.hero.title') }}
          </h1>
          <p class="text-xl md:text-2xl text-gray-600 dark:text-gray-300">
            {{ t('companyPages.about.hero.subtitle') }}
          </p>
        </div>
      </div>
    </section>

    <!-- Story Section -->
    <section
      :ref="storySection.target"
      class="py-16 md:py-24 px-6 md:px-12"
      :class="storySection.isVisible.value ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'"
    >
      <div class="max-w-4xl mx-auto">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          {{ t('companyPages.about.story.title') }}
        </h2>
        <div class="prose prose-lg dark:prose-invert mx-auto">
          <p class="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
            {{ t('companyPages.about.story.content') }}
          </p>
        </div>
      </div>
    </section>

    <!-- Values Section -->
    <section
      :ref="valuesSection.target"
      class="py-16 md:py-24 px-6 md:px-12 bg-gray-50 dark:bg-[#1e202d]/90/30"
      :class="valuesSection.isVisible.value ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'"
    >
      <div class="max-w-7xl mx-auto">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
          {{ t('companyPages.about.values.title') }}
        </h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="value in values"
            :key="value.id"
            class="bg-white dark:bg-[#1e202d]/90 p-8 rounded-2xl border border-gray-100 dark:border-brand-medium-dark-primary hover:shadow-xl transition-all group"
          >
            <div class="w-14 h-14 rounded-xl bg-purple-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg v-if="value.icon === 'code'" xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 256 256" class="text-purple-500">
                <path d="M69.12,94.15,28.5,128l40.62,33.85a8,8,0,1,1-10.24,12.29l-48-40a8,8,0,0,1,0-12.29l48-40a8,8,0,0,1,10.24,12.3Zm176,27.7-48-40a8,8,0,1,0-10.24,12.3L227.5,128l-40.62,33.85a8,8,0,1,0,10.24,12.29l48-40a8,8,0,0,0,0-12.29Z"/>
              </svg>
              <svg v-else-if="value.icon === 'transparency'" xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 256 256" class="text-purple-500">
                <path d="M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z"/>
              </svg>
              <svg v-else-if="value.icon === 'handshake'" xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 256 256" class="text-purple-500">
                <path d="M254.3,107.91,228.78,56.85a16,16,0,0,0-21.47-7.15L182.44,62.13,130.05,48.27a8.14,8.14,0,0,0-4.1,0L73.56,62.13,48.69,49.7a16,16,0,0,0-21.47,7.15L1.7,107.9a16,16,0,0,0,7.15,21.47l27,13.51,55.49,39.63a8.06,8.06,0,0,0,2.71,1.25l64,16a8,8,0,0,0,7.6-2.1l55.07-55.08,26.42-13.21a16,16,0,0,0,7.15-21.46Z"/>
              </svg>
              <svg v-else-if="value.icon === 'lightbulb'" xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 256 256" class="text-purple-500">
                <path d="M176,232a8,8,0,0,1-8,8H88a8,8,0,0,1,0-16h80A8,8,0,0,1,176,232Zm40-128a87.55,87.55,0,0,1-33.64,69.21A16.24,16.24,0,0,0,176,186v6a16,16,0,0,1-16,16H96a16,16,0,0,1-16-16v-6a16,16,0,0,0-6.23-12.66A87.59,87.59,0,0,1,40,104.49C39.74,56.83,78.26,17.14,125.88,16A88,88,0,0,1,216,104Zm-16,0a72,72,0,0,0-73.74-72c-39,.92-70.47,33.39-70.26,72.39a71.65,71.65,0,0,0,27.64,56.3A32,32,0,0,1,96,186v6h64v-6a32.15,32.15,0,0,1,12.47-25.35A71.65,71.65,0,0,0,200,104Zm-16.11-9.34a57.6,57.6,0,0,0-46.56-46.55,8,8,0,0,0-2.66,15.78c16.57,2.79,30.63,16.85,33.44,33.45A8,8,0,0,0,176,104a9,9,0,0,0,1.35-.11A8,8,0,0,0,183.89,94.66Z"/>
              </svg>
              <svg v-else-if="value.icon === 'chart'" xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 256 256" class="text-purple-500">
                <path d="M232,208a8,8,0,0,1-8,8H32a8,8,0,0,1-8-8V48a8,8,0,0,1,16,0V156.69l50.34-50.35a8,8,0,0,1,11.32,0L128,132.69,180.69,80H160a8,8,0,0,1,0-16h40a8,8,0,0,1,8,8v40a8,8,0,0,1-16,0V91.31l-58.34,58.35a8,8,0,0,1-11.32,0L96,123.31,40,179.31V200H224A8,8,0,0,1,232,208Z"/>
              </svg>
              <svg v-else-if="value.icon === 'check'" xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 256 256" class="text-purple-500">
                <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">
              {{ value.title }}
            </h3>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
              {{ value.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Principles Section -->
    <section
      :ref="principlesSection.target"
      class="py-16 md:py-24 px-6 md:px-12"
      :class="principlesSection.isVisible.value ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'"
    >
      <div class="max-w-4xl mx-auto">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
          {{ t('companyPages.about.principles.title') }}
        </h2>
        <div class="space-y-6">
          <div
            v-for="(principle, index) in principles"
            :key="index"
            class="flex gap-6 p-6 bg-white dark:bg-[#1e202d]/90 rounded-xl border border-gray-100 dark:border-brand-medium-dark-primary hover:shadow-lg transition-all"
          >
            <div class="flex-shrink-0">
              <div class="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                <span class="text-purple-500 font-bold text-lg">{{ index + 1 }}</span>
              </div>
            </div>
            <div>
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {{ principle.title }}
              </h3>
              <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                {{ principle.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
