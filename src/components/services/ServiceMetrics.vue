<script setup lang="ts">
import { ref, onMounted } from 'vue'
import GlassCard from '@/components/ui/GlassCard.vue'

interface Metric {
  value: string
  label: string
  icon?: string
}

interface Props {
  metrics: Metric[]
  animated?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  animated: true
})

const animatedValues = ref<Record<number, string>>({})
const hasAnimated = ref(false)

const animateValue = (index: number, endValue: string) => {
  const numericMatch = endValue.match(/(\d+)/)
  if (!numericMatch || !props.animated) {
    animatedValues.value[index] = endValue
    return
  }

  const targetNum = parseInt(numericMatch[1])
  const prefix = endValue.substring(0, endValue.indexOf(numericMatch[1]))
  const suffix = endValue.substring(endValue.indexOf(numericMatch[1]) + numericMatch[1].length)

  let current = 0
  const duration = 1500
  const steps = 50
  const increment = targetNum / steps
  const stepDuration = duration / steps

  const timer = setInterval(() => {
    current += increment
    if (current >= targetNum) {
      current = targetNum
      clearInterval(timer)
    }
    animatedValues.value[index] = prefix + Math.floor(current) + suffix
  }, stepDuration)
}

onMounted(() => {
  if (!props.animated) {
    props.metrics.forEach((metric, index) => {
      animatedValues.value[index] = metric.value
    })
    return
  }

  props.metrics.forEach((_, index) => {
    animatedValues.value[index] = '0'
  })

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated.value) {
          hasAnimated.value = true
          props.metrics.forEach((metric, index) => {
            setTimeout(() => {
              animateValue(index, metric.value)
            }, index * 100)
          })
        }
      })
    },
    { threshold: 0.3 }
  )

  const section = document.getElementById('service-metrics')
  if (section) {
    observer.observe(section)
  }
})
</script>

<template>
  <div
    id="service-metrics"
    class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
  >
    <GlassCard
      v-for="(metric, index) in metrics"
      :key="index"
      padding="md"
      class="text-center hover:scale-105 transition-transform duration-300"
    >
      <div class="text-3xl md:text-4xl font-black text-gradient-animated mb-2 tabular-nums">
        {{ animatedValues[index] || metric.value }}
      </div>
      <div class="text-sm text-gray-600 dark:text-gray-400 font-medium leading-tight">
        {{ metric.label }}
      </div>
    </GlassCard>
  </div>
</template>

<style scoped>
.tabular-nums {
  font-variant-numeric: tabular-nums;
}
</style>
