/**
 * Validation utility functions
 */

/**
 * Validate email format
 * @param email - Email string to validate
 * @returns True if email is valid
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate URL format
 * @param url - URL string to validate
 * @returns True if URL is valid
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * Validate phone number format (Brazilian format)
 * @param phone - Phone number to validate
 * @returns True if phone number is valid
 */
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^\(?([0-9]{2})\)?[-. ]?([0-9]{4,5})[-. ]?([0-9]{4})$/
  return phoneRegex.test(phone)
}

/**
 * Validate CPF format (Brazilian document)
 * @param cpf - CPF to validate
 * @returns True if CPF is valid
 */
export const isValidCPF = (cpf: string): boolean => {
  cpf = cpf.replace(/[^\d]/g, '')

  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
    return false
  }

  let sum = 0
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i)
  }
  let remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== parseInt(cpf.charAt(9))) return false

  sum = 0
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i)
  }
  remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0

  return remainder === parseInt(cpf.charAt(10))
}

/**
 * Check if string is not empty
 * @param value - String to check
 * @returns True if string is not empty
 */
export const isNotEmpty = (value: string): boolean => {
  return value.trim().length > 0
}

/**
 * Check if value meets minimum length requirement
 * @param value - String to check
 * @param minLength - Minimum length required
 * @returns True if value meets minimum length
 */
export const hasMinLength = (value: string, minLength: number): boolean => {
  return value.length >= minLength
}

/**
 * Check if value meets maximum length requirement
 * @param value - String to check
 * @param maxLength - Maximum length allowed
 * @returns True if value meets maximum length
 */
export const hasMaxLength = (value: string, maxLength: number): boolean => {
  return value.length <= maxLength
}

