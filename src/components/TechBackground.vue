<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)
let animationFrameId: number | null = null
let scanLineY = 0

// Grid configuration
const gridConfig = {
  cellSize: 50,
  lineOpacity: 0.04,
  nodeSize: 2.5,
  scanSpeed: 2.8,
  scanHeight: 250,
  scanIntensity: 0.2
}

interface Node {
  x: number
  y: number
  connections: number[]
}

let nodes: Node[] = []
let width = 0
let height = 0

const generateGrid = (w: number, h: number) => {
  nodes = []
  const cols = Math.ceil(w / gridConfig.cellSize) + 1
  const rows = Math.ceil(h / gridConfig.cellSize) + 1

  // Create nodes
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = col * gridConfig.cellSize
      const y = row * gridConfig.cellSize

      // Add some randomness to positions (cartography style)
      const offsetX = (Math.random() - 0.5) * 15
      const offsetY = (Math.random() - 0.5) * 15

      const nodeIndex = nodes.length
      const connections: number[] = []

      // Connect to neighbors (right and bottom)
      if (col < cols - 1) {
        connections.push(nodeIndex + 1)
      }
      if (row < rows - 1) {
        connections.push(nodeIndex + cols)
      }
      // Random diagonal connections
      if (col < cols - 1 && row < rows - 1 && Math.random() > 0.7) {
        connections.push(nodeIndex + cols + 1)
      }

      nodes.push({
        x: x + offsetX,
        y: y + offsetY,
        connections
      })
    }
  }
}

const draw = (ctx: CanvasRenderingContext2D, isDark: boolean) => {
  ctx.clearRect(0, 0, width, height)

  const baseColor = isDark ? '255, 255, 255' : '79, 82, 255'
  const scanColor = isDark ? '47, 224, 176' : '79, 82, 255'

  // Draw lines
  nodes.forEach((node) => {
    node.connections.forEach(targetIndex => {
      if (targetIndex < nodes.length) {
        const target = nodes[targetIndex]

        // Calculate distance from scan line
        const midY = (node.y + target.y) / 2
        const distFromScan = Math.abs(midY - scanLineY)

        // Base opacity + scan glow
        let opacity = gridConfig.lineOpacity
        if (distFromScan < gridConfig.scanHeight) {
          const scanEffect = 1 - (distFromScan / gridConfig.scanHeight)
          opacity += scanEffect * gridConfig.scanIntensity
        }

        ctx.beginPath()
        ctx.moveTo(node.x, node.y)
        ctx.lineTo(target.x, target.y)

        // Use scan color when near scan line
        if (distFromScan < gridConfig.scanHeight / 2) {
          ctx.strokeStyle = `rgba(${scanColor}, ${opacity})`
        } else {
          ctx.strokeStyle = `rgba(${baseColor}, ${opacity})`
        }
        ctx.lineWidth = 1
        ctx.stroke()
      }
    })
  })

  // Draw nodes
  nodes.forEach(node => {
    const distFromScan = Math.abs(node.y - scanLineY)

    let opacity = gridConfig.lineOpacity * 1.5
    let size = gridConfig.nodeSize

    if (distFromScan < gridConfig.scanHeight) {
      const scanEffect = 1 - (distFromScan / gridConfig.scanHeight)
      opacity += scanEffect * gridConfig.scanIntensity * 1.2
      size += scanEffect * 2
    }

    ctx.beginPath()
    ctx.arc(node.x, node.y, size, 0, Math.PI * 2)

    if (distFromScan < gridConfig.scanHeight / 2) {
      ctx.fillStyle = `rgba(${scanColor}, ${opacity})`
    } else {
      ctx.fillStyle = `rgba(${baseColor}, ${opacity})`
    }
    ctx.fill()
  })

  // Draw scan line (subtle glow)
  const gradient = ctx.createLinearGradient(0, scanLineY - gridConfig.scanHeight, 0, scanLineY + gridConfig.scanHeight / 3)
  gradient.addColorStop(0, 'rgba(47, 224, 176, 0)')
  gradient.addColorStop(0.4, 'rgba(47, 224, 176, 0.01)')
  gradient.addColorStop(0.5, 'rgba(47, 224, 176, 0.02)')
  gradient.addColorStop(0.6, 'rgba(47, 224, 176, 0.01)')
  gradient.addColorStop(1, 'rgba(47, 224, 176, 0)')

  ctx.fillStyle = gradient
  ctx.fillRect(0, scanLineY - gridConfig.scanHeight, width, gridConfig.scanHeight * 1.3)
}

const animate = () => {
  const canvas = canvasRef.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  // Check dark mode
  const isDark = document.documentElement.classList.contains('dark')

  // Update scan line position
  scanLineY += gridConfig.scanSpeed
  if (scanLineY > height + gridConfig.scanHeight) {
    scanLineY = -gridConfig.scanHeight
  }

  draw(ctx, isDark)
  animationFrameId = requestAnimationFrame(animate)
}

const resize = () => {
  const canvas = canvasRef.value
  if (!canvas) return

  width = window.innerWidth
  height = window.innerHeight

  canvas.width = width
  canvas.height = height

  generateGrid(width, height)
}

onMounted(() => {
  resize()
  window.addEventListener('resize', resize)
  animate()
})

onUnmounted(() => {
  window.removeEventListener('resize', resize)
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
})
</script>

<template>
  <div class="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
    <canvas
      ref="canvasRef"
      class="absolute inset-0 w-full h-full"
    />
    <!-- Subtle gradient overlay for better content readability -->
    <div class="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-white/30 dark:via-brand-dark/10 dark:to-brand-dark/30" />
  </div>
</template>
