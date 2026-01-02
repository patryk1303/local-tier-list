<script setup lang="ts">
import { ref } from 'vue';
import { VueDraggable } from 'vue-draggable-plus';
import Row from '@/layout/Row.vue';
import Container from '@/layout/Container.vue';

import TierRow from './TierRow.vue';

const tiers = ref([
  { tier: 'S', backgroundColor: '#ccaa00' },
  { tier: 'A', backgroundColor: 'aqua' },
  { tier: 'B', backgroundColor: 'rgb(213, 0, 190)' },
  { tier: 'C', backgroundColor: 'rebeccapurple' },
  { tier: 'D', backgroundColor: 'tomato' },
]);

const onEnd = (event: any) => {
  console.log(event, tiers.value);
};
</script>

<template>
  <Row>
    <Container>
      <VueDraggable
        ref="draggable"
        v-model="tiers"
        handle=".tier-row-draggable"
        ghostClass="tier-ghost"
        chosenClass="tier-chosen"
        dragClass="tier-drag"
        :animation="150"
        @end="onEnd"
      >
        <TierRow
          v-for="tier in tiers"
          :key="tier.tier"
          :tier="tier.tier"
          :backgroundColor="tier.backgroundColor"
        />
      </VueDraggable>
    </Container>
  </Row>
</template>

<style scoped>
.tier-ghost {
  opacity: 0.4;
  transition: all 0.3s;
  transform: rotate(5deg);
}

.tier-chosen {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.tier-drag {
  user-select: none;
}
</style>
