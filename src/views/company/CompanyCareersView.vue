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
const whyJoinSection = useScrollAnimation()
const openingsSection = useScrollAnimation()
const processSection = useScrollAnimation()
const ctaSection = useScrollAnimation()

const whyJoinReasons = computed(() => [
  {
    icon: 'chart-up',
    title: t('companyPages.careers.whyJoin.items.growth.title'),
    description: t('companyPages.careers.whyJoin.items.growth.description')
  },
  {
    icon: 'code',
    title: t('companyPages.careers.whyJoin.items.projects.title'),
    description: t('companyPages.careers.whyJoin.items.projects.description')
  },
  {
    icon: 'users',
    title: t('companyPages.careers.whyJoin.items.team.title'),
    description: t('companyPages.careers.whyJoin.items.team.description')
  },
  {
    icon: 'target',
    title: t('companyPages.careers.whyJoin.items.impact.title'),
    description: t('companyPages.careers.whyJoin.items.impact.description')
  }
])

const processSteps = computed(() => [
  {
    number: t('companyPages.careers.process.steps.application.title'),
    title: t('companyPages.careers.process.steps.application.title'),
    description: t('companyPages.careers.process.steps.application.description')
  },
  {
    number: t('companyPages.careers.process.steps.screening.title'),
    title: t('companyPages.careers.process.steps.screening.title'),
    description: t('companyPages.careers.process.steps.screening.description')
  },
  {
    number: t('companyPages.careers.process.steps.interview.title'),
    title: t('companyPages.careers.process.steps.interview.title'),
    description: t('companyPages.careers.process.steps.interview.description')
  },
  {
    number: t('companyPages.careers.process.steps.technical.title'),
    title: t('companyPages.careers.process.steps.technical.title'),
    description: t('companyPages.careers.process.steps.technical.description')
  },
  {
    number: t('companyPages.careers.process.steps.offer.title'),
    title: t('companyPages.careers.process.steps.offer.title'),
    description: t('companyPages.careers.process.steps.offer.description')
  }
])

