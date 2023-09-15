import { storeToRefs } from 'pinia';
import { useEditorStore } from '@/stores/editor';

export const useContent = () => {
  const store = useEditorStore();
  const { content } = storeToRefs(store);
  const { updateElementContent, setActiveElement } = store;

  return { content, updateElementContent, setActiveElement };
};
