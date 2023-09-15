<script setup>
import EditorToolbar from '@/components/EditorToolbar/EditorToolbar.vue';
import EditorContent from './components/EditorContent/EditorContent.vue';
</script>

<template>
  <main class="app">
    <EditorToolbar />
    <EditorContent />
  </main>
</template>

<style scoped>
.app {
  max-width: 1024px;
  margin-inline: auto;
  padding: 20px 20px;
}
</style>
