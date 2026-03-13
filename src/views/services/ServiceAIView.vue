<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
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
const { getAdjacentServices } = useServices()

const serviceId = 'ai'
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
const serviceMetrics = computed(() => {
  const items = tm(`servicesPages.${serviceId}.metrics.items`) as unknown[]
  return items.map((_: unknown, i: number) => ({
    value: t(`servicesPages.${serviceId}.metrics.items[${i}].value`),
    label: t(`servicesPages.${serviceId}.metrics.items[${i}].label`)
  }))
})

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
  const stepIds = ['discovery', 'data', 'modeling', 'validation', 'deploy']
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

const whatsappUrl = computed(() => {
  const message = encodeURIComponent(t(`servicesPages.${serviceId}.cta.whatsappMessage`))
  return `https://wa.me/5511994132821?text=${message}`
})

const handleCTA = () => {
  window.open(whatsappUrl.value, '_blank')
}

const handlePackageSelect = () => {
  window.open(whatsappUrl.value, '_blank')
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
        :cta-text="t(`servicesPages.${serviceId}.hero.cta`)"
        :gradient="serviceData?.gradient || 'from-brand-primary to-brand-dark-primary'"
        @cta-click="handleCTA"
      >
        <template #visual>
          <ServiceHeroVisual
            service-type="ai"
            :metrics="[t(`servicesPages.${serviceId}.hero.visualMetrics[0]`), t(`servicesPages.${serviceId}.hero.visualMetrics[1]`), t(`servicesPages.${serviceId}.hero.visualMetrics[2]`), t(`servicesPages.${serviceId}.hero.visualMetrics[3]`)]"
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
            {{ t(`servicesPages.${serviceId}.metrics.title`) }}
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400">
            {{ t(`servicesPages.${serviceId}.metrics.subtitle`) }}
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
      <div class="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-600 dark:from-orange-400 dark:to-red-500 opacity-10" />
      <div class="max-w-4xl mx-auto text-center relative z-10">
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          {{ t(`servicesPages.${serviceId}.cta.title`) }}
        </h2>
        <p class="text-xl text-gray-600 dark:text-gray-300 mb-8">
          {{ t(`servicesPages.${serviceId}.cta.description`) }}
        </p>
        <button
          class="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#25D366] text-white rounded-xl font-bold text-lg hover:bg-[#1da851] hover:scale-105 transition-all shadow-lg"
          @click="handleCTA"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 256 256"
          ><path d="M187.58,144.84l-32-16a8,8,0,0,0-8,.5l-14.69,9.8a40.55,40.55,0,0,1-16-16l9.8-14.69a8,8,0,0,0,.5-8l-16-32A8,8,0,0,0,104,64a40,40,0,0,0-40,40,88.1,88.1,0,0,0,88,88,40,40,0,0,0,40-40A8,8,0,0,0,187.58,144.84ZM152,176a72.08,72.08,0,0,1-72-72A24,24,0,0,1,99.29,80.46l11.48,23L101,118a8,8,0,0,0-.73,7.51,56.47,56.47,0,0,0,30.15,30.15A8,8,0,0,0,138,155l14.61-9.74,23,11.48A24,24,0,0,1,152,176ZM128,24A104,104,0,0,0,36.18,176.88L24.83,210.93a16,16,0,0,0,20.24,20.24l34.05-11.35A104,104,0,1,0,128,24Zm0,192a87.87,87.87,0,0,1-44.06-11.81,8,8,0,0,0-6.54-.67L40,216,52.47,178.6a8,8,0,0,0-.66-6.54A88,88,0,1,1,128,216Z" /></svg>
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
