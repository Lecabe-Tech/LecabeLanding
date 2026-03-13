<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useScrollAnimation } from '@/composables/useScrollAnimation'

const { t, tm } = useI18n()
const sectionRef = useScrollAnimation()
const currentIndex = ref(0)

interface Testimonial {
  quote: string
  author: string
  role: string
  company: string
}

const testimonials = computed<Testimonial[]>(() => {
  return tm('testimonials.items') as Testimonial[]
})

const nextTestimonial = () => {
  currentIndex.value = (currentIndex.value + 1) % testimonials.value.length
}

const prevTestimonial = () => {
  currentIndex.value = currentIndex.value === 0
    ? testimonials.value.length - 1
    : currentIndex.value - 1
}

const goToTestimonial = (index: number) => {
  currentIndex.value = index
}
</script>

<template>
  <section
    id="testimonials"
    :ref="sectionRef.target"
    class="py-16 md:py-24 px-6 md:px-12"
    :class="[
      sectionRef.isVisible.value ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
    ]"
  >
    <div class="max-w-7xl mx-auto">
      <!-- Layout Side-by-Side: Header à esquerda + Cards sobrepostos à direita -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
        <!-- Lado Esquerdo - Header + Navegação -->
        <div class="lg:col-span-4 lg:sticky lg:top-24">
          <div class="flex items-center gap-3 mb-4">
            <img
              src="/assets/logos/simbolo-gradient.png"
              alt="Lecabe"
              class="h-10 w-auto"
            >
          </div>
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {{ t('testimonials.title') }}
          </h2>
          <p class="text-gray-600 dark:text-gray-400 mb-8">
            {{ t('testimonials.subtitle') }}
          </p>

          <!-- Navegação -->
          <div class="flex items-center gap-4">
            <button
              class="w-12 h-12 rounded-full bg-gray-100 dark:bg-brand-dark hover:bg-brand-primary dark:hover:bg-brand-light-primary hover:text-white transition-all duration-300 flex items-center justify-center text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-brand-primary/20"
              aria-label="Previous testimonial"
              @click="prevTestimonial"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z" />
              </svg>
            </button>

            <button
              class="w-12 h-12 rounded-full bg-gray-100 dark:bg-brand-dark hover:bg-brand-primary dark:hover:bg-brand-light-primary hover:text-white transition-all duration-300 flex items-center justify-center text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-brand-primary/20"
              aria-label="Next testimonial"
              @click="nextTestimonial"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z" />
              </svg>
            </button>

            <!-- Dots Indicator -->
            <div class="flex gap-2 ml-2">
              <button
                v-for="(_, index) in testimonials"
                :key="index"
                class="w-2 h-2 rounded-full transition-all duration-300"
                :class="[
                  currentIndex === index
                    ? 'bg-brand-primary dark:bg-brand-light-primary w-6'
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                ]"
                :aria-label="`Go to testimonial ${index + 1}`"
                @click="goToTestimonial(index)"
              />
            </div>
          </div>
        </div>

        <!-- Lado Direito - Cards Sobrepostos -->
        <div class="lg:col-span-8">
          <div class="relative min-h-[400px]">
            <!-- Card Principal (em foco) -->
            <div
              v-for="(testimonial, index) in testimonials"
              :key="index"
              class="testimonial-card absolute inset-0 transition-all duration-500"
              :class="[
                currentIndex === index
                  ? 'opacity-100 z-30 translate-x-0 translate-y-0 scale-100'
                  : currentIndex === (index + 1) % testimonials.length
                    ? 'opacity-60 z-20 translate-x-4 translate-y-4 scale-[0.96]'
                    : currentIndex === (index + 2) % testimonials.length
                      ? 'opacity-30 z-10 translate-x-8 translate-y-8 scale-[0.92]'
                      : 'opacity-0 z-0 translate-x-12 translate-y-12 scale-[0.88]'
              ]"
            >
              <div class="bg-white/90 dark:bg-[#1e202d]/90 rounded-2xl p-8 md:p-10 shadow-xl border border-gray-100 dark:border-brand-primary/20 h-full backdrop-blur-sm">
                <!-- Quote Icon -->
                <div class="w-12 h-12 rounded-xl bg-brand-primary/10 dark:bg-brand-light-primary/20 flex items-center justify-center mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                    class="text-brand-primary dark:text-brand-light-primary"
                  >
                    <path d="M116,72v88a48.05,48.05,0,0,1-48,48,8,8,0,0,1,0-16,32,32,0,0,0,32-32v-8H40a16,16,0,0,1-16-16V72A16,16,0,0,1,40,56h60A16,16,0,0,1,116,72ZM216,56H156a16,16,0,0,0-16,16v64a16,16,0,0,0,16,16h60v8a32,32,0,0,1-32,32,8,8,0,0,0,0,16,48.05,48.05,0,0,0,48-48V72A16,16,0,0,0,216,56Z" />
                  </svg>
                </div>

                <!-- Quote -->
                <p class="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                  "{{ testimonial.quote }}"
                </p>

                <!-- Author Info - Layout Horizontal -->
                <div class="flex items-center gap-4 mt-auto">
                  <!-- Avatar -->
                  <div class="w-14 h-14 rounded-full bg-gradient-to-br from-brand-primary to-brand-light-primary flex items-center justify-center flex-shrink-0">
                    <span class="text-white text-lg font-bold">
                      {{ testimonial.author.charAt(0) }}
                    </span>
                  </div>

                  <div class="flex flex-col">
                    <h4 class="text-gray-900 dark:text-white font-semibold text-base">
                      {{ testimonial.author }}
                    </h4>
                    <p class="text-brand-primary dark:text-brand-light-primary font-medium text-sm">
                      {{ testimonial.role }}
                    </p>
                    <p class="text-gray-500 dark:text-gray-400 text-sm">
                      {{ testimonial.company }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Component-specific styles */
</style>
