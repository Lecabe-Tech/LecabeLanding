import { ref, computed } from 'vue'
import type { ProductReview } from '@/types/product'

/**
 * Mock reviews data organized by product ID
 * Ready to be replaced by API call
 */
const mockReviewsData: Record<string, ProductReview[]> = {
  '1': [
    {
      id: 'r1-1',
      author: 'Maria Silva',
      rating: 5,
      date: '2024-01-15',
      comment: 'Excelente sistema! Facilitou muito a gestão de agendamentos da minha clínica. Interface intuitiva e fácil de usar.',
      helpful: 12
    },
    {
      id: 'r1-2',
      author: 'João Santos',
      rating: 4,
      date: '2024-01-10',
      comment: 'Muito bom, mas senti falta de algumas personalizações no calendário. No geral, atendeu bem nossas necessidades.',
      helpful: 8
    },
    {
      id: 'r1-3',
      author: 'Ana Costa',
      rating: 5,
      date: '2024-01-05',
      comment: 'Sistema completo e confiável. O suporte técnico é excelente e sempre nos ajuda quando precisamos.',
      helpful: 15
    },
    {
      id: 'r1-4',
      author: 'Carlos Oliveira',
      rating: 5,
      date: '2023-12-20',
      comment: 'Integração perfeita com o Google Calendar. Nossos clientes adoraram a facilidade de agendar online.',
      helpful: 9
    },
    {
      id: 'r1-5',
      author: 'Patricia Mendes',
      rating: 4,
      date: '2023-12-15',
      comment: 'Bom sistema, poderia ter mais opções de notificação. Mas no geral cumpre o que promete.',
      helpful: 5
    }
  ],
  '2': [
    {
      id: 'r2-1',
      author: 'Roberto Lima',
      rating: 5,
      date: '2024-01-18',
      comment: 'Dashboard incrível! Visualização de dados clara e relatórios muito úteis para tomada de decisão.',
      helpful: 20
    },
    {
      id: 'r2-2',
      author: 'Fernanda Costa',
      rating: 5,
      date: '2024-01-12',
      comment: 'Melhor dashboard que já usei. Gráficos interativos e customização perfeita.',
      helpful: 18
    },
    {
      id: 'r2-3',
      author: 'Lucas Martins',
      rating: 4,
      date: '2024-01-08',
      comment: 'Muito bom! Só gostaria de ter mais templates prontos, mas nada que impeça o uso.',
      helpful: 10
    }
  ],
  '3': [
    {
      id: 'r3-1',
      author: 'Eduardo Santos',
      rating: 5,
      date: '2024-01-20',
      comment: 'App de delivery perfeito! Rastreamento em tempo real funciona muito bem.',
      helpful: 25
    },
    {
      id: 'r3-2',
      author: 'Juliana Alves',
      rating: 4,
      date: '2024-01-14',
      comment: 'Ótimo app, interface bonita e fácil de usar. Só poderia ter mais formas de pagamento.',
      helpful: 14
    },
    {
      id: 'r3-3',
      author: 'Ricardo Ferreira',
      rating: 5,
      date: '2024-01-08',
      comment: 'Melhor app de delivery que já usei. Sistema de avaliações e integração com pagamento funcionam perfeitamente.',
      helpful: 19
    }
  ],
  '4': [
    {
      id: 'r4-1',
      author: 'Beatriz Lima',
      rating: 5,
      date: '2024-01-22',
      comment: 'Chatbot incrível! Aprendeu rápido o contexto do nosso negócio e reduziu drasticamente o tempo de atendimento.',
      helpful: 22
    },
    {
      id: 'r4-2',
      author: 'Marcos Souza',
      rating: 4,
      date: '2024-01-16',
      comment: 'Bom chatbot, integração com WhatsApp funciona bem. Ainda está aprendendo algumas respostas mais complexas.',
      helpful: 11
    },
    {
      id: 'r4-3',
      author: 'Sandra Oliveira',
      rating: 5,
      date: '2024-01-12',
      comment: 'Suporte 24/7 automatizado realmente funciona! Nossos clientes adoraram o atendimento rápido.',
      helpful: 16
    },
    {
      id: 'r4-4',
      author: 'Felipe Costa',
      rating: 4,
      date: '2024-01-05',
      comment: 'IA bem treinada e respostas personalizadas. Só falta melhorar a integração com Telegram.',
      helpful: 8
    }
  ],
  '5': [
    {
      id: 'r5-1',
      author: 'Amanda Silva',
      rating: 5,
      date: '2024-01-25',
      comment: 'E-commerce completo mesmo! Painel administrativo é muito intuitivo e as integrações com gateways funcionam perfeitamente.',
      helpful: 28
    },
    {
      id: 'r5-2',
      author: 'Paulo Mendes',
      rating: 5,
      date: '2024-01-19',
      comment: 'Melhor plataforma de e-commerce que já usei. Gestão de produtos é excelente e checkout muito seguro.',
      helpful: 24
    },
    {
      id: 'r5-3',
      author: 'Carla Santos',
      rating: 4,
      date: '2024-01-13',
      comment: 'Ótima plataforma, mas poderia ter mais templates de design prontos. Funcionalidade está perfeita.',
      helpful: 15
    },
    {
      id: 'r5-4',
      author: 'Diego Rocha',
      rating: 5,
      date: '2024-01-07',
      comment: 'Implementamos em 2 semanas e já estamos vendendo online. Sistema robusto e confiável.',
      helpful: 21
    }
  ],
  '6': [
    {
      id: 'r6-1',
      author: 'Renata Almeida',
      rating: 5,
      date: '2024-01-23',
      comment: 'CRM completo que revolucionou nossa gestão de vendas. Pipeline visual e automação de marketing são incríveis.',
      helpful: 30
    },
    {
      id: 'r6-2',
      author: 'Gustavo Martins',
      rating: 4,
      date: '2024-01-17',
      comment: 'Muito bom para organizar o time comercial. Relatórios são detalhados, mas interface poderia ser mais moderna.',
      helpful: 18
    },
    {
      id: 'r6-3',
      author: 'Isabela Costa',
      rating: 5,
      date: '2024-01-11',
      comment: 'Aumentamos as vendas em 40% depois de implementar este CRM. Recomendo muito!',
      helpful: 25
    }
  ],
  '7': [
    {
      id: 'r7-1',
      author: 'Thiago Pereira',
      rating: 4,
      date: '2024-01-24',
      comment: 'Ferramenta de automação muito boa. Templates profissionais e A/B testing funcionam bem. Analytics poderia ser mais detalhado.',
      helpful: 17
    },
    {
      id: 'r7-2',
      author: 'Vanessa Lima',
      rating: 5,
      date: '2024-01-18',
      comment: 'Aumentamos nossa taxa de conversão em 35%! Segmentação de listas é perfeita e fácil de usar.',
      helpful: 23
    },
    {
      id: 'r7-3',
      author: 'Rafael Santos',
      rating: 4,
      date: '2024-01-09',
      comment: 'Bom sistema de email marketing. Automação funciona bem, mas faltam alguns templates específicos para nosso nicho.',
      helpful: 12
    },
    {
      id: 'r7-4',
      author: 'Luciana Oliveira',
      rating: 5,
      date: '2024-01-03',
      comment: 'Ferramenta profissional com recursos avançados. Equipe de suporte muito atenciosa.',
      helpful: 14
    }
  ],
  '8': [
    {
      id: 'r8-1',
      author: 'Bruno Souza',
      rating: 5,
      date: '2024-01-26',
      comment: 'Backup em nuvem confiável e rápido. Criptografia de nível empresarial nos dá total segurança.',
      helpful: 32
    },
    {
      id: 'r8-2',
      author: 'Adriana Costa',
      rating: 5,
      date: '2024-01-20',
      comment: 'Melhor solução de backup que já tivemos. Versionamento e recuperação são muito rápidos.',
      helpful: 27
    },
    {
      id: 'r8-3',
      author: 'Marcelo Ferreira',
      rating: 4,
      date: '2024-01-14',
      comment: 'Excelente proteção de dados. Só achei o plano um pouco caro, mas vale o investimento.',
      helpful: 19
    },
    {
      id: 'r8-4',
      author: 'Cristina Alves',
      rating: 5,
      date: '2024-01-06',
      comment: 'Backup automático funciona perfeitamente. Já precisamos recuperar dados uma vez e foi muito simples.',
      helpful: 22
    }
  ],
  '9': [
    {
      id: 'r9-1',
      author: 'Rodrigo Mendes',
      rating: 5,
      date: '2024-01-21',
      comment: 'App de produtividade excelente! Sincronização em nuvem é perfeita e interface muito limpa.',
      helpful: 26
    },
    {
      id: 'r9-2',
      author: 'Mariana Silva',
      rating: 4,
      date: '2024-01-15',
      comment: 'Muito bom para gestão de tarefas em equipe. Notificações inteligentes ajudam muito. Só falta modo offline.',
      helpful: 16
    },
    {
      id: 'r9-3',
      author: 'Gabriel Santos',
      rating: 5,
      date: '2024-01-10',
      comment: 'Produtividade da equipe aumentou muito! Colaboração em tempo real é perfeita.',
      helpful: 20
    }
  ],
  '10': [
    {
      id: 'r10-1',
      author: 'Julia Costa',
      rating: 5,
      date: '2024-01-27',
      comment: 'IA realmente impressionante! Gera relatórios completos e insights que não tínhamos visto antes.',
      helpful: 29
    },
    {
      id: 'r10-2',
      author: 'André Lima',
      rating: 5,
      date: '2024-01-22',
      comment: 'Economizamos horas de trabalho manual. Visualizações são lindas e exportação em múltiplos formatos é muito útil.',
      helpful: 24
    },
    {
      id: 'r10-3',
      author: 'Camila Rocha',
      rating: 4,
      date: '2024-01-16',
      comment: 'Ferramenta poderosa com IA muito inteligente. Poderia ter mais customização nos templates de relatório.',
      helpful: 18
    },
    {
      id: 'r10-4',
      author: 'Fernando Alves',
      rating: 5,
      date: '2024-01-11',
      comment: 'Melhor investimento que fizemos! Relatórios automáticos são precisos e nos ajudam muito na tomada de decisão.',
      helpful: 21
    }
  ],
  '11': [
    {
      id: 'r11-1',
      author: 'Patricia Souza',
      rating: 5,
      date: '2024-01-25',
      comment: 'Sistema de estoque completo! Controle de entrada/saída é preciso e alertas de produtos em baixa funcionam perfeitamente.',
      helpful: 31
    },
    {
      id: 'r11-2',
      author: 'Ricardo Mendes',
      rating: 4,
      date: '2024-01-19',
      comment: 'Muito bom para gestão de inventário. Integração com vendas funciona bem. Código de barras poderia ser mais rápido.',
      helpful: 17
    },
    {
      id: 'r11-3',
      author: 'Daniela Costa',
      rating: 5,
      date: '2024-01-13',
      comment: 'Otimizou completamente nosso inventário. Nunca mais ficamos sem produtos em estoque!',
      helpful: 23
    },
    {
      id: 'r11-4',
      author: 'Leonardo Silva',
      rating: 5,
      date: '2024-01-08',
      comment: 'Sistema robusto e confiável. Relatórios de estoque são muito detalhados.',
      helpful: 19
    }
  ],
  '12': [
    {
      id: 'r12-1',
      author: 'Monica Oliveira',
      rating: 5,
      date: '2024-01-28',
      comment: 'Workflow Automator mudou nossa empresa! Economizamos 20 horas por semana em tarefas repetitivas.',
      helpful: 35
    },
    {
      id: 'r12-2',
      author: 'Vinicius Santos',
      rating: 5,
      date: '2024-01-23',
      comment: 'Interface visual para workflows é genial! Integrações com 100+ apps funcionam perfeitamente.',
      helpful: 28
    },
    {
      id: 'r12-3',
      author: 'Larissa Costa',
      rating: 4,
      date: '2024-01-17',
      comment: 'Excelente ferramenta de automação. Gatilhos personalizados são muito úteis. Documentação poderia ser mais completa.',
      helpful: 20
    },
    {
      id: 'r12-4',
      author: 'Sergio Almeida',
      rating: 5,
      date: '2024-01-12',
      comment: 'Melhor investimento em automação! ROI foi alcançado em menos de 2 meses.',
      helpful: 26
    }
  ]
}

