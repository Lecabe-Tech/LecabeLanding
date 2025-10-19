<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useScrollAnimation } from '@/composables/useScrollAnimation'
import { useContactForm } from '@/composables/useContactForm'
import ServiceCard from '@/components/ServiceCard.vue'
import TechBadge from '@/components/TechBadge.vue'
import SubmitButton from '@/components/SubmitButton.vue'

const { t } = useI18n()
const router = useRouter()
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
const heroSection = useScrollAnimation()
const aboutSection = useScrollAnimation()
const servicesSection = useScrollAnimation()
const technologiesSection = useScrollAnimation()
const timelineSection = useScrollAnimation()
const marketplaceSection = useScrollAnimation()
const contactSection = useScrollAnimation()

// Timeline steps individual animations with high threshold
const timelineStep1 = useScrollAnimation({ threshold: 0.7 })
const timelineStep2 = useScrollAnimation({ threshold: 0.7 })
const timelineStep3 = useScrollAnimation({ threshold: 0.7 })
const timelineStep4 = useScrollAnimation({ threshold: 0.7 })
const timelineStep5 = useScrollAnimation({ threshold: 0.7 })

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
 * Navigate to marketplace page
 */
const goToMarketplace = (): void => {
  router.push('/marketplace')
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
  
  // Validate message (min 50 characters)
  if (!formData.value.message.trim() || formData.value.message.trim().length < 50) {
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
  <div class="flex flex-1 flex-col">
    <!-- Hero Section - Perssua Style with Full-Width Watermark -->
    <section 
      :ref="heroSection.target"
      class="relative py-16 md:py-24 overflow-hidden"
      :class="[
        heroSection.isVisible.value ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
      ]"
    >
      <!-- Background watermark image - Full width -->
      <div 
        class="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5 dark:opacity-10"
        style="background-image: url('https://plus.unsplash.com/premium_photo-1683121710572-7723bd2e235d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2064')"
        aria-hidden="true"
      ></div>
      
      <!-- Content - Centered Container -->
      <div class="max-w-5xl mx-auto relative z-10 px-6 md:px-12">
        <div class="flex flex-col gap-6 text-center">
          <!-- Title with Logo -->
          <div class="flex flex-col items-center gap-4">
            <img 
              src="/assets/logos/simbolo-gradient.png" 
              alt="Lecabe"
              class="h-16 md:h-20 w-auto animate-float"
            />
            <h1 class="text-gray-900 dark:text-white text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
              {{ t('hero.title') }}
            </h1>
          </div>
          <p class="section-description text-lg md:text-xl max-w-3xl mx-auto">
            {{ t('hero.subtitle') }}
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mt-4">
            <button
              @click="scrollToSection('contact')"
              class="flex min-w-[200px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg h-12 md:h-14 px-8 bg-brand-primary dark:bg-brand-light-primary text-white text-base font-bold leading-normal hover:bg-brand-dark-primary dark:hover:bg-brand-medium-primary hover:scale-105 transition-all duration-300 shadow-lg"
            >
              <span class="truncate">{{ t('hero.cta') }}</span>
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Main content container -->
    <div class="layout-content-container flex flex-col flex-1 w-full">

      <!-- About Us Section -->
      <section 
        :ref="aboutSection.target"
        class="py-16 md:py-24 px-6 md:px-12"
        :class="[
          aboutSection.isVisible.value ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
        ]"
      >
        <div class="max-w-4xl mx-auto text-center">
          <div class="flex items-center justify-center gap-3 mb-6">
            <img 
              src="/assets/logos/simbolo-gradient.png" 
              alt="Lecabe"
              class="h-10 w-auto"
            />
            <h2 class="section-title">
              {{ t('about.title') }}
            </h2>
          </div>
          <p class="section-description">
            {{ t('about.content') }}
          </p>
        </div>
      </section>

      <!-- Our Services - Unified Section -->
      <section 
        id="services"
        :ref="servicesSection.target"
        class="py-16 md:py-24 px-6 md:px-12"
        :class="[
          servicesSection.isVisible.value ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
        ]"
      >
        <div class="max-w-7xl mx-auto">
          <!-- Section Header -->
          <div class="text-center mb-16">
            <div class="flex items-center justify-center gap-3 mb-4">
              <img 
                src="/assets/logos/simbolo-gradient.png" 
                alt="Lecabe"
                class="h-10 w-auto"
              />
              <h2 class="section-title">
                {{ t('services.subtitle') }}
              </h2>
            </div>
            <p class="section-description max-w-3xl mx-auto">
              {{ t('services.description') }}
            </p>
          </div>

          <!-- Service Cards Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <!-- Custom Software Development -->
            <ServiceCard
              number="01"
              icon="gear"
              :title="t('services.items.customSoftware.title')"
              :description="t('services.items.customSoftware.description')"
              :animation-delay="servicesSection.isVisible.value ? '600' : '0'"
              width="full"
            />

            <!-- Cloud Solutions -->
            <ServiceCard
              number="02"
              icon="chart"
              :title="t('services.items.cloud.title')"
              :description="t('services.items.cloud.description')"
              :animation-delay="servicesSection.isVisible.value ? '750' : '0'"
              width="full"
            />

            <!-- User Experience Design -->
            <ServiceCard
              number="03"
              icon="users"
              :title="t('services.items.ux.title')"
              :description="t('services.items.ux.description')"
              :animation-delay="servicesSection.isVisible.value ? '900' : '0'"
              width="full"
            />

            <!-- Software Development -->
            <ServiceCard
              number="04"
              icon="code"
              :title="t('services.items.development.title')"
              :description="t('services.items.development.description')"
              :animation-delay="servicesSection.isVisible.value ? '1050' : '0'"
              width="full"
            />

            <!-- Artificial Intelligence -->
            <ServiceCard
              number="05"
              icon="brain"
              :title="t('services.items.ai.title')"
              :description="t('services.items.ai.description')"
              :animation-delay="servicesSection.isVisible.value ? '1200' : '0'"
              width="full"
            />

            <!-- UI/UX Design -->
            <ServiceCard
              number="06"
              icon="design"
              :title="t('services.items.uiux.title')"
              :description="t('services.items.uiux.description')"
              :animation-delay="servicesSection.isVisible.value ? '1350' : '0'"
              width="full"
            />

            <!-- Quality Assurance -->
            <ServiceCard
              number="07"
              icon="check"
              :title="t('services.items.qa.title')"
              :description="t('services.items.qa.description')"
              :animation-delay="servicesSection.isVisible.value ? '1500' : '0'"
              width="full"
            />

            <!-- Process Automation -->
            <ServiceCard
              number="08"
              icon="robot"
              :title="t('services.items.automation.title')"
              :description="t('services.items.automation.description')"
              :animation-delay="servicesSection.isVisible.value ? '1650' : '0'"
              width="full"
            />
          </div>
        </div>
      </section>

      <!-- Technologies Section -->
      <section 
        :ref="technologiesSection.target"
        class="py-16 md:py-24 px-6 md:px-12"
        :class="[
          technologiesSection.isVisible.value ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
        ]"
      >
        <div class="max-w-7xl mx-auto">
          <!-- Section Header -->
          <div class="text-center mb-12">
            <div class="flex items-center justify-center gap-3">
              <img 
                src="/assets/logos/simbolo-gradient.png" 
                alt="Lecabe"
                class="h-10 w-auto"
              />
              <h2 class="section-title">
                {{ t('technologies.title') }}
              </h2>
            </div>
          </div>

          <!-- Technology Badges Grid -->
          <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
            <TechBadge name="Vue.js" icon="vue" :animation-delay="technologiesSection.isVisible.value ? '400' : '0'" />
            <TechBadge name="React" icon="react" :animation-delay="technologiesSection.isVisible.value ? '500' : '0'" />
            <TechBadge name="Node.js" icon="node" :animation-delay="technologiesSection.isVisible.value ? '600' : '0'" />
            <TechBadge name="Python" icon="python" :animation-delay="technologiesSection.isVisible.value ? '700' : '0'" />
            <TechBadge name="PHP" icon="php" :animation-delay="technologiesSection.isVisible.value ? '800' : '0'" />
            <TechBadge name="Angular" icon="angular" :animation-delay="technologiesSection.isVisible.value ? '900' : '0'" />
            <TechBadge name="PostgreSQL" icon="postgresql" :animation-delay="technologiesSection.isVisible.value ? '1000' : '0'" />
            <TechBadge name="MySQL" icon="mysql" :animation-delay="technologiesSection.isVisible.value ? '1100' : '0'" />
            <TechBadge name="MongoDB" icon="mongodb" :animation-delay="technologiesSection.isVisible.value ? '1200' : '0'" />
            <TechBadge name="Figma" icon="figma" :animation-delay="technologiesSection.isVisible.value ? '1300' : '0'" />
            <TechBadge name="SQL Server" icon="microsoftsqlserver" :animation-delay="technologiesSection.isVisible.value ? '1400' : '0'" />
            <TechBadge name="AWS" icon="aws" :animation-delay="technologiesSection.isVisible.value ? '1500' : '0'" />
            <TechBadge name="Azure" icon="azure" :animation-delay="technologiesSection.isVisible.value ? '1600' : '0'" />
          </div>
        </div>
      </section>

      <!-- Timeline Section - Vertical Layout -->
      <section 
        :ref="timelineSection.target"
        class="py-16 md:py-24 px-6 md:px-12"
        :class="[
          timelineSection.isVisible.value ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
        ]"
      >
        <div class="max-w-6xl mx-auto">
          <!-- Section Header -->
          <div class="text-center mb-16">
            <div class="flex items-center justify-center gap-3">
              <img 
                src="/assets/logos/simbolo-gradient.png" 
                alt="Lecabe"
                class="h-10 w-auto"
              />
              <h2 class="section-title">
                {{ t('timeline.title') }}
              </h2>
            </div>
          </div>

          <!-- Vertical Timeline -->
          <div class="relative">
            <!-- Central Timeline Line -->
            <div class="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-brand-primary via-brand-medium-primary to-brand-light-primary dark:from-brand-light-primary dark:via-brand-medium-primary dark:to-brand-primary opacity-30 hidden md:block"></div>
            
            <!-- Timeline Items -->
            <div class="space-y-16 md:space-y-24">
              <!-- Step 1: Discovery (Right Side) -->
              <div 
                :ref="timelineStep1.target"
                class="relative flex items-center"
                :class="[
                  timelineStep1.isVisible.value ? 'animate-slide-in-left' : 'timeline-slide-in-right'
                ]"
              >
                <!-- Timeline Node -->
                <div class="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-brand-primary dark:bg-brand-light-primary rounded-full border-4 border-white dark:border-brand-dark shadow-lg z-10"></div>
                
                <!-- Card Container - Right Side -->
                <div class="w-full md:w-5/12 lg:w-2/5 md:ml-auto">
                  <!-- Date Pill -->
                  <div class="flex justify-center md:justify-start mb-4">
                    <div class="bg-gradient-to-r from-brand-primary to-brand-alternative text-white px-4 py-2 rounded-full text-sm font-semibold">
                      {{ t('timeline.step') }} 1
                    </div>
                  </div>
                  
                  <!-- Content Card -->
                  <div class="bg-white dark:bg-brand-medium-dark-primary/30 rounded-xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative">
                    <div class="w-16 h-16 rounded-full bg-brand-primary dark:bg-brand-light-primary flex items-center justify-center mb-6 mx-auto md:mx-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" fill="currentColor" viewBox="0 0 256 256" class="text-white">
                        <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
                      </svg>
                    </div>
                    <h3 class="card-title mb-3 text-center md:text-left">
                      {{ t('timeline.steps.discovery.title') }}
                    </h3>
                    <p class="card-description text-center md:text-left">
                      {{ t('timeline.steps.discovery.description') }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- Step 2: Requirements (Left Side) -->
              <div 
                :ref="timelineStep2.target"
                class="relative flex items-center"
                :class="[
                  timelineStep2.isVisible.value ? 'animate-slide-in-right' : 'timeline-slide-in-left'
                ]"
              >
                <!-- Timeline Node -->
                <div class="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-brand-primary dark:bg-brand-light-primary rounded-full border-4 border-white dark:border-brand-dark shadow-lg z-10"></div>
                
                <!-- Card Container - Left Side -->
                <div class="w-full md:w-5/12 lg:w-2/5">
                  <!-- Date Pill -->
                  <div class="flex justify-center md:justify-end mb-4">
                    <div class="bg-gradient-to-r from-brand-primary to-brand-alternative text-white px-4 py-2 rounded-full text-sm font-semibold">
                      {{ t('timeline.step') }} 2
                    </div>
                  </div>
                  
                  <!-- Content Card -->
                  <div class="bg-white dark:bg-brand-medium-dark-primary/30 rounded-xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative">
                    <div class="w-16 h-16 rounded-full bg-brand-primary dark:bg-brand-light-primary flex items-center justify-center mb-6 mx-auto md:mx-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" fill="currentColor" viewBox="0 0 256 256" class="text-white">
                        <path d="M80,64a8,8,0,0,1,8-8H216a8,8,0,0,1,0,16H88A8,8,0,0,1,80,64Zm136,56H88a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Zm0,64H88a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16ZM44,52A12,12,0,1,0,56,64,12,12,0,0,0,44,52Zm0,64a12,12,0,1,0,12,12A12,12,0,0,0,44,116Zm0,64a12,12,0,1,0,12,12A12,12,0,0,0,44,180Z"></path>
                      </svg>
                    </div>
                    <h3 class="card-title mb-3 text-center md:text-left">
                      {{ t('timeline.steps.requirements.title') }}
                    </h3>
                    <p class="card-description text-center md:text-left">
                      {{ t('timeline.steps.requirements.description') }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- Step 3: Design (Right Side) -->
              <div 
                :ref="timelineStep3.target"
                class="relative flex items-center"
                :class="[
                  timelineStep3.isVisible.value ? 'animate-slide-in-left' : 'timeline-slide-in-right'
                ]"
              >
                <!-- Timeline Node -->
                <div class="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-brand-primary dark:bg-brand-light-primary rounded-full border-4 border-white dark:border-brand-dark shadow-lg z-10"></div>
                
                <!-- Card Container - Right Side -->
                <div class="w-full md:w-5/12 lg:w-2/5 md:ml-auto">
                  <!-- Date Pill -->
                  <div class="flex justify-center md:justify-start mb-4">
                    <div class="bg-gradient-to-r from-brand-primary to-brand-alternative text-white px-4 py-2 rounded-full text-sm font-semibold">
                      {{ t('timeline.step') }} 3
                    </div>
                  </div>
                  
                  <!-- Content Card -->
                  <div class="bg-white dark:bg-brand-medium-dark-primary/30 rounded-xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative">
                    <div class="w-16 h-16 rounded-full bg-brand-primary dark:bg-brand-light-primary flex items-center justify-center mb-6 mx-auto md:mx-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" fill="currentColor" viewBox="0 0 256 256" class="text-white">
                        <path d="M227.32,73.37,182.63,28.69a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H216a8,8,0,0,0,0-16H115.32l112-112A16,16,0,0,0,227.32,73.37ZM136,75.31,152.69,92,68,176.69,51.31,160ZM48,208V179.31L76.69,208Zm48-3.31L79.32,188,164,103.31,180.69,120Zm96-96L147.32,64l24-24L216,84.69Z"></path>
                      </svg>
                    </div>
                    <h3 class="card-title mb-3 text-center md:text-left">
                      {{ t('timeline.steps.design.title') }}
                    </h3>
                    <p class="card-description text-center md:text-left">
                      {{ t('timeline.steps.design.description') }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- Step 4: Development (Left Side) -->
              <div 
                :ref="timelineStep4.target"
                class="relative flex items-center"
                :class="[
                  timelineStep4.isVisible.value ? 'animate-slide-in-right' : 'timeline-slide-in-left'
                ]"
              >
                <!-- Timeline Node -->
                <div class="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-brand-primary dark:bg-brand-light-primary rounded-full border-4 border-white dark:border-brand-dark shadow-lg z-10"></div>
                
                <!-- Card Container - Left Side -->
                <div class="w-full md:w-5/12 lg:w-2/5">
                  <!-- Date Pill -->
                  <div class="flex justify-center md:justify-end mb-4">
                    <div class="bg-gradient-to-r from-brand-primary to-brand-alternative text-white px-4 py-2 rounded-full text-sm font-semibold">
                      {{ t('timeline.step') }} 4
                    </div>
                  </div>
                  
                  <!-- Content Card -->
                  <div class="bg-white dark:bg-brand-medium-dark-primary/30 rounded-xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative">
                    <div class="w-16 h-16 rounded-full bg-brand-primary dark:bg-brand-light-primary flex items-center justify-center mb-6 mx-auto md:mx-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" fill="currentColor" viewBox="0 0 256 256" class="text-white">
                        <path d="M69.12,94.15,28.5,128l40.62,33.85a8,8,0,1,1-10.24,12.29l-48-40a8,8,0,0,1,0-12.29l48-40a8,8,0,0,1,10.24,12.3Zm176,27.7-48-40a8,8,0,1,0-10.24,12.3L227.5,128l-40.62,33.85a8,8,0,1,0,10.24,12.29l48-40a8,8,0,0,0,0-12.29ZM162.73,32.48a8,8,0,0,0-10.25,4.79l-64,176a8,8,0,0,0,4.79,10.26A8.14,8.14,0,0,0,96,224a8,8,0,0,0,7.52-5.27l64-176A8,8,0,0,0,162.73,32.48Z"></path>
                      </svg>
                    </div>
                    <h3 class="card-title mb-3 text-center md:text-left">
                      {{ t('timeline.steps.development.title') }}
                    </h3>
                    <p class="card-description text-center md:text-left">
                      {{ t('timeline.steps.development.description') }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- Step 5: Deployment (Right Side) -->
              <div 
                :ref="timelineStep5.target"
                class="relative flex items-center"
                :class="[
                  timelineStep5.isVisible.value ? 'animate-slide-in-left' : 'timeline-slide-in-right'
                ]"
              >
                <!-- Timeline Node -->
                <div class="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-brand-primary dark:bg-brand-light-primary rounded-full border-4 border-white dark:border-brand-dark shadow-lg z-10"></div>
                
                <!-- Card Container - Right Side -->
                <div class="w-full md:w-5/12 lg:w-2/5 md:ml-auto">
                  <!-- Date Pill -->
                  <div class="flex justify-center md:justify-start mb-4">
                    <div class="bg-gradient-to-r from-brand-primary to-brand-alternative text-white px-4 py-2 rounded-full text-sm font-semibold">
                      {{ t('timeline.step') }} 5
                    </div>
                  </div>
                  
                  <!-- Content Card -->
                  <div class="bg-white dark:bg-brand-medium-dark-primary/30 rounded-xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative">
                    <div class="w-16 h-16 rounded-full bg-brand-primary dark:bg-brand-light-primary flex items-center justify-center mb-6 mx-auto md:mx-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" fill="currentColor" viewBox="0 0 256 256" class="text-white">
                        <path d="M103.77,185.94C103.38,187.49,93.63,224,40,224a8,8,0,0,1-8-8c0-53.63,36.51-63.38,38.06-63.77a8,8,0,0,1,3.88,15.53c-.9.25-22.42,6.54-25.56,39.86C81.7,204.48,88,183,88.26,182a8,8,0,0,1,15.51,4Zm93-67.4L192,123.31v58.33A15.91,15.91,0,0,1,187.32,193L153,227.3A15.91,15.91,0,0,1,141.7,232a16.11,16.11,0,0,1-5.1-.83,15.94,15.94,0,0,1-10.78-12.92l-5.37-38.49L76.24,135.55l-38.47-5.37A16,16,0,0,1,28.7,103L63,68.68A15.91,15.91,0,0,1,74.36,64h58.33l4.77-4.77c26.68-26.67,58.83-27.82,71.41-27.07a16,16,0,0,1,15,15C224.6,59.71,223.45,91.86,196.78,118.54ZM40,114.34l37.15,5.18L116.69,80H74.36ZM91.32,128,128,164.68l57.45-57.45a76.46,76.46,0,0,0,22.42-59.16,76.65,76.65,0,0,0-59.11,22.47ZM176,139.31l-39.53,39.53L141.67,216,176,181.64Z"></path>
                      </svg>
                    </div>
                    <h3 class="card-title mb-3 text-center md:text-left">
                      {{ t('timeline.steps.deployment.title') }}
                    </h3>
                    <p class="card-description text-center md:text-left">
                      {{ t('timeline.steps.deployment.description') }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>

    <!-- Marketplace Section - CTA Destacado with Full-Width Background -->
    <section 
      id="marketplace" 
      :ref="marketplaceSection.target"
      class="relative py-16 md:py-24 overflow-hidden bg-gradient-to-r from-brand-primary to-brand-dark-primary dark:from-brand-light-primary dark:to-brand-primary"
      :class="[
        marketplaceSection.isVisible.value ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
      ]"
    >
      <div class="max-w-5xl mx-auto px-6 md:px-12 text-center relative z-10">
        <!-- Title with Logo -->
        <div class="flex items-center justify-center gap-4 mb-4">
          <img 
            src="/assets/logos/simbolo-white.png" 
            alt="Lecabe"
            class="h-12 md:h-16 w-auto"
          />
          <h2 class="text-white text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-tight">
            Marketplace
          </h2>
        </div>
        <p class="text-white/90 text-base md:text-lg font-normal leading-relaxed mb-8 max-w-3xl mx-auto">
          {{ t('marketplace.description') }}
        </p>
        <button 
          @click="goToMarketplace"
          class="inline-flex min-w-[200px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg h-12 md:h-14 px-8 bg-white text-brand-primary text-base font-bold leading-normal hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg"
        >
          <span class="truncate">{{ t('marketplace.cta') }}</span>
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>
    </section>

    <!-- Contact and remaining sections container -->
    <div class="layout-content-container flex flex-col flex-1 w-full">

      <!-- Contact Section -->
      <section 
        id="contact" 
        :ref="contactSection.target"
        class="py-16 md:py-24 px-6 md:px-12 mb-16 md:mb-24"
        :class="[
          contactSection.isVisible.value ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
        ]"
      >
        <div class="max-w-5xl mx-auto">
          <!-- Header -->
          <header class="text-center mb-12">
            <div class="flex items-center justify-center gap-3 mb-4">
              <img 
                src="/assets/logos/simbolo-gradient.png" 
                alt="Lecabe"
                class="h-10 w-auto"
              />
              <h2 class="section-title">
                {{ t('contact.title') }}
              </h2>
            </div>
            <p class="section-description max-w-3xl mx-auto">
              {{ t('contact.description') }}
            </p>
          </header>

        <!-- Body - Form -->
        <div class="w-full max-w-3xl mx-auto">
          <form class="space-y-6">
            <!-- Name and Email Row -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <label class="flex flex-col">
                <span class="text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                  {{ t('contact.form.name') }}
                </span>
                <input
                  v-model="formData.name"
                  :placeholder="t('contact.form.name')"
                  class="form-input w-full rounded-lg text-gray-900 dark:text-white focus:outline-0 focus:ring-2 border-none bg-white dark:bg-brand-medium-dark-primary h-14 placeholder:text-gray-400 dark:placeholder:text-gray-500 p-4 text-base font-normal leading-normal transition-all duration-200 shadow-sm"
                  :class="{
                    'focus:ring-brand-primary dark:focus:ring-brand-light-primary': !formErrors.name,
                    'ring-2 ring-red-500': formErrors.name
                  }"
                />
                <span v-if="formErrors.name" class="text-red-500 text-sm mt-1">Nome é obrigatório</span>
              </label>
              <label class="flex flex-col">
                <span class="text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                  {{ t('contact.form.email') }}
                </span>
                <input
                  v-model="formData.email"
                  :placeholder="t('contact.form.email')"
                  type="email"
                  class="form-input w-full rounded-lg text-gray-900 dark:text-white focus:outline-0 focus:ring-2 border-none bg-white dark:bg-brand-medium-dark-primary h-14 placeholder:text-gray-400 dark:placeholder:text-gray-500 p-4 text-base font-normal leading-normal transition-all duration-200 shadow-sm"
                  :class="{
                    'focus:ring-brand-primary dark:focus:ring-brand-light-primary': !formErrors.email,
                    'ring-2 ring-red-500': formErrors.email
                  }"
                />
                <span v-if="formErrors.email" class="text-red-500 text-sm mt-1">E-mail inválido</span>
              </label>
            </div>

            <!-- Subject and Language Row -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <label class="flex flex-col">
                <span class="text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                  {{ t('contact.form.subject') }}
                </span>
                <input
                  v-model="formData.subject"
                  :placeholder="t('contact.form.subject')"
                  class="form-input w-full rounded-lg text-gray-900 dark:text-white focus:outline-0 focus:ring-2 border-none bg-white dark:bg-brand-medium-dark-primary h-14 placeholder:text-gray-400 dark:placeholder:text-gray-500 p-4 text-base font-normal leading-normal transition-all duration-200 shadow-sm"
                  :class="{
                    'focus:ring-brand-primary dark:focus:ring-brand-light-primary': !formErrors.subject,
                    'ring-2 ring-red-500': formErrors.subject
                  }"
                />
                <span v-if="formErrors.subject" class="text-red-500 text-sm mt-1">Assunto é obrigatório</span>
              </label>
              <label class="flex flex-col">
                <span class="text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                  {{ t('contact.form.language') }}
                </span>
                <select
                  v-model="formData.language"
                  class="form-input w-full rounded-lg text-gray-900 dark:text-white focus:outline-0 focus:ring-2 border-none bg-white dark:bg-brand-medium-dark-primary h-14 p-4 text-base font-normal leading-normal transition-all duration-200 shadow-sm"
                  :class="{
                    'focus:ring-brand-primary dark:focus:ring-brand-light-primary': !formErrors.language,
                    'ring-2 ring-red-500': formErrors.language
                  }"
                >
                  <option value="">{{ t('contact.form.language') }}</option>
                  <option value="pt">{{ t('contact.form.languages.pt') }}</option>
                  <option value="en">{{ t('contact.form.languages.en') }}</option>
                  <option value="fr">{{ t('contact.form.languages.fr') }}</option>
                </select>
                <span v-if="formErrors.language" class="text-red-500 text-sm mt-1">Idioma é obrigatório</span>
              </label>
            </div>

            <!-- Message -->
            <label class="flex flex-col">
              <span class="text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                {{ t('contact.form.message') }}
              </span>
              <textarea
                v-model="formData.message"
                :placeholder="t('contact.form.message')"
                rows="6"
                class="form-input w-full rounded-lg text-gray-900 dark:text-white focus:outline-0 focus:ring-2 border-none bg-white dark:bg-brand-medium-dark-primary placeholder:text-gray-400 dark:placeholder:text-gray-500 p-4 text-base font-normal leading-relaxed transition-all duration-200 shadow-sm resize-none"
                :class="{
                  'focus:ring-brand-primary dark:focus:ring-brand-light-primary': !formErrors.message,
                  'ring-2 ring-red-500': formErrors.message
                }"
              ></textarea>
              <span v-if="formErrors.message" class="text-red-500 text-sm mt-1">
                Mensagem deve ter no mínimo 50 caracteres ({{ formData.message.length }}/50)
              </span>
            </label>

            <!-- Submit Button -->
            <div class="flex justify-center pt-4">
              <div class="w-full md:w-auto md:min-w-[250px]">
                <SubmitButton 
                  :label="t('contact.form.submit')"
                  :has-errors="hasFormErrors"
                  @validate="validateForm"
                  @submit="handleContactSubmit"
                />
              </div>
            </div>
          </form>
        </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
/* Component-specific styles */
</style>
