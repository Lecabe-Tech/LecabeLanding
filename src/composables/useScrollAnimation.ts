import { ref, onMounted } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

/**
 * Composable for scroll-triggered animations
 * Uses Intersection Observer API via @vueuse/core
 * 
 * @param options - Intersection Observer options
 * @param immediate - If true, section is visible immediately (for hero sections)
 */
export function useScrollAnimation(options = {}, immediate = false) {
  const target = ref(null)
  const isVisible = ref(immediate)

  // Mobile-optimized settings for faster/earlier animations
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  const defaultOptions = {
    threshold: isMobile ? 0.05 : 0.15, // Lower threshold on mobile
    rootMargin: isMobile ? '0px 0px -50px 0px' : '0px 0px -100px 0px', // Less margin on mobile
    ...options
  }

  onMounted(() => {
    // Skip observer if immediate visibility is requested
    if (immediate) {
      isVisible.value = true
      return
    }

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