/**
 * Composable for managing product reviews
 * Prepared for future API integration
 */
export function useReviews() {
  const reviews = ref<ProductReview[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  /**
   * Load reviews for a specific product from API (currently using mock data)
   */
  const loadReviews = async (productId: string): Promise<void> => {
    loading.value = true
    error.value = null

    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/products/${productId}/reviews`)
      // reviews.value = await response.json()
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300))
      
      // Get reviews for this product or empty array
      reviews.value = mockReviewsData[productId] || []
    } catch (e) {
      error.value = 'Erro ao carregar avaliações'
      console.error(e)
      reviews.value = []
    } finally {
      loading.value = false
    }
  }

  /**
   * Calculate average rating from reviews
   */
  const averageRating = computed(() => {
    if (reviews.value.length === 0) return 0
    const sum = reviews.value.reduce((acc, review) => acc + review.rating, 0)
    return sum / reviews.value.length
  })

  /**
   * Get total count of reviews
   */
  const totalReviews = computed(() => reviews.value.length)

  /**
   * Clear reviews
   */
  const clearReviews = (): void => {
    reviews.value = []
    error.value = null
  }

  return {
    reviews: computed(() => reviews.value),
    loading: computed(() => loading.value),
    error: computed(() => error.value),
    averageRating,
    totalReviews,
    loadReviews,
    clearReviews
  }
}

