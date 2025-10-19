import { ref, computed } from 'vue'

/**
 * Composable for counter functionality
 * Demonstrates reactive state management using Vue Composition API
 */
export function useCounter(initialValue = 0) {
  /**
   * Current counter value
   */
  const count = ref(initialValue)

  /**
   * Double the current counter value
   */
  const doubleCount = computed(() => count.value * 2)

  /**
   * Check if counter is positive
   */
  const isPositive = computed(() => count.value > 0)

  /**
   * Increment counter by specified amount
   * @param amount - Amount to increment (default: 1)
   */
  const increment = (amount = 1): void => {
    count.value += amount
  }

  /**
   * Decrement counter by specified amount
   * @param amount - Amount to decrement (default: 1)
   */
  const decrement = (amount = 1): void => {
    count.value -= amount
  }

  /**
   * Reset counter to initial value or specified value
   * @param value - Value to reset to (default: initialValue)
   */
  const reset = (value = initialValue): void => {
    count.value = value
  }

  return {
    count,
    doubleCount,
    isPositive,
    increment,
    decrement,
    reset
  }
}

