<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Package } from '@/types/service'
import GlassCard from '@/components/ui/GlassCard.vue'

interface Props {
  packages: Package[]
  accentColor?: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'select-package': [pkg: Package]
}>()

const comparisonMode = ref(false)

// Extrair todas as features únicas de todos os pacotes
const allFeatures = computed(() => {
  const featuresSet = new Set<string>()
  props.packages.forEach(pkg => {
    pkg.features.forEach(feature => featuresSet.add(feature))
  })
  return Array.from(featuresSet)
})

// Verificar se um pacote tem uma feature específica
const packageHasFeature = (pkg: Package, feature: string): boolean => {
  return pkg.features.includes(feature)
}
</script>

<template>
  <div>
    <!-- Toggle Modo Comparação -->
    <div class="flex justify-center mb-8">
      <button
        class="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-brand-dark rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-brand-medium-dark-primary transition-colors"
        @click="comparisonMode = !comparisonMode"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 256 256"
        >
          <path d="M224,48H32a8,8,0,0,0-8,8V200a8,8,0,0,0,8,8H224a8,8,0,0,0,8-8V56A8,8,0,0,0,224,48ZM40,112H80v32H40Zm56,0H216v32H96ZM216,64V96H40V64ZM40,160H80v32H40Zm176,32H96V160H216v32Z" />
        </svg>
        <span>{{ comparisonMode ? 'Ver Cartões' : 'Comparar Planos' }}</span>
      </button>
    </div>

    <!-- Modo Normal: Cartões -->
    <div
      v-if="!comparisonMode"
      class="grid md:grid-cols-3 gap-6 lg:gap-8"
    >
      <div
        v-for="pkg in packages"
        :key="pkg.id"
        class="relative"
      >
        <!-- Badge "Recomendado" -->
        <div
          v-if="pkg.highlighted"
          class="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-brand-primary to-brand-dark-primary dark:from-brand-light-primary dark:to-brand-primary text-white text-sm font-semibold rounded-full shadow-lg z-20"
        >
          Recomendado
        </div>

        <GlassCard
          :variant="pkg.highlighted ? 'featured' : 'default'"
          padding="lg"
          class="h-full flex flex-col"
        >
          <!-- Header -->
          <div class="text-center mb-6">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {{ pkg.name }}
            </h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm mb-4">
              {{ pkg.description }}
            </p>
            <div class="text-3xl font-bold text-brand-primary dark:text-brand-light-primary">
              {{ pkg.price }}
            </div>
          </div>

          <!-- Features -->
          <ul class="space-y-3 mb-8 flex-1">
            <li
              v-for="(feature, index) in pkg.features"
              :key="index"
              class="flex items-start gap-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 256 256"
                class="text-brand-primary dark:text-brand-light-primary flex-shrink-0 mt-0.5"
              >
                <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
              </svg>
              <span class="text-sm text-gray-700 dark:text-gray-300">
                {{ feature }}
              </span>
            </li>
          </ul>

          <!-- CTA Button -->
          <div class="mt-auto">
            <button
              :class="[
                'w-full py-3 px-6 rounded-xl font-semibold text-sm transition-all duration-300',
                pkg.highlighted
                  ? 'bg-gradient-to-r from-brand-primary to-brand-dark-primary dark:from-brand-light-primary dark:to-brand-primary text-white hover:shadow-lg hover:scale-105'
                  : 'bg-gray-100 dark:bg-brand-dark text-gray-900 dark:text-white hover:bg-brand-primary dark:hover:bg-brand-light-primary hover:text-white'
              ]"
              @click="emit('select-package', pkg)"
            >
              Escolher Plano
            </button>
          </div>
        </GlassCard>
      </div>
    </div>

    <!-- Modo Comparação: Tabela -->
    <div v-else>
      <GlassCard padding="md">
        <div class="overflow-x-auto -mx-6 px-6">
          <table class="w-full min-w-full">
            <thead>
              <tr class="border-b border-gray-200 dark:border-gray-700">
                <th class="text-left py-4 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Recursos
                </th>
                <th
                  v-for="pkg in packages"
                  :key="`header-${pkg.id}`"
                  class="text-center py-4 px-4"
                >
                  <div class="relative">
                    <div
                      v-if="pkg.highlighted"
                      class="absolute -top-6 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-brand-primary to-brand-dark-primary text-white text-xs font-semibold rounded-full shadow-md whitespace-nowrap"
                    >
                      Recomendado
                    </div>
                    <div class="text-lg font-bold text-gray-900 dark:text-white">
                      {{ pkg.name }}
                    </div>
                    <div class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {{ pkg.price }}
                    </div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(feature, index) in allFeatures"
                :key="`feature-${index}`"
                class="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-brand-dark/30 transition-colors"
              >
                <td class="py-3 px-4 text-sm text-gray-700 dark:text-gray-300">
                  {{ feature }}
                </td>
                <td
                  v-for="pkg in packages"
                  :key="`${pkg.id}-${index}`"
                  class="text-center py-3 px-4"
                >
                  <svg
                    v-if="packageHasFeature(pkg, feature)"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                    class="text-brand-primary dark:text-brand-light-primary mx-auto"
                  >
                    <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
                  </svg>
                  <svg
                    v-else
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                    class="text-gray-300 dark:text-gray-700 mx-auto"
                  >
                    <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Z" />
                  </svg>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td class="py-4 px-4" />
                <td
                  v-for="pkg in packages"
                  :key="`footer-${pkg.id}`"
                  class="text-center py-4 px-4"
                >
                  <button
                    :class="[
                      'w-full py-2 px-4 rounded-lg font-semibold text-sm transition-all duration-300',
                      pkg.highlighted
                        ? 'bg-gradient-to-r from-brand-primary to-brand-dark-primary dark:from-brand-light-primary dark:to-brand-primary text-white hover:shadow-lg hover:scale-105'
                        : 'bg-gray-100 dark:bg-brand-dark text-gray-900 dark:text-white hover:bg-brand-primary dark:hover:bg-brand-light-primary hover:text-white'
                    ]"
                    @click="emit('select-package', pkg)"
                  >
                    Escolher
                  </button>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </GlassCard>
    </div>
  </div>
</template>

<style scoped>
/* Ocultar scrollbar padrão mas permitir scroll quando necessário */
.overflow-x-auto {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.overflow-x-auto::-webkit-scrollbar {
  display: none;
}

/* Em mobile, permitir scroll suave se necessário */
@media (max-width: 768px) {
  .overflow-x-auto {
    scrollbar-width: thin;
    scrollbar-color: rgba(79, 82, 255, 0.3) transparent;
  }

  .overflow-x-auto::-webkit-scrollbar {
    display: block;
    height: 4px;
  }

  .overflow-x-auto::-webkit-scrollbar-track {
    background: transparent;
  }

  .overflow-x-auto::-webkit-scrollbar-thumb {
    background-color: rgba(79, 82, 255, 0.3);
    border-radius: 2px;
  }
}

/* Ajustar colunas da tabela para não quebrar */
table {
  table-layout: auto;
}

table th,
table td {
  white-space: nowrap;
  min-width: 120px;
}

table th:first-child,
table td:first-child {
  white-space: normal;
  min-width: 200px;
  max-width: 300px;
}

/* Em desktop, remover min-width para tabela fluida */
@media (min-width: 1024px) {
  table th,
  table td {
    min-width: auto;
  }
}
</style>
