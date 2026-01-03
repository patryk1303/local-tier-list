<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  modelValue: string;
  placeholder?: string;
  label?: string;
  required?: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const value = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement;
  value.value = target.value;
}
</script>

<template>
  <label class="flex flex-col items-start gap-0.5 w-full">
    <span v-if="label" class="text-sm font-bold">{{ label }}</span>
    <input
      :value="value"
      @input="handleInput"
      :placeholder="placeholder"
      :required="required"
      class="border-2 border-gray-300 bg-slate-100 w-full rounded-md p-2"
      ref="input"
    />
  </label>
</template>
