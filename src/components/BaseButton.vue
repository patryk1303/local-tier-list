<script lang="ts" setup>
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    disabled?: boolean;
    href?: string;
    compact?: boolean;
  }>(),
  {
    disabled: false,
    href: undefined,
    compact: false,
  },
);

const usedTag = computed(() => (props.href ? 'a' : 'button'));
const buttonClasses = computed(() => {
  const classes = {
    'inline-flex items-center justify-center border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:bg-slate-400 disabled:text-slate-200 cursor-pointer': true,
    'text-white bg-slate-800 hover:bg-slate-700': true,
    'border-slate-600 bg-slate-700 hover:bg-slate-600': props.disabled,
    'h-8 px-2 py-1 text-xs': props.compact,
    'h-14 px-4 py-2 text-sm': !props.compact,
  };

  return classes;
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
