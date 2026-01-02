<script setup lang="ts">
import { useStore } from '@nanostores/vue';

import Row from '@/layout/Row.vue';
import Container from '@/layout/Container.vue';

import TierList from '@/components/TierList.vue';
import { $router } from '@/stores/router.store';
import { getPagePath } from '@nanostores/router';

const page = useStore($router);
</script>

<template>
  <Row>
    <Container>
      <h1 class="text-3xl font-bold">Hello, world!</h1>
      <p class="text-xl">{{ page?.route }}</p>
      <p class="text-xl">
        <a :href="getPagePath($router, 'tier', { id: 'asdd' })">Link to tier</a>
      </p>
      <p class="text-xl">
        This is a simple example of how to use Tailwind with Vite and Vue.
      </p>
    </Container>
  </Row>
  <TierList />
</template>

<style scoped></style>
