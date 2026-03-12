<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useScrollAnimation } from '@/composables/useScrollAnimation'
import TechBackground from '@/components/TechBackground.vue'

const { t } = useI18n()

// Scroll animations
const heroSection = useScrollAnimation({}, true)
const introSection = useScrollAnimation()
const pillarsSection = useScrollAnimation()
const benefitsSection = useScrollAnimation()
const testimonialsSection = useScrollAnimation()

const pillars = computed(() => [
  {
    icon: 'book',
    title: t('companyPages.culture.pillars.items.learning.title'),
    description: t('companyPages.culture.pillars.items.learning.description')
  },
  {
    icon: 'rocket',
    title: t('companyPages.culture.pillars.items.autonomy.title'),
    description: t('companyPages.culture.pillars.items.autonomy.description')
  },
  {
    icon: 'balance',
    title: t('companyPages.culture.pillars.items.balance.title'),
    description: t('companyPages.culture.pillars.items.balance.description')
  },
  {
    icon: 'users',
    title: t('companyPages.culture.pillars.items.diversity.title'),
    description: t('companyPages.culture.pillars.items.diversity.description')
  },
  {
    icon: 'eye',
    title: t('companyPages.culture.pillars.items.transparency.title'),
    description: t('companyPages.culture.pillars.items.transparency.description')
  },
  {
    icon: 'chart',
    title: t('companyPages.culture.pillars.items.impact.title'),
    description: t('companyPages.culture.pillars.items.impact.description')
  }
])

const benefits = computed(() => [
  {
    icon: 'home',
    title: t('companyPages.culture.benefits.items.remote.title'),
    description: t('companyPages.culture.benefits.items.remote.description')
  },
  {
    icon: 'desktop',
    title: t('companyPages.culture.benefits.items.equipment.title'),
    description: t('companyPages.culture.benefits.items.equipment.description')
  },
  {
    icon: 'health',
    title: t('companyPages.culture.benefits.items.health.title'),
    description: t('companyPages.culture.benefits.items.health.description')
  },
  {
    icon: 'calendar',
    title: t('companyPages.culture.benefits.items.pto.title'),
    description: t('companyPages.culture.benefits.items.pto.description')
  },
  {
    icon: 'book-open',
    title: t('companyPages.culture.benefits.items.education.title'),
    description: t('companyPages.culture.benefits.items.education.description')
  },
  {
    icon: 'money',
    title: t('companyPages.culture.benefits.items.bonus.title'),
    description: t('companyPages.culture.benefits.items.bonus.description')
  }
])

