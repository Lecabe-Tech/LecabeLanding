<script setup lang="ts">
import { ref } from 'vue'
import type { ProcessStep } from '@/types/service'
import GlassCard from '@/components/ui/GlassCard.vue'

interface Props {
  steps: ProcessStep[]
  accentColor?: string
}

defineProps<Props>()

const expandedStep = ref<number | null>(null)

const toggleStep = (index: number) => {
  expandedStep.value = expandedStep.value === index ? null : index
}
</script>

<template>
  <div class="relative">
    <!-- Progress Line -->
    <div class="absolute left-7 top-7 bottom-7 w-0.5 bg-gradient-to-b from-brand-primary via-brand-primary to-gray-200 dark:to-brand-medium-dark-primary hidden md:block" />

    <!-- Steps -->
    <div class="space-y-6">
      <div
        v-for="(step, index) in steps"
        :key="index"
        class="flex gap-6 group animate-fade-in-up relative"
        :style="{ animationDelay: `${index * 0.1}s` }"
      >
        <!-- Número -->
        <div class="flex-shrink-0 relative z-10">
          <div class="w-14 h-14 rounded-full bg-gradient-to-br from-brand-primary to-brand-dark-primary dark:from-brand-light-primary dark:to-brand-primary text-white flex items-center justify-center font-bold text-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
            {{ index + 1 }}
          </div>
        </div>

        <!-- Card de Conteúdo -->
        <div class="flex-1">
          <GlassCard
            padding="md"
            class="h-full"
          >
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-brand-primary dark:group-hover:text-brand-light-primary transition-colors duration-300">
              {{ step.title }}
            </h3>
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
              {{ step.description }}
            </p>

            <div class="flex items-center justify-between">
              <span
                v-if="step.duration"
                class="inline-flex items-center gap-2 text-sm text-brand-primary dark:text-brand-light-primary font-semibold"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z" />
                </svg>
                {{ step.duration }}
              </span>

              <!-- Botão Expandir Deliverables -->
              <button
                v-if="step.deliverables && step.deliverables.length > 0"
                class="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-brand-primary dark:hover:text-brand-light-primary transition-colors duration-300 font-medium"
                @click="toggleStep(index)"
              >
                <span>{{ expandedStep === index ? 'Ocultar' : 'Ver' }} Entregas</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                  class="transition-transform duration-300"
                  :class="expandedStep === index ? 'rotate-180' : ''"
                >
                  <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z" />
                </svg>
              </button>
            </div>

            <!-- Lista de Deliverables Expansível -->
            <Transition name="expand">
              <div
                v-if="expandedStep === index && step.deliverables"
                class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
              >
                <p class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Entregas desta fase:
                </p>
                <ul class="space-y-2">
                  <li
                    v-for="(deliverable, dIndex) in step.deliverables"
                    :key="dIndex"
                    class="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400 animate-fade-in-up"
                    :style="{ animationDelay: `${dIndex * 0.05}s` }"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      fill="currentColor"
                      viewBox="0 0 256 256"
                      class="flex-shrink-0 text-brand-primary dark:text-brand-light-primary mt-0.5"
                    >
                      <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
                    </svg>
                    <span>{{ deliverable }}</span>
                  </li>
                </ul>
              </div>
            </Transition>
          </GlassCard>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
  max-height: 500px;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-10px);
}
</style>
