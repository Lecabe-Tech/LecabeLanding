import { ref } from 'vue'
import { defineStore } from 'pinia'

/**
 * Contact form data interface
 */
export interface ContactFormData {
  name: string
  email: string
  phone: string
  message: string
  language: string
}

/**
 * Store for contact form management
 * Handles form submission and status
 */
export const useContactStore = defineStore('contact', () => {
  const isSubmitting = ref(false)
  const submitStatus = ref<'idle' | 'success' | 'error'>('idle')
  const errorMessage = ref('')

  /**
   * Submit contact form
   * @param formData - Contact form data
   * @returns Promise<boolean> - Success status
   */
  const submitContactForm = async (formData: ContactFormData): Promise<boolean> => {
    isSubmitting.value = true
    submitStatus.value = 'idle'
    errorMessage.value = ''

    try {
      // Simulate API call - replace with actual API endpoint
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Log form data (in production, this would be sent to backend)
      console.log('Contact form submitted:', formData)
      
      submitStatus.value = 'success'
      isSubmitting.value = false
      
      return true
    } catch (error) {
      console.error('Error submitting contact form:', error)
      submitStatus.value = 'error'
      errorMessage.value = 'Failed to submit form. Please try again.'
      isSubmitting.value = false
      
      return false
    }
  }

  /**
   * Reset form status
   */
  const resetStatus = (): void => {
    submitStatus.value = 'idle'
    errorMessage.value = ''
  }

  return {
    isSubmitting,
    submitStatus,
    errorMessage,
    submitContactForm,
    resetStatus
  }
})

