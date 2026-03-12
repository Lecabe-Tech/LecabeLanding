<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useScrollAnimation } from '@/composables/useScrollAnimation'
import { useContactForm } from '@/composables/useContactForm'
import TechBadge from '@/components/TechBadge.vue'
import SubmitButton from '@/components/SubmitButton.vue'
import MetricsSection from '@/components/MetricsSection.vue'
import TestimonialsSection from '@/components/TestimonialsSection.vue'
import FAQSection from '@/components/FAQSection.vue'
import TechBackground from '@/components/TechBackground.vue'
import HeroVisualCard from '@/components/ui/HeroVisualCard.vue'
import ButtonMagnetic from '@/components/ui/ButtonMagnetic.vue'
import GlassCard from '@/components/ui/GlassCard.vue'

const { t } = useI18n()
const { getPrefilled, clearPrefilled } = useContactForm()

// Form data
const formData = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
  language: ''
})

// Form errors
const formErrors = ref({
  name: false,
  email: false,
  subject: false,
  message: false,
  language: false
})

const hasFormErrors = ref(false)

// Scroll animations for sections
// Hero section appears immediately to avoid blank screen on mobile
const heroSection = useScrollAnimation({}, true)
const aboutSection = useScrollAnimation()
const servicesSection = useScrollAnimation()
const technologiesSection = useScrollAnimation()
const timelineSection = useScrollAnimation()
const contactSection = useScrollAnimation()

// Timeline steps individual animations - mobile optimized threshold
const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
const timelineStep1 = useScrollAnimation({ threshold: isMobile ? 0.3 : 0.6 })
const timelineStep2 = useScrollAnimation({ threshold: isMobile ? 0.3 : 0.6 })
const timelineStep3 = useScrollAnimation({ threshold: isMobile ? 0.3 : 0.6 })
const timelineStep4 = useScrollAnimation({ threshold: isMobile ? 0.3 : 0.6 })
const timelineStep5 = useScrollAnimation({ threshold: isMobile ? 0.3 : 0.6 })

/**
 * Scroll to contact section
 */
const scrollToSection = (sectionId: string): void => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

/**
 * Validate form fields
 */
const validateForm = (): void => {
  // Reset errors
  formErrors.value = {
    name: false,
    email: false,
    subject: false,
    message: false,
    language: false
  }
  
  // Validate name
  if (!formData.value.name.trim()) {
    formErrors.value.name = true
  }
  
  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!formData.value.email.trim() || !emailRegex.test(formData.value.email)) {
    formErrors.value.email = true
  }
  
  // Validate subject
  if (!formData.value.subject.trim()) {
    formErrors.value.subject = true
  }
  
  // Validate message (min 20 characters)
  if (!formData.value.message.trim() || formData.value.message.trim().length < 20) {
    formErrors.value.message = true
  }
  
  // Validate language
  if (!formData.value.language) {
    formErrors.value.language = true
  }
  
  // Check if there are any errors
  hasFormErrors.value = Object.values(formErrors.value).some(error => error)
}

/**
 * Handle contact form submission
 */
const handleContactSubmit = (): void => {
  // TODO: Implement actual form submission logic
  console.log('Form submitted!', formData.value)
}

/**
 * Load prefilled form data on mount
 */
