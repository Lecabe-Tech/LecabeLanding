<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

interface Props {
  serviceType: 'software' | 'cloud' | 'ux' | 'ai'
  metrics?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  metrics: () => []
})

const visualRef = ref<HTMLElement | null>(null)
const rotateX = ref(0)
const rotateY = ref(0)
const currentLineIndex = ref(0)
const currentCharIndex = ref(0)
const displayedCode = ref('')

// Código para animação de typing (Software)
const codeLines = [
  'const app = createApp({',
  '  api: "REST + GraphQL",',
  '  auth: "JWT + OAuth2",',
  '  cache: "Redis"',
  '});',
  '',
  'app.deploy({ uptime: "99.9%" });'
]

// Cloud network nodes
const cloudNodes = ref<Array<{ x: number; y: number; connected: boolean }>>([])

let typingInterval: ReturnType<typeof setInterval> | null = null
let networkInterval: ReturnType<typeof setInterval> | null = null

const handleMouseMove = (event: MouseEvent) => {
  if (!visualRef.value) return

  const rect = visualRef.value.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2

  const mouseX = event.clientX
  const mouseY = event.clientY

  const deltaX = ((mouseX - centerX) / rect.width) * 15
  const deltaY = ((mouseY - centerY) / rect.height) * 15

  rotateY.value = deltaX
  rotateX.value = -deltaY
}

const handleMouseLeave = () => {
  rotateX.value = 0
  rotateY.value = 0
}

