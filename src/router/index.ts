import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MarketplaceView from '../views/MarketplaceView.vue'
import ProductDetailView from '../views/ProductDetailView.vue'
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
    {
      path: '/politica-de-privacidade',
      name: 'privacy-policy',
      component: PrivacyPolicyView
    },
    {
      path: '/termos-de-servico',
      name: 'terms-of-service',
      component: TermsOfServiceView
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

