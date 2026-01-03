<script setup lang="ts">
import { ref, watch } from 'vue';
import { VueDraggable } from 'vue-draggable-plus';

import Row from '@/layout/Row.vue';
import Container from '@/layout/Container.vue';
import { $tierRows, updateTierList } from '@/stores/tier.store';

import TierRow from './TierRow.vue';

import type { TierListWithId, TierRow as TTierRow } from '@/@types/Tier';

const props = defineProps<{
  tier: TierListWithId;
}>();

const tierRows = ref<TTierRow[]>(props.tier.tiers);

// $tierRows.subscribe((newTiers) => {
//   tiers.value = newTiers as TTierRow[];
// });

// watch(tierRows, async (newTiers) => {

// });

const onEnd = async (event: any) => {
  console.log(event, tierRows.value);
  await updateTierList(props.tier.id, {
    // TODO update elements too - after implementing element store
    elements: [...props.tier.elements],
    tiers: [...tierRows.value],
    name: props.tier.name,
  });
};
</script>

<template>
  <Row>
    <Container>
      <VueDraggable
        ref="draggable"
        v-model="tierRows"
        handle=".tier-row-draggable"
        ghostClass="tier-ghost"
        chosenClass="tier-chosen"
        dragClass="tier-drag"
        :animation="150"
        @end="onEnd"
      >
        <TierRow
          v-for="tier in tierRows"
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
