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

let typingInterval: ReturnType<typeof setInterval> | null = null

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

const metricsWithDelay = computed(() => {
  return props.metrics.map((metric, index) => ({
    text: metric,
    delay: index * 0.3
  }))
})

onMounted(() => {
  if (props.serviceType === 'software') {
    startTypingAnimation()
  }
})

onUnmounted(() => {
  if (typingInterval) clearInterval(typingInterval)
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
        <div class="w-3 h-3 rounded-full bg-red-500" />
        <div class="w-3 h-3 rounded-full bg-yellow-500" />
        <div class="w-3 h-3 rounded-full bg-green-500" />
        <span class="ml-3 text-gray-400 text-sm font-mono">application.js</span>
      </div>

      <!-- Code Editor -->
      <div class="code-editor bg-gray-950/50 rounded-lg p-4 font-mono text-sm min-h-[250px]">
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

    <!-- Cloud: Infrastructure Monitor -->
    <div
      v-else-if="serviceType === 'cloud'"
      class="visual-card bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-950 dark:to-gray-900 rounded-2xl shadow-2xl border border-emerald-500/20 h-full relative overflow-hidden"
      :style="{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
      }"
    >
      <!-- Window Header -->
      <div class="flex items-center gap-2 px-5 py-3 border-b border-gray-700/60">
        <div class="w-3 h-3 rounded-full bg-red-500" />
        <div class="w-3 h-3 rounded-full bg-yellow-500" />
        <div class="w-3 h-3 rounded-full bg-green-500" />
        <span class="ml-3 text-gray-400 text-sm font-mono">infra-monitor</span>
      </div>

      <!-- Monitor Content -->
      <div class="p-5 space-y-4">
        <!-- Service Status Cards -->
        <div class="grid grid-cols-3 gap-3">
          <div class="bg-gray-800/60 rounded-lg p-3 border border-gray-700/40">
            <div class="flex items-center gap-2 mb-1.5">
              <div class="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span class="text-gray-400 text-xs font-mono">AWS</span>
            </div>
            <div class="text-emerald-400 text-lg font-bold font-mono">
              ON
            </div>
            <div class="text-gray-500 text-[10px] font-mono mt-0.5">
              us-east-1
            </div>
          </div>
          <div class="bg-gray-800/60 rounded-lg p-3 border border-gray-700/40">
            <div class="flex items-center gap-2 mb-1.5">
              <div class="w-2 h-2 rounded-full bg-green-400 animate-pulse" style="animation-delay: 0.3s;" />
              <span class="text-gray-400 text-xs font-mono">Docker</span>
            </div>
            <div class="text-emerald-400 text-lg font-bold font-mono">
              3/3
            </div>
            <div class="text-gray-500 text-[10px] font-mono mt-0.5">
              containers
            </div>
          </div>
          <div class="bg-gray-800/60 rounded-lg p-3 border border-gray-700/40">
            <div class="flex items-center gap-2 mb-1.5">
              <div class="w-2 h-2 rounded-full bg-green-400 animate-pulse" style="animation-delay: 0.6s;" />
              <span class="text-gray-400 text-xs font-mono">n8n</span>
            </div>
            <div class="text-emerald-400 text-lg font-bold font-mono">
              12
            </div>
            <div class="text-gray-500 text-[10px] font-mono mt-0.5">
              workflows
            </div>
          </div>
        </div>

        <!-- Integration Flow -->
        <div class="bg-gray-800/40 rounded-lg p-4 border border-gray-700/30">
          <div class="flex items-center justify-between mb-3">
            <span class="text-gray-400 text-xs font-mono">Integrações ativas</span>
            <span class="text-emerald-400 text-xs font-mono">99.5% uptime</span>
          </div>
          <!-- Flow Lines -->
          <div class="space-y-2.5">
            <div class="flex items-center gap-2">
              <div class="w-14 h-6 rounded bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                <span class="text-blue-400 text-[9px] font-mono">ERP</span>
              </div>
              <div class="flex-1 h-px bg-gradient-to-r from-blue-500/40 to-emerald-500/40 relative">
                <div class="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-emerald-400 cloud-data-flow" />
              </div>
              <div class="w-14 h-6 rounded bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                <span class="text-emerald-400 text-[9px] font-mono">API</span>
              </div>
              <div class="flex-1 h-px bg-gradient-to-r from-emerald-500/40 to-purple-500/40 relative">
                <div class="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-purple-400 cloud-data-flow" style="animation-delay: 0.5s;" />
              </div>
              <div class="w-14 h-6 rounded bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                <span class="text-purple-400 text-[9px] font-mono">CRM</span>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-14 h-6 rounded bg-orange-500/20 border border-orange-500/30 flex items-center justify-center">
                <span class="text-orange-400 text-[9px] font-mono">Sheets</span>
              </div>
              <div class="flex-1 h-px bg-gradient-to-r from-orange-500/40 to-emerald-500/40 relative">
                <div class="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-emerald-400 cloud-data-flow" style="animation-delay: 1s;" />
              </div>
              <div class="w-14 h-6 rounded bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                <span class="text-emerald-400 text-[9px] font-mono">n8n</span>
              </div>
              <div class="flex-1 h-px bg-gradient-to-r from-emerald-500/40 to-cyan-500/40 relative">
                <div class="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400 cloud-data-flow" style="animation-delay: 1.5s;" />
              </div>
              <div class="w-14 h-6 rounded bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
                <span class="text-cyan-400 text-[9px] font-mono">DB</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom: Logs + Uptime -->
        <div class="grid grid-cols-2 gap-3">
          <!-- Recent Deploys -->
          <div class="bg-gray-800/40 rounded-lg p-3 border border-gray-700/30">
            <div class="text-gray-400 text-xs font-mono mb-2">Deploy log</div>
            <div class="space-y-1.5 text-[10px] font-mono">
              <div class="flex items-center gap-1.5">
                <div class="w-1.5 h-1.5 rounded-full bg-green-400" />
                <span class="text-gray-400">api-v2.3.1</span>
                <span class="text-gray-600 ml-auto">2m ago</span>
              </div>
              <div class="flex items-center gap-1.5">
                <div class="w-1.5 h-1.5 rounded-full bg-green-400" />
                <span class="text-gray-400">worker-1.8.0</span>
                <span class="text-gray-600 ml-auto">1h ago</span>
              </div>
              <div class="flex items-center gap-1.5">
                <div class="w-1.5 h-1.5 rounded-full bg-green-400" />
                <span class="text-gray-400">web-4.1.2</span>
                <span class="text-gray-600 ml-auto">3h ago</span>
              </div>
            </div>
          </div>
          <!-- Uptime Bars -->
          <div class="bg-gray-800/40 rounded-lg p-3 border border-gray-700/30">
            <div class="text-gray-400 text-xs font-mono mb-2">Uptime 30d</div>
            <div class="flex items-end gap-[2px] h-12">
              <div
                v-for="i in 15"
                :key="i"
                class="flex-1 rounded-t"
                :class="i === 9 ? 'bg-yellow-500/60' : 'bg-emerald-500/50'"
                :style="{ height: i === 9 ? '70%' : `${85 + Math.random() * 15}%` }"
              />
            </div>
            <div class="flex justify-between mt-1">
              <span class="text-gray-600 text-[9px] font-mono">30d</span>
              <span class="text-emerald-400 text-[9px] font-mono">99.5%</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Glow Effect -->
      <div class="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500 opacity-15 blur-xl -z-10 rounded-2xl" />
    </div>

    <!-- UX: Dashboard Preview -->
    <div
      v-else-if="serviceType === 'ux'"
      class="visual-card bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-950 dark:to-gray-900 rounded-2xl shadow-2xl border border-purple-500/20 h-full relative overflow-hidden"
      :style="{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
      }"
    >
      <!-- Window Header -->
      <div class="flex items-center gap-2 px-5 py-3 border-b border-gray-700/60">
        <div class="w-3 h-3 rounded-full bg-red-500" />
        <div class="w-3 h-3 rounded-full bg-yellow-500" />
        <div class="w-3 h-3 rounded-full bg-green-500" />
        <span class="ml-3 text-gray-400 text-sm font-mono">dashboard.app</span>
      </div>

      <!-- Dashboard Content -->
      <div class="p-5 space-y-4">
        <!-- Sidebar + Main Layout -->
        <div class="flex gap-4 h-full">
          <!-- Sidebar -->
          <div class="w-10 flex-shrink-0 space-y-3 pt-1">
            <div class="w-8 h-8 rounded-lg bg-purple-500/30 border border-purple-400/30" />
            <div class="w-8 h-2 rounded bg-gray-700/60" />
            <div class="w-8 h-2 rounded bg-gray-700/60" />
            <div class="w-8 h-2 rounded bg-purple-400/40" />
            <div class="w-8 h-2 rounded bg-gray-700/60" />
          </div>

          <!-- Main Area -->
          <div class="flex-1 space-y-4">
            <!-- KPI Cards Row -->
            <div class="grid grid-cols-3 gap-3">
              <div class="bg-gray-800/60 rounded-lg p-3 border border-gray-700/40">
                <div class="w-8 h-1.5 bg-gray-600 rounded mb-2" />
                <div class="text-purple-400 text-lg font-bold font-mono">
                  2.4k
                </div>
                <div class="w-10 h-1 bg-green-500/40 rounded-full mt-1" />
              </div>
              <div class="bg-gray-800/60 rounded-lg p-3 border border-gray-700/40">
                <div class="w-8 h-1.5 bg-gray-600 rounded mb-2" />
                <div class="text-pink-400 text-lg font-bold font-mono">
                  89%
                </div>
                <div class="w-8 h-1 bg-pink-500/40 rounded-full mt-1" />
              </div>
              <div class="bg-gray-800/60 rounded-lg p-3 border border-gray-700/40">
                <div class="w-8 h-1.5 bg-gray-600 rounded mb-2" />
                <div class="text-purple-300 text-lg font-bold font-mono">
                  $12k
                </div>
                <div class="w-12 h-1 bg-purple-500/40 rounded-full mt-1" />
              </div>
            </div>

            <!-- Chart Area -->
            <div class="bg-gray-800/40 rounded-lg p-4 border border-gray-700/30">
              <div class="flex items-center justify-between mb-3">
                <div class="w-20 h-2 bg-gray-600 rounded" />
                <div class="flex gap-2">
                  <div class="w-6 h-2 bg-purple-500/40 rounded" />
                  <div class="w-6 h-2 bg-pink-500/40 rounded" />
                </div>
              </div>
              <!-- Bar Chart -->
              <div class="flex items-end gap-2 h-24">
                <div
                  class="flex-1 bg-purple-500/40 rounded-t animate-pulse"
                  style="height: 60%; animation-duration: 2s;"
                />
                <div
                  class="flex-1 bg-pink-500/30 rounded-t animate-pulse"
                  style="height: 80%; animation-duration: 2s; animation-delay: 0.2s;"
                />
                <div
                  class="flex-1 bg-purple-500/40 rounded-t animate-pulse"
                  style="height: 45%; animation-duration: 2s; animation-delay: 0.4s;"
                />
                <div
                  class="flex-1 bg-pink-500/30 rounded-t animate-pulse"
                  style="height: 95%; animation-duration: 2s; animation-delay: 0.6s;"
                />
                <div
                  class="flex-1 bg-purple-500/40 rounded-t animate-pulse"
                  style="height: 70%; animation-duration: 2s; animation-delay: 0.8s;"
                />
                <div
                  class="flex-1 bg-pink-500/30 rounded-t animate-pulse"
                  style="height: 55%; animation-duration: 2s; animation-delay: 1s;"
                />
                <div
                  class="flex-1 bg-purple-500/40 rounded-t animate-pulse"
                  style="height: 85%; animation-duration: 2s; animation-delay: 1.2s;"
                />
              </div>
            </div>

            <!-- Bottom Row -->
            <div class="grid grid-cols-2 gap-3">
              <div class="bg-gray-800/40 rounded-lg p-3 border border-gray-700/30">
                <div class="w-16 h-2 bg-gray-600 rounded mb-2" />
                <div class="space-y-1.5">
                  <div class="flex items-center gap-2">
                    <div class="w-full h-2 bg-purple-500/30 rounded-full">
                      <div
                        class="h-2 bg-purple-500/60 rounded-full"
                        style="width: 75%;"
                      />
                    </div>
                  </div>
                  <div class="flex items-center gap-2">
                    <div class="w-full h-2 bg-pink-500/30 rounded-full">
                      <div
                        class="h-2 bg-pink-500/60 rounded-full"
                        style="width: 50%;"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="bg-gray-800/40 rounded-lg p-3 border border-gray-700/30 flex items-center justify-center">
                <!-- Donut Chart -->
                <svg
                  viewBox="0 0 36 36"
                  class="w-16 h-16"
                >
                  <circle
                    cx="18"
                    cy="18"
                    r="15"
                    fill="none"
                    stroke="rgba(168,85,247,0.2)"
                    stroke-width="3"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="15"
                    fill="none"
                    stroke="rgba(168,85,247,0.6)"
                    stroke-width="3"
                    stroke-dasharray="65 35"
                    stroke-dashoffset="25"
                    class="animate-spin"
                    style="animation-duration: 8s;"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="15"
                    fill="none"
                    stroke="rgba(236,72,153,0.5)"
                    stroke-width="3"
                    stroke-dasharray="30 70"
                    stroke-dashoffset="90"
                    class="animate-spin"
                    style="animation-duration: 12s; animation-direction: reverse;"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Glow Effect -->
      <div class="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 opacity-15 blur-xl -z-10 rounded-2xl" />
    </div>

    <!-- AI: Terminal / CMD -->
    <div
      v-else-if="serviceType === 'ai'"
      class="visual-card bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-950 dark:to-gray-900 rounded-2xl shadow-2xl border border-orange-500/20 h-full relative overflow-hidden"
      :style="{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
      }"
    >
      <!-- Window Header -->
      <div class="flex items-center gap-2 px-5 py-3 border-b border-gray-700/60">
        <div class="w-3 h-3 rounded-full bg-red-500" />
        <div class="w-3 h-3 rounded-full bg-yellow-500" />
        <div class="w-3 h-3 rounded-full bg-green-500" />
        <span class="ml-3 text-gray-400 text-sm font-mono">~ ai-training</span>
      </div>

      <!-- Terminal Content -->
      <div class="ai-terminal p-5 font-mono text-sm leading-relaxed min-h-[250px] space-y-1">
        <div class="text-gray-500">
          $ python train_model.py --config prod.yaml
        </div>
        <div class="text-orange-400 mt-2">
          [INFO] Loading dataset... <span class="text-green-400">OK</span>
        </div>
        <div class="text-orange-400">
          [INFO] Preprocessing 48,291 samples...
        </div>
        <div class="text-gray-400">
          ├── Tokenizing... <span class="text-green-400">done</span>
        </div>
        <div class="text-gray-400">
          ├── Embedding vectors... <span class="text-green-400">done</span>
        </div>
        <div class="text-gray-400">
          └── Validation split: 80/20
        </div>
        <div class="text-orange-400 mt-2">
          [TRAIN] Epoch 1/10
        </div>
        <div class="text-gray-400">
          loss: 0.4521 | acc: <span class="text-green-400">0.8234</span> | lr: 3e-4
        </div>
        <div class="text-orange-400">
          [TRAIN] Epoch 2/10
        </div>
        <div class="text-gray-400">
          loss: 0.2187 | acc: <span class="text-green-400">0.9102</span> | lr: 3e-4
        </div>
        <div class="text-orange-400">
          [TRAIN] Epoch 3/10
        </div>
        <div class="text-gray-400">
          loss: 0.1043 | acc: <span class="text-green-400">0.9578</span> | lr: 1e-4
        </div>
        <div class="text-orange-300 mt-2 flex items-center gap-1">
          <span>[TRAIN] Epoch 4/10</span>
          <span class="inline-block w-2 h-4 bg-orange-400 animate-pulse" />
        </div>
      </div>

      <!-- Progress Bar at Bottom -->
      <div class="absolute bottom-0 left-0 right-0 px-5 pb-4">
        <div class="flex items-center justify-between text-xs text-gray-500 mb-1">
          <span>Training progress</span>
          <span class="text-orange-400">30%</span>
        </div>
        <div class="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
          <div
            class="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full ai-progress-bar"
            style="width: 30%;"
          />
        </div>
      </div>

      <!-- Glow Effect -->
      <div class="absolute -inset-1 bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 opacity-15 blur-xl -z-10 rounded-2xl" />
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

.code-editor,
.ai-terminal {
  scrollbar-width: none;
}

.code-editor::-webkit-scrollbar,
.ai-terminal::-webkit-scrollbar {
  display: none;
}

.cloud-data-flow {
  animation: data-flow 2s ease-in-out infinite;
}

@keyframes data-flow {
  0% { left: 0%; opacity: 0; }
  20% { opacity: 1; }
  80% { opacity: 1; }
  100% { left: 100%; opacity: 0; }
}

.ai-progress-bar {
  animation: progress-pulse 2s ease-in-out infinite;
}

@keyframes progress-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
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
