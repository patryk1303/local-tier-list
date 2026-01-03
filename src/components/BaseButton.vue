<script lang="ts" setup>
import { computed } from 'vue';

type ButtonVariant = 'primary' | 'secondary' | 'warning' | 'danger';

const props = withDefaults(
  defineProps<{
    disabled?: boolean;
    href?: string;
    compact?: boolean;
    variant?: ButtonVariant;
  }>(),
  {
    disabled: false,
    href: undefined,
    compact: false,
    variant: 'primary',
  },
);

const usedTag = computed(() => (props.href ? 'a' : 'button'));
const buttonClasses = computed(() => {
  const baseClasses = {
    'inline-flex items-center justify-center border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 cursor-pointer': true,
    'h-8 px-2 py-1 text-xs': props.compact,
    'h-14 px-4 py-2 text-sm': !props.compact,
  };

  // Define variant-specific classes
  const variantClasses = {
    primary: {
      'text-white bg-slate-800 hover:bg-slate-700 focus:ring-slate-400': true,
      'border-slate-600 bg-slate-700 hover:bg-slate-600': props.disabled,
    },
    secondary: {
      'text-slate-800 bg-white hover:bg-slate-50 focus:ring-slate-400 border-slate-300': true,
      'border-slate-400 bg-slate-100': props.disabled,
    },
    warning: {
      'text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-400': true,
      'border-yellow-600 bg-yellow-600 hover:bg-yellow-700': props.disabled,
    },
    danger: {
      'text-white bg-red-600 hover:bg-red-700 focus:ring-red-400': true,
      'border-red-700 bg-red-700 hover:bg-red-800': props.disabled,
    },
  };

  // Merge base classes with variant-specific classes
  return {
    ...baseClasses,
    ...variantClasses[props.variant],
  };
});
</script>

<template>
  <component
    :is="usedTag"
    v-bind="$attrs"
    :href="props.href"
    :class="buttonClasses"
    :disabled="props.disabled"
  >
    <slot />
  </component>
</template>
