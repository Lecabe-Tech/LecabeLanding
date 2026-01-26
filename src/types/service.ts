/**
 * Service types for Lecabe services pages
 */

export interface Service {
  id: string
  slug: string
  route: string
  gradient: string
  accentColor: string
  icon: 'code' | 'cloud' | 'design' | 'ai'
}

export interface ServiceFeature {
  id: string
  icon: string
  title: string
  description: string
  size?: 'small' | 'medium' | 'large'
  gridPosition?: string // Tailwind classes for Bento Grid (e.g., 'col-span-2 row-span-2')
}

export interface ProcessStep {
  title: string
  description: string
  icon?: string
  duration?: string
  deliverables?: string[]
}

export interface TechItem {
  name: string
  category?: 'frontend' | 'backend' | 'database' | 'devops' | 'mobile'
  icon?: string
}

export interface Package {
  id: string
  name: string
  description: string
  price?: string
  features: string[]
  highlighted?: boolean
}

export interface FAQ {
  question: string
  answer: string
}

export interface ServiceDetail {
  id: string
  slug: string
  route: string
  gradient: string
  accentColor: string
  icon: 'code' | 'cloud' | 'design' | 'ai'
  features: ServiceFeature[]
  process: ProcessStep[]
  techStack: TechItem[]
  packages: Package[]
}

export type ServiceId = 'software' | 'cloud' | 'ux' | 'ai'
