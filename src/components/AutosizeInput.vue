<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import autosize from 'autosize';

defineProps({
  value: String,
  type: String,
});

const emit = defineEmits(['input', 'focus']);

const handleInput = (evt) => {
  emit('input', evt.target.value);
};

const handleFocus = (evt) => {
  emit('focus', evt.target);
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
    rows="1"
    @input="handleInput"
    @focus="handleFocus"
    :value="value"
    :class="[
      'autosize-input',
      {
        'autosize-input_type_heading': type === 'h2',
      },
    ]"
  />
</template>

<style lang="css" scoped>
.autosize-input {
  width: 100%;
  resize: none;
  border: none;
  outline: none;
  background-color: transparent;
  color: #eaeaea;
  font-family: 'ubuntu';
  font-size: 15px;
  line-height: 1.6;
}

.autosize-input_type_heading {
  font-size: 31px;
}
</style>