const handleApply = () => {
  router.push({ path: '/', hash: '#contact' })
}
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
            {{ t('companyPages.careers.hero.title') }}
          </h1>
          <p class="text-xl md:text-2xl text-gray-600 dark:text-gray-300">
            {{ t('companyPages.careers.hero.subtitle') }}
          </p>
        </div>
      </div>
    </section>

    <!-- Why Join Section -->
    <section
      :ref="whyJoinSection.target"
      class="py-16 md:py-24 px-6 md:px-12"
      :class="whyJoinSection.isVisible.value ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'"
    >
      <div class="max-w-7xl mx-auto">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
          {{ t('companyPages.careers.whyJoin.title') }}
        </h2>
        <div class="grid md:grid-cols-2 gap-8">
          <div
            v-for="(reason, index) in whyJoinReasons"
            :key="index"
            class="flex gap-6 p-6 bg-white dark:bg-[#1e202d]/90 rounded-2xl border border-gray-100 dark:border-brand-medium-dark-primary hover:shadow-xl transition-all"
          >
            <div class="flex-shrink-0">
              <div class="w-14 h-14 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <svg
                  v-if="reason.icon === 'chart-up'"
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                  class="text-purple-500"
                >
                  <path d="M232,208a8,8,0,0,1-8,8H32a8,8,0,0,1-8-8V48a8,8,0,0,1,16,0V156.69l50.34-50.35a8,8,0,0,1,11.32,0L128,132.69,180.69,80H160a8,8,0,0,1,0-16h40a8,8,0,0,1,8,8v40a8,8,0,0,1-16,0V91.31l-58.34,58.35a8,8,0,0,1-11.32,0L96,123.31,40,179.31V200H224A8,8,0,0,1,232,208Z" />
                </svg>
                <svg
                  v-else-if="reason.icon === 'code'"
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                  class="text-purple-500"
                >
                  <path d="M69.12,94.15,28.5,128l40.62,33.85a8,8,0,1,1-10.24,12.29l-48-40a8,8,0,0,1,0-12.29l48-40a8,8,0,0,1,10.24,12.3Zm176,27.7-48-40a8,8,0,1,0-10.24,12.3L227.5,128l-40.62,33.85a8,8,0,1,0,10.24,12.29l48-40a8,8,0,0,0,0-12.29Z" />
                </svg>
                <svg
                  v-else-if="reason.icon === 'users'"
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                  class="text-purple-500"
                >
                  <path d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,55.53,105.64,95.83,95.83,0,0,1,47.22,37.71A8,8,0,0,1,250.14,206.7Z" />
                </svg>
                <svg
                  v-else-if="reason.icon === 'target'"
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                  class="text-purple-500"
                >
                  <path d="M221.87,83.16A104.1,104.1,0,1,1,195.67,49l22.67-22.68a8,8,0,0,1,11.32,11.32L207,60.25a87.71,87.71,0,0,1,19,36.91,8,8,0,0,1-7.87,9.62,8.39,8.39,0,0,1-.88,0,8,8,0,0,1-7.88-7.13A71.63,71.63,0,0,0,196.2,68.08l-22.52,22.52A71.64,71.64,0,0,0,128,72a72,72,0,1,0,72,72,71.64,71.64,0,0,0-18.6-45.68l22.52-22.52a87.84,87.84,0,0,1,17.95,117.48l-35.77-35.77a40,40,0,1,1,11.32-11.32l35.77,35.77A87.76,87.76,0,0,1,221.87,83.16ZM128,152a24,24,0,1,0-24-24A24,24,0,0,0,128,152Z" />
                </svg>
              </div>
            </div>
            <div>
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {{ reason.title }}
              </h3>
              <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                {{ reason.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Open Positions Section -->
    <section
      :ref="openingsSection.target"
      class="py-16 md:py-24 px-6 md:px-12 bg-gray-50 dark:bg-[#1e202d]/90/30"
      :class="openingsSection.isVisible.value ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'"
    >
      <div class="max-w-7xl mx-auto">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
          {{ t('companyPages.careers.openings.title') }}
        </h2>

        <!-- Empty State -->
        <div class="max-w-2xl mx-auto">
          <div class="bg-white dark:bg-[#1e202d]/90 p-12 rounded-2xl border border-gray-100 dark:border-brand-medium-dark-primary text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              fill="currentColor"
              viewBox="0 0 256 256"
              class="mx-auto mb-6 text-gray-400"
            >
              <path d="M216,56H176V48a24,24,0,0,0-24-24H104A24,24,0,0,0,80,48v8H40A16,16,0,0,0,24,72V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V72A16,16,0,0,0,216,56ZM96,48a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm16,72h32a8,8,0,0,1,0,16H112a8,8,0,0,1,0-16Z" />
            </svg>
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {{ t('companyPages.careers.openings.empty.title') }}
            </h3>
            <p class="text-gray-600 dark:text-gray-400 mb-8">
              {{ t('companyPages.careers.openings.empty.description') }}
            </p>
          </div>

          <!-- Spontaneous Application -->
          <div class="mt-8 bg-white dark:bg-[#1e202d]/90 p-8 rounded-2xl border border-purple-200 dark:border-purple-500/20">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">
              {{ t('companyPages.careers.openings.spontaneous.title') }}
            </h3>
            <p class="text-gray-600 dark:text-gray-300 mb-6">
              {{ t('companyPages.careers.openings.spontaneous.description') }}
            </p>
            <button
              class="w-full px-6 py-3 bg-purple-500 dark:bg-purple-400 text-white dark:text-brand-dark rounded-xl font-semibold hover:bg-purple-600 dark:hover:bg-purple-500 transition-all hover:scale-105"
              @click="handleApply"
            >
              {{ t('companyPages.careers.openings.spontaneous.button') }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Selection Process Section -->
    <section
      :ref="processSection.target"
      class="py-16 md:py-24 px-6 md:px-12"
      :class="processSection.isVisible.value ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'"
    >
      <div class="max-w-4xl mx-auto">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
          {{ t('companyPages.careers.process.title') }}
        </h2>
        <div class="relative">
          <!-- Connecting Line -->
          <div class="absolute left-6 top-6 bottom-6 w-0.5 bg-purple-200 dark:bg-purple-500/20 hidden md:block" />

          <!-- Steps -->
          <div class="space-y-8">
            <div
              v-for="(step, index) in processSteps"
              :key="index"
              class="flex gap-6 relative"
            >
              <div class="flex-shrink-0 z-10">
                <div class="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold">
                  {{ index + 1 }}
                </div>
              </div>
              <div class="flex-1 pb-8">
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {{ step.title }}
                </h3>
                <p class="text-gray-600 dark:text-gray-300">
                  {{ step.description }}
                </p>
              </div>
            </div>
          </div>
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
          {{ t('companyPages.careers.cta.title') }}
        </h2>
        <p class="text-xl text-gray-600 dark:text-gray-300 mb-8">
          {{ t('companyPages.careers.cta.description') }}
        </p>
        <button
          class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-purple-500 dark:bg-purple-400 text-white dark:text-brand-dark rounded-xl font-bold text-lg hover:bg-purple-600 dark:hover:bg-purple-500 hover:scale-105 transition-all shadow-lg"
          @click="handleApply"
        >
          {{ t('companyPages.careers.cta.button') }}
        </button>
      </div>
    </section>
  </div>
</template>
