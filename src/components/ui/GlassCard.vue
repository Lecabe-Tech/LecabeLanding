<script setup lang="ts">
interface Props {
  variant?: 'default' | 'hover' | 'featured'
  padding?: 'sm' | 'md' | 'lg'
  as?: string
  to?: string
  href?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  padding: 'md',
  as: 'div'
})

const paddingClasses = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8'
}
</script>

<template>
  <component
    :is="to ? 'router-link' : href ? 'a' : as"
    :to="to"
    :href="href"
    class="glass-card group relative rounded-2xl transition-all duration-300"
    :class="[
      paddingClasses[padding],
      variant === 'featured' && 'glass-card-featured',
      (to || href) && 'cursor-pointer'
    ]"
  >
    <!-- Glow Effect (only visible on hover) -->
    <div class="glass-glow absolute -inset-[2px] rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-60 -z-10"></div>

    <!-- Content Slot -->
    <div class="relative z-10">
      <slot />
    </div>
  </component>
</template>

<style scoped>
/* Glass Card Base - Abordagem mais neutra e elegante */
.glass-card {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px) saturate(150%);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow:
    0 4px 16px rgba(0, 0, 0, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
  will-change: transform, box-shadow, border-color;
}

/* Dark mode adjustments - tons mais escuros com melhor contraste */
:deep(.dark) .glass-card {
  background: rgba(30, 32, 45, 0.85);
  border: 1px solid rgba(79, 82, 255, 0.15);
  box-shadow:
    0 4px 16px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(79, 82, 255, 0.1);
}

/* Hover State - mais sutil */
.glass-card:hover {
  transform: translateY(-4px);
  box-shadow:
    0 12px 32px rgba(79, 82, 255, 0.15),
    0 0 0 1px rgba(79, 82, 255, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  border-color: rgba(79, 82, 255, 0.2);
}

:deep(.dark) .glass-card:hover {
  box-shadow:
    0 12px 32px rgba(79, 82, 255, 0.2),
    0 0 0 1px rgba(79, 82, 255, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  border-color: rgba(79, 82, 255, 0.4);
}

/* Featured Variant - More prominent */
.glass-card-featured {
  background: rgba(79, 82, 255, 0.08);
  border: 2px solid rgba(79, 82, 255, 0.2);
}

:deep(.dark) .glass-card-featured {
  background: rgba(79, 82, 255, 0.1);
  border: 2px solid rgba(79, 82, 255, 0.3);
}

.glass-card-featured:hover {
  background: rgba(79, 82, 255, 0.12);
  border-color: rgba(79, 82, 255, 0.4);
}

/* Glow Effect on Hover - mais sutil */
.glass-glow {
  background: linear-gradient(135deg, rgba(79, 82, 255, 0.3), rgba(47, 224, 176, 0.3));
  filter: blur(24px);
}

/* Link states */
.glass-card[href]:active,
.glass-card[to]:active {
  transform: translateY(-2px);
}

/* Accessibility - focus state */
.glass-card:focus-visible {
  outline: 2px solid rgba(79, 82, 255, 0.6);
  outline-offset: 2px;
}
</style>
