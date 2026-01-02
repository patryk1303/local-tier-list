<script lang="ts" setup>
// @ts-ignore
import { Icomoon } from 'vue-icomoon';
import iconSet from './selection.json';

const props = withDefaults(
  defineProps<{
    name: string;
    size?: string | number;
    color?: string;
  }>(),
  {
    size: '16px',
    color: 'currentColor',
  },
);
</script>

<template>
  <Icomoon
    :iconSet="iconSet"
    :name="props.name"
    :size="props.size"
    :color="props.color"
  />
</template>
