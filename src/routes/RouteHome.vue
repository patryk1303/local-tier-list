<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue';
import BaseInput from '@/components/BaseInput.vue';
import BaseCard from '@/components/BaseCard.vue';
import DialogWindow from '@/components/DialogWindow.vue';
import Container from '@/layout/Container.vue';
import Row from '@/layout/Row.vue';

import {
  $tierLists,
  addTierList,
  DEFAULT_TIER_ROWS,
  deleteTierList,
  getTierLists,
} from '@/stores/tier.store';
import { useStore } from '@nanostores/vue';
import { onMounted, ref } from 'vue';
import { getPagePath } from '@/stores/router.store';
import type { TierListWithId, TierList } from '@/@types/Tier';

const tierLists = useStore($tierLists);

const addDialogElement = ref<InstanceType<typeof DialogWindow>>();
const removeDialogElement = ref<InstanceType<typeof DialogWindow>>();

const newTierName = ref<string>('');
const tierToRemove = ref<TierListWithId | null>(null);

const _addTierList = async () => {
  if (newTierName.value.trim() === '') {
    return;
  }

  await addTierList({
    name: newTierName.value,
    tiers: DEFAULT_TIER_ROWS,
    elements: [],
  });
  newTierName.value = '';
  addDialogElement.value?.close();
};

const _removeTierList = async () => {
  if (!tierToRemove.value) {
    return;
  }
  await deleteTierList(tierToRemove.value.id);
  tierToRemove.value = null;
  removeDialogElement.value?.close();
};

const onRemoveTierClick = (tier: TierListWithId) => {
  tierToRemove.value = tier;
  removeDialogElement.value?.showModal();
};

onMounted(async () => {
  await getTierLists();
});
</script>

<template>
  <Row>
    <Container>
      <h1 class="text-3xl font-bold">Local Tier Lists!</h1>
      <template v-if="tierLists.length > 0">
        <h2 class="text-2xl mb-2">Tier Lists</h2>
        <ul
          class="grid grid-cols-1 gap-4 justify-stretch items-stretch sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          v-if="tierLists.length > 0"
        >
          <li v-for="tierList in tierLists" :key="tierList.id">
            <BaseCard :title="tierList.name">
              <ul>
                <li>Tiers: {{ tierList.tiers.length }}</li>
                <li>Elements: {{ tierList.elements.length }}</li>
              </ul>

              <template #actions>
                <BaseButton :href="getPagePath('tier', { id: tierList.id })">
                  View
                </BaseButton>
                <BaseButton
                  variant="danger"
                  @click="onRemoveTierClick(tierList)"
                  >Delete</BaseButton
                >
              </template>
            </BaseCard>
          </li>
        </ul>
      </template>
      <template v-else>
        <h2 class="text-2xl">No tier lists found</h2>
      </template>
    </Container>
  </Row>
  <Row>
    <Container>
      <BaseButton @click="addDialogElement?.showModal()"
        >Add Tier List</BaseButton
      >
    </Container>
  </Row>

  <DialogWindow ref="removeDialogElement">
    <h2 class="text-xl">
      Remove Tier List
      <strong class="text-red-500 font-bold">{{ tierToRemove?.name }}</strong>
    </h2>
    <p>Are you sure you want to remove this tier list?</p>

    <template #footer>
      <BaseButton variant="secondary" @click="removeDialogElement?.close()"
        >Cancel</BaseButton
      >
      <BaseButton @click="_removeTierList">Remove tier</BaseButton>
    </template>
  </DialogWindow>

  <DialogWindow ref="addDialogElement">
    <h2 class="text-xl">Add Tier List</h2>

    <BaseInput
      label="Name"
      v-model="newTierName"
      required
      @keyup.enter="_addTierList"
    />

    <template #footer>
      <BaseButton variant="secondary" @click="addDialogElement?.close()"
        >Cancel</BaseButton
      >
      <BaseButton @click="_addTierList">Add tier</BaseButton>
    </template>
  </DialogWindow>
</template>
