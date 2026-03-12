<script setup lang="ts">
import { computed } from 'vue'
import ButtonMagnetic from '@/components/ui/ButtonMagnetic.vue'

interface Props {
  title: string
  subtitle: string
  ctaText: string
  gradient: string
  accentColor?: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'cta-click': []
}>()

const gradientClass = computed(() => `bg-gradient-to-br ${props.gradient}`)
</script>

<template>
  <section
    :class="gradientClass"
    class="relative py-20 md:py-28 overflow-hidden"
  >
    <!-- Background decorativo -->
    <div class="absolute inset-0 opacity-10">
      <div class="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
      <div class="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
    </div>

    <div class="relative max-w-7xl mx-auto px-6 md:px-12">
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <!-- Conteúdo -->
        <div class="text-white">
          <h1 class="text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-6 animate-fade-in-up">
            {{ title }}
          </h1>
          <p
            class="text-lg md:text-xl lg:text-2xl mb-8 text-white/90 leading-relaxed animate-fade-in-up"
            style="animation-delay: 0.1s"
          >
            {{ subtitle }}
          </p>
          <div
            class="animate-fade-in-up"
            style="animation-delay: 0.2s"
          >
            <ButtonMagnetic
              variant="secondary"
              size="lg"
              @click="emit('cta-click')"
            >
              {{ ctaText }}
            </ButtonMagnetic>
          </div>
        </div>

        <!-- Slot para visual/ilustração -->
        <div
          class="animate-fade-in"
          style="animation-delay: 0.3s"
        >
          <slot name="visual">
            <!-- Placeholder visual se nenhum slot fornecido -->
            <div class="aspect-square bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="200"
                height="200"
                fill="white"
                viewBox="0 0 256 256"
                class="opacity-50"
              >
                <path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48Zm-96,85.15L52.57,64H203.43ZM98.71,128,40,181.81V74.19Zm11.84,10.85,12,11.05a8,8,0,0,0,10.82,0l12-11.05,58,53.15H52.57ZM157.29,128,216,74.18V181.82Z" />
              </svg>
            </div>
          </slot>
        </div>
      </div>
    </div>
  </section>
</template>
