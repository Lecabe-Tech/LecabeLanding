<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  to?: string
  type?: 'button' | 'submit' | 'reset'
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  href: undefined,
  to: undefined,
  type: 'button'
})

const buttonRef = ref<HTMLElement | null>(null)
const magneticX = ref(0)
const magneticY = ref(0)

const handleMouseMove = (event: MouseEvent) => {
  if (!buttonRef.value) return

  const rect = buttonRef.value.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2

  const mouseX = event.clientX
  const mouseY = event.clientY

  const deltaX = (mouseX - centerX) * 0.15
  const deltaY = (mouseY - centerY) * 0.15

  magneticX.value = deltaX
  magneticY.value = deltaY
}

const handleMouseLeave = () => {
  magneticX.value = 0
  magneticY.value = 0
}

const createRipple = (event: MouseEvent) => {
  if (!buttonRef.value) return

  const button = buttonRef.value
  const ripple = document.createElement('span')

  const rect = button.getBoundingClientRect()
  const size = Math.max(rect.width, rect.height)
  const x = event.clientX - rect.left - size / 2
  const y = event.clientY - rect.top - size / 2

  ripple.className = 'btn-ripple'
  ripple.style.width = ripple.style.height = `${size}px`
  ripple.style.left = `${x}px`
  ripple.style.top = `${y}px`

  button.appendChild(ripple)
  setTimeout(() => ripple.remove(), 600)
}

const variantClasses = {
  primary: 'bg-brand-primary hover:bg-brand-dark-primary text-white',
  secondary: 'bg-white dark:bg-brand-medium-dark-primary text-brand-primary dark:text-white border-2 border-brand-primary hover:bg-brand-primary hover:text-white'
}

const sizeClasses = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg'
}
</script>

<template>
  <component
    :is="href ? 'a' : to ? 'router-link' : 'button'"
    ref="buttonRef"
    :href="href"
    :to="to"
    :type="!href && !to ? type : undefined"
    class="btn-magnetic group relative overflow-hidden rounded-lg font-semibold transition-all duration-300 inline-flex items-center gap-2 shadow-lg hover:shadow-xl"
    :class="[variantClasses[variant], sizeClasses[size]]"
    :style="{
      transform: `translate(${magneticX}px, ${magneticY}px)`
    }"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
    @click="createRipple"
  >
    <span class="btn-text relative z-10">
      <slot />
    </span>

    <span class="btn-icon relative z-10 transition-transform duration-300 group-hover:translate-x-1">
      <svg
        class="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 7l5 5m0 0l-5 5m5-5H6"
        />
      </svg>
    </span>
  </component>
</template>

<style scoped>
.btn-magnetic {
  will-change: transform;
}

.btn-ripple {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.6);
  pointer-events: none;
  animation: ripple 0.6s ease-out;
  z-index: 0;
}
</style>
