<script setup>
import TheButton from '../TheButton..vue';
import { useToolbar } from './useToolbar';

const { buttons } = useToolbar();
</script>

<template>
  <ul class="toolbar">
    <li class="toolbar__element" v-for="btn in buttons" :key="btn.name">
      <TheButton>
        <component v-if="btn.icon" :is="btn.icon" />
        {{ btn.text }}
      </TheButton>
    </li>
  </ul>
</template>

<style lang="css" scoped>
.toolbar {
  display: flex;
  list-style: none;
  gap: 10px;
}

.toolbar__element {
  display: grid;
  place-items: center;
}
</style>
