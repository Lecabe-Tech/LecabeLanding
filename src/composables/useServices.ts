import { computed } from 'vue'
import type { Service, ServiceId } from '@/types/service'

/**
 * Composable for managing services data and navigation
 */
export const useServices = () => {
  const services: Service[] = [
    {
      id: 'software',
      slug: 'desenvolvimento-software',
      route: '/servicos/desenvolvimento-software',
      gradient: 'from-brand-primary to-brand-dark-primary',
      accentColor: '#4F52FF',
      icon: 'code'
    },
    {
      id: 'cloud',
      slug: 'cloud',
      route: '/servicos/cloud',
      gradient: 'from-brand-alternative to-emerald-600',
      accentColor: '#2FE0B0',
      icon: 'cloud'
    },
    {
      id: 'ux',
      slug: 'ux-design',
      route: '/servicos/ux-design',
      gradient: 'from-purple-500 to-pink-500',
      accentColor: '#A855F7',
      icon: 'design'
    },
    {
      id: 'ai',
      slug: 'inteligencia-artificial',
      route: '/servicos/inteligencia-artificial',
      gradient: 'from-orange-500 to-red-600',
      accentColor: '#F97316',
      icon: 'ai'
    }
  ]

  /**
   * Get service by ID
   */
  const getServiceById = (id: ServiceId): Service | undefined => {
    return services.find(service => service.id === id)
  }

  /**
   * Get service by slug
   */
  const getServiceBySlug = (slug: string): Service | undefined => {
    return services.find(service => service.slug === slug)
  }

  /**
   * Get adjacent services (previous and next) for navigation
   */
  const getAdjacentServices = (id: ServiceId): { prev: Service | null; next: Service | null } => {
    const currentIndex = services.findIndex(service => service.id === id)

    if (currentIndex === -1) {
      return { prev: null, next: null }
    }

    const prev = currentIndex > 0 ? services[currentIndex - 1] : null
    const next = currentIndex < services.length - 1 ? services[currentIndex + 1] : null

    return { prev, next }
  }

  /**
   * Get all services
   */
  const listAllServices = computed(() => services)

  return {
    services: listAllServices,
    getServiceById,
    getServiceBySlug,
    getAdjacentServices
  }
}
