<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useScrollAnimation } from '@/composables/useScrollAnimation'
import GlassCard from '@/components/ui/GlassCard.vue'

const { t } = useI18n()
const sectionRef = useScrollAnimation()

interface Metric {
  key: string
  icon: string
}

const metrics: Metric[] = [
  { key: 'projects', icon: 'folder' },
  { key: 'satisfaction', icon: 'star' },
  { key: 'support', icon: 'clock' },
  { key: 'experience', icon: 'trophy' }
]

const animatedValues = ref<Record<string, string>>({})
const hasAnimated = ref(false)

const animateValue = (key: string, endValue: string) => {
  const numericMatch = endValue.match(/(\d+)/)
  if (!numericMatch) {
    animatedValues.value[key] = endValue
    return
  }

  const targetNum = parseInt(numericMatch[1])
  const suffix = endValue.replace(/\d+/, '')
  let current = 0
  const duration = 2000
  const steps = 60
  const increment = targetNum / steps
  const stepDuration = duration / steps

  const timer = setInterval(() => {
    current += increment
    if (current >= targetNum) {
      current = targetNum
      clearInterval(timer)
    }
    animatedValues.value[key] = Math.floor(current) + suffix
  }, stepDuration)
}

onMounted(() => {
  metrics.forEach(m => {
    animatedValues.value[m.key] = '0'
  })

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated.value) {
          hasAnimated.value = true
          metrics.forEach(m => {
            const value = t(`metrics.${m.key}.value`)
            animateValue(m.key, value)
          })
        }
      })
    },
    { threshold: 0.3 }
  )

  const section = document.getElementById('metrics-section')
  if (section) {
    observer.observe(section)
  }
})
</script>

<template>
  <section
    id="metrics-section"
    :ref="sectionRef.target"
    class="py-16 md:py-24 px-6 md:px-12"
    :class="[
      sectionRef.isVisible.value ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
    ]"
  >
    <div class="max-w-7xl mx-auto">
      <!-- Layout Assimétrico: Métrica destacada à esquerda + 3 métricas à direita -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

        <!-- Métrica Principal Destacada (ocupa 5 colunas) -->
        <div class="lg:col-span-5">
          <div class="bg-gradient-to-br from-brand-primary to-brand-dark-primary dark:from-brand-light-primary dark:to-brand-primary rounded-3xl p-8 md:p-12 group hover:shadow-2xl hover:shadow-brand-primary/20 transition-all duration-500">
            <div class="flex flex-col items-start">
              <div class="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 256 256" class="text-white">
                  <path d="M216,72H131.31L104,44.69A15.86,15.86,0,0,0,92.69,40H40A16,16,0,0,0,24,56V200.62A15.4,15.4,0,0,0,39.38,216H216.89A15.13,15.13,0,0,0,232,200.89V88A16,16,0,0,0,216,72ZM40,56H92.69l16,16H40ZM216,200H40V88H216Z"/>
                </svg>
              </div>
              <span class="text-6xl md:text-7xl lg:text-8xl font-black text-white mb-3 tabular-nums leading-none">
                {{ animatedValues['projects'] || t('metrics.projects.value') }}
              </span>
              <span class="text-white/90 text-lg md:text-xl font-semibold">
                {{ t('metrics.projects.label') }}
              </span>
              <p class="text-white/60 text-sm mt-2 max-w-xs">
                Projetos entregues com sucesso para empresas de diversos setores
              </p>
            </div>
          </div>
        </div>

        <!-- Grid 3 Métricas Secundárias (ocupa 7 colunas) -->
        <div class="lg:col-span-7">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
            <!-- Satisfaction -->
            <GlassCard padding="md">
              <div class="flex flex-col items-start">
                <div class="w-12 h-12 rounded-xl bg-brand-primary/10 dark:bg-brand-light-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256" class="text-brand-primary dark:text-brand-light-primary">
                    <path d="M234.29,114.85l-45,38.83L203,211.75a16.4,16.4,0,0,1-24.5,17.82L128,198.49,77.47,229.57A16.4,16.4,0,0,1,53,211.75l13.76-58.07-45-38.83A16.46,16.46,0,0,1,31.08,86l59-4.76,22.76-55.08a16.36,16.36,0,0,1,30.27,0l22.75,55.08,59,4.76a16.46,16.46,0,0,1,9.37,28.86Z"/>
                  </svg>
                </div>
                <span class="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-1 tabular-nums">
                  {{ animatedValues['satisfaction'] || t('metrics.satisfaction.value') }}
                </span>
                <span class="text-gray-500 dark:text-gray-400 text-sm font-medium">
                  {{ t('metrics.satisfaction.label') }}
                </span>
              </div>
            </GlassCard>

            <!-- Support -->
            <GlassCard padding="md">
              <div class="flex flex-col items-start">
                <div class="w-12 h-12 rounded-xl bg-brand-alternative/10 dark:bg-brand-alternative/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256" class="text-brand-alternative">
                    <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"/>
                  </svg>
                </div>
                <span class="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-1 tabular-nums">
                  {{ animatedValues['support'] || t('metrics.support.value') }}
                </span>
                <span class="text-gray-500 dark:text-gray-400 text-sm font-medium">
                  {{ t('metrics.support.label') }}
                </span>
              </div>
            </GlassCard>

            <!-- Experience -->
            <GlassCard padding="md">
              <div class="flex flex-col items-start">
                <div class="w-12 h-12 rounded-xl bg-purple-500/10 dark:bg-purple-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256" class="text-purple-500">
                    <path d="M232,64H208V48a8,8,0,0,0-8-8H56a8,8,0,0,0-8,8V64H24A16,16,0,0,0,8,80V96a40,40,0,0,0,40,40h3.65A80.13,80.13,0,0,0,120,191.61V216H96a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16H136V191.61A80.13,80.13,0,0,0,204.35,136H208a40,40,0,0,0,40-40V80A16,16,0,0,0,232,64ZM48,120A24,24,0,0,1,24,96V80H48v32q0,4,.39,8Zm144-8a64,64,0,0,1-128,0V56H192Zm40-16a24,24,0,0,1-24,24h-.39q.39-4,.39-8V80h24Z"/>
                  </svg>
                </div>
                <span class="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-1 tabular-nums">
                  {{ animatedValues['experience'] || t('metrics.experience.value') }}
                </span>
                <span class="text-gray-500 dark:text-gray-400 text-sm font-medium">
                  {{ t('metrics.experience.label') }}
                </span>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.tabular-nums {
  font-variant-numeric: tabular-nums;
}
</style>
