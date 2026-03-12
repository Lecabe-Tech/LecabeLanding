<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useScrollAnimation } from '@/composables/useScrollAnimation'
import { useServices } from '@/composables/useServices'
import { getServiceData } from '@/data/services'
import TechBackground from '@/components/TechBackground.vue'
import ServiceHero from '@/components/services/ServiceHero.vue'
import ServiceHeroVisual from '@/components/services/ServiceHeroVisual.vue'
import ServiceNavigation from '@/components/services/ServiceNavigation.vue'
import ServiceMetrics from '@/components/services/ServiceMetrics.vue'
import FeaturesBentoGrid from '@/components/services/FeaturesBentoGrid.vue'
import ProcessTimeline from '@/components/services/ProcessTimeline.vue'
import TechStackGrid from '@/components/services/TechStackGrid.vue'
import PricingCards from '@/components/services/PricingCards.vue'
import FAQSection from '@/components/FAQSection.vue'

const { t, tm } = useI18n()
const router = useRouter()
const { getAdjacentServices } = useServices()

const serviceId = 'ux'
const serviceData = getServiceData(serviceId)
const { prev, next } = getAdjacentServices(serviceId)

// Scroll animations
const heroSection = useScrollAnimation({}, true)
const overviewSection = useScrollAnimation()
const metricsSection = useScrollAnimation()
const featuresSection = useScrollAnimation()
const processSection = useScrollAnimation()
const techSection = useScrollAnimation()
const pricingSection = useScrollAnimation()
const faqSection = useScrollAnimation()
const ctaSection = useScrollAnimation()

// Service Metrics
const serviceMetrics = [
  { value: '85%', label: 'Aumento Conversão' },
  { value: '300+', label: 'Produtos Desenhados' },
  { value: '40h+', label: 'Testes/Projeto' },
  { value: 'WCAG AA', label: 'Acessibilidade' }
]

// Features com títulos do i18n
const features = computed(() => {
  if (!serviceData) return []
  return serviceData.features.map(feature => ({
    ...feature,
    title: t(`servicesPages.${serviceId}.features.${feature.id}.title`),
    description: t(`servicesPages.${serviceId}.features.${feature.id}.description`)
  }))
})

// Process steps com títulos do i18n
const processSteps = computed(() => {
  if (!serviceData) return []
  const stepIds = ['research', 'wireframe', 'prototype', 'testing', 'handoff']
  return stepIds.map((stepId, index) => ({
    ...serviceData.process[index],
    title: t(`servicesPages.${serviceId}.process.${stepId}.title`),
    description: t(`servicesPages.${serviceId}.process.${stepId}.description`)
  }))
})

// Packages com dados do i18n
const packages = computed(() => {
  if (!serviceData) return []
  const servicesPages = tm('servicesPages') as Record<string, Record<string, Record<string, { features?: string[] }>>>
  const serviceMessages = servicesPages?.[serviceId]

  return serviceData.packages.map(pkg => {
    const pkgData = serviceMessages?.packages?.[pkg.id]
    return {
      ...pkg,
      name: t(`servicesPages.${serviceId}.packages.${pkg.id}.name`),
      description: t(`servicesPages.${serviceId}.packages.${pkg.id}.description`),
      features: Array.isArray(pkgData?.features) ? pkgData.features : []
    }
  })
})

// FAQ items
const faqItems = computed(() => [
  {
    question: t(`servicesPages.${serviceId}.faq.q1.question`),
    answer: t(`servicesPages.${serviceId}.faq.q1.answer`)
  },
  {
    question: t(`servicesPages.${serviceId}.faq.q2.question`),
    answer: t(`servicesPages.${serviceId}.faq.q2.answer`)
  },
  {
    question: t(`servicesPages.${serviceId}.faq.q3.question`),
    answer: t(`servicesPages.${serviceId}.faq.q3.answer`)
  },
  {
    question: t(`servicesPages.${serviceId}.faq.q4.question`),
    answer: t(`servicesPages.${serviceId}.faq.q4.answer`)
  }
])

const handleCTA = () => {
  router.push({ path: '/', hash: '#contact' })
}

