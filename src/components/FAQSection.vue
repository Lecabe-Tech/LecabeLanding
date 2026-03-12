<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useScrollAnimation } from '@/composables/useScrollAnimation'

const { t, tm } = useI18n()
const sectionRef = useScrollAnimation()

interface FAQItem {
  question: string
  answer: string
}

const faqItems = computed<FAQItem[]>(() => {
  return tm('faq.items') as FAQItem[]
})

const openIndex = ref<number | null>(null)

const toggleFAQ = (index: number) => {
  openIndex.value = openIndex.value === index ? null : index
}

const isOpen = (index: number): boolean => {
  return openIndex.value === index
}
</script>

<template>
  <section
    id="faq"
    :ref="sectionRef.target"
    class="py-16 md:py-24 px-6 md:px-12"
    :class="[
      sectionRef.isVisible.value ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
    ]"
  >
    <div class="max-w-7xl mx-auto">
      <!-- Layout Side-by-Side: Header à esquerda + Accordion à direita -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
        <!-- Lado Esquerdo - Header Sticky -->
        <div class="lg:col-span-4 lg:sticky lg:top-24">
          <div class="flex items-center gap-3 mb-4">
            <img
              src="/assets/logos/simbolo-gradient.png"
              alt="Lecabe"
              class="h-10 w-auto"
            >
          </div>
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {{ t('faq.title') }}
          </h2>
          <p class="text-gray-600 dark:text-gray-400 mb-8">
            Encontre respostas para as perguntas mais comuns sobre nossos serviços e processos
          </p>

          <!-- CTA -->
          <div class="bg-brand-primary/5 dark:bg-brand-light-primary/10 rounded-2xl p-6 border border-brand-primary/10 dark:border-brand-light-primary/20">
            <p class="text-gray-700 dark:text-gray-300 text-sm">
              Ainda tem dúvidas? Nossa equipe está pronta para ajudar.
            </p>
          </div>
        </div>

        <!-- Lado Direito - FAQ Accordion -->
        <div class="lg:col-span-8">
          <div class="space-y-3">
            <div
              v-for="(item, index) in faqItems"
              :key="index"
              class="faq-item bg-white/90 dark:bg-[#1e202d]/90 rounded-xl overflow-hidden border border-gray-100 dark:border-brand-primary/20 transition-all duration-300 backdrop-blur-sm"
              :class="[isOpen(index) ? 'shadow-lg border-brand-primary/20 dark:border-brand-light-primary/30' : 'shadow-sm hover:shadow-md']"
            >
              <!-- Question Button -->
              <button
                class="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-brand-primary dark:focus:ring-brand-light-primary focus:ring-inset"
                :aria-expanded="isOpen(index)"
                :aria-controls="`faq-answer-${index}`"
                @click="toggleFAQ(index)"
              >
                <div class="flex items-center gap-4 pr-4">
                  <span
                    class="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-colors duration-300"
                    :class="[isOpen(index) ? 'bg-brand-primary dark:bg-brand-light-primary text-white dark:text-brand-dark' : 'bg-gray-100 dark:bg-brand-dark text-gray-500 dark:text-gray-400']"
                  >
                    {{ String(index + 1).padStart(2, '0') }}
                  </span>
                  <span class="text-gray-900 dark:text-white font-semibold text-base md:text-lg">
                    {{ item.question }}
                  </span>
                </div>
                <span
                  class="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 dark:bg-brand-dark flex items-center justify-center transition-all duration-300"
                  :class="{ 'rotate-180 bg-brand-primary/10 dark:bg-brand-light-primary/20': isOpen(index) }"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                    class="transition-colors duration-300"
                    :class="[isOpen(index) ? 'text-brand-primary dark:text-brand-light-primary' : 'text-gray-400 dark:text-gray-500']"
                  >
                    <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z" />
                  </svg>
                </span>
              </button>

              <!-- Answer Panel -->
              <Transition
                enter-active-class="transition-all duration-300 ease-out"
                enter-from-class="max-h-0 opacity-0"
                enter-to-class="max-h-96 opacity-100"
                leave-active-class="transition-all duration-200 ease-in"
                leave-from-class="max-h-96 opacity-100"
                leave-to-class="max-h-0 opacity-0"
              >
                <div
                  v-show="isOpen(index)"
                  :id="`faq-answer-${index}`"
                  class="overflow-hidden"
                >
                  <div class="px-6 pb-6 pt-0 pl-[4.5rem]">
                    <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {{ item.answer }}
                    </p>
                  </div>
                </div>
              </Transition>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Estilos específicos do componente */
</style>
