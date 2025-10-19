import type { Product } from '@/types/product'

/**
 * Mock products data
 * Ready to be replaced by API call
 */
export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Sistema de Agendamento Online',
    description: 'Solução completa para agendamento de serviços com calendário inteligente, notificações automáticas e integração com Google Calendar. Ideal para clínicas, salões de beleza e consultórios.',
    cover_image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop',
    media: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1200&h=800&fit=crop' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=1200&h=800&fit=crop' },
      { type: 'video', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnail: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&h=800&fit=crop' }
    ],
    link_produto: 'https://example.com/produto/agendamento',
    live_demo: 'https://demo.example.com/agendamento',
    avaliacoes: 4.8,
    qtd_vendas: 342,
    qtd_assinantes: 1245,
    category: 'web',
    tags: ['SaaS', 'Possui SDK', 'API REST', 'Multi-tenant']
  },
  {
    id: '2',
    name: 'Dashboard Analytics Pro',
    description: 'Dashboard profissional com análise de dados em tempo real, gráficos interativos e relatórios customizáveis. Perfeito para empresas que precisam visualizar KPIs e métricas importantes.',
    cover_image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    link_produto: 'https://example.com/produto/dashboard',
    live_demo: 'https://demo.example.com/dashboard',
    avaliacoes: 4.9,
    qtd_vendas: 528,
    qtd_assinantes: 2103,
    category: 'web',
    media: [],
    tags: ['SaaS', 'BI', 'Real-time', 'Cloud']
  },
  {
    id: '3',
    name: 'App Mobile de Delivery',
    description: 'Aplicativo mobile completo para delivery com rastreamento em tempo real, pagamentos integrados e sistema de avaliações. Disponível para iOS e Android.',
    cover_image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop',
    link_produto: 'https://example.com/produto/delivery-app',
    live_demo: 'https://demo.example.com/delivery',
    avaliacoes: 4.7,
    qtd_vendas: 156,
    qtd_assinantes: 892,
    category: 'mobile',
    media: [],
    tags: ['Mobile App', 'iOS', 'Android', 'GPS', 'Pagamentos']
  },
  {
    id: '4',
    name: 'Chatbot IA Inteligente',
    description: 'Chatbot com inteligência artificial que aprende com suas conversas, oferece respostas personalizadas e se integra com WhatsApp, Telegram e site. Suporte 24/7 automatizado.',
    cover_image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=600&fit=crop',
    link_produto: 'https://example.com/produto/chatbot-ia',
    live_demo: 'https://demo.example.com/chatbot',
    avaliacoes: 4.6,
    qtd_vendas: 234,
    qtd_assinantes: 1567,
    category: 'ai',
    media: [],
    tags: ['IA', 'Possui SDK', 'NLP', 'Multi-channel', 'SaaS']
  },
  {
    id: '5',
    name: 'E-commerce Completo',
    description: 'Plataforma de e-commerce pronta para uso com gestão de produtos, carrinho de compras, checkout seguro, painel administrativo e integração com principais gateways de pagamento.',
    cover_image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
    link_produto: 'https://example.com/produto/ecommerce',
    live_demo: 'https://demo.example.com/ecommerce',
    avaliacoes: 4.9,
    qtd_vendas: 421,
    qtd_assinantes: 1876,
    category: 'web',
    media: [],
    tags: ['SaaS', 'E-commerce', 'Pagamentos', 'API REST']
  },
  {
    id: '6',
    name: 'Sistema de CRM',
    description: 'CRM completo para gestão de clientes, pipeline de vendas, automação de marketing e relatórios. Aumente suas vendas e organize seu time comercial de forma eficiente.',
    cover_image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    link_produto: 'https://example.com/produto/crm',
    live_demo: 'https://demo.example.com/crm',
    avaliacoes: 4.8,
    qtd_vendas: 389,
    qtd_assinantes: 1634,
    category: 'web',
    media: [],
    tags: ['SaaS', 'CRM', 'Vendas', 'Marketing']
  },
  {
    id: '7',
    name: 'Automação de E-mails',
    description: 'Ferramenta de automação de e-mail marketing com templates profissionais, segmentação de listas, A/B testing e analytics detalhado. Aumente sua taxa de conversão.',
    cover_image: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=800&h=600&fit=crop',
    link_produto: 'https://example.com/produto/email-automation',
    live_demo: 'https://demo.example.com/email',
    avaliacoes: 4.5,
    qtd_vendas: 267,
    qtd_assinantes: 1123,
    category: 'automation',
    media: [],
    tags: ['SaaS', 'Marketing', 'A/B Testing', 'Analytics']
  },
  {
    id: '8',
    name: 'Backup em Nuvem',
    description: 'Solução de backup automático em nuvem com criptografia, versionamento e recuperação rápida. Proteja seus dados com segurança de nível empresarial.',
    cover_image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=600&fit=crop',
    link_produto: 'https://example.com/produto/backup-nuvem',
    live_demo: 'https://demo.example.com/backup',
    avaliacoes: 4.7,
    qtd_vendas: 512,
    qtd_assinantes: 2341,
    category: 'cloud',
    media: [],
    tags: ['Cloud', 'Backup', 'Segurança', 'Criptografia']
  },
  {
    id: '9',
    name: 'App de Produtividade',
    description: 'Aplicativo mobile para gestão de tarefas e projetos com sincronização em nuvem, colaboração em equipe e notificações inteligentes. Aumente sua produtividade.',
    cover_image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=600&fit=crop',
    link_produto: 'https://example.com/produto/produtividade-app',
    live_demo: 'https://demo.example.com/produtividade',
    avaliacoes: 4.6,
    qtd_vendas: 198,
    qtd_assinantes: 876,
    category: 'mobile',
    media: [],
    tags: ['Mobile App', 'Produtividade', 'Cloud Sync', 'Colaboração']
  },
  {
    id: '10',
    name: 'Gerador de Relatórios IA',
    description: 'Ferramenta com IA que gera relatórios automáticos a partir dos seus dados, com insights inteligentes, visualizações atrativas e exportação em múltiplos formatos.',
    cover_image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    link_produto: 'https://example.com/produto/relatorios-ia',
    live_demo: 'https://demo.example.com/relatorios',
    avaliacoes: 4.8,
    qtd_vendas: 301,
    qtd_assinantes: 1432,
    category: 'ai',
    media: [],
    tags: ['IA', 'BI', 'Relatórios', 'Analytics', 'SaaS']
  },
  {
    id: '11',
    name: 'Sistema de Estoque',
    description: 'Gestão completa de estoque com controle de entrada/saída, alertas de produtos em baixa, código de barras e integração com vendas. Otimize seu inventário.',
    cover_image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop',
    link_produto: 'https://example.com/produto/estoque',
    live_demo: 'https://demo.example.com/estoque',
    avaliacoes: 4.7,
    qtd_vendas: 445,
    qtd_assinantes: 1789,
    category: 'web',
    media: [],
    tags: ['SaaS', 'ERP', 'Estoque', 'Código de Barras']
  },
  {
    id: '12',
    name: 'Workflow Automator',
    description: 'Automatize processos repetitivos com workflows visuais, integrações com 100+ apps e gatilhos personalizados. Economize horas de trabalho manual todos os dias.',
    cover_image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop',
    link_produto: 'https://example.com/produto/workflow',
    live_demo: 'https://demo.example.com/workflow',
    avaliacoes: 4.9,
    qtd_vendas: 623,
    qtd_assinantes: 2567,
    category: 'automation',
    media: [],
    tags: ['SaaS', 'Automação', 'Integrações', 'No-Code']
  }
]

/**
 * Get all unique categories from products
 */
export const getCategories = (): string[] => {
  const categories = new Set(mockProducts.map(p => p.category))
  return Array.from(categories)
}