onMounted(() => {
  const prefilled = getPrefilled()
  if (prefilled.subject || prefilled.message) {
    formData.value.subject = prefilled.subject
    formData.value.message = prefilled.message
    
    // Scroll to contact section after a brief delay
    setTimeout(() => {
      const contactElement = document.getElementById('contact')
      if (contactElement) {
        contactElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 500)
    
    // Clear prefilled data after use
    clearPrefilled()
  }
})

/**
 * Watch for route hash changes (for navigation from other pages)
 */
watch(() => window.location.hash, () => {
  if (window.location.hash === '#contact') {
    const prefilled = getPrefilled()
    if (prefilled.subject || prefilled.message) {
      formData.value.subject = prefilled.subject
      formData.value.message = prefilled.message
      
      // Clear after use
      clearPrefilled()
    }
  }
})
</script>

<template>
  <div class="flex flex-1 flex-col relative">
    <!-- Animated Tech Background (Circuit Lines) -->
    <TechBackground />
    <!-- Hero Section - Split Layout -->
    <section
      :ref="heroSection.target"
      class="relative py-12 md:py-20 lg:py-28 overflow-hidden min-h-[90vh] flex items-center"
      :class="[
        heroSection.isVisible.value ? 'animate-fade-in' : 'opacity-0'
      ]"
    >
      <!-- Content Grid - Split Layout -->
      <div class="max-w-7xl mx-auto relative z-10 px-6 md:px-12 w-full">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <!-- Left Side - Text Content -->
          <div class="flex flex-col gap-6 text-center lg:text-left order-2 lg:order-1">
            <!-- Logo Badge -->
            <div class="flex justify-center lg:justify-start">
              <div class="inline-flex items-center gap-2 bg-brand-primary/10 dark:bg-brand-light-primary/20 px-4 py-2 rounded-full">
                <img
                  src="/assets/logos/simbolo-gradient.png"
                  alt="Lecabe"
                  class="h-6 w-auto"
                >
                <span class="text-brand-primary dark:text-brand-light-primary text-sm font-semibold">Software House</span>
              </div>
            </div>

            <!-- Headline with Bold Typography and Gradient -->
            <h1 class="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.1] tracking-tight">
              <span class="text-gray-900 dark:text-white">Software </span>
              <span class="text-gradient-animated">Personalizado</span>
              <span class="text-gray-900 dark:text-white"> que </span>
              <span class="text-gradient-animated">Acelera</span>
              <span class="text-gray-900 dark:text-white"> seu Negócio</span>
            </h1>

            <!-- Subtitle -->
            <p class="text-gray-600 dark:text-gray-300 text-lg md:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0">
              {{ t('hero.subtitle') }}
            </p>

            <!-- CTAs with Magnetic Buttons -->
            <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-6">
              <ButtonMagnetic
                variant="primary"
                size="lg"
                @click="scrollToSection('contact')"
              >
                {{ t('hero.cta') }}
              </ButtonMagnetic>
              <ButtonMagnetic
                variant="secondary"
                size="lg"
                @click="scrollToSection('timeline')"
              >
                {{ t('hero.ctaSecondary') }}
              </ButtonMagnetic>
            </div>

            <!-- Trusted By - TEMPORARILY DISABLED -->
            <!--
            <div class="mt-8 pt-8 border-t border-gray-200 dark:border-brand-medium-dark-primary">
              <p class="text-gray-500 dark:text-gray-400 text-sm mb-4">
                {{ t('hero.trustedBy') }}
              </p>
              <div class="flex flex-wrap justify-center lg:justify-start items-center gap-6 opacity-60 hover:opacity-80 transition-opacity">
                <div class="h-7 w-20 bg-gray-300 dark:bg-gray-600 rounded" />
                <div class="h-7 w-16 bg-gray-300 dark:bg-gray-600 rounded" />
                <div class="h-7 w-24 bg-gray-300 dark:bg-gray-600 rounded" />
                <div class="h-7 w-20 bg-gray-300 dark:bg-gray-600 rounded" />
              </div>
            </div>
            -->
          </div>

          <!-- Right Side - Visual Element -->
          <div class="relative order-1 lg:order-2 flex justify-center lg:justify-end">
            <HeroVisualCard />
          </div>
        </div>
      </div>
    </section>

    <!-- Metrics Section -->
    <MetricsSection />

    <!-- Main content container -->
    <div class="layout-content-container flex flex-col flex-1 w-full">
      <!-- About Us Section - Side by Side Layout -->
      <section
        :ref="aboutSection.target"
        class="py-16 md:py-24 px-6 md:px-12"
        :class="[
          aboutSection.isVisible.value ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
        ]"
      >
        <div class="max-w-7xl mx-auto">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <!-- Left Side - Text Content -->
            <div class="order-2 lg:order-1">
              <div class="flex items-center gap-3 mb-6">
                <img
                  src="/assets/logos/simbolo-gradient.png"
                  alt="Lecabe"
                  class="h-10 w-auto"
                >
                <span class="text-brand-primary dark:text-brand-light-primary text-sm font-semibold uppercase tracking-wider">Sobre Nós</span>
              </div>
              <h2 class="text-gray-900 dark:text-white text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-6">
                {{ t('about.title') }}
              </h2>
              <p class="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8">
                {{ t('about.content') }}
              </p>

              <!-- Quick Stats -->
              <div class="flex flex-wrap gap-8">
                <div>
                  <div class="text-3xl font-black text-brand-primary dark:text-brand-light-primary">5+</div>
                  <div class="text-gray-500 dark:text-gray-400 text-sm">Anos de experiência</div>
                </div>
                <div>
                  <div class="text-3xl font-black text-brand-primary dark:text-brand-light-primary">10+</div>
                  <div class="text-gray-500 dark:text-gray-400 text-sm">Projetos entregues</div>
                </div>
                <div>
                  <div class="text-3xl font-black text-brand-primary dark:text-brand-light-primary">100%</div>
                  <div class="text-gray-500 dark:text-gray-400 text-sm">Satisfação</div>
                </div>
              </div>
            </div>

            <!-- Right Side - Bento Grid Differentiators -->
            <div class="order-1 lg:order-2">
              <div class="grid grid-cols-2 gap-4">
                <!-- Card 1 - Large (spans 2 columns) -->
                <div class="col-span-2 bg-gradient-to-br from-brand-primary to-brand-dark-primary dark:from-brand-light-primary dark:to-brand-primary rounded-2xl p-6 text-white group hover:shadow-xl transition-all duration-300">
                  <div class="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,55.53,105.64,95.83,95.83,0,0,1,47.22,37.71A8,8,0,0,1,250.14,206.7Z"/>
                    </svg>
                  </div>
                  <h3 class="text-xl font-bold mb-2">{{ t('about.differentiators.family.title') }}</h3>
                  <p class="text-white/80 text-sm leading-relaxed">{{ t('about.differentiators.family.description') }}</p>
                </div>

                <!-- Card 2 -->
                <div class="bg-white/90 dark:bg-[#1e202d]/90 backdrop-blur-sm rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 group border border-gray-100 dark:border-brand-medium-dark-primary">
                  <div class="w-10 h-10 rounded-lg bg-brand-alternative/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256" class="text-brand-alternative">
                      <path d="M165.78,224H208a16,16,0,0,0,16-16V170.35A8,8,0,0,0,212.94,163a79.87,79.87,0,0,1-16.68-38.86A64,64,0,1,0,74,108.87a80,80,0,0,1-17,39.14A8,8,0,0,0,46,155.65V208a16,16,0,0,0,16,16H90.22a8,8,0,0,0,7.22-4.53l8.56-17.79a8,8,0,0,1,14.44,0l8.56,17.79a8,8,0,0,0,7.22,4.53h21.56a8,8,0,0,0,7.22-4.53l8.56-17.79a8,8,0,0,1,14.44,0l8.56,17.79A8,8,0,0,0,165.78,224ZM80,108a48,48,0,1,1,96,0A48,48,0,0,1,80,108Z"/>
                    </svg>
                  </div>
                  <h3 class="text-gray-900 dark:text-white font-semibold text-base mb-1">{{ t('about.differentiators.custom.title') }}</h3>
                  <p class="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">{{ t('about.differentiators.custom.description') }}</p>
                </div>

                <!-- Card 3 -->
                <div class="bg-white/90 dark:bg-[#1e202d]/90 backdrop-blur-sm rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 group border border-gray-100 dark:border-brand-medium-dark-primary">
                  <div class="w-10 h-10 rounded-lg bg-brand-primary/10 dark:bg-brand-light-primary/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256" class="text-brand-primary dark:text-brand-light-primary">
                      <path d="M168,152a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,152Zm-8-40H96a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16Zm56-64V216a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V48A16,16,0,0,1,56,32H168a8,8,0,0,1,5.66,2.34l40,40A8,8,0,0,1,216,80Zm-56-8V48H56V216H200V88H168A8,8,0,0,1,160,80Z"/>
                    </svg>
                  </div>
                  <h3 class="text-gray-900 dark:text-white font-semibold text-base mb-1">{{ t('about.differentiators.partnership.title') }}</h3>
                  <p class="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">{{ t('about.differentiators.partnership.description') }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Our Services - Bento Grid Layout -->
      <section
        id="services"
        :ref="servicesSection.target"
        class="py-16 md:py-24 px-6 md:px-12"
        :class="[
          servicesSection.isVisible.value ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
        ]"
      >
        <div class="max-w-7xl mx-auto">
          <!-- Section Header - Left Aligned -->
          <div class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
            <div class="max-w-2xl">
              <div class="flex items-center gap-3 mb-4">
                <img
                  src="/assets/logos/simbolo-gradient.png"
                  alt="Lecabe"
                  class="h-10 w-auto"
                >
                <span class="text-brand-primary dark:text-brand-light-primary text-sm font-semibold uppercase tracking-wider">Serviços</span>
              </div>
              <h2 class="text-gray-900 dark:text-white text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-4">
                {{ t('services.subtitle') }}
              </h2>
              <p class="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                {{ t('services.description') }}
              </p>
            </div>
            <button
              class="self-start lg:self-auto flex items-center gap-2 text-brand-primary dark:text-brand-light-primary font-semibold hover:gap-3 transition-all"
              @click="scrollToSection('contact')"
            >
              <span>Falar sobre seu projeto</span>
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>

          <!-- Bento Grid Services -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <!-- Featured Card - Custom Software (2 cols, 2 rows) -->
            <div class="lg:col-span-2 lg:row-span-2 bg-gradient-to-br from-brand-primary to-brand-dark-primary dark:from-brand-light-primary dark:to-brand-primary rounded-3xl p-8 text-white group hover:shadow-2xl hover:shadow-brand-primary/20 transition-all duration-300 relative overflow-hidden min-h-[320px] flex flex-col justify-between">
              <div class="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div>
                <div class="flex items-center justify-between mb-6">
                  <div class="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M69.12,94.15,28.5,128l40.62,33.85a8,8,0,1,1-10.24,12.29l-48-40a8,8,0,0,1,0-12.29l48-40a8,8,0,0,1,10.24,12.3Zm176,27.7-48-40a8,8,0,1,0-10.24,12.3L227.5,128l-40.62,33.85a8,8,0,1,0,10.24,12.29l48-40a8,8,0,0,0,0-12.29ZM162.73,32.48a8,8,0,0,0-10.25,4.79l-64,176a8,8,0,0,0,4.79,10.26A8.14,8.14,0,0,0,96,224a8,8,0,0,0,7.52-5.27l64-176A8,8,0,0,0,162.73,32.48Z"/>
                    </svg>
                  </div>
                  <span class="text-white/60 text-sm font-mono">01</span>
                </div>
                <h3 class="text-2xl lg:text-3xl font-bold mb-3">{{ t('services.items.customSoftware.title') }}</h3>
                <p class="text-white/80 leading-relaxed">{{ t('services.items.customSoftware.description') }}</p>
              </div>
              <div class="flex items-center gap-2 text-white/60 text-sm mt-6">
                <span>Nosso principal serviço</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            <!-- Cloud Solutions -->
            <GlassCard padding="md">
              <div class="flex items-center justify-between mb-4">
                <div class="w-11 h-11 rounded-xl bg-brand-alternative/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 256 256" class="text-brand-alternative">
                    <path d="M160,40A88.09,88.09,0,0,0,81.29,88.67,64,64,0,1,0,72,216h88a88,88,0,0,0,0-176Z"/>
                  </svg>
                </div>
                <span class="text-gray-400 text-sm font-mono">02</span>
              </div>
              <h3 class="text-gray-900 dark:text-white font-bold text-lg mb-2">{{ t('services.items.cloud.title') }}</h3>
              <p class="text-gray-500 dark:text-gray-400 text-sm leading-relaxed line-clamp-2">{{ t('services.items.cloud.description') }}</p>
            </GlassCard>

            <!-- UX Design -->
            <GlassCard padding="md">
              <div class="flex items-center justify-between mb-4">
                <div class="w-11 h-11 rounded-xl bg-brand-primary/10 dark:bg-brand-light-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 256 256" class="text-brand-primary dark:text-brand-light-primary">
                    <path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Zm-42.34-61.66a8,8,0,0,1,0,11.32l-24,24a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L120,164.69V120a8,8,0,0,1,16,0v44.69l10.34-10.35A8,8,0,0,1,157.66,154.34Z"/>
                  </svg>
                </div>
                <span class="text-gray-400 text-sm font-mono">03</span>
              </div>
              <h3 class="text-gray-900 dark:text-white font-bold text-lg mb-2">{{ t('services.items.ux.title') }}</h3>
              <p class="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{{ t('services.items.ux.description') }}</p>
            </GlassCard>

            <!-- Maintenance -->
            <GlassCard padding="md">
              <div class="flex items-center justify-between mb-4">
                <div class="w-11 h-11 rounded-xl bg-orange-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 256 256" class="text-orange-500">
                    <path d="M226.76,69a8,8,0,0,0-12.84-2.88l-40.3,37.19-17.23-3.7-3.7-17.23,37.19-40.3A8,8,0,0,0,187,29.24,72,72,0,0,0,88,96a72.34,72.34,0,0,0,2.09,17.06L33.64,159.48a36,36,0,0,0,50.88,50.88l46.42-56.45A72,72,0,0,0,226.76,69Z"/>
                  </svg>
                </div>
                <span class="text-gray-400 text-sm font-mono">04</span>
              </div>
              <h3 class="text-gray-900 dark:text-white font-bold text-lg mb-2">{{ t('services.items.maintenance.title') }}</h3>
              <p class="text-gray-500 dark:text-gray-400 text-sm leading-relaxed line-clamp-2">{{ t('services.items.maintenance.description') }}</p>
            </GlassCard>

            <!-- AI -->
            <GlassCard padding="md">
              <div class="flex items-center justify-between mb-4">
                <div class="w-11 h-11 rounded-xl bg-purple-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 256 256" class="text-purple-500">
                    <path d="M200,48H136V16a8,8,0,0,0-16,0V48H56A32,32,0,0,0,24,80V192a32,32,0,0,0,32,32H200a32,32,0,0,0,32-32V80A32,32,0,0,0,200,48Zm16,144a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V80A16,16,0,0,1,56,64H200a16,16,0,0,1,16,16Zm-36-56a12,12,0,1,1-12-12A12,12,0,0,1,180,136Zm-72,0a12,12,0,1,1-12-12A12,12,0,0,1,108,136Z"/>
                  </svg>
                </div>
                <span class="text-gray-400 text-sm font-mono">05</span>
              </div>
              <h3 class="text-gray-900 dark:text-white font-bold text-lg mb-2">{{ t('services.items.ai.title') }}</h3>
              <p class="text-gray-500 dark:text-gray-400 text-sm leading-relaxed line-clamp-2">{{ t('services.items.ai.description') }}</p>
            </GlassCard>

            <!-- UI/UX Design - Wide card -->
            <div class="lg:col-span-2 bg-gradient-to-r from-brand-alternative/10 to-brand-primary/10 dark:from-brand-alternative/15 dark:to-brand-primary/15 rounded-2xl p-6 border border-brand-alternative/20 dark:border-brand-alternative/30 hover:shadow-lg transition-all duration-300 group dark:bg-[#1e202d]/85 backdrop-blur-sm">
              <div class="flex items-start gap-4">
                <div class="w-11 h-11 rounded-xl bg-brand-alternative/20 flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 256 256" class="text-brand-alternative">
                    <path d="M227.32,73.37,182.63,28.69a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H216a8,8,0,0,0,0-16H115.32l112-112A16,16,0,0,0,227.32,73.37Z"/>
                  </svg>
                </div>
                <div>
                  <div class="flex items-center gap-3 mb-2">
                    <h3 class="text-gray-900 dark:text-white font-bold text-lg">{{ t('services.items.uiux.title') }}</h3>
                    <span class="text-gray-400 text-sm font-mono">06</span>
                  </div>
                  <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{{ t('services.items.uiux.description') }}</p>
                </div>
              </div>
            </div>

            <!-- QA -->
            <GlassCard padding="md">
              <div class="flex items-center justify-between mb-4">
                <div class="w-11 h-11 rounded-xl bg-green-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 256 256" class="text-green-500">
                    <path d="M152,120H136V56h8a32,32,0,0,1,32,32,8,8,0,0,0,16,0,48.05,48.05,0,0,0-48-48h-8V24a8,8,0,0,0-16,0V40h-8a48,48,0,0,0,0,96h8v64H104a32,32,0,0,1-32-32,8,8,0,0,0-16,0,48.05,48.05,0,0,0,48,48h16v16a8,8,0,0,0,16,0V216h16a48,48,0,0,0,0-96Zm-40,0a32,32,0,0,1,0-64h8v64Zm40,80H136V136h16a32,32,0,0,1,0,64Z"/>
                  </svg>
                </div>
                <span class="text-gray-400 text-sm font-mono">07</span>
              </div>
              <h3 class="text-gray-900 dark:text-white font-bold text-lg mb-2">{{ t('services.items.qa.title') }}</h3>
              <p class="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{{ t('services.items.qa.description') }}</p>
            </GlassCard>

            <!-- Documentation -->
            <GlassCard padding="md">
              <div class="flex items-center justify-between mb-4">
                <div class="w-11 h-11 rounded-xl bg-blue-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 256 256" class="text-blue-500">
                    <path d="M168,152a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,152Zm-8-40H96a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16Zm56-64V216a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V48A16,16,0,0,1,56,32H168a8,8,0,0,1,5.66,2.34l40,40A8,8,0,0,1,216,80Z"/>
                  </svg>
                </div>
                <span class="text-gray-400 text-sm font-mono">08</span>
              </div>
              <h3 class="text-gray-900 dark:text-white font-bold text-lg mb-2">{{ t('services.items.documentation.title') }}</h3>
              <p class="text-gray-500 dark:text-gray-400 text-sm leading-relaxed line-clamp-2">{{ t('services.items.documentation.description') }}</p>
            </GlassCard>
          </div>
        </div>
      </section>

      <!-- Technologies Section - Asymmetric Layout -->
      <section
        :ref="technologiesSection.target"
        class="py-16 md:py-24 px-6 md:px-12"
        :class="[
          technologiesSection.isVisible.value ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
        ]"
      >
        <div class="max-w-7xl mx-auto">
          <!-- Section Header - Side by Side -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center mb-12">
            <div class="lg:col-span-5">
              <div class="flex items-center gap-3 mb-4">
                <img
                  src="/assets/logos/simbolo-gradient.png"
                  alt="Lecabe"
                  class="h-10 w-auto"
                >
                <span class="text-brand-primary dark:text-brand-light-primary text-sm font-semibold uppercase tracking-wider">Stack</span>
              </div>
              <h2 class="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white leading-tight">
                {{ t('technologies.title') }}
              </h2>
            </div>
            <div class="lg:col-span-7">
              <p class="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                Utilizamos as tecnologias mais modernas e consolidadas do mercado para entregar soluções robustas e escaláveis
              </p>
            </div>
          </div>

          <!-- Technology Categories Grid -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <!-- Frontend Card - Large -->
            <div class="lg:col-span-5 bg-gradient-to-br from-brand-primary/5 to-brand-alternative/5 dark:from-brand-primary/10 dark:to-brand-alternative/10 rounded-3xl p-6 md:p-8 border border-brand-primary/10 dark:border-brand-light-primary/20">
              <h3 class="text-gray-900 dark:text-white font-bold text-lg mb-6 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256" class="text-brand-primary dark:text-brand-light-primary">
                  <path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm0,176H48V48H208ZM82.34,141.66a8,8,0,0,1,0-11.32l32-32a8,8,0,0,1,11.32,11.32L100.69,136l24.97,24.97a8,8,0,0,1-11.32,11.32Zm80-43.32a8,8,0,0,1,0,11.32l-32,32a8,8,0,0,1-11.32-11.32L144.69,104,119.72,79.03a8,8,0,0,1,11.32-11.32Z"/>
                </svg>
                Frontend
              </h3>
              <div class="grid grid-cols-3 gap-3">
                <TechBadge name="Vue.js" icon="vue" :animation-delay="technologiesSection.isVisible.value ? '100' : '0'" />
                <TechBadge name="React" icon="react" :animation-delay="technologiesSection.isVisible.value ? '150' : '0'" />
                <TechBadge name="Angular" icon="angular" :animation-delay="technologiesSection.isVisible.value ? '200' : '0'" />
              </div>
            </div>

            <!-- Backend Card -->
            <div class="lg:col-span-4 bg-white/90 dark:bg-[#1e202d]/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 dark:border-brand-medium-dark-primary">
              <h3 class="text-gray-900 dark:text-white font-bold text-lg mb-6 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256" class="text-brand-alternative">
                  <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm40-68a28,28,0,0,1-28,28h-8v8a8,8,0,0,1-16,0v-8H104a8,8,0,0,1,0-16h36a12,12,0,0,0,0-24H116a28,28,0,0,1,0-56h12V72a8,8,0,0,1,16,0v8h12a8,8,0,0,1,0,16H116a12,12,0,0,0,0,24h24A28,28,0,0,1,168,148Z"/>
                </svg>
                Backend
              </h3>
              <div class="grid grid-cols-3 gap-3">
                <TechBadge name="Node.js" icon="node" :animation-delay="technologiesSection.isVisible.value ? '250' : '0'" />
                <TechBadge name="Python" icon="python" :animation-delay="technologiesSection.isVisible.value ? '300' : '0'" />
                <TechBadge name="PHP" icon="php" :animation-delay="technologiesSection.isVisible.value ? '350' : '0'" />
              </div>
            </div>

            <!-- Design Card - Small -->
            <div class="lg:col-span-3 bg-white/90 dark:bg-[#1e202d]/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 dark:border-brand-medium-dark-primary">
              <h3 class="text-gray-900 dark:text-white font-bold text-lg mb-6 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256" class="text-purple-500">
                  <path d="M227.32,73.37,182.63,28.69a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H216a8,8,0,0,0,0-16H115.32l112-112A16,16,0,0,0,227.32,73.37Z"/>
                </svg>
                Design
              </h3>
              <div class="flex justify-center">
                <TechBadge name="Figma" icon="figma" :animation-delay="technologiesSection.isVisible.value ? '400' : '0'" />
              </div>
            </div>

            <!-- Database Card - Wide -->
            <div class="lg:col-span-7 bg-white/90 dark:bg-[#1e202d]/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 dark:border-brand-medium-dark-primary">
              <h3 class="text-gray-900 dark:text-white font-bold text-lg mb-6 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256" class="text-orange-500">
                  <path d="M128,24C74.17,24,32,48.6,32,80v96c0,31.4,42.17,56,96,56s96-24.6,96-56V80C224,48.6,181.83,24,128,24Zm0,16c44.45,0,80,20.3,80,40s-35.55,40-80,40S48,100.3,48,80,83.55,40,128,40ZM48,176V147.08c18.06,16.07,46.29,26.92,80,26.92s61.94-10.85,80-26.92V176c0,19.7-35.55,40-80,40S48,195.7,48,176Zm80-24c-33.71,0-61.94-10.85-80-26.92V96.08c18.06,16.07,46.29,26.92,80,26.92s61.94-10.85,80-26.92V125.08C189.94,141.15,161.71,152,128,152Z"/>
                </svg>
                Bancos de Dados
              </h3>
              <div class="grid grid-cols-4 gap-3">
                <TechBadge name="PostgreSQL" icon="postgresql" :animation-delay="technologiesSection.isVisible.value ? '450' : '0'" />
                <TechBadge name="MySQL" icon="mysql" :animation-delay="technologiesSection.isVisible.value ? '500' : '0'" />
                <TechBadge name="MongoDB" icon="mongodb" :animation-delay="technologiesSection.isVisible.value ? '550' : '0'" />
                <TechBadge name="SQL Server" icon="microsoftsqlserver" :animation-delay="technologiesSection.isVisible.value ? '600' : '0'" />
              </div>
            </div>

            <!-- Cloud Card -->
            <div class="lg:col-span-5 bg-gradient-to-br from-brand-alternative/5 to-brand-primary/5 dark:from-brand-alternative/10 dark:to-brand-primary/10 rounded-2xl p-6 border border-brand-alternative/10 dark:border-brand-alternative/20">
              <h3 class="text-gray-900 dark:text-white font-bold text-lg mb-6 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256" class="text-brand-alternative">
                  <path d="M160,40A88.09,88.09,0,0,0,81.29,88.67,64,64,0,1,0,72,216h88a88,88,0,0,0,0-176Z"/>
                </svg>
                Cloud & DevOps
              </h3>
              <div class="grid grid-cols-2 gap-3">
                <TechBadge name="AWS" icon="aws" :animation-delay="technologiesSection.isVisible.value ? '650' : '0'" />
                <TechBadge name="Azure" icon="azure" :animation-delay="technologiesSection.isVisible.value ? '700' : '0'" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Timeline Section - Modern Zig-Zag Layout -->
      <section
        id="timeline"
        :ref="timelineSection.target"
        class="py-16 md:py-24 px-6 md:px-12"
        :class="[
          timelineSection.isVisible.value ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
        ]"
      >
        <div class="max-w-6xl mx-auto">
          <!-- Section Header - Centered -->
          <div class="text-center mb-16 md:mb-20">
            <div class="flex items-center justify-center gap-3 mb-4">
              <img
                src="/assets/logos/simbolo-gradient.png"
                alt="Lecabe"
                class="h-10 w-auto"
              >
              <span class="text-brand-primary dark:text-brand-light-primary text-sm font-semibold uppercase tracking-wider">Processo</span>
            </div>
            <h2 class="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white leading-tight mb-4">
              {{ t('timeline.title') }}
            </h2>
            <p class="text-gray-600 dark:text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto">
              Nossa metodologia ágil garante transparência e qualidade em cada etapa do desenvolvimento
            </p>
          </div>

          <!-- Timeline - Zig-Zag Layout with Central Line -->
          <div class="relative">
            <!-- Central Line (Desktop only) -->
            <div class="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-primary/20 via-brand-primary/40 to-brand-primary/20 dark:from-brand-light-primary/20 dark:via-brand-light-primary/40 dark:to-brand-light-primary/20 -translate-x-1/2" />

            <!-- Vertical Line (Mobile/Tablet) -->
            <div class="lg:hidden absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-primary/20 via-brand-primary/40 to-brand-primary/20 dark:from-brand-light-primary/20 dark:via-brand-light-primary/40 dark:to-brand-light-primary/20" />

            <!-- Timeline Steps -->
            <div class="space-y-12 lg:space-y-16">
              <!-- Step 1: Discovery -->
              <div
                :ref="timelineStep1.target"
                class="relative flex flex-col lg:flex-row lg:items-center gap-8"
                :class="[
                  timelineStep1.isVisible.value ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
                ]"
              >
                <!-- Number Badge -->
                <div class="absolute left-0 lg:left-1/2 lg:-translate-x-1/2 flex items-center justify-center">
                  <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-primary to-brand-dark-primary dark:from-brand-light-primary dark:to-brand-primary shadow-lg shadow-brand-primary/30 dark:shadow-brand-light-primary/30 flex items-center justify-center backdrop-blur-sm">
                    <span class="text-white text-xl font-black">1</span>
                  </div>
                </div>

                <!-- Content Card (Left on desktop) -->
                <div class="lg:w-1/2 lg:pr-12 ml-24 lg:ml-0 lg:text-right">
                  <div class="group cursor-default">
                    <div class="bg-white/90 dark:bg-[#1e202d]/90 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-brand-primary/20 shadow-sm hover:shadow-xl hover:border-brand-primary/30 dark:hover:border-brand-light-primary/30 transition-all duration-500">
                      <div class="flex items-start gap-4 lg:flex-row-reverse lg:justify-end">
                        <div class="flex-shrink-0 w-14 h-14 rounded-xl bg-brand-primary/10 dark:bg-brand-light-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 256 256" class="text-brand-primary dark:text-brand-light-primary">
                            <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
                          </svg>
                        </div>
                        <div class="flex-1">
                          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">{{ t('timeline.steps.discovery.title') }}</h3>
                          <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-3">{{ t('timeline.steps.discovery.description') }}</p>
                          <div class="inline-flex items-center gap-2 text-brand-primary dark:text-brand-light-primary text-sm font-medium">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
                              <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"/>
                            </svg>
                            <span>1-2 semanas</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Empty space on right (Desktop) -->
                <div class="hidden lg:block lg:w-1/2" />
              </div>

              <!-- Step 2: Requirements -->
              <div
                :ref="timelineStep2.target"
                class="relative flex flex-col lg:flex-row lg:items-center gap-8"
                :class="[
                  timelineStep2.isVisible.value ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
                ]"
                style="animation-delay: 100ms"
              >
                <!-- Number Badge -->
                <div class="absolute left-0 lg:left-1/2 lg:-translate-x-1/2 flex items-center justify-center">
                  <div class="w-16 h-16 rounded-2xl bg-white dark:bg-[#1e202d] border-4 border-brand-alternative shadow-lg shadow-brand-alternative/20 flex items-center justify-center backdrop-blur-sm">
                    <span class="text-brand-alternative text-xl font-black">2</span>
                  </div>
                </div>

                <!-- Empty space on left (Desktop) -->
                <div class="hidden lg:block lg:w-1/2" />

                <!-- Content Card (Right on desktop) -->
                <div class="lg:w-1/2 lg:pl-12 ml-24 lg:ml-0">
                  <div class="group cursor-default">
                    <div class="bg-white/90 dark:bg-[#1e202d]/90 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-brand-primary/20 shadow-sm hover:shadow-xl hover:border-brand-alternative/30 transition-all duration-500">
                      <div class="flex items-start gap-4">
                        <div class="flex-shrink-0 w-14 h-14 rounded-xl bg-brand-alternative/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 256 256" class="text-brand-alternative">
                            <path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM40,56H216v48H40ZM40,200V120H216v80Z" />
                          </svg>
                        </div>
                        <div class="flex-1">
                          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">{{ t('timeline.steps.requirements.title') }}</h3>
                          <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{{ t('timeline.steps.requirements.description') }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Step 3: Design -->
              <div
                :ref="timelineStep3.target"
                class="relative flex flex-col lg:flex-row lg:items-center gap-8"
                :class="[
                  timelineStep3.isVisible.value ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
                ]"
                style="animation-delay: 200ms"
              >
                <!-- Number Badge -->
                <div class="absolute left-0 lg:left-1/2 lg:-translate-x-1/2 flex items-center justify-center">
                  <div class="w-16 h-16 rounded-2xl bg-white dark:bg-[#1e202d] border-4 border-purple-500 shadow-lg shadow-purple-500/20 flex items-center justify-center backdrop-blur-sm">
                    <span class="text-purple-500 text-xl font-black">3</span>
                  </div>
                </div>

                <!-- Content Card (Left on desktop) -->
                <div class="lg:w-1/2 lg:pr-12 ml-24 lg:ml-0 lg:text-right">
                  <div class="group cursor-default">
                    <div class="bg-white/90 dark:bg-[#1e202d]/90 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-brand-primary/20 shadow-sm hover:shadow-xl hover:border-purple-500/30 transition-all duration-500">
                      <div class="flex items-start gap-4 lg:flex-row-reverse lg:justify-end">
                        <div class="flex-shrink-0 w-14 h-14 rounded-xl bg-purple-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 256 256" class="text-purple-500">
                            <path d="M227.32,73.37,182.63,28.69a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H216a8,8,0,0,0,0-16H115.32l112-112A16,16,0,0,0,227.32,73.37Z" />
                          </svg>
                        </div>
                        <div class="flex-1">
                          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">{{ t('timeline.steps.design.title') }}</h3>
                          <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{{ t('timeline.steps.design.description') }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Empty space on right (Desktop) -->
                <div class="hidden lg:block lg:w-1/2" />
              </div>

              <!-- Step 4: Development -->
              <div
                :ref="timelineStep4.target"
                class="relative flex flex-col lg:flex-row lg:items-center gap-8"
                :class="[
                  timelineStep4.isVisible.value ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
                ]"
                style="animation-delay: 300ms"
              >
                <!-- Number Badge -->
                <div class="absolute left-0 lg:left-1/2 lg:-translate-x-1/2 flex items-center justify-center">
                  <div class="w-16 h-16 rounded-2xl bg-white dark:bg-[#1e202d] border-4 border-blue-500 shadow-lg shadow-blue-500/20 flex items-center justify-center backdrop-blur-sm">
                    <span class="text-blue-500 text-xl font-black">4</span>
                  </div>
                </div>

                <!-- Empty space on left (Desktop) -->
                <div class="hidden lg:block lg:w-1/2" />

                <!-- Content Card (Right on desktop) -->
                <div class="lg:w-1/2 lg:pl-12 ml-24 lg:ml-0">
                  <div class="group cursor-default">
                    <div class="bg-white/90 dark:bg-[#1e202d]/90 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-brand-primary/20 shadow-sm hover:shadow-xl hover:border-blue-500/30 transition-all duration-500">
                      <div class="flex items-start gap-4">
                        <div class="flex-shrink-0 w-14 h-14 rounded-xl bg-blue-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 256 256" class="text-blue-500">
                            <path d="M69.12,94.15,28.5,128l40.62,33.85a8,8,0,1,1-10.24,12.29l-48-40a8,8,0,0,1,0-12.29l48-40a8,8,0,0,1,10.24,12.3Zm176,27.7-48-40a8,8,0,1,0-10.24,12.3L227.5,128l-40.62,33.85a8,8,0,1,0,10.24,12.29l48-40a8,8,0,0,0,0-12.29ZM162.73,32.48a8,8,0,0,0-10.25,4.79l-64,176a8,8,0,0,0,4.79,10.26A8.14,8.14,0,0,0,96,224a8,8,0,0,0,7.52-5.27l64-176A8,8,0,0,0,162.73,32.48Z" />
                          </svg>
                        </div>
                        <div class="flex-1">
                          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">{{ t('timeline.steps.development.title') }}</h3>
                          <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-3">{{ t('timeline.steps.development.description') }}</p>
                          <!-- Tech Stack Preview -->
                          <div class="flex flex-wrap gap-2">
                            <span class="px-3 py-1.5 bg-gray-100 dark:bg-brand-dark rounded-lg text-xs font-semibold text-gray-700 dark:text-gray-300">Vue.js</span>
                            <span class="px-3 py-1.5 bg-gray-100 dark:bg-brand-dark rounded-lg text-xs font-semibold text-gray-700 dark:text-gray-300">Node.js</span>
                            <span class="px-3 py-1.5 bg-gray-100 dark:bg-brand-dark rounded-lg text-xs font-semibold text-gray-700 dark:text-gray-300">PostgreSQL</span>
                            <span class="px-3 py-1.5 bg-gray-100 dark:bg-brand-dark rounded-lg text-xs font-semibold text-gray-700 dark:text-gray-300">+mais</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Step 5: Deployment -->
              <div
                :ref="timelineStep5.target"
                class="relative flex flex-col lg:flex-row lg:items-center gap-8"
                :class="[
                  timelineStep5.isVisible.value ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
                ]"
                style="animation-delay: 400ms"
              >
                <!-- Number Badge -->
                <div class="absolute left-0 lg:left-1/2 lg:-translate-x-1/2 flex items-center justify-center">
                  <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg shadow-green-500/30 flex items-center justify-center backdrop-blur-sm">
                    <span class="text-white text-xl font-black">5</span>
                  </div>
                </div>

                <!-- Content Card (Left on desktop) -->
                <div class="lg:w-1/2 lg:pr-12 ml-24 lg:ml-0 lg:text-right">
                  <div class="group cursor-default">
                    <div class="bg-white/90 dark:bg-[#1e202d]/90 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-brand-primary/20 shadow-sm hover:shadow-xl hover:border-green-500/30 transition-all duration-500">
                      <div class="flex items-start gap-4 lg:flex-row-reverse lg:justify-end">
                        <div class="flex-shrink-0 w-14 h-14 rounded-xl bg-green-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 256 256" class="text-green-500">
                            <path d="M103.77,185.94C103.38,187.49,93.63,224,40,224a8,8,0,0,1-8-8c0-53.63,36.51-63.38,38.06-63.77a8,8,0,0,1,3.88,15.53c-.9.25-22.42,6.54-25.56,39.86C81.7,204.48,88,183,88.26,182a8,8,0,0,1,15.51,4Zm93-67.4L192,123.31v58.33A15.91,15.91,0,0,1,187.32,193L153,227.3A15.91,15.91,0,0,1,141.7,232a16.11,16.11,0,0,1-5.1-.83,15.94,15.94,0,0,1-10.78-12.92l-5.37-38.49L76.24,135.55l-38.47-5.37A16,16,0,0,1,28.7,103L63,68.68A15.91,15.91,0,0,1,74.36,64h58.33l4.77-4.77c26.68-26.67,58.83-27.82,71.41-27.07a16,16,0,0,1,15,15C224.6,59.71,223.45,91.86,196.78,118.54Z" />
                          </svg>
                        </div>
                        <div class="flex-1">
                          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">{{ t('timeline.steps.deployment.title') }}</h3>
                          <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{{ t('timeline.steps.deployment.description') }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Empty space on right (Desktop) -->
                <div class="hidden lg:block lg:w-1/2" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Testimonials Section -->
    <TestimonialsSection />

    <!-- FAQ Section -->
    <FAQSection />

    <!-- Contact and remaining sections container -->
    <div class="layout-content-container flex flex-col flex-1 w-full">
      <!-- Contact Section - Modern Side-by-Side Layout -->
      <section
        id="contact"
        :ref="contactSection.target"
        class="py-16 md:py-24 px-6 md:px-12"
        :class="[
          contactSection.isVisible.value ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
        ]"
      >
        <div class="max-w-7xl mx-auto">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            <!-- Left Side - Info Cards -->
            <div class="lg:col-span-5 flex flex-col gap-6">
              <!-- Header -->
              <div>
                <div class="flex items-center gap-3 mb-4">
                  <img
                    src="/assets/logos/simbolo-gradient.png"
                    alt="Lecabe"
                    class="h-10 w-auto"
                  >
                  <span class="text-brand-primary dark:text-brand-light-primary text-sm font-semibold uppercase tracking-wider">Contato</span>
                </div>
                <h2 class="text-gray-900 dark:text-white text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-4">
                  {{ t('contact.title') }}
                </h2>
                <p class="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                  {{ t('contact.description') }}
                </p>
              </div>

              <!-- Contact Info Cards -->
              <div class="flex flex-col gap-4 mt-4">
                <!-- Email Card -->
                <div class="flex items-center gap-4 p-4 bg-white/90 dark:bg-[#1e202d]/90 backdrop-blur-sm rounded-2xl border border-gray-100 dark:border-brand-medium-dark-primary hover:border-brand-primary/20 dark:hover:border-brand-light-primary/20 transition-all duration-300 group">
                  <div class="w-12 h-12 rounded-xl bg-brand-primary/10 dark:bg-brand-light-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256" class="text-brand-primary dark:text-brand-light-primary">
                      <path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48Zm-96,85.15L52.57,64H203.43ZM98.71,128,40,181.81V74.19Zm11.84,10.85,12,11.05a8,8,0,0,0,10.82,0l12-11.05,58,53.15H52.57ZM157.29,128,216,74.18V181.82Z"/>
                    </svg>
                  </div>
                  <div>
                    <p class="text-gray-500 dark:text-gray-400 text-sm">E-mail</p>
                    <p class="text-gray-900 dark:text-white font-semibold">contato@lecabe.com</p>
                  </div>
                </div>

                <!-- Phone Card -->
                <div class="flex items-center gap-4 p-4 bg-white/90 dark:bg-[#1e202d]/90 backdrop-blur-sm rounded-2xl border border-gray-100 dark:border-brand-medium-dark-primary hover:border-brand-primary/20 dark:hover:border-brand-light-primary/20 transition-all duration-300 group">
                  <div class="w-12 h-12 rounded-xl bg-brand-alternative/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256" class="text-brand-alternative">
                      <path d="M222.37,158.46l-47.11-21.11-.13-.06a16,16,0,0,0-15.17,1.4,8.12,8.12,0,0,0-.75.56L134.87,160c-15.42-7.49-31.34-23.29-38.83-38.51l20.78-24.71c.2-.25.39-.5.57-.77a16,16,0,0,0,1.32-15.06l0-.12L97.54,33.64a16,16,0,0,0-16.62-9.52A56.26,56.26,0,0,0,32,80c0,79.4,64.6,144,144,144a56.26,56.26,0,0,0,55.88-48.92A16,16,0,0,0,222.37,158.46Z"/>
                    </svg>
                  </div>
                  <div>
                    <p class="text-gray-500 dark:text-gray-400 text-sm">Telefone</p>
                    <p class="text-gray-900 dark:text-white font-semibold">+55 (11) 9999-9999</p>
                  </div>
                </div>

                <!-- Location Card -->
                <div class="flex items-center gap-4 p-4 bg-white/90 dark:bg-[#1e202d]/90 backdrop-blur-sm rounded-2xl border border-gray-100 dark:border-brand-medium-dark-primary hover:border-brand-primary/20 dark:hover:border-brand-light-primary/20 transition-all duration-300 group">
                  <div class="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256" class="text-purple-500">
                      <path d="M128,16a88.1,88.1,0,0,0-88,88c0,75.3,80,132.17,83.41,134.55a8,8,0,0,0,9.18,0C136,236.17,216,179.3,216,104A88.1,88.1,0,0,0,128,16Zm0,56a32,32,0,1,1-32,32A32,32,0,0,1,128,72Z"/>
                    </svg>
                  </div>
                  <div>
                    <p class="text-gray-500 dark:text-gray-400 text-sm">Localização</p>
                    <p class="text-gray-900 dark:text-white font-semibold">São Paulo, Brasil</p>
                  </div>
                </div>
              </div>

              <!-- Trust Badge -->
              <div class="mt-4 p-4 bg-gradient-to-r from-brand-alternative/10 to-brand-primary/10 dark:from-brand-alternative/20 dark:to-brand-primary/20 rounded-2xl border border-brand-alternative/20">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-brand-alternative/20 flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256" class="text-brand-alternative">
                      <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,85.66-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z"/>
                    </svg>
                  </div>
                  <div>
                    <p class="text-gray-900 dark:text-white font-semibold text-sm">Resposta garantida</p>
                    <p class="text-gray-500 dark:text-gray-400 text-xs">Retornamos em até 24 horas úteis</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right Side - Form -->
            <div class="lg:col-span-7">
              <div class="bg-white/90 dark:bg-brand-medium-dark-primary rounded-3xl p-6 md:p-8 border border-gray-100 dark:border-brand-medium-dark-primary shadow-xl shadow-gray-200/50 dark:shadow-none backdrop-blur-sm">
                <form
                  class="space-y-5"
                  @submit.prevent="handleContactSubmit"
                  aria-label="Formulário de contato"
                >
                  <!-- Name Field -->
                  <div class="relative">
                    <label class="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                      {{ t('contact.form.name') }}
                    </label>
                    <div class="relative">
                      <div class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
                          <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"/>
                        </svg>
                      </div>
                      <input
                        v-model="formData.name"
                        :placeholder="t('contact.form.name')"
                        type="text"
                        name="name"
                        autocomplete="name"
                        required
                        class="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-brand-dark rounded-xl text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 transition-all duration-200"
                        :class="[
                          formErrors.name ? 'ring-2 ring-red-500' : 'focus:ring-brand-primary dark:focus:ring-brand-light-primary'
                        ]"
                      >
                    </div>
                    <span v-if="formErrors.name" class="text-red-500 text-xs mt-1 block">Nome é obrigatório</span>
                  </div>

                  <!-- Email Field -->
                  <div class="relative">
                    <label class="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                      {{ t('contact.form.email') }}
                    </label>
                    <div class="relative">
                      <div class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
                          <path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48ZM203.43,64,128,133.15,52.57,64ZM216,192H40V74.19l82.59,75.71a8,8,0,0,0,10.82,0L216,74.19V192Z"/>
                        </svg>
                      </div>
                      <input
                        v-model="formData.email"
                        :placeholder="t('contact.form.email')"
                        type="email"
                        name="email"
                        autocomplete="email"
                        required
                        class="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-brand-dark rounded-xl text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 transition-all duration-200"
                        :class="[
                          formErrors.email ? 'ring-2 ring-red-500' : 'focus:ring-brand-primary dark:focus:ring-brand-light-primary'
                        ]"
                      >
                    </div>
                    <span v-if="formErrors.email" class="text-red-500 text-xs mt-1 block">E-mail inválido</span>
                  </div>

                  <!-- Subject and Language Row -->
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <!-- Subject -->
                    <div class="relative">
                      <label class="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                        {{ t('contact.form.subject') }}
                      </label>
                      <div class="relative">
                        <div class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
                            <path d="M168,152a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,152Zm-8-40H96a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16Zm56-64V216a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V48A16,16,0,0,1,56,32H168a8,8,0,0,1,5.66,2.34l40,40A8,8,0,0,1,216,80Zm-56-8V48H56V216H200V88H168A8,8,0,0,1,160,80Z"/>
                          </svg>
                        </div>
                        <input
                          v-model="formData.subject"
                          :placeholder="t('contact.form.subject')"
                          class="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-brand-dark rounded-xl text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 transition-all duration-200"
                          :class="[
                            formErrors.subject ? 'ring-2 ring-red-500' : 'focus:ring-brand-primary dark:focus:ring-brand-light-primary'
                          ]"
                        >
                      </div>
                      <span v-if="formErrors.subject" class="text-red-500 text-xs mt-1 block">Assunto é obrigatório</span>
                    </div>

                    <!-- Language -->
                    <div class="relative">
                      <label class="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                        {{ t('contact.form.language') }}
                      </label>
                      <div class="relative">
                        <div class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
                            <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24ZM101.63,168h52.74C149,186.34,140,202.87,128,215.89,116,202.87,107,186.34,101.63,168ZM98,152a145.72,145.72,0,0,1,0-48h60a145.72,145.72,0,0,1,0,48ZM40,128a87.61,87.61,0,0,1,3.33-24H81.79a161.79,161.79,0,0,0,0,48H43.33A87.61,87.61,0,0,1,40,128ZM154.37,88H101.63C107,69.66,116,53.13,128,40.11,140,53.13,149,69.66,154.37,88Zm19.84,16h38.46a88.15,88.15,0,0,1,0,48H174.21a161.79,161.79,0,0,0,0-48Zm32.16-16H170.94a142.39,142.39,0,0,0-20.26-45A88.37,88.37,0,0,1,206.37,88ZM105.32,43A142.39,142.39,0,0,0,85.06,88H49.63A88.37,88.37,0,0,1,105.32,43ZM49.63,168H85.06a142.39,142.39,0,0,0,20.26,45A88.37,88.37,0,0,1,49.63,168Zm101.05,45a142.39,142.39,0,0,0,20.26-45h35.43A88.37,88.37,0,0,1,150.68,213Z"/>
                          </svg>
                        </div>
                        <select
                          v-model="formData.language"
                          class="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-brand-dark rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 transition-all duration-200 appearance-none cursor-pointer"
                          :class="[
                            formErrors.language ? 'ring-2 ring-red-500' : 'focus:ring-brand-primary dark:focus:ring-brand-light-primary'
                          ]"
                        >
                          <option value="">{{ t('contact.form.language') }}</option>
                          <option value="pt">{{ t('contact.form.languages.pt') }}</option>
                          <option value="en">{{ t('contact.form.languages.en') }}</option>
                        </select>
                        <div class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
                            <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"/>
                          </svg>
                        </div>
                      </div>
                      <span v-if="formErrors.language" class="text-red-500 text-xs mt-1 block">Idioma é obrigatório</span>
                    </div>
                  </div>

                  <!-- Message -->
                  <div class="relative">
                    <label class="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                      {{ t('contact.form.message') }}
                    </label>
                    <div class="relative">
                      <div class="absolute left-4 top-4 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
                          <path d="M216,48H40A16,16,0,0,0,24,64V224a15.84,15.84,0,0,0,9.25,14.5A16.05,16.05,0,0,0,40,240a15.89,15.89,0,0,0,10.25-3.78.69.69,0,0,0,.13-.11L82.5,208H216a16,16,0,0,0,16-16V64A16,16,0,0,0,216,48ZM40,224h0ZM216,192H82.5a16,16,0,0,0-10.3,3.75l-.12.11L40,224V64H216Z"/>
                        </svg>
                      </div>
                      <textarea
                        v-model="formData.message"
                        :placeholder="t('contact.form.message')"
                        rows="5"
                        class="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-brand-dark rounded-xl text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 transition-all duration-200 resize-none"
                        :class="[
                          formErrors.message ? 'ring-2 ring-red-500' : 'focus:ring-brand-primary dark:focus:ring-brand-light-primary'
                        ]"
                      />
                    </div>
                    <div class="flex justify-between items-center mt-1">
                      <span v-if="formErrors.message" class="text-red-500 text-xs">Mínimo 20 caracteres</span>
                      <span class="text-gray-400 text-xs ml-auto">{{ formData.message.length }}/20</span>
                    </div>
                  </div>

                  <!-- Submit Button -->
                  <div class="pt-2">
                    <SubmitButton
                      :label="t('contact.form.submit')"
                      :has-errors="hasFormErrors"
                      @validate="validateForm"
                      @submit="handleContactSubmit"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
/* Component-specific styles */
</style>
