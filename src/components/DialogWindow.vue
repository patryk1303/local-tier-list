<script setup lang="ts">
import { ref } from 'vue';

const dialogElement = ref<HTMLDialogElement>();

defineExpose({
  show: () => dialogElement.value!.show(),
  showModal: () => dialogElement.value!.showModal(),
  close: () => dialogElement.value!.close(),
});
</script>

<template>
  <dialog
    ref="dialogElement"
    class="backdrop:blur-sm left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 p-4 text-center"
  >
    <div class="flex flex-col items-start gap-2">
      <slot />
    </div>
    <footer v-if="$slots.footer" class="mt-2 flex justify-end gap-2">
      <slot name="footer" />
    </footer>
  </dialog>
</template>
