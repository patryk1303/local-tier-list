<script setup lang="ts">
import { getTierList } from '@/stores/tier.store';
import { onMounted, ref } from 'vue';

import Row from '@/layout/Row.vue';
import Container from '@/layout/Container.vue';
import TierList from '@/components/TierList.vue';
import { getPagePath } from '@/stores/router.store';

import type { TierListWithId } from '@/@types/Tier';

const props = defineProps<{
  tierId: string;
}>();

const tier = ref<TierListWithId>();

onMounted(async () => {
  tier.value = await getTierList(props.tierId);
});
</script>

<template>
  <Row>
    <Container>
      <h1 class="text-3xl font-bold">Tier List</h1>
      <h2 class="text-2xl">{{ tier?.name }}</h2>
      <p class="text-xl">
        <a :href="getPagePath('home')">Home</a>
      </p>
    </Container>
  </Row>
  <Row>
    <Container>
      <TierList v-if="tier" :tier="tier" />
    </Container>
  </Row>
</template>
