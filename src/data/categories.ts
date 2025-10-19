import type { Category } from '@/types/product'

/**
 * Mock categories data - simulating API response from /products/categories
 */
export const mockCategories: Category[] = [
  {
    id: 'all',
    name: 'Todos',
    link: '/marketplace',
    icon: 'https://cdn.jsdelivr.net/npm/heroicons@2.0.18/24/outline/squares-2x2.svg'
  },
  {
    id: 'wms',
    name: 'WMS',
    link: '/marketplace?category=wms',
    icon: 'https://cdn.jsdelivr.net/npm/heroicons@2.0.18/24/outline/building-office-2.svg'
  },
  {
    id: 'ai',
    name: 'IA',
    link: '/marketplace?category=ai',
    icon: 'https://cdn.jsdelivr.net/npm/heroicons@2.0.18/24/outline/cpu-chip.svg'
  },
  {
    id: 'erp',
    name: 'ERP',
    link: '/marketplace?category=erp',
    icon: 'https://cdn.jsdelivr.net/npm/heroicons@2.0.18/24/outline/building-office.svg'
  },
  {
    id: 'chatbots',
    name: 'Chatbots',
    link: '/marketplace?category=chatbots',
    icon: 'https://cdn.jsdelivr.net/npm/heroicons@2.0.18/24/outline/chat-bubble-left-right.svg'
  },
  {
    id: 'automation',
    name: 'Automação',
    link: '/marketplace?category=automation',
    icon: 'https://cdn.jsdelivr.net/npm/heroicons@2.0.18/24/outline/cog-6-tooth.svg'
  },
  {
    id: 'analytics',
    name: 'Analytics',
    link: '/marketplace?category=analytics',
    icon: 'https://cdn.jsdelivr.net/npm/heroicons@2.0.18/24/outline/chart-bar-square.svg'
  },
  {
    id: 'crm',
    name: 'CRM',
    link: '/marketplace?category=crm',
    icon: 'https://cdn.jsdelivr.net/npm/heroicons@2.0.18/24/outline/users.svg'
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    link: '/marketplace?category=ecommerce',
    icon: 'https://cdn.jsdelivr.net/npm/heroicons@2.0.18/24/outline/shopping-cart.svg'
  },
  {
    id: 'mobile',
    name: 'Mobile',
    link: '/marketplace?category=mobile',
    icon: 'https://cdn.jsdelivr.net/npm/heroicons@2.0.18/24/outline/device-phone-mobile.svg'
  },
  {
    id: 'web',
    name: 'Web',
    link: '/marketplace?category=web',
    icon: 'https://cdn.jsdelivr.net/npm/heroicons@2.0.18/24/outline/globe-alt.svg'
  },
  {
    id: 'cloud',
    name: 'Nuvem',
    link: '/marketplace?category=cloud',
    icon: 'https://cdn.jsdelivr.net/npm/heroicons@2.0.18/24/outline/cloud.svg'
  }
]

/**
 * Simulate API call to fetch categories
 */
export const fetchCategories = async (): Promise<Category[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300))
  
  return mockCategories
}
