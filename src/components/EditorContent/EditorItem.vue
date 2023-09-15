<script setup>
import AutosizeInput from '@/components/AutosizeInput.vue';

defineProps({
  element: Object,
});

const emit = defineEmits(['updateValue', 'focus']);
</script>

<template>
  <AutosizeInput
    v-if="['p', 'h2'].includes(element.type)"
    :value="element.children"
    :type="element.type"
    @input="emit('updateValue', $event)"
    @focus="emit('focus', $event)"
  />
  <img v-else-if="element.type === 'img'" v-bind="element.props" />
</template>