const testimonials = computed(() => {
  const testimonialsArray: any = t('companyPages.culture.workingHere.testimonials', { returnObjects: true })
  return Array.isArray(testimonialsArray) ? testimonialsArray : []
})
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
            {{ t('companyPages.culture.hero.title') }}
          </h1>
          <p class="text-xl md:text-2xl text-gray-600 dark:text-gray-300">
            {{ t('companyPages.culture.hero.subtitle') }}
          </p>
        </div>
      </div>
    </section>

    <!-- Intro Section -->
    <section
      :ref="introSection.target"
      class="py-16 md:py-24 px-6 md:px-12"
      :class="introSection.isVisible.value ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'"
    >
      <div class="max-w-4xl mx-auto">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          {{ t('companyPages.culture.intro.title') }}
        </h2>
        <div class="prose prose-lg dark:prose-invert mx-auto">
          <p class="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
            {{ t('companyPages.culture.intro.content') }}
          </p>
        </div>
      </div>
    </section>

    <!-- Pillars Section -->
    <section
      :ref="pillarsSection.target"
      class="py-16 md:py-24 px-6 md:px-12 bg-gray-50 dark:bg-[#1e202d]/90/30"
      :class="pillarsSection.isVisible.value ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'"
    >
      <div class="max-w-7xl mx-auto">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
          {{ t('companyPages.culture.pillars.title') }}
        </h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="(pillar, index) in pillars"
            :key="index"
            class="bg-white dark:bg-[#1e202d]/90 p-8 rounded-2xl border border-gray-100 dark:border-brand-medium-dark-primary hover:shadow-xl transition-all group"
          >
            <div class="w-14 h-14 rounded-xl bg-purple-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg v-if="pillar.icon === 'book'" xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 256 256" class="text-purple-500">
                <path d="M208,24H72A32,32,0,0,0,40,56V224a8,8,0,0,0,8,8H192a8,8,0,0,0,0-16H56a16,16,0,0,1,16-16H208a8,8,0,0,0,8-8V32A8,8,0,0,0,208,24Zm-8,160H72a31.82,31.82,0,0,0-16,4.29V56A16,16,0,0,1,72,40H200Z"/>
              </svg>
              <svg v-else-if="pillar.icon === 'rocket'" xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 256 256" class="text-purple-500">
                <path d="M152,224a8,8,0,0,1-8,8H112a8,8,0,0,1,0-16h32A8,8,0,0,1,152,224Zm71.85-101.74c-.19-.2-21-24-53.85-24a68,68,0,1,0-84,0c-32.85,0-53.66,23.8-53.85,24a8,8,0,1,0,11.85,10.74c.16-.15,8.57-8.92,20.88-14.54A86.18,86.18,0,0,0,70.53,152H46a8,8,0,0,0-7.88,9.47C40.41,171.89,46.41,184,64,184H192c17.59,0,23.59-12.11,25.88-22.53A8,8,0,0,0,210,152H185.47a86.18,86.18,0,0,0,5.65-33.5c12.31,5.62,20.72,14.39,20.88,14.54a8,8,0,1,0,11.85-10.78ZM128,24a52.05,52.05,0,0,1,51.68,45A85.65,85.65,0,0,0,160,76C160,50.5,146.5,24,128,24Zm0,128A68.07,68.07,0,0,1,60,84c0-33.31,23-60,52-60s52,26.69,52,60A68.07,68.07,0,0,1,128,152Z"/>
              </svg>
              <svg v-else-if="pillar.icon === 'balance'" xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 256 256" class="text-purple-500">
                <path d="M239.43,133l-32-80A8,8,0,0,0,200,48H136V16a8,8,0,0,0-16,0V48H56a8,8,0,0,0-7.43,5l-32,80a8,8,0,0,0,4.27,10.5A97.94,97.94,0,0,0,64,153.54V224a8,8,0,0,0,16,0V153.54a97.94,97.94,0,0,0,43.16-10.08,8,8,0,0,0,4.27-10.5l-32-80H184l32,80a8,8,0,0,0,4.27,10.5A97.94,97.94,0,0,0,240,153.54V224a8,8,0,0,0,16,0V153.54a97.94,97.94,0,0,0,43.16-10.08,8,8,0,0,0,4.27-10.5ZM72,136.87a81.71,81.71,0,0,1-23.79-7L72,79.63Zm112,0V79.63l23.79,50.2A81.71,81.71,0,0,1,184,136.87Z"/>
              </svg>
              <svg v-else-if="pillar.icon === 'users'" xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 256 256" class="text-purple-500">
                <path d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,55.53,105.64,95.83,95.83,0,0,1,47.22,37.71A8,8,0,0,1,250.14,206.7Z"/>
              </svg>
              <svg v-else-if="pillar.icon === 'eye'" xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 256 256" class="text-purple-500">
                <path d="M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z"/>
              </svg>
              <svg v-else-if="pillar.icon === 'chart'" xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 256 256" class="text-purple-500">
                <path d="M232,208a8,8,0,0,1-8,8H32a8,8,0,0,1-8-8V48a8,8,0,0,1,16,0V156.69l50.34-50.35a8,8,0,0,1,11.32,0L128,132.69,180.69,80H160a8,8,0,0,1,0-16h40a8,8,0,0,1,8,8v40a8,8,0,0,1-16,0V91.31l-58.34,58.35a8,8,0,0,1-11.32,0L96,123.31,40,179.31V200H224A8,8,0,0,1,232,208Z"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">
              {{ pillar.title }}
            </h3>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
              {{ pillar.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Benefits Section -->
    <section
      :ref="benefitsSection.target"
      class="py-16 md:py-24 px-6 md:px-12"
      :class="benefitsSection.isVisible.value ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'"
    >
      <div class="max-w-7xl mx-auto">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
          {{ t('companyPages.culture.benefits.title') }}
        </h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="(benefit, index) in benefits"
            :key="index"
            class="bg-white dark:bg-[#1e202d]/90 p-6 rounded-xl border border-gray-100 dark:border-brand-medium-dark-primary hover:shadow-lg transition-all"
          >
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                <svg v-if="benefit.icon === 'home'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256" class="text-purple-500">
                  <path d="M219.31,108.68l-80-80a16,16,0,0,0-22.62,0l-80,80A15.87,15.87,0,0,0,32,120v96a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V152h32v64a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V120A15.87,15.87,0,0,0,219.31,108.68Z"/>
                </svg>
                <svg v-else-if="benefit.icon === 'desktop'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256" class="text-purple-500">
                  <path d="M208,40H48A24,24,0,0,0,24,64V176a24,24,0,0,0,24,24h72v16H96a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16H136V200h72a24,24,0,0,0,24-24V64A24,24,0,0,0,208,40Zm8,136a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V64a8,8,0,0,1,8-8H208a8,8,0,0,1,8,8Z"/>
                </svg>
                <svg v-else-if="benefit.icon === 'health'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256" class="text-purple-500">
                  <path d="M136,128v56a8,8,0,0,1-16,0V128a8,8,0,0,1,16,0Zm71.63-54.42A79.94,79.94,0,0,1,224,76.12l0,.11v98.46l0,.11a80,80,0,0,1-160,0l0-.11V76.23l0-.11a79.94,79.94,0,0,1,16.37-2.54,8,8,0,0,1,1.28,16A63.52,63.52,0,0,0,64,93.54V96h48V72.37A63.87,63.87,0,0,0,91.37,80L88,80a8,8,0,0,1,0-16,79.92,79.92,0,0,1,80,80V174.69a64,64,0,1,0-128,0V144a8,8,0,0,1,16,0v30.69a48,48,0,0,1,96,0V144H128a8,8,0,0,1-8-8V88a8,8,0,0,1,8-8h40v16a8,8,0,0,1-16,0V88H144v40h16a8,8,0,0,1,0,16H144v10.69a64,64,0,0,0,64,0V144a8,8,0,0,1,16,0v30.69a80,80,0,0,1-16.37,50.88Z"/>
                </svg>
                <svg v-else-if="benefit.icon === 'calendar'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256" class="text-purple-500">
                  <path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Z"/>
                </svg>
                <svg v-else-if="benefit.icon === 'book-open'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256" class="text-purple-500">
                  <path d="M232,56V200a8,8,0,0,1-8,8H136a8,8,0,0,1-8-8V56a8,8,0,0,1,8-8h88A8,8,0,0,1,232,56ZM120,48H32a8,8,0,0,0-8,8V200a8,8,0,0,0,8,8h88a8,8,0,0,0,8-8V56A8,8,0,0,0,120,48Z"/>
                </svg>
                <svg v-else-if="benefit.icon === 'money'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256" class="text-purple-500">
                  <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm40-68a28,28,0,0,1-28,28h-8v8a8,8,0,0,1-16,0v-8h-8a28,28,0,0,1-28-28,8,8,0,0,1,16,0,12,12,0,0,0,12,12h32a12,12,0,0,0,0-24H112a28,28,0,0,1,0-56h8V72a8,8,0,0,1,16,0v8h8a28,28,0,0,1,28,28,8,8,0,0,1-16,0,12,12,0,0,0-12-12H112a12,12,0,0,0,0,24h28A28,28,0,0,1,168,148Z"/>
                </svg>
              </div>
              <div>
                <h3 class="font-bold text-gray-900 dark:text-white mb-1">
                  {{ benefit.title }}
                </h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  {{ benefit.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section
      v-if="testimonials.length > 0"
      :ref="testimonialsSection.target"
      class="py-16 md:py-24 px-6 md:px-12 bg-gray-50 dark:bg-[#1e202d]/90/30"
      :class="testimonialsSection.isVisible.value ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'"
    >
      <div class="max-w-7xl mx-auto">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
          {{ t('companyPages.culture.workingHere.title') }}
        </h2>
        <div class="grid md:grid-cols-2 gap-8">
          <div
            v-for="(testimonial, index) in testimonials"
            :key="index"
            class="bg-white dark:bg-[#1e202d]/90 p-8 rounded-2xl border border-gray-100 dark:border-brand-medium-dark-primary"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256" class="text-purple-500/20 mb-4">
              <path d="M100,56H40A16,16,0,0,0,24,72v64a16,16,0,0,0,16,16h60v8a32,32,0,0,1-32,32,8,8,0,0,0,0,16,48.05,48.05,0,0,0,48-48V72A16,16,0,0,0,100,56Zm0,80H40V72h60Zm116-80H156a16,16,0,0,0-16,16v88a48.05,48.05,0,0,0,48,48,8,8,0,0,0,0-16,32,32,0,0,1-32-32v-8h60a16,16,0,0,0,16-16V72A16,16,0,0,0,216,56Zm0,80H156V72h60Z"/>
            </svg>
            <p class="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed italic">
              "{{ testimonial.quote }}"
            </p>
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center font-bold text-purple-500">
                {{ testimonial.author.charAt(0) }}
              </div>
              <div>
                <div class="font-bold text-gray-900 dark:text-white">
                  {{ testimonial.author }}
                </div>
                <div class="text-sm text-gray-600 dark:text-gray-400">
                  {{ testimonial.role }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