const startTypingAnimation = () => {
  typingInterval = setInterval(() => {
    if (currentLineIndex.value >= codeLines.length) {
      if (typingInterval) clearInterval(typingInterval)
      setTimeout(() => {
        currentLineIndex.value = 0
        currentCharIndex.value = 0
        displayedCode.value = ''
        startTypingAnimation()
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

const initCloudNetwork = () => {
  // Inicializar nodes da rede cloud
  cloudNodes.value = Array.from({ length: 6 }, (_, i) => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    connected: i === 0
  }))

  // Animar conexões
  networkInterval = setInterval(() => {
    const disconnectedIndex = cloudNodes.value.findIndex(n => !n.connected)
    if (disconnectedIndex !== -1) {
      cloudNodes.value[disconnectedIndex].connected = true
    } else {
      cloudNodes.value.forEach(n => n.connected = false)
      cloudNodes.value[0].connected = true
    }
  }, 800)
}

const metricsWithDelay = computed(() => {
  return props.metrics.map((metric, index) => ({
    text: metric,
    delay: index * 0.3
  }))
})

onMounted(() => {
  if (props.serviceType === 'software') {
    startTypingAnimation()
  } else if (props.serviceType === 'cloud') {
    initCloudNetwork()
  }
})

onUnmounted(() => {
  if (typingInterval) clearInterval(typingInterval)
  if (networkInterval) clearInterval(networkInterval)
})
</script>

<template>
  <div
    ref="visualRef"
    class="service-hero-visual relative w-full h-full min-h-[400px] perspective-container"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <!-- Software: Code Window -->
    <div
      v-if="serviceType === 'software'"
      class="visual-card bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-950 dark:to-gray-900 rounded-2xl p-6 shadow-2xl border border-gray-700 dark:border-gray-800 overflow-hidden transition-transform duration-300 ease-out h-full"
      :style="{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
      }"
    >
      <!-- Window Header -->
      <div class="flex items-center gap-2 mb-4 pb-3 border-b border-gray-700">
        <div class="w-3 h-3 rounded-full bg-red-500"></div>
        <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div class="w-3 h-3 rounded-full bg-green-500"></div>
        <span class="ml-3 text-gray-400 text-sm font-mono">application.js</span>
      </div>

      <!-- Code Editor -->
      <div class="code-editor bg-gray-950/50 rounded-lg p-4 font-mono text-sm min-h-[250px]">
        <pre class="text-gray-300 leading-relaxed"><code><span class="text-purple-400">{{ displayedCode }}</span><span class="animate-pulse">|</span></code></pre>
      </div>

      <!-- Background Grid -->
      <div class="absolute inset-0 opacity-10 pointer-events-none">
        <div class="absolute inset-0" style="background-image: repeating-linear-gradient(0deg, transparent, transparent 35px, rgba(79, 82, 255, 0.3) 35px, rgba(79, 82, 255, 0.3) 36px), repeating-linear-gradient(90deg, transparent, transparent 35px, rgba(79, 82, 255, 0.3) 35px, rgba(79, 82, 255, 0.3) 36px);"></div>
      </div>

      <!-- Glow Effect -->
      <div class="absolute -inset-1 bg-gradient-to-r from-brand-primary via-brand-alternative to-brand-primary opacity-20 blur-xl -z-10 rounded-2xl"></div>
    </div>

    <!-- Cloud: Network Visualization -->
    <div
      v-else-if="serviceType === 'cloud'"
      class="visual-card bg-gradient-to-br from-emerald-900/20 to-teal-900/20 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-emerald-500/20 h-full relative overflow-hidden"
      :style="{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
      }"
    >
      <!-- Network Nodes -->
      <svg class="w-full h-full absolute inset-0" xmlns="http://www.w3.org/2000/svg">
        <!-- Connections -->
        <g v-for="(node, i) in cloudNodes" :key="`line-${i}`">
          <line
            v-if="node.connected && cloudNodes[0]"
            :x1="`${cloudNodes[0].x}%`"
            :y1="`${cloudNodes[0].y}%`"
            :x2="`${node.x}%`"
            :y2="`${node.y}%`"
            stroke="rgba(16, 185, 129, 0.4)"
            stroke-width="2"
            class="transition-all duration-500"
          />
        </g>

        <!-- Nodes -->
        <circle
          v-for="(node, i) in cloudNodes"
          :key="`node-${i}`"
          :cx="`${node.x}%`"
          :cy="`${node.y}%`"
          :r="node.connected ? '12' : '8'"
          :fill="node.connected ? 'rgba(16, 185, 129, 0.8)' : 'rgba(100, 116, 139, 0.4)'"
          class="transition-all duration-500"
        >
          <animate
            v-if="node.connected"
            attributeName="r"
            values="12;16;12"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>

      <!-- Central Icon -->
      <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div class="w-20 h-20 rounded-2xl bg-emerald-500/20 backdrop-blur-sm flex items-center justify-center border border-emerald-500/30">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 256 256" class="text-emerald-400">
            <path d="M160,40A88.09,88.09,0,0,0,81.29,88.67,64,64,0,1,0,72,216h88a88,88,0,0,0,0-176Z"/>
          </svg>
        </div>
      </div>
    </div>

    <!-- UX: Design Frames -->
    <div
      v-else-if="serviceType === 'ux'"
      class="visual-card bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-purple-500/20 h-full relative overflow-hidden"
      :style="{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
      }"
    >
      <!-- Design Frames Animation -->
      <div class="relative h-full flex items-center justify-center">
        <!-- Wireframe -->
        <div class="absolute inset-8 bg-gray-800/50 rounded-lg border-2 border-dashed border-gray-600 animate-pulse" style="animation-duration: 3s;"></div>

        <!-- Prototype -->
        <div class="absolute inset-12 bg-gray-700/50 rounded-lg border border-gray-500 animate-pulse" style="animation-duration: 3s; animation-delay: 1s;"></div>

        <!-- Final Design -->
        <div class="absolute inset-16 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-lg border border-purple-400/50 animate-pulse backdrop-blur-sm" style="animation-duration: 3s; animation-delay: 2s;">
          <div class="absolute top-3 left-3 right-3 h-2 bg-purple-400/40 rounded-full"></div>
          <div class="absolute top-7 left-3 right-3 h-8 bg-purple-400/30 rounded"></div>
          <div class="absolute top-20 left-3 right-3 bottom-3 bg-purple-400/20 rounded"></div>
        </div>
      </div>

      <!-- Figma Icon -->
      <div class="absolute bottom-6 right-6 w-12 h-12 rounded-xl bg-purple-500/20 backdrop-blur-sm flex items-center justify-center border border-purple-500/30">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256" class="text-purple-400">
          <path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Z"/>
        </svg>
      </div>
    </div>

    <!-- AI: Neural Network -->
    <div
      v-else-if="serviceType === 'ai'"
      class="visual-card bg-gradient-to-br from-orange-900/20 to-red-900/20 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-orange-500/20 h-full relative overflow-hidden"
      :style="{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
      }"
    >
      <!-- Neural Network Visualization -->
      <svg class="w-full h-full absolute inset-0" xmlns="http://www.w3.org/2000/svg">
        <!-- Layer 1 -->
        <circle cx="20%" cy="30%" r="8" fill="rgba(249, 115, 22, 0.6)" class="animate-pulse" />
        <circle cx="20%" cy="50%" r="8" fill="rgba(249, 115, 22, 0.6)" class="animate-pulse" style="animation-delay: 0.2s;" />
        <circle cx="20%" cy="70%" r="8" fill="rgba(249, 115, 22, 0.6)" class="animate-pulse" style="animation-delay: 0.4s;" />

        <!-- Layer 2 -->
        <circle cx="50%" cy="20%" r="10" fill="rgba(249, 115, 22, 0.8)" class="animate-pulse" style="animation-delay: 0.3s;" />
        <circle cx="50%" cy="40%" r="10" fill="rgba(249, 115, 22, 0.8)" class="animate-pulse" style="animation-delay: 0.5s;" />
        <circle cx="50%" cy="60%" r="10" fill="rgba(249, 115, 22, 0.8)" class="animate-pulse" style="animation-delay: 0.7s;" />
        <circle cx="50%" cy="80%" r="10" fill="rgba(249, 115, 22, 0.8)" class="animate-pulse" style="animation-delay: 0.9s;" />

        <!-- Layer 3 -->
        <circle cx="80%" cy="30%" r="8" fill="rgba(239, 68, 68, 0.6)" class="animate-pulse" style="animation-delay: 0.6s;" />
        <circle cx="80%" cy="50%" r="8" fill="rgba(239, 68, 68, 0.6)" class="animate-pulse" style="animation-delay: 0.8s;" />
        <circle cx="80%" cy="70%" r="8" fill="rgba(239, 68, 68, 0.6)" class="animate-pulse" style="animation-delay: 1s;" />

        <!-- Connections -->
        <g opacity="0.3" stroke="rgba(249, 115, 22, 0.4)" stroke-width="1">
          <line x1="20%" y1="30%" x2="50%" y2="20%" />
          <line x1="20%" y1="30%" x2="50%" y2="40%" />
          <line x1="20%" y1="50%" x2="50%" y2="40%" />
          <line x1="20%" y1="50%" x2="50%" y2="60%" />
          <line x1="20%" y1="70%" x2="50%" y2="60%" />
          <line x1="20%" y1="70%" x2="50%" y2="80%" />

          <line x1="50%" y1="20%" x2="80%" y2="30%" />
          <line x1="50%" y1="40%" x2="80%" y2="30%" />
          <line x1="50%" y1="40%" x2="80%" y2="50%" />
          <line x1="50%" y1="60%" x2="80%" y2="50%" />
          <line x1="50%" y1="60%" x2="80%" y2="70%" />
          <line x1="50%" y1="80%" x2="80%" y2="70%" />
        </g>
      </svg>

      <!-- Data Flow Animation -->
      <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div class="text-orange-400 text-lg font-mono font-semibold animate-pulse">
          Training Model...
        </div>
      </div>
    </div>

    <!-- Floating Metrics Badges - Padronizadas -->
    <div
      v-for="(metric, index) in metricsWithDelay"
      :key="index"
      class="floating-badge absolute bg-gradient-to-br from-brand-primary to-brand-dark-primary text-white px-3 py-2 rounded-full text-xs font-semibold shadow-lg z-10 backdrop-blur-sm whitespace-nowrap"
      :style="{
        top: index === 0 ? '-1rem' : index === 1 ? '25%' : index === 2 ? 'auto' : '40%',
        right: index === 0 ? '-1rem' : index === 2 ? '25%' : 'auto',
        left: index === 1 ? '-2rem' : index === 3 ? 'auto' : 'auto',
        bottom: index === 2 ? '-1.5rem' : index === 3 ? '30%' : 'auto',
        animationDelay: `${metric.delay}s`,
        maxWidth: '200px'
      }"
    >
      <span class="block truncate">{{ metric.text }}</span>
    </div>
  </div>
</template>

<style scoped>
.perspective-container {
  perspective: 1500px;
}

.visual-card {
  transform-style: preserve-3d;
  will-change: transform;
}

.floating-badge {
  animation: float-gentle 3s ease-in-out infinite;
  backdrop-filter: blur(8px);
  min-width: fit-content;
  max-width: 160px;
  height: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}

.floating-badge span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 1;
}

@keyframes float-gentle {
  0%, 100% {
    transform: translateY(0) translateX(0) rotate(-2deg);
  }
  50% {
    transform: translateY(-12px) translateX(4px) rotate(2deg);
  }
}

.code-editor {
  scrollbar-width: none;
}

.code-editor::-webkit-scrollbar {
  display: none;
}

/* Responsive badges - mobile */
@media (max-width: 768px) {
  .floating-badge {
    font-size: 0.65rem;
    padding: 0.375rem 0.625rem;
    max-width: 120px;
    height: 28px;
  }
}
</style>
