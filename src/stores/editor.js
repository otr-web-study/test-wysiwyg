import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import contentData from '@/data/content.json';

export const useEditorStore = defineStore('editor', () => {
  const history = ref([contentData]);
  const indexContent = ref(0);
  const activeElement = ref(null);

  const content = computed(() => history.value[indexContent.value]);

  const updateElementContent = (value, idx) => {
    if (history.value[indexContent.value][idx].children) {
      history.value[indexContent.value][idx].children = value;
    }
  };

  const setActiveElement = (element, idx) => {
    activeElement.value = {
      element,
      idx,
    };
  };

  const addHistoryItem = (contentData) => {
    history.value.splice(
      indexContent.value + 1,
      history.value.length - (indexContent.value + 1),
      contentData,
    );
    indexContent.value++;
  };

  const prevHistoryItem = () => {
    if (indexContent.value > 0) {
      indexContent.value--;
    }
  };

  const nextHistoryItem = () => {
    if (indexContent.value < history.value.length - 1) {
      indexContent.value++;
    }
  };

  return {
    content,
    activeElement,
    history,
    updateElementContent,
    setActiveElement,
    prevHistoryItem,
    nextHistoryItem,
    addHistoryItem,
  };
});
