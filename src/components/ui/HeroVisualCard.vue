<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const cardRef = ref<HTMLElement | null>(null)
const rotateX = ref(0)
const rotateY = ref(0)
const currentLineIndex = ref(0)
const currentCharIndex = ref(0)
const displayedCode = ref('')

const codeLines = [
  'const solution = await ai.generate({',
  '  prompt: "Optimize business",',
  '  context: userData,',
  '  model: "lecabe-engine"',
  '});',
  '',
  'return solution.execute();'
]

let typingInterval: ReturnType<typeof setInterval> | null = null

const handleMouseMove = (event: MouseEvent) => {
  if (!cardRef.value) return

  const rect = cardRef.value.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2

  const mouseX = event.clientX
  const mouseY = event.clientY

  const deltaX = ((mouseX - centerX) / rect.width) * 20
  const deltaY = ((mouseY - centerY) / rect.height) * 20

  rotateY.value = deltaX
  rotateX.value = -deltaY
}

const handleMouseLeave = () => {
  rotateX.value = 0
  rotateY.value = 0
}

const startTyping = () => {
  typingInterval = setInterval(() => {
    if (currentLineIndex.value >= codeLines.length) {
      if (typingInterval) clearInterval(typingInterval)
      setTimeout(() => {
        currentLineIndex.value = 0
        currentCharIndex.value = 0
        displayedCode.value = ''
        startTyping()
      }, 2000)
      return
    }

    const currentLine = codeLines[currentLineIndex.value]

    if (currentCharIndex.value < currentLine.length) {
      displayedCode.value += currentLine[currentCharIndex.value]
      currentCharIndex.value++
    } else {
      displayedCode.value += '\n'
      currentLineIndex.value++
      currentCharIndex.value = 0
    }
  }, 50)
}

onMounted(() => {
  startTyping()
})

onUnmounted(() => {
  if (typingInterval) clearInterval(typingInterval)
})
</script>

<template>
  <div
    ref="cardRef"
    class="hero-visual-card relative w-full max-w-2xl mx-auto perspective-container"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <!-- Main 3D Card -->
    <div
      class="iso-app-window relative bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-950 dark:to-gray-900 rounded-2xl p-6 shadow-2xl border border-gray-700 dark:border-gray-800 overflow-hidden transition-transform duration-300 ease-out"
      :style="{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
      }"
    >
      <!-- Window Header -->
      <div class="flex items-center gap-2 mb-4 pb-3 border-b border-gray-700">
        <div class="w-3 h-3 rounded-full bg-red-500" />
        <div class="w-3 h-3 rounded-full bg-yellow-500" />
        <div class="w-3 h-3 rounded-full bg-green-500" />
        <span class="ml-3 text-gray-400 text-sm font-mono">app.ts</span>
      </div>

      <!-- Code Editor with Typing Animation -->
      <div class="code-editor bg-gray-950/50 rounded-lg p-4 font-mono text-sm min-h-[200px]">
        <pre class="text-gray-300 leading-relaxed"><code><span class="text-purple-400">{{ displayedCode }}</span><span class="animate-pulse">|</span></code></pre>
      </div>

      <!-- Background Grid -->
      <div class="absolute inset-0 opacity-10 pointer-events-none">
        <div
          class="absolute inset-0"
          style="background-image: repeating-linear-gradient(0deg, transparent, transparent 35px, rgba(79, 82, 255, 0.3) 35px, rgba(79, 82, 255, 0.3) 36px), repeating-linear-gradient(90deg, transparent, transparent 35px, rgba(79, 82, 255, 0.3) 35px, rgba(79, 82, 255, 0.3) 36px);"
        />
      </div>

      <!-- Glow Effect -->
      <div class="absolute -inset-1 bg-gradient-to-r from-brand-primary via-brand-alternative to-brand-primary opacity-20 blur-xl -z-10 rounded-2xl" />
    </div>

    <!-- Floating Badges -->
    <div
      class="floating-badge absolute -top-4 -right-4 bg-gradient-to-br from-brand-primary to-brand-dark-primary text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg z-10"
      :style="{ animationDelay: '0s' }"
    >
      ⚡ API Connected
    </div>

    <div
      class="floating-badge absolute top-1/4 -left-8 bg-gradient-to-br from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg z-10"
      :style="{ animationDelay: '0.5s' }"
    >
      ✓ 99.9% Uptime
    </div>

    <div
      class="floating-badge absolute -bottom-6 left-1/4 bg-gradient-to-br from-blue-500 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg z-10"
      :style="{ animationDelay: '1s' }"
    >
      TypeScript
    </div>

    <div
      class="floating-badge absolute bottom-1/3 -right-8 bg-gradient-to-br from-purple-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg z-10"
      :style="{ animationDelay: '1.5s' }"
    >
      🚀 CI/CD
    </div>
  </div>
</template>

<style scoped>
.perspective-container {
  perspective: 1500px;
}

.iso-app-window {
  transform-style: preserve-3d;
  will-change: transform;
}

.floating-badge {
  animation: float-gentle 3s ease-in-out infinite;
  backdrop-filter: blur(8px);
}

@keyframes float-gentle {
  0%, 100% {
    transform: translateY(0) translateX(0) rotate(-2deg);
  }
  50% {
    transform: translateY(-12px) translateX(4px) rotate(2deg);
  }
}
</style>
