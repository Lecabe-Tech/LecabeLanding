import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
// TEMPORARILY DISABLED - Products section
// import MarketplaceView from '../views/MarketplaceView.vue'
// import ProductDetailView from '../views/ProductDetailView.vue'
import PrivacyPolicyView from '../views/PrivacyPolicyView.vue'
import TermsOfServiceView from '../views/TermsOfServiceView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    // TEMPORARILY DISABLED - Products routes
    /*
    {
      path: '/produtos',
      name: 'produtos',
      component: MarketplaceView
    },
    {
      path: '/produtos/:id',
      name: 'product-detail',
      component: ProductDetailView
    },
    */
    {
      path: '/politica-de-privacidade',
      name: 'privacy-policy',
      component: PrivacyPolicyView
    },
    {
      path: '/termos-de-servico',
      name: 'terms-of-service',
      component: TermsOfServiceView
    },
    {
      path: '/servicos',
      name: 'services-overview',
      component: () => import('../views/services/ServicesOverviewView.vue')
    },
    {
      path: '/servicos/desenvolvimento-software',
      name: 'service-software',
      component: () => import('../views/services/ServiceSoftwareView.vue')
    },
    {
      path: '/servicos/cloud',
      name: 'service-cloud',
      component: () => import('../views/services/ServiceCloudView.vue')
    },
    {
      path: '/servicos/ux-design',
      name: 'service-ux',
      component: () => import('../views/services/ServiceUXView.vue')
    },
    {
      path: '/servicos/inteligencia-artificial',
      name: 'service-ai',
      component: () => import('../views/services/ServiceAIView.vue')
    },
    {
      path: '/empresa',
      name: 'company-overview',
      component: () => import('../views/company/CompanyOverviewView.vue')
    },
    {
      path: '/empresa/sobre',
      name: 'company-about',
      component: () => import('../views/company/CompanyAboutView.vue')
    },
    {
      path: '/empresa/equipe',
      name: 'company-team',
      component: () => import('../views/company/CompanyTeamView.vue')
    },
    {
      path: '/empresa/cultura',
      name: 'company-culture',
      component: () => import('../views/company/CompanyCultureView.vue')
    },
    {
      path: '/empresa/carreiras',
      name: 'company-careers',
      component: () => import('../views/company/CompanyCareersView.vue')
    }
  ],
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    }
    return { top: 0, behavior: 'smooth' }
  }
})

export default router

