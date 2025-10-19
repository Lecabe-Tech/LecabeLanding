import { ref } from 'vue'

/**
 * Composable for managing contact form state across components
 */
const prefilledMessage = ref<string>('')
const prefilledSubject = ref<string>('')

export function useContactForm() {
  /**
   * Set prefilled values for contact form
   */
  const setPrefilled = (subject: string, message: string): void => {
    prefilledSubject.value = subject
    prefilledMessage.value = message
  }

  /**
   * Clear prefilled values
   */
  const clearPrefilled = (): void => {
    prefilledSubject.value = ''
    prefilledMessage.value = ''
  }

  /**
   * Get prefilled values
   */
  const getPrefilled = () => ({
    subject: prefilledSubject.value,
    message: prefilledMessage.value
  })

  return {
    setPrefilled,
    clearPrefilled,
    getPrefilled
  }
}

