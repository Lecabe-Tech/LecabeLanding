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
        title: '', // From i18n
        description: '',
        size: 'large',
        gridPosition: 'col-span-2 row-span-2'
      },
      {
        id: 'mobile',
        icon: 'mobile',
        title: '',
        description: '',
        size: 'medium',
        gridPosition: 'col-span-1 row-span-2'
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
        size: 'small',
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
          'Documento de requisitos funcionais e não-funcionais',
          'Mapeamento de jornada do usuário',
          'Arquitetura de solução proposta',
          'Cronograma detalhado e estimativas'
        ]
      },
      {
        title: '',
        description: '',
        icon: 'design',
        deliverables: [
          'Wireframes de baixa e alta fidelidade',
          'Protótipos interativos navegáveis',
          'Design system e guia de estilo',
          'Especificações de UI/UX'
        ]
      },
      {
        title: '',
        description: '',
        icon: 'code',
        deliverables: [
          'Código fonte versionado (Git)',
          'Arquitetura modular e escalável',
          'Documentação técnica completa',
          'Ambiente de staging configurado'
        ]
      },
      {
        title: '',
        description: '',
        icon: 'test',
        deliverables: [
          'Testes unitários e integração (>80% cobertura)',
          'Testes E2E automatizados',
          'Relatório de bugs e correções',
          'Validação de performance e segurança'
        ]
      },
      {
        title: '',
        description: '',
        icon: 'rocket',
        deliverables: [
          'Deploy em ambiente de produção',
          'Monitoramento e logs configurados',
          'Documentação de usuário final',
          'Treinamento da equipe e suporte pós-lançamento'
        ]
      }
    ],
    techStack: [
      { name: 'Vue.js', category: 'frontend' },
      { name: 'React', category: 'frontend' },
      { name: 'TypeScript', category: 'frontend' },
      { name: 'Node.js', category: 'backend' },
      { name: 'Python', category: 'backend' },
      { name: 'PHP', category: 'backend' },
      { name: 'PostgreSQL', category: 'database' },
      { name: 'MongoDB', category: 'database' },
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
      },
      {
        id: 'squad',
        name: '',
        description: '',
        price: 'Sob consulta',
        features: []
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
        id: 'migration',
        icon: 'cloud-migration',
        title: '',
        description: '',
        size: 'medium',
        gridPosition: 'col-span-1 row-span-2'
      },
      {
        id: 'security',
        icon: 'shield',
        title: '',
        description: '',
        size: 'medium',
        gridPosition: 'col-span-1 row-span-1'
      },
      {
        id: 'monitoring',
        icon: 'monitoring',
        title: '',
        description: '',
        size: 'small',
        gridPosition: 'col-span-1 row-span-1'
      },
      {
        id: 'automation',
        icon: 'automation',
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
          'Auditoria completa da infraestrutura atual',
          'Análise de custos e otimizações possíveis',
          'Mapeamento de dependências e riscos',
          'Roadmap de migração personalizado'
        ]
      },
      {
        title: '',
        description: '',
        icon: 'architecture',
        deliverables: [
          'Arquitetura cloud otimizada e escalável',
          'Diagrama de rede e segurança',
          'Estratégia de alta disponibilidade',
          'Plano de disaster recovery'
        ]
      },
      {
        title: '',
        description: '',
        icon: 'migration',
        deliverables: [
          'Migração incremental sem downtime',
          'Testes de carga e performance',
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
          'Redução de custos até 40%',
          'Performance tuning aplicado',
          'Relatório de otimizações implementadas'
        ]
      },
      {
        title: '',
        description: '',
        icon: 'support',
        deliverables: [
          'Monitoramento 24/7 ativo',
          'Alertas e dashboards configurados',
          'SLA garantido com penalidades',
          'Suporte técnico especializado'
        ]
      }
    ],
    techStack: [
      { name: 'AWS', category: 'devops' },
      { name: 'Azure', category: 'devops' },
      { name: 'Google Cloud', category: 'devops' },
      { name: 'Docker', category: 'devops' },
      { name: 'Kubernetes', category: 'devops' },
      { name: 'Terraform', category: 'devops' },
      { name: 'Jenkins', category: 'devops' },
      { name: 'GitLab CI', category: 'devops' }
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
      },
      {
        id: 'enterprise',
        name: '',
        description: '',
        price: 'Sob consulta',
        features: []
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
        gridPosition: 'col-span-1 row-span-2'
      },
      {
        id: 'testing',
        icon: 'testing',
        title: '',
        description: '',
        size: 'medium',
        gridPosition: 'col-span-1 row-span-1'
      },
      {
        id: 'design-system',
        icon: 'design-system',
        title: '',
        description: '',
        size: 'small',
        gridPosition: 'col-span-1 row-span-1'
      },
      {
        id: 'accessibility',
        icon: 'accessibility',
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
        icon: 'research',
        deliverables: [
          'Pesquisa com usuários (entrevistas e surveys)',
          'Análise de concorrência e benchmarking',
          'Personas e cenários de uso',
          'Mapa de jornada do usuário (User Journey)'
        ]
      },
      {
        title: '',
        description: '',
        icon: 'wireframe',
        deliverables: [
          'Wireframes de baixa fidelidade',
          'Arquitetura de informação',
          'Fluxos de navegação',
          'Wireframes de alta fidelidade'
        ]
      },
      {
        title: '',
        description: '',
        icon: 'prototype',
        deliverables: [
          'Protótipos interativos no Figma',
          'Micro-interações e animações',
          'Design system completo',
          'Componentes reutilizáveis'
        ]
      },
      {
        title: '',
        description: '',
        icon: 'test-users',
        deliverables: [
          'Testes de usabilidade com usuários reais',
          'Testes A/B de interfaces',
          'Relatório de insights e melhorias',
          'Iterações baseadas em feedback'
        ]
      },
      {
        title: '',
        description: '',
        icon: 'handoff',
        deliverables: [
          'Arquivos Figma organizados para dev',
          'Documentação de componentes',
          'Especificações de interação e estados',
          'Suporte durante implementação'
        ]
      }
    ],
    techStack: [
      { name: 'Figma', category: 'frontend' },
      { name: 'Adobe XD', category: 'frontend' },
      { name: 'Sketch', category: 'frontend' },
      { name: 'Miro', category: 'frontend' },
      { name: 'Notion', category: 'frontend' },
      { name: 'Maze', category: 'frontend' }
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
      },
      {
        id: 'continuous',
        name: '',
        description: '',
        price: 'Mensal',
        features: []
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
        id: 'ml-models',
        icon: 'ml',
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
        gridPosition: 'col-span-1 row-span-2'
      },
      {
        id: 'computer-vision',
        icon: 'vision',
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
        size: 'small',
        gridPosition: 'col-span-1 row-span-1'
      },
      {
        id: 'chatbots',
        icon: 'chatbot',
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
        icon: 'data',
        deliverables: [
          'Análise exploratória de dados (EDA)',
          'Pipeline de coleta e limpeza de dados',
          'Feature engineering e seleção',
          'Dataset balanceado e validado'
        ]
      },
      {
        title: '',
        description: '',
        icon: 'model',
        deliverables: [
          'Seleção de arquitetura de modelo adequada',
          'Baseline model implementado',
          'Experimentos documentados (MLflow)',
          'Comparação de múltiplos modelos'
        ]
      },
      {
        title: '',
        description: '',
        icon: 'training',
        deliverables: [
          'Modelo treinado com hiperparâmetros otimizados',
          'Cross-validation aplicada',
          'Curvas de aprendizado e métricas',
          'Modelo versionado (MLflow/DVC)'
        ]
      },
      {
        title: '',
        description: '',
        icon: 'validation',
        deliverables: [
          'Testes em dados de validação e teste',
          'Análise de erros e edge cases',
          'Métricas de performance (accuracy, F1, etc)',
          'Relatório de validação técnica'
        ]
      },
      {
        title: '',
        description: '',
        icon: 'deploy',
        deliverables: [
          'API de inferência em produção (FastAPI)',
          'Monitoramento de drift e performance',
          'Documentação de uso e limitações',
          'Pipeline de retreinamento automatizado'
        ]
      }
    ],
    techStack: [
      { name: 'Python', category: 'backend' },
      { name: 'TensorFlow', category: 'backend' },
      { name: 'PyTorch', category: 'backend' },
      { name: 'scikit-learn', category: 'backend' },
      { name: 'OpenAI API', category: 'backend' },
      { name: 'Hugging Face', category: 'backend' },
      { name: 'LangChain', category: 'backend' },
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
      },
      {
        id: 'optimization',
        name: '',
        description: '',
        price: 'Sob consulta',
        features: []
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
