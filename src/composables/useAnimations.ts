/**
 * Composable for managing animations
 * Provides utilities for various animation effects
 */
export function useAnimations() {
  /**
   * Fade in up animation
   * @param delay - Animation delay in ms
   */
  const fadeInUp = (delay = 0) => {
    return {
      class: 'animate-fade-in-up',
      style: delay > 0 ? { animationDelay: `${delay}ms` } : {}
    }
  }

  /**
   * Fade in animation
   * @param delay - Animation delay in ms
   */
  const fadeIn = (delay = 0) => {
    return {
      class: 'animate-fade-in',
      style: delay > 0 ? { animationDelay: `${delay}ms` } : {}
    }
  }

  /**
   * Slide in from left animation
   * @param delay - Animation delay in ms
   */
  const slideInLeft = (delay = 0) => {
    return {
      class: 'animate-slide-in-left',
      style: delay > 0 ? { animationDelay: `${delay}ms` } : {}
    }
  }

  /**
   * Slide in from right animation
   * @param delay - Animation delay in ms
   */
  const slideInRight = (delay = 0) => {
    return {
      class: 'animate-slide-in-right',
      style: delay > 0 ? { animationDelay: `${delay}ms` } : {}
    }
  }

  /**
   * Scale in animation
   * @param delay - Animation delay in ms
   */
  const scaleIn = (delay = 0) => {
    return {
      class: 'animate-scale-in',
      style: delay > 0 ? { animationDelay: `${delay}ms` } : {}
    }
  }

  /**
   * Stagger children animations
   * @param childrenCount - Number of children to stagger
   * @param baseDelay - Base delay between each child in ms
   */
  const staggerChildren = (childrenCount: number, baseDelay = 100) => {
    return Array.from({ length: childrenCount }, (_, i) => ({
      delay: i * baseDelay,
      class: `animation-delay-${i * baseDelay}`
    }))
  }

  return {
    fadeInUp,
    fadeIn,
    slideInLeft,
    slideInRight,
    scaleIn,
    staggerChildren
  }
}

