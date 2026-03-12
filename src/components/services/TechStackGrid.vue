<script setup lang="ts">
import { computed, ref } from 'vue'
import type { TechItem } from '@/types/service'
import GlassCard from '@/components/ui/GlassCard.vue'

interface Props {
  technologies: TechItem[]
}

const props = defineProps<Props>()

const hoveredTech = ref<string | null>(null)

// Descrições de tecnologias para tooltips
const techDescriptions: Record<string, string> = {
  'Vue.js': 'Framework progressivo para construção de interfaces',
  'React': 'Biblioteca JavaScript para interfaces de usuário',
  'TypeScript': 'JavaScript com tipagem estática',
  'Node.js': 'Runtime JavaScript server-side',
  'Python': 'Linguagem versátil para backend e IA',
  'PHP': 'Linguagem server-side para web',
  'PostgreSQL': 'Banco de dados relacional avançado',
  'MongoDB': 'Banco de dados NoSQL orientado a documentos',
  'Docker': 'Containerização de aplicações',
  'AWS': 'Plataforma de cloud computing líder',
  'Azure': 'Cloud platform da Microsoft',
  'Google Cloud': 'Infraestrutura cloud do Google',
  'Kubernetes': 'Orquestração de containers',
  'Terraform': 'Infrastructure as Code (IaC)',
  'Jenkins': 'Automação de CI/CD',
  'GitLab CI': 'Integração contínua do GitLab',
  'Figma': 'Ferramenta colaborativa de design',
  'Adobe XD': 'Design e prototipagem UI/UX',
  'Sketch': 'Design de interfaces para macOS',
  'InVision': 'Prototipagem e colaboração de design',
  'TensorFlow': 'Framework de ML do Google',
  'PyTorch': 'Framework de deep learning',
  'scikit-learn': 'Biblioteca de ML para Python',
  'OpenAI API': 'API para modelos GPT e IA generativa',
  'Hugging Face': 'Plataforma de modelos de NLP',
  'LangChain': 'Framework para aplicações com LLMs',
  'FastAPI': 'Framework web moderno e rápido para APIs'
}

// Agrupar por categoria se disponível
const groupedTechs = computed(() => {
  if (props.technologies.some(t => t.category)) {
    const groups: Record<string, TechItem[]> = {}
    props.technologies.forEach(tech => {
      const category = tech.category || 'other'
      if (!groups[category]) groups[category] = []
      groups[category].push(tech)
    })
    return groups
  }
  return { all: props.technologies }
})

const categoryLabels: Record<string, string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  database: 'Database',
  devops: 'DevOps',
  mobile: 'Mobile',
  other: 'Outras',
  all: 'Tecnologias'
}
</script>

<template>
  <div class="space-y-8">
    <div
      v-for="(techs, category) in groupedTechs"
      :key="category"
    >
      <h3
        v-if="Object.keys(groupedTechs).length > 1"
        class="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4"
      >
        {{ categoryLabels[category] || category }}
      </h3>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        <div
          v-for="tech in techs"
          :key="tech.name"
          class="relative group"
          @mouseenter="hoveredTech = tech.name"
          @mouseleave="hoveredTech = null"
        >
          <GlassCard
            padding="sm"
            class="flex items-center justify-center h-full cursor-pointer hover:scale-105 transition-transform duration-300"
          >
            <span class="font-semibold text-gray-900 dark:text-white text-sm text-center group-hover:text-brand-primary dark:group-hover:text-brand-light-primary transition-colors">
              {{ tech.name }}
            </span>
          </GlassCard>

          <!-- Tooltip -->
          <Transition name="tooltip">
            <div
              v-if="hoveredTech === tech.name && techDescriptions[tech.name]"
              class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 dark:bg-gray-800 text-white text-xs rounded-lg shadow-lg whitespace-nowrap z-20 pointer-events-none"
            >
              <div class="relative">
                {{ techDescriptions[tech.name] }}
                <!-- Arrow -->
                <div class="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
                  <div class="border-4 border-transparent border-t-gray-900 dark:border-t-gray-800" />
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tooltip-enter-active,
.tooltip-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.tooltip-enter-from,
.tooltip-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(5px);
}
</style>
