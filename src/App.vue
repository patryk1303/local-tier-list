<script setup lang="ts">
import { onMounted } from 'vue';
import { useStore } from '@nanostores/vue';

import { $router } from '@/stores/router.store';

import { getTierLists } from './stores/tier.store';
import RouteHome from './routes/RouteHome.vue';
import RouteTier from './routes/RouteTier.vue';

const page = useStore($router);

onMounted(async () => {
  await getTierLists();
});
</script>

<template>
  <RouteHome v-if="page?.route === 'home'" />
  <RouteTier v-else-if="page?.route === 'tier'" :tier-id="page!.params!.id!" />
</template>

<style scoped></style>
