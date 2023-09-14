<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import autosize from 'autosize';

defineProps({
  modelValue: String,
});

const emit = defineEmits(['update:modelValue']);

const handleInput = (evt) => {
  emit('update:modelValue', evt.target.value);
};

const element = ref();

onMounted(() => {
  autosize(element.value);
});

onBeforeUnmount(() => {
  autosize.destroy(element.value);
});
</script>

<template>
  <textarea
    ref="element"
    @input="handleInput"
    :value="modelValue"
    :placeholder="placeholder"
    class="autosize-input"
  />
</template>

<style lang="css" scoped>
.autosize-input {
  width: 100%;
  resize: none;
  border: none;
  outline: none;
  padding-block: 10px;
  background-color: transparent;
}
</style>
