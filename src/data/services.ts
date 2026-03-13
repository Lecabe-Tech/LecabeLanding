import type { ServiceDetail, ServiceId } from '@/types/service'

/**
 * Structured data for service details
 * Textual content comes from i18n files
 */
export const servicesData: Record<ServiceId, ServiceDetail> = {
  software: {
    id: 'software',
    slug: 'desenvolvimento-software',
    route: '/servicos/desenvolvimento-software',
    gradient: 'from-brand-primary to-brand-dark-primary',
    accentColor: '#4F52FF',
    icon: 'code',
    features: [
      {
        id: 'web',
        icon: 'browser',
        title: '',
        description: '',
        size: 'large',
        gridPosition: 'col-span-2 row-span-2'
      },
      {
        id: 'api',
        icon: 'api',
        title: '',
        description: '',
        size: 'medium',
        gridPosition: 'col-span-1 row-span-1'
      },
      {
        id: 'database',
        icon: 'database',
        title: '',
        description: '',
        size: 'medium',
        gridPosition: 'col-span-1 row-span-1'
      },
      {
        id: 'integration',
        icon: 'integration',
        title: '',
        description: '',
        size: 'small',
        gridPosition: 'col-span-1 row-span-1'
      }
    ],
    process: [
      {
        title: '',
        description: '',
        icon: 'search',
        deliverables: [
          'Mapeamento completo dos fluxos manuais',
          'Cálculo de horas e custos atuais',
          'Identificação de gargalos e erros recorrentes',
          'Relatório com potencial de economia'
        ]
      },
      {
        title: '',
        description: '',
        icon: 'design',
        deliverables: [
          'Arquitetura da automação documentada',
          'Mapa de integrações necessárias',
          'Protótipo de interfaces de controle',
          'Cronograma detalhado de implementação'
        ]
      },
      {
        title: '',
        description: '',
        icon: 'code',
        deliverables: [
          'Automação funcional em ambiente de staging',
          'Integrações com sistemas existentes',
          'Testes com dados reais',
          'Validações frequentes com o cliente'
        ]
      },
      {
        title: '',
        description: '',
        icon: 'test',
        deliverables: [
          'Testes em cenários reais de produção',
          'Validação de edge cases e exceções',
          'Relatório de performance e confiabilidade',
          'Ajustes baseados em feedback da equipe'
        ]
      },
      {
        title: '',
        description: '',
        icon: 'rocket',
        deliverables: [
          'Deploy em ambiente de produção',
          'Monitoramento de automações ativo',
          'Treinamento completo da equipe',
          'Documentação operacional e suporte pós-entrega'
        ]
      }
    ],
    techStack: [
      { name: 'TypeScript', category: 'frontend' },
      { name: 'Node.js', category: 'backend' },
      { name: 'Python', category: 'backend' },
      { name: 'n8n', category: 'backend' },
      { name: 'PostgreSQL', category: 'database' },
      { name: 'Docker', category: 'devops' },
      { name: 'AWS', category: 'devops' }
    ],
    packages: [
      {
        id: 'mvp',
        name: '',
        description: '',
        price: 'Sob consulta',
        features: []
      },
      {
        id: 'complete',
        name: '',
        description: '',
        price: 'Sob consulta',
        features: [],
        highlighted: true
      }
    ]
  },

  cloud: {
    id: 'cloud',
    slug: 'cloud',
    route: '/servicos/cloud',
    gradient: 'from-brand-alternative to-emerald-600',
    accentColor: '#2FE0B0',
    icon: 'cloud',
    features: [
      {
        id: 'infrastructure',
        icon: 'cloud-infrastructure',
        title: '',
        description: '',
        size: 'large',
        gridPosition: 'col-span-2 row-span-2'
      },
      {
        id: 'monitoring',
        icon: 'monitoring',
        title: '',
        description: '',
        size: 'medium',
        gridPosition: 'col-span-1 row-span-1'
      },
      {
        id: 'automation',
        icon: 'automation',
        title: '',
        description: '',
        size: 'medium',
        gridPosition: 'col-span-1 row-span-1'
      },
      {
        id: 'security',
        icon: 'shield',
        title: '',
        description: '',
        size: 'small',
        gridPosition: 'col-span-1 row-span-1'
      }
    ],
    process: [
      {
        title: '',
        description: '',
        icon: 'assessment',
        deliverables: [
          'Inventário completo de sistemas e integrações',
          'Mapa de fluxos de dados entre sistemas',
          'Identificação de sistemas isolados',
          'Relatório de oportunidades de integração'
        ]
      },
      {
        title: '',
        description: '',
        icon: 'architecture',
        deliverables: [
          'Arquitetura de integração documentada',
          'Diagrama de fluxo de dados',
          'Estratégia de APIs e webhooks',
          'Plano de segurança e compliance'
        ]
      },
      {
        title: '',
        description: '',
        icon: 'migration',
        deliverables: [
          'Integrações implementadas e testadas',
          'Migração incremental sem downtime',
          'Rollback plan documentado',
          'Dados migrados e validados'
        ]
      },
      {
        title: '',
        description: '',
        icon: 'optimization',
        deliverables: [
          'Auto-scaling configurado',
          'Custos otimizados (redução de 30-50%)',
          'Performance tuning aplicado',
          'Relatório de otimizações implementadas'
        ]
      },
      {
        title: '',
        description: '',
        icon: 'support',
        deliverables: [
          'Monitoramento 24/7 de integrações',
          'Alertas e dashboards configurados',
          'SLA garantido com penalidades',
          'Suporte proativo e preventivo'
        ]
      }
    ],
    techStack: [
      { name: 'AWS', category: 'devops' },
      { name: 'Docker', category: 'devops' },
      { name: 'n8n', category: 'devops' },
      { name: 'Vercel', category: 'devops' },
      { name: 'PostgreSQL', category: 'database' }
    ],
    packages: [
      {
        id: 'migration',
        name: '',
        description: '',
        price: 'Sob consulta',
        features: []
      },
      {
        id: 'managed',
        name: '',
        description: '',
        price: 'Mensal',
        features: [],
        highlighted: true
      }
    ]
  },

  ux: {
    id: 'ux',
    slug: 'ux-design',
    route: '/servicos/ux-design',
    gradient: 'from-purple-500 to-pink-500',
    accentColor: '#A855F7',
    icon: 'design',
    features: [
      {
        id: 'research',
        icon: 'research',
        title: '',
        description: '',
        size: 'large',
        gridPosition: 'col-span-2 row-span-2'
      },
      {
        id: 'prototyping',
        icon: 'prototype',
        title: '',
        description: '',
        size: 'medium',
        gridPosition: 'col-span-1 row-span-1'
      },
      {
        id: 'testing',
        icon: 'testing',
        title: '',
        description: '',
        size: 'medium',
        gridPosition: 'col-span-1 row-span-1'
      }
    ],
    process: [
      {
        title: '',
        description: '',
        icon: 'research',
        deliverables: [
          'Entrevistas com operadores e gestores',
          'Mapeamento de jornada do usuário',
          'Personas e cenários de uso',
          'Relatório de necessidades e dores'
        ]
      },
      {
        title: '',
        description: '',
        icon: 'wireframe',
        deliverables: [
          'Arquitetura de informação',
          'Wireframes de baixa e alta fidelidade',
          'Fluxos de navegação',
          'Hierarquia de informações e métricas'
        ]
      },
      {
        title: '',
        description: '',
        icon: 'prototype',
        deliverables: [
          'Protótipos interativos no Figma',
          'Design de dashboards e painéis',
          'Design system documentado',
          'Componentes reutilizáveis'
        ]
      },
      {
        title: '',
        description: '',
        icon: 'test-users',
        deliverables: [
          'Testes de usabilidade com operadores reais',
          'Relatório de insights e melhorias',
          'Iterações baseadas em feedback',
          'Validação de métricas de usabilidade'
        ]
      },
      {
        title: '',
        description: '',
        icon: 'handoff',
        deliverables: [
          'Arquivos Figma organizados para dev',
          'Documentação de componentes e estados',
          'Especificações de interação',
          'Suporte durante implementação'
        ]
      }
    ],
    techStack: [
      { name: 'Figma', category: 'frontend' },
      { name: 'Miro', category: 'frontend' }
    ],
    packages: [
      {
        id: 'audit',
        name: '',
        description: '',
        price: 'Sob consulta',
        features: []
      },
      {
        id: 'redesign',
        name: '',
        description: '',
        price: 'Sob consulta',
        features: [],
        highlighted: true
      }
    ]
  },

  ai: {
    id: 'ai',
    slug: 'inteligencia-artificial',
    route: '/servicos/inteligencia-artificial',
    gradient: 'from-orange-500 to-red-600',
    accentColor: '#F97316',
    icon: 'ai',
    features: [
      {
        id: 'automation',
        icon: 'automation',
        title: '',
        description: '',
        size: 'large',
        gridPosition: 'col-span-2 row-span-2'
      },
      {
        id: 'nlp',
        icon: 'nlp',
        title: '',
        description: '',
        size: 'medium',
        gridPosition: 'col-span-1 row-span-1'
      },
      {
        id: 'chatbots',
        icon: 'chatbot',
        title: '',
        description: '',
        size: 'medium',
        gridPosition: 'col-span-1 row-span-1'
      }
    ],
    process: [
      {
        title: '',
        description: '',
        icon: 'search',
        deliverables: [
          'Mapeamento de oportunidades de IA na operação',
          'Priorização por impacto no negócio',
          'Análise de viabilidade técnica',
          'Relatório executivo com ROI estimado'
        ]
      },
      {
        title: '',
        description: '',
        icon: 'data',
        deliverables: [
          'Auditoria de qualidade dos dados',
          'Pipeline de coleta e limpeza de dados',
          'Estruturação de datasets',
          'Recomendações de melhoria de dados'
        ]
      },
      {
        title: '',
        description: '',
        icon: 'model',
        deliverables: [
          'MVP de IA funcional',
          'Métricas de performance documentadas',
          'Comparação com abordagens alternativas',
          'Relatório de viabilidade para escala'
        ]
      },
      {
        title: '',
        description: '',
        icon: 'training',
        deliverables: [
          'Modelo otimizado em produção',
          'API de inferência funcionando',
          'Integração com sistemas do cliente',
          'Monitoramento de performance ativo'
        ]
      },
      {
        title: '',
        description: '',
        icon: 'deploy',
        deliverables: [
          'Monitoramento de drift e accuracy',
          'Retreinamento automatizado',
          'Expansão para novos casos de uso',
          'Relatórios mensais de impacto'
        ]
      }
    ],
    techStack: [
      { name: 'Python', category: 'backend' },
      { name: 'OpenAI API', category: 'backend' },
      { name: 'LangChain', category: 'backend' },
      { name: 'n8n', category: 'backend' },
      { name: 'FastAPI', category: 'backend' }
    ],
    packages: [
      {
        id: 'poc',
        name: '',
        description: '',
        price: 'Sob consulta',
        features: []
      },
      {
        id: 'implementation',
        name: '',
        description: '',
        price: 'Sob consulta',
        features: [],
        highlighted: true
      }
    ]
  }
}

/**
 * Get service data by ID
 */
export const getServiceData = (id: ServiceId): ServiceDetail | undefined => {
  return servicesData[id]
}