const handlePackageSelect = () => {
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
      class="relative py-20 md:py-28 overflow-hidden min-h-[80vh] flex items-center"
      :class="heroSection.isVisible.value ? 'animate-fade-in' : 'opacity-0'"
    >
      <ServiceHero
        :title="t(`servicesPages.${serviceId}.hero.title`)"
        :subtitle="t(`servicesPages.${serviceId}.hero.subtitle`)"
        cta-text="Solicitar Auditoria UX"
        :gradient="serviceData?.gradient || 'from-brand-primary to-brand-dark-primary'"
        @cta-click="handleCTA"
      >
        <template #visual>
          <ServiceHeroVisual
            service-type="ux"
            :metrics="['Figma', 'Responsive', 'WCAG AA', 'User-Tested']"
          />
        </template>
      </ServiceHero>
    </section>

    <!-- Overview Section -->
    <section
      :ref="overviewSection.target"
      class="py-16 md:py-24 px-6 md:px-12"
      :class="overviewSection.isVisible.value ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'"
    >
      <div class="max-w-7xl mx-auto">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {{ t(`servicesPages.${serviceId}.overview.title`) }}
          </h2>
          <p class="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            {{ t(`servicesPages.${serviceId}.overview.content`) }}
          </p>
        </div>
      </div>
    </section>

    <!-- Service Metrics - Social Proof -->
    <section
      :ref="metricsSection.target"
      class="py-16 md:py-24 px-6 md:px-12 bg-gray-50 dark:bg-brand-dark/30"
      :class="metricsSection.isVisible.value ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'"
    >
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Design Centrado no Usuário
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400">
            Resultados comprovados em experiência e conversão
          </p>
        </div>
        <ServiceMetrics :metrics="serviceMetrics" />
      </div>
    </section>

    <!-- Features Bento Grid -->
    <section
      :ref="featuresSection.target"
      class="py-16 md:py-24 px-6 md:px-12"
      :class="featuresSection.isVisible.value ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'"
    >
      <div class="max-w-7xl mx-auto">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
          {{ t(`servicesPages.${serviceId}.features.title`) }}
        </h2>
        <FeaturesBentoGrid
          :features="features"
          :accent-color="serviceData?.accentColor"
        />
      </div>
    </section>

    <!-- Process Timeline -->
    <section
      :ref="processSection.target"
      class="py-16 md:py-24 px-6 md:px-12"
      :class="processSection.isVisible.value ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'"
    >
      <div class="max-w-7xl mx-auto">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            {{ t(`servicesPages.${serviceId}.process.title`) }}
          </h2>
          <ProcessTimeline
            :steps="processSteps"
            :accent-color="serviceData?.accentColor"
          />
        </div>
      </div>
    </section>

    <!-- Tech Stack -->
    <section
      :ref="techSection.target"
      class="py-16 md:py-24 px-6 md:px-12"
      :class="techSection.isVisible.value ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'"
    >
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {{ t(`servicesPages.${serviceId}.techStack.title`) }}
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400">
            {{ t(`servicesPages.${serviceId}.techStack.description`) }}
          </p>
        </div>
        <TechStackGrid
          v-if="serviceData"
          :technologies="serviceData.techStack"
        />
      </div>
    </section>

    <!-- Pricing Packages -->
    <section
      :ref="pricingSection.target"
      class="py-16 md:py-24 px-6 md:px-12"
      :class="pricingSection.isVisible.value ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'"
    >
      <div class="max-w-7xl mx-auto">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
          {{ t(`servicesPages.${serviceId}.packages.title`) }}
        </h2>
        <PricingCards
          :packages="packages"
          :accent-color="serviceData?.accentColor"
          @select-package="handlePackageSelect"
        />
      </div>
    </section>

    <!-- FAQ -->
    <section
      :ref="faqSection.target"
      class="py-16 md:py-24 px-6 md:px-12"
      :class="faqSection.isVisible.value ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'"
    >
      <div class="max-w-7xl mx-auto">
        <div class="max-w-4xl mx-auto">
          <FAQSection
            :title="t(`servicesPages.${serviceId}.faq.title`)"
            :items="faqItems"
          />
        </div>
      </div>
    </section>

    <!-- CTA Final -->
    <section
      :ref="ctaSection.target"
      :class="[
        `py-16 md:py-24 px-6 md:px-12 relative overflow-hidden`,
        ctaSection.isVisible.value ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
      ]"
    >
      <div class="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 dark:from-purple-400 dark:to-pink-400 opacity-10" />
      <div class="max-w-4xl mx-auto text-center relative z-10">
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          {{ t(`servicesPages.${serviceId}.cta.title`) }}
        </h2>
        <p class="text-xl text-gray-600 dark:text-gray-300 mb-8">
          {{ t(`servicesPages.${serviceId}.cta.description`) }}
        </p>
        <button
          class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-purple-500 dark:bg-purple-400 text-white dark:text-brand-dark rounded-xl font-bold text-lg hover:bg-pink-500 dark:hover:bg-purple-500 hover:scale-105 transition-all shadow-lg"
          @click="handleCTA"
        >
          {{ t(`servicesPages.${serviceId}.cta.button`) }}
        </button>
      </div>
    </section>

    <!-- Service Navigation -->
    <div class="max-w-7xl mx-auto px-6 md:px-12 py-16">
      <ServiceNavigation
        :prev-service="prev"
        :next-service="next"
      />
    </div>
  </div>
</template>
