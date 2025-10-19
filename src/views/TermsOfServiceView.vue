<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const router = useRouter()

const goBack = () => {
  router.push('/')
}
</script>

<template>
  <div class="min-h-screen bg-brand-light dark:bg-brand-dark transition-colors duration-300">
    <div class="max-w-4xl mx-auto px-6 md:px-12 py-16 md:py-24">
      <!-- Header -->
      <div class="mb-12">
        <button
          class="flex items-center gap-2 text-brand-primary dark:text-brand-light-primary hover:underline mb-8"
          @click="goBack"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span>{{ t('common.backToHome') }}</span>
        </button>

        <h1 class="section-title mb-4">
          {{ t('terms.title') }}
        </h1>
        <p class="text-gray-600 dark:text-gray-400 text-sm">
          {{ t('terms.lastUpdated') }}: Janeiro de 2025
        </p>
      </div>

      <!-- Content -->
      <div class="prose prose-lg dark:prose-invert max-w-none">
        <section class="mb-8">
          <h2 class="section-subtitle mb-4">1. Aceitação dos Termos</h2>
          <p class="section-description mb-4">
            Ao acessar e usar os serviços da Lecabe, você concorda em cumprir e estar vinculado aos seguintes Termos de Serviço. Se você não concordar com alguma parte destes termos, não utilize nossos serviços.
          </p>
        </section>

        <section class="mb-8">
          <h2 class="section-subtitle mb-4">2. Descrição dos Serviços</h2>
          <p class="section-description mb-4">
            A Lecabe fornece serviços de desenvolvimento de software, incluindo mas não limitado a:
          </p>
          <ul class="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Desenvolvimento de software personalizado</li>
            <li>Consultoria em tecnologia e arquitetura de software</li>
            <li>Soluções de integração e automação</li>
            <li>Manutenção e suporte de sistemas</li>
            <li>Produtos de software prontos para integração</li>
          </ul>
        </section>

        <section class="mb-8">
          <h2 class="section-subtitle mb-4">3. Registro e Conta</h2>
          <p class="section-description mb-4">
            Para acessar determinados serviços, você pode precisar criar uma conta. Você concorda em:
          </p>
          <ul class="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Fornecer informações precisas, atuais e completas</li>
            <li>Manter a segurança de sua senha e conta</li>
            <li>Notificar-nos imediatamente sobre qualquer uso não autorizado</li>
            <li>Ser responsável por todas as atividades que ocorram em sua conta</li>
          </ul>
        </section>

        <section class="mb-8">
          <h2 class="section-subtitle mb-4">4. Propriedade Intelectual</h2>
          <p class="section-description mb-4">
            Todo o conteúdo, recursos e funcionalidades disponíveis através de nossos serviços são de propriedade da Lecabe ou de seus licenciadores e são protegidos por leis de direitos autorais, marcas registradas e outras leis de propriedade intelectual.
          </p>
          <p class="section-description mb-4">
            Para projetos personalizados, os direitos de propriedade intelectual serão definidos no contrato específico do projeto.
          </p>
        </section>

        <section class="mb-8">
          <h2 class="section-subtitle mb-4">5. Uso Aceitável</h2>
          <p class="section-description mb-4">
            Você concorda em não:
          </p>
          <ul class="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Usar nossos serviços para qualquer propósito ilegal ou não autorizado</li>
            <li>Violar quaisquer leis em sua jurisdição</li>
            <li>Transmitir vírus, malware ou código malicioso</li>
            <li>Interferir ou interromper o funcionamento dos serviços</li>
            <li>Tentar obter acesso não autorizado a sistemas ou redes</li>
            <li>Copiar, modificar ou distribuir nosso conteúdo sem autorização</li>
          </ul>
        </section>

        <section class="mb-8">
          <h2 class="section-subtitle mb-4">6. Pagamentos e Reembolsos</h2>
          <p class="section-description mb-4">
            Os termos de pagamento, preços e políticas de reembolso serão especificados em contratos ou propostas individuais para cada projeto ou produto. Reservamo-nos o direito de modificar preços a qualquer momento.
          </p>
        </section>

        <section class="mb-8">
          <h2 class="section-subtitle mb-4">7. Garantias e Responsabilidades</h2>
          <p class="section-description mb-4">
            Nossos serviços são fornecidos "como estão" e "conforme disponíveis". Embora nos esforcemos para fornecer serviços de alta qualidade, não garantimos que nossos serviços serão ininterruptos, seguros ou livres de erros.
          </p>
          <p class="section-description mb-4">
            Garantias específicas serão fornecidas conforme acordado em contratos individuais de projeto.
          </p>
        </section>

        <section class="mb-8">
          <h2 class="section-subtitle mb-4">8. Limitação de Responsabilidade</h2>
          <p class="section-description mb-4">
            Na medida máxima permitida por lei, a Lecabe não será responsável por quaisquer danos indiretos, incidentais, especiais, consequenciais ou punitivos, ou qualquer perda de lucros ou receitas, incorridos direta ou indiretamente.
          </p>
        </section>

        <section class="mb-8">
          <h2 class="section-subtitle mb-4">9. Confidencialidade</h2>
          <p class="section-description mb-4">
            Ambas as partes concordam em manter confidenciais todas as informações proprietárias e sensíveis compartilhadas durante a prestação de serviços. Acordos de confidencialidade específicos podem ser estabelecidos para projetos individuais.
          </p>
        </section>

        <section class="mb-8">
          <h2 class="section-subtitle mb-4">10. Rescisão</h2>
          <p class="section-description mb-4">
            Podemos rescindir ou suspender seu acesso aos nossos serviços imediatamente, sem aviso prévio ou responsabilidade, por qualquer motivo, incluindo violação destes Termos de Serviço.
          </p>
        </section>

        <section class="mb-8">
          <h2 class="section-subtitle mb-4">11. Modificações dos Termos</h2>
          <p class="section-description mb-4">
            Reservamo-nos o direito de modificar ou substituir estes termos a qualquer momento. Se uma revisão for material, forneceremos aviso prévio de pelo menos 30 dias antes que os novos termos entrem em vigor.
          </p>
        </section>

        <section class="mb-8">
          <h2 class="section-subtitle mb-4">12. Lei Aplicável</h2>
          <p class="section-description mb-4">
            Estes Termos serão regidos e interpretados de acordo com as leis do Brasil, sem considerar suas disposições sobre conflitos de leis. Qualquer disputa será resolvida nos tribunais competentes de São Paulo, Brasil.
          </p>
        </section>

        <section class="mb-8">
          <h2 class="section-subtitle mb-4">13. Contato</h2>
          <p class="section-description mb-4">
            Se você tiver dúvidas sobre estes Termos de Serviço, entre em contato conosco:
          </p>
          <ul class="list-none space-y-2 text-gray-700 dark:text-gray-300">
            <li><strong>E-mail:</strong> contato@lecabe.com.br</li>
            <li><strong>WhatsApp:</strong> +55 11 97856-1720</li>
          </ul>
        </section>

        <section class="mb-8">
          <h2 class="section-subtitle mb-4">14. Disposições Gerais</h2>
          <p class="section-description mb-4">
            Se qualquer disposição destes termos for considerada inválida ou inexequível, as demais disposições continuarão em pleno vigor e efeito. Estes Termos constituem o acordo completo entre você e a Lecabe em relação ao uso de nossos serviços.
          </p>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
.prose {
  @apply text-gray-900 dark:text-gray-100;
}

.prose h2 {
  @apply text-gray-900 dark:text-white;
}

.prose ul {
  @apply text-gray-700 dark:text-gray-300;
}
</style>

