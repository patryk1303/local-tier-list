<script lang="ts" setup>
interface Props {
  title: string;
  subtitle?: string;
}

const props = withDefaults(defineProps<Props>(), {
  subtitle: undefined,
});

defineSlots<{
  image?: () => void;
  actions?: () => void;
  default?: () => void;
}>();
</script>

<template>
  <div
    class="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
  >
    <div v-if="$slots.image" class="w-full">
      <slot name="image" />
    </div>

    <div class="p-6">
      <div class="mb-4">
        <h3 class="text-xl font-semibold text-gray-900">{{ title }}</h3>
        <p v-if="subtitle" class="text-gray-600 mt-1">{{ subtitle }}</p>
      </div>

      <div v-if="$slots.default" class="mb-4">
        <slot />
      </div>

      <div
        v-if="$slots.actions"
        class="flex justify-end gap-2 mt-4 pt-4 border-t border-gray-200"
      >
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>
