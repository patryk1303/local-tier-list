<script setup lang="ts">
import { ref } from 'vue';

import BaseButton from './BaseButton.vue';

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
    <BaseButton @click="dialogElement!.close()"> Close </BaseButton>
  </dialog>
</template>
