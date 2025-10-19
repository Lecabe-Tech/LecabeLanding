# Lecabe Landing

Landing page moderna da Lecabe criada com Vue 3, TypeScript e Tailwind CSS, seguindo a identidade visual da marca.

## ✨ Funcionalidades

- 🌍 **Suporte Multi-idioma** - Português, Inglês e Francês
- 🌓 **Dark Mode** - Tema claro/escuro com persistência
- 🎨 **Identidade Visual Lecabe** - Cores e tipografia da marca (Axiforma)
- ✨ **Animações Suaves** - Transições e animações ao scroll
- 📱 **100% Responsivo** - Design mobile-first
- ♿ **Acessível** - ARIA labels e navegação por teclado
- 🎯 **SEO Otimizado** - Meta tags, Open Graph, Schema

## 🚀 Tecnologias

- **Vue 3.5** - Framework JavaScript progressivo com Composition API
- **TypeScript 5.9** - JavaScript com tipagem estática
- **Vite 7.1** - Build tool ultra-rápido
- **Tailwind CSS 3.4** - Framework CSS utility-first
- **Pinia 3.0** - Gerenciamento de estado
- **Vue Router 4.6** - Roteamento oficial do Vue
- **Vue I18n 9** - Internacionalização
- **@vueuse/core** - Utilitários composable do Vue
- **ESLint & Prettier** - Linting e formatação de código

## 📦 Instalação

As dependências já foram instaladas. Caso precise reinstalar:

```bash
npm install
```

## 🛠️ Desenvolvimento

Para iniciar o servidor de desenvolvimento:

```bash
npm run dev
```

O projeto estará disponível em `http://localhost:5173`

## 🏗️ Build

Para fazer o build de produção:

```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `dist/`

## 👀 Preview

Para visualizar o build de produção localmente:

```bash
npm run preview
```

## 🎨 Formatação e Linting

Formatar código:

```bash
npm run format
```

Executar linting:

```bash
npm run lint
```

## 📁 Estrutura do Projeto

```
├── public/
│   └── assets/
│       ├── fonts/      # Fontes Axiforma
│       ├── logos/      # Logos da Lecabe
│       └── images/     # Imagens (puzzle piece SVG)
├── src/
│   ├── assets/         # CSS e recursos
│   │   ├── fonts.css   # Definições de fontes
│   │   └── main.css    # CSS principal com Tailwind
│   ├── components/     # Componentes reutilizáveis
│   │   ├── layout/     # Header, Footer
│   │   ├── ServiceCard.vue
│   │   ├── ContactForm.vue
│   │   ├── FloatingContactButton.vue
│   │   ├── LanguageSwitcher.vue
│   │   └── ThemeToggle.vue
│   ├── composables/    # Composition functions
│   │   ├── useAnimations.ts
│   │   └── useScrollAnimation.ts
│   ├── locales/        # Arquivos de tradução
│   │   ├── pt.json
│   │   ├── en.json
│   │   └── fr.json
│   ├── plugins/        # Plugins Vue
│   │   └── i18n.ts
│   ├── router/         # Configuração de rotas
│   ├── stores/         # Stores Pinia
│   │   ├── locale.ts   # Gerenciamento de idioma
│   │   ├── theme.ts    # Dark mode
│   │   └── contact.ts  # Formulário de contato
│   ├── types/          # TypeScript types
│   ├── utils/          # Utilitários
│   ├── views/          # Páginas/Views
│   ├── App.vue         # Componente raiz
│   └── main.ts         # Ponto de entrada
├── index.html          # Template HTML
├── vite.config.ts      # Configuração Vite
├── tailwind.config.js  # Configuração Tailwind + cores da marca
└── tsconfig.json       # Configuração TypeScript
```

## 📝 Convenções de Código

Este projeto segue os princípios SOLID e Object Calisthenics conforme definido nas regras do projeto.

## 🎨 Identidade Visual

### Cores da Marca

```css
primary: #4f52ff          /* Roxo principal */
dark-primary: #3c3fbb     /* Roxo escuro */
medium-primary: #7476ff   /* Roxo médio */
medium-dark-primary: #2f2a6d /* Roxo médio escuro */
light-primary: #9ccfff    /* Azul claro */
alternative: #2fe0b0      /* Verde alternativo */
gray: #aab2c8             /* Cinza */
light: #f4f5ff            /* Claro */
dark: #1e1e2f             /* Escuro */
```

### Tipografia

- **Fonte Principal**: Axiforma (Regular, Medium, SemiBold, Bold, Black)
- **Fonte Fallback**: Inter, system-ui, sans-serif

## 🌟 Componentes Principais

### Layout
- **Header**: Navegação sticky com logo, menu, switcher de idioma e theme toggle
- **Footer**: Links sociais, políticas e copyright
- **FloatingContactButton**: Botão flutuante com opções de contato (WhatsApp, Email, Phone)

### Seções da Home
- **Hero**: Banner principal com gradient text e CTA
- **About**: Apresentação da empresa
- **Services**: 8 cards de serviços com efeito hover gradient
- **Technologies**: Grade de tecnologias
- **Timeline**: Processo de desenvolvimento em 5 etapas
- **Contact**: Formulário de contato completo

### Funcionalidades
- **ServiceCard**: Card com máscara de puzzle piece e border gradient no hover
- **ContactForm**: Formulário com validação e seleção de idioma
- **Scroll Animations**: Animações ao rolar a página
- **Dark Mode**: Alternância suave entre temas

## 🔧 Configuração

- **Vite**: Alias `@` para `src/`, otimizações de build
- **TypeScript**: Strict mode, path mapping
- **Tailwind CSS**: Cores da marca, fontes customizadas, animações
- **Dark Mode**: Class-based com persistência em localStorage
- **i18n**: Suporte a PT, EN e FR com detecção de idioma
- **ESLint**: Vue 3 + TypeScript
- **Prettier**: Formatação consistente

## 🌐 Idiomas Disponíveis

- 🇧🇷 Português (padrão)
- 🇺🇸 English
- 🇫🇷 Français

Altere o idioma usando o switcher no header ou defina manualmente via `localStorage.setItem('locale', 'pt|en|fr')`

## 🌓 Dark Mode

O tema é detectado automaticamente das preferências do sistema, mas pode ser alternado manualmente pelo usuário. A preferência é salva em `localStorage`.

## 📊 Performance

- **Build Size**: ~216 KB JS (gzipped: ~75 KB)
- **CSS Size**: ~28 KB (gzipped: ~5.4 KB)
- **Build Time**: ~2.5s
- **Fonts**: Preload para Axiforma Regular e Bold

## 🤝 Contribuindo

1. Não faça push direto para branches: `main`, `master`, `prod`, `production`, `homolog`, `stage`
2. Siga os princípios Object Calisthenics
3. Sempre adicione comentários nos métodos de serviço
4. Aplique princípios S.O.L.I.D
5. Mantenha a identidade visual da marca

Consulte `CONTRIBUTING.md` para mais detalhes.

## 📚 Documentação Adicional

- `IMPLEMENTATION_NOTES.md` - Notas de implementação e features
- `CONTRIBUTING.md` - Guia detalhado de contribuição
- `PROJECT_STRUCTURE.md` - Estrutura detalhada do projeto
- `QUICKSTART.md` - Guia de início rápido

## 📄 Licença

ISC © 2024 Lecabe. Todos os direitos reservados.

# LecabeLanding
