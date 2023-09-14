<script setup></script>

<template>
  <button class="button">
    <slot />
  </button>
</template>

<style lang="css" scoped>
.button {
  border: none;
  background-color: transparent;
  transition: opacity 0.3s ease-in-out;
  color: rgba(99, 158, 255, 1);
  font-size: 15px;
}

.button:hover {
  opacity: 0.7;
}
</style>
