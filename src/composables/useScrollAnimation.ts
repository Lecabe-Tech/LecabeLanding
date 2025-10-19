import { ref, onMounted } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

/**
 * Composable for scroll-triggered animations
 * Uses Intersection Observer API via @vueuse/core
 */
export function useScrollAnimation(options = {}) {
  const target = ref(null)
  const isVisible = ref(false)

  const defaultOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px',
    ...options
  }

  onMounted(() => {
    if (target.value) {
      const { stop } = useIntersectionObserver(
        target,
        ([{ isIntersecting }]) => {
          if (isIntersecting && !isVisible.value) {
            isVisible.value = true
            // Once visible, stop observing (animation plays once)
            stop()
          }
        },
        defaultOptions
      )
    }
  })

  return {
    target,
    isVisible
  }
}

/**
 * Composable for scroll-triggered staggered animations
 * Animates children elements with delay
 */
export function useStaggerAnimation(_childCount: number, baseDelay = 100) {
  const targets = ref<HTMLElement[]>([])
  const visibleIndices = ref<Set<number>>(new Set())

  onMounted(() => {
    targets.value.forEach((target, index) => {
      if (target) {
        useIntersectionObserver(
          target,
          ([{ isIntersecting }]) => {
            if (isIntersecting && !visibleIndices.value.has(index)) {
              setTimeout(() => {
                visibleIndices.value.add(index)
              }, index * baseDelay)
            }
          },
          { threshold: 0.2 }
        )
      }
    })
  })

  const isChildVisible = (index: number) => {
    return visibleIndices.value.has(index)
  }

  return {
    targets,
    isChildVisible
  }
}

