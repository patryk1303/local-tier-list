<script lang="ts" setup>
import { ref } from 'vue';
import DialogWindow from './DialogWindow.vue';
import BaseButton from './BaseButton.vue';
import BaseIcon from './BaseIcon/BaseIcon.vue';

const dialogWindow = ref<InstanceType<typeof DialogWindow>>();

const props = withDefaults(
  defineProps<{
    tier: string;
    backgroundColor?: string;
  }>(),
  {
    backgroundColor: 'initial',
  },
);
</script>

<template>
  <section class="flex tier-row">
    <div class="flex items-center justify-center w-14 min-h-14 p-2 tier">
      {{ props.tier }}
    </div>
    <div class="flex grow items-center flex-wrap min-h-14 bg-slate-800"></div>
    <div
      class="flex items-center justify-center p-2 min-h-14 bg-gray-900 gap-1"
    >
      <BaseButton compact class="h-6" @click="dialogWindow?.showModal">
        <BaseIcon name="cog" />
      </BaseButton>
      <BaseButton
        compact
        class="tier-row-draggable cursor-grab active:cursor-grabbing h-6"
        aria-label="Drag to reorder this tier row"
      >
        <BaseIcon name="menu2" />
      </BaseButton>
    </div>
    <DialogWindow ref="dialogWindow" />
  </section>
</template>

<style scoped>
.tier-row .tier {
  background-color: v-bind('props.backgroundColor');
}
</style>
