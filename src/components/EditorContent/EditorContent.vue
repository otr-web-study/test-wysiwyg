<script setup>
import EditorItem from './EditorItem.vue';
import { useContent } from './useContent';

const { content, updateElementContent, setActiveElement } = useContent();
</script>

<template>
  <div class="content">
    <EditorItem
      v-for="(element, idx) in content"
      :key="element.id"
      :element="element"
      @update-value="updateElementContent($event, idx)"
      @focus="setActiveElement($event, idx)"
    />
  </div>
</template>

<style lang="css" scoped>
.content {
  margin-block: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.content > img {
  width: 100%;
  object-fit: contain;
}
</style>
