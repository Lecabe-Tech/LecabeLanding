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
          {{ t('privacy.title') }}
        </h1>
        <p class="text-gray-600 dark:text-gray-400 text-sm">
          {{ t('privacy.lastUpdated') }}: Janeiro de 2025
        </p>
      </div>

      <!-- Content -->
      <div class="prose prose-lg dark:prose-invert max-w-none">
        <section class="mb-8">
          <h2 class="section-subtitle mb-4">1. Introdução</h2>
          <p class="section-description mb-4">
            A Lecabe ("nós", "nosso" ou "nossa") está comprometida em proteger sua privacidade. Esta Política de Privacidade explica como coletamos, usamos, divulgamos e protegemos suas informações quando você visita nosso site e utiliza nossos serviços.
          </p>
        </section>

        <section class="mb-8">
          <h2 class="section-subtitle mb-4">2. Informações que Coletamos</h2>
          <p class="section-description mb-4">
            Coletamos informações que você nos fornece diretamente:
          </p>
          <ul class="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Nome e informações de contato (e-mail, telefone)</li>
            <li>Informações profissionais (empresa, cargo)</li>
            <li>Mensagens e comunicações que você nos envia</li>
            <li>Preferências de idioma e configurações</li>
          </ul>
        </section>

        <section class="mb-8">
          <h2 class="section-subtitle mb-4">3. Como Usamos Suas Informações</h2>
          <p class="section-description mb-4">
            Utilizamos as informações coletadas para:
          </p>
          <ul class="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Fornecer, operar e manter nossos serviços</li>
            <li>Responder às suas solicitações e fornecer suporte ao cliente</li>
            <li>Enviar informações sobre nossos produtos e serviços</li>
            <li>Melhorar e personalizar sua experiência</li>
            <li>Analisar o uso do site e desenvolver novos recursos</li>
            <li>Cumprir obrigações legais e regulatórias</li>
          </ul>
        </section>

        <section class="mb-8">
          <h2 class="section-subtitle mb-4">4. Compartilhamento de Informações</h2>
          <p class="section-description mb-4">
            Não vendemos suas informações pessoais. Podemos compartilhar suas informações apenas nas seguintes situações:
          </p>
          <ul class="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Com seu consentimento explícito</li>
            <li>Com prestadores de serviços que nos ajudam a operar nosso negócio</li>
            <li>Para cumprir obrigações legais</li>
            <li>Para proteger nossos direitos e segurança</li>
          </ul>
        </section>

        <section class="mb-8">
          <h2 class="section-subtitle mb-4">5. Cookies e Tecnologias Similares</h2>
          <p class="section-description mb-4">
            Utilizamos cookies e tecnologias similares para melhorar sua experiência em nosso site. Você pode controlar o uso de cookies através das configurações do seu navegador.
          </p>
        </section>

        <section class="mb-8">
          <h2 class="section-subtitle mb-4">6. Segurança de Dados</h2>
          <p class="section-description mb-4">
            Implementamos medidas de segurança técnicas e organizacionais apropriadas para proteger suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição.
          </p>
        </section>

        <section class="mb-8">
          <h2 class="section-subtitle mb-4">7. Seus Direitos</h2>
          <p class="section-description mb-4">
            De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem os seguintes direitos:
          </p>
          <ul class="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Acessar seus dados pessoais</li>
            <li>Corrigir dados incompletos, inexatos ou desatualizados</li>
            <li>Solicitar a anonimização, bloqueio ou eliminação de dados</li>
            <li>Revogar o consentimento</li>
            <li>Solicitar a portabilidade de dados</li>
          </ul>
        </section>

        <section class="mb-8">
          <h2 class="section-subtitle mb-4">8. Retenção de Dados</h2>
          <p class="section-description mb-4">
            Mantemos suas informações pessoais apenas pelo tempo necessário para cumprir os propósitos descritos nesta política, a menos que um período de retenção mais longo seja exigido ou permitido por lei.
          </p>
        </section>

        <section class="mb-8">
          <h2 class="section-subtitle mb-4">9. Transferência Internacional de Dados</h2>
          <p class="section-description mb-4">
            Seus dados podem ser transferidos e mantidos em computadores localizados fora do Brasil. Garantimos que todas as transferências sejam realizadas de acordo com a LGPD e outras leis aplicáveis.
          </p>
        </section>

        <section class="mb-8">
          <h2 class="section-subtitle mb-4">10. Alterações nesta Política</h2>
          <p class="section-description mb-4">
            Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos você sobre quaisquer alterações publicando a nova política nesta página e atualizando a data de "última atualização".
          </p>
        </section>

        <section class="mb-8">
          <h2 class="section-subtitle mb-4">11. Contato</h2>
          <p class="section-description mb-4">
            Se você tiver dúvidas sobre esta Política de Privacidade, entre em contato conosco:
          </p>
          <ul class="list-none space-y-2 text-gray-700 dark:text-gray-300">
            <li><strong>E-mail:</strong> contato@lecabe.com.br</li>
            <li><strong>WhatsApp:</strong> +55 11 97856-1720</li>
          </ul>
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

